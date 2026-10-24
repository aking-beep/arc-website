import { expect, test, type ConsoleMessage, type Page } from "@playwright/test";
import { questions } from "@/lib/arc/readiness";

/**
 * Browser checks for the journeys the redesign is responsible for.
 *
 * Run against a production build: `npm run build && npm run start`, then
 * `npm run test:e2e`. Not part of `npm test`, which stays fast and
 * browserless for CI.
 */

/**
 * Fails the test on any console error or page error on the route under test.
 *
 * `/_vercel/insights/script.js` is injected by @vercel/analytics and only
 * exists when the site is served by Vercel, so it 404s against a local
 * `next start` on every route. It is filtered rather than treated as a defect.
 */
const ENVIRONMENT_ONLY = [/_vercel\/insights/, /status of 404/];

function watchConsole(page: Page) {
  const errors: string[] = [];
  const keep = (text: string) => !ENVIRONMENT_ONLY.some((re) => re.test(text));
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error" && keep(msg.text())) errors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    if (keep(err.message)) errors.push(err.message);
  });
  page.on("requestfailed", (req) => {
    if (keep(req.url())) errors.push(`request failed: ${req.url()}`);
  });
  return errors;
}

const PRIMARY_ROUTES = [
  "/",
  "/control",
  "/labs",
  "/services",
  "/research",
  "/about",
  "/contact",
];

test.describe("no console errors on the redesigned routes", () => {
  for (const route of PRIMARY_ROUTES) {
    test(`${route} renders clean`, async ({ page }) => {
      const errors = watchConsole(page);
      const res = await page.goto(route, { waitUntil: "networkidle" });
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(errors).toEqual([]);
    });
  }
});

test("navigation reaches every primary destination", async ({ page }) => {
  await page.goto("/");
  for (const [label, path] of [
    ["Solutions", "/services"],
    ["ARC Control", "/control"],
    ["ARC Labs", "/labs"],
    ["Research", "/research"],
    ["About", "/about"],
  ] as const) {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await page.goto("/");
  }
  await page.getByRole("link", { name: "Talk to ARC" }).first().click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("mobile menu opens, traps focus and closes on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();

  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  // Focus moved into the panel.
  await expect(dialog.getByRole("link", { name: "Home" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("the opened mobile menu actually fills the screen and shows its links", async ({
  page,
}) => {
  // The regression this guards: `toBeVisible()` and `toBeFocused()` both
  // passed while the panel rendered 57px tall with every link clipped out of
  // sight by overflow-y-auto. A fixed-position panel inside the
  // backdrop-filtered <header> resolved its insets against the 64px header
  // instead of the viewport. Assert the geometry, not just the visibility.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();

  const dialog = page.getByRole("dialog", { name: "Site menu" });
  const box = await dialog.boundingBox();
  expect(box, "panel has no box").not.toBeNull();

  // Below the 64px header, and filling essentially the rest of the viewport.
  expect(Math.round(box!.y)).toBeGreaterThanOrEqual(63);
  expect(box!.height, `panel is only ${box!.height}px tall`).toBeGreaterThan(600);
  expect(box!.width).toBeGreaterThan(380);

  // It must not be a fixed-position descendant of a containing-block ancestor.
  const offsetParent = await dialog.evaluate(
    (el) => (el as HTMLElement).offsetParent?.tagName.toLowerCase() ?? "viewport",
  );
  expect(offsetParent, "panel is positioned against an ancestor").toBe("viewport");

  // Every destination is reachable without scrolling a clipped container.
  for (const name of ["Home", "Solutions", "ARC Control", "ARC Labs", "Research", "About", "Playbooks"]) {
    await expect(dialog.getByRole("link", { name, exact: true })).toBeInViewport();
  }

  // And tapping one navigates.
  await dialog.getByRole("link", { name: "ARC Labs", exact: true }).click();
  await expect(page).toHaveURL(/\/labs$/);
});

test("ARC Control states its maturity above the fold and never claims GA", async ({ page }) => {
  await page.goto("/control");
  await expect(page.getByText("Design-partner development").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "What ARC Control is not." })).toBeVisible();
  // Nothing on the page may offer a purchase.
  await expect(page.getByRole("link", { name: /buy|pricing|sign up/i })).toHaveCount(0);
});

test("the console preview is labelled and every view opens", async ({ page }) => {
  await page.goto("/control");
  await expect(page.getByText("Demonstration data · not a live system")).toBeVisible();

  const tablist = page.getByRole("tablist", { name: "Console views" });
  for (const name of [
    "Agent inventory",
    "Execution activity",
    "Permission policies",
    "Audit evidence",
    "Security findings",
    "Operational health",
  ]) {
    await tablist.getByRole("tab", { name }).click();
    await expect(page.getByRole("heading", { name, level: 3 })).toBeVisible();
  }
});

test("a capability link opens the matching console view", async ({ page }) => {
  await page.goto("/control");
  await page.getByRole("button", { name: "See it in Audit evidence" }).click();
  await expect(page.getByRole("heading", { name: "Audit evidence", level: 3 })).toBeVisible();
});

test("the real console showcase is reachable from /control", async ({ page }) => {
  await page.goto("/control");
  await expect(
    page.getByRole("heading", { name: "The operator console, as it actually renders." }),
  ).toBeVisible();

  const open = page.getByRole("link", { name: /Open the console/ });
  await expect(open).toHaveAttribute("href", "/ark-control/console/index.html");

  // It is a static file in public/, not a route, so this is a full navigation.
  await open.click();
  await expect(page).toHaveURL(/\/ark-control\/console\/index\.html$/);
  await expect(page).toHaveTitle(/Overview — ARC Control/);
  // The capture says on every page that it is a capture.
  await expect(page.getByText("Live design showcase").first()).toBeVisible();
});

test("the console's way back to the site lands on the product page", async ({ page }) => {
  // The capture's only absolute link is /ark-control, which now redirects.
  const res = await page.goto("/ark-control");
  expect(res?.status()).toBe(200);
  await expect(page).toHaveURL(/\/control$/);
});

test("Labs shows real maturities and working tool links", async ({ page }) => {
  await page.goto("/labs");
  await expect(page.getByRole("heading", { name: "MCP Conformance Scanner" })).toBeVisible();
  await expect(page.getByText("Live", { exact: true }).first()).toBeVisible();

  const openTool = page
    .getByRole("link", { name: /Open tool MCP Conformance Scanner/ })
    .first();
  await expect(openTool).toHaveAttribute("target", "_blank");
  await expect(openTool).toHaveAttribute("rel", /noreferrer/);
  await expect(openTool).toHaveAttribute(
    "href",
    "https://www.arctransformationgrouplab.dev",
  );
});

test("no page links an ARC repository", async ({ page }) => {
  // GitHub was removed from the site. The one github.com link that remains
  // anywhere is a cited third-party source in the market signals, which is
  // evidence for a dated claim rather than a link to ARC's own code.
  for (const route of [...PRIMARY_ROUTES, "/developers", "/platform", "/labs/mcp-conformance-scanner"]) {
    await page.goto(route);
    const arcRepos = await page
      .locator('a[href*="github.com/aking-beep"]')
      .count();
    expect(arcRepos, `${route} links an ARC repository`).toBe(0);
    await expect(page.getByRole("link", { name: "GitHub", exact: true })).toHaveCount(0);
  }
});

test("no page exposes a personal email address or LinkedIn profile", async ({ page }) => {
  // Removed from the site: everyone goes through /contact or Calendly. Checks
  // the rendered HTML rather than the data layer, so it also catches an
  // address hard-coded into a page's copy.
  const routes = [
    ...PRIMARY_ROUTES,
    "/about",
    "/privacy",
    "/terms",
    "/developers",
    "/platform",
    "/playbook",
    "/does-not-exist",
  ];

  for (const route of routes) {
    await page.goto(route);
    const html = await page.content();
    expect(html, `${route} exposes the founder's address`).not.toContain("aking@");
    expect(html, `${route} links LinkedIn`).not.toContain("linkedin.com");
    expect(
      await page.locator('a[href^="mailto:"]').count(),
      `${route} has a mailto link`,
    ).toBe(0);
  }
});

test("the mobile menu offers booking rather than an address", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();

  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog.getByRole("link", { name: /Book 30 minutes/ })).toHaveAttribute(
    "href",
    /calendly\.com/,
  );
  expect(await dialog.locator('a[href^="mailto:"]').count()).toBe(0);
});

test("the excluded consumer products appear nowhere", async ({ page }) => {
  for (const route of [...PRIMARY_ROUTES, "/platform", "/work", "/playbook"]) {
    await page.goto(route);
    const body = (await page.locator("body").innerText()).toLowerCase();
    for (const name of ["arc travel", "climb up", "mirrosu", "steady move"]) {
      expect(body, `${name} found on ${route}`).not.toContain(name);
    }
  }
});

test("the readiness check scores and recommends", async ({ page }) => {
  await page.goto("/services");
  const panel = page.locator("#readiness");

  for (const [i, q] of questions.entries()) {
    await expect(panel.getByText(`${q.dimension} · ${i + 1} of 6`)).toBeVisible();
    // Scope to this question's own inputs by name. The step counter above
    // updates before the previous question's fieldset finishes animating out,
    // so a panel-wide `.last()` can land on an already-checked radio from the
    // outgoing step and silently no-op.
    const options = panel.locator(`input[name="${q.id}"]`);
    await expect(options).toHaveCount(q.options.length);
    // Last option scores highest, so a full run lands in the top band.
    await options.last().check();
    await panel.getByRole("button", { name: /Next question|See my results/ }).click();
  }

  await expect(panel.getByText("Your readiness")).toBeVisible();
  await expect(panel.getByText("100", { exact: true })).toBeVisible();
  await expect(panel.getByText("Ready", { exact: true })).toBeVisible();
  await expect(panel.getByRole("link", { name: /Discuss these results/ })).toHaveAttribute(
    "href",
    "/contact?readiness=100",
  );
});

test("a solution deep link opens the right area", async ({ page }) => {
  await page.goto("/services?area=ai-governance");
  await expect(
    page.getByRole("heading", { name: "AI Governance & Security", level: 3 }),
  ).toBeVisible();
});

test("research rows link to the real article pages", async ({ page }) => {
  await page.goto("/research");
  await page.getByPlaceholder("Search titles, topics and summaries").fill("EU AI Act");
  const row = page.getByRole("link", { name: /EU AI Act/ }).first();
  await row.click();
  await expect(page).toHaveURL(/\/research\/eu-ai-act-transparency-live$/);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("the inquiry form validates, submits and confirms", async ({ page }) => {
  const errors = watchConsole(page);
  await page.goto("/contact?type=control");

  // Step 1 is preselected by the deep link, so Continue advances.
  await page.getByRole("button", { name: "Continue" }).click();

  // Step 2 blocks on empty required fields.
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("3 fields need attention.")).toBeVisible();

  const form = page.getByRole("form");
  await form.getByRole("textbox", { name: "Full name" }).fill("QA Tester");
  await form.getByRole("textbox", { name: "Work email" }).fill("not-an-email");
  // "Company" alone also matches the honeypot's "Company website" label and
  // the footer's Company navigation landmark.
  await form.getByRole("textbox", { name: "Company", exact: true }).fill("Northwind");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("That email doesn’t look right. Check for typos.")).toBeVisible();

  await form.getByRole("textbox", { name: "Work email" }).fill("qa@example.com");
  await page.getByRole("button", { name: "Continue" }).click();

  // Step 3 requires budget, timeline and a real message.
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByText("3 fields need attention.")).toBeVisible();

  // These two groups render sr-only inputs inside their labels, which is what
  // a pointer user clicks, so the label intercepts a direct check().
  await form.getByRole("radio", { name: "Not sure yet" }).click({ force: true });
  await form.getByRole("radio", { name: "This quarter" }).click({ force: true });
  await form
    .getByRole("textbox", { name: "What’s happening?" })
    .fill("Our refund agent reports success and finance cannot confirm the ledger changed.");

  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByRole("heading", { name: /Thanks, QA\./ })).toBeVisible();
  await expect(page.getByText("qa@example.com")).toBeVisible();
  expect(errors).toEqual([]);
});

test("keyboard alone reaches the content and the primary CTA", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("renders without horizontal overflow at 390px and 1280px", async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of PRIMARY_ROUTES) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${route} at ${width}px overflows by ${overflow}px`).toBeLessThanOrEqual(1);
    }
  }
});
