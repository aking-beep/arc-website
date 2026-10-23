import { defineConfig, devices } from "@playwright/test";

/**
 * Browser checks for the journeys the redesign owns. Separate from `npm test`,
 * which stays fast and browserless.
 *
 * Chromium is provided by the environment at PLAYWRIGHT_BROWSERS_PATH, so
 * there is no `playwright install` step. `PLAYWRIGHT_CHROMIUM_PATH` points at
 * that binary when the installed @playwright/test expects a different browser
 * build than the one the image ships; set it to
 * /opt/pw-browsers/chromium in this environment. Locally, leave it unset and
 * Playwright uses its own download.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;
export default defineConfig({
  testDir: "./tests/e2e",
  // The specs import the real data modules through the `@/*` alias so a test
  // cannot drift from the content it asserts on.
  tsconfig: "./tsconfig.json",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3100",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: executablePath ? { executablePath } : {},
      },
    },
  ],
  // Reuses an already-running server, so `npm run build && npm run start` then
  // `npm run test:e2e` works without a second build.
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "PORT=3100 npm run start",
        url: "http://localhost:3100",
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
