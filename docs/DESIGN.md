# How ARC looks

The visual counterpart to [`WRITING.md`](WRITING.md). It exists for one reason:
the site used to look like every other AI company's site, and that was not an
accident of taste. It was the result of shipping a framework's defaults.

## What made it look generic

Worth naming, because each of these comes back the moment someone reaches for a
starter template.

| The default | Why it reads as a template |
| --- | --- |
| A desaturated blue-grey palette (every hue 218–224°, 9–32% saturation) | It is the stock `shadcn/ui` theme. Thousands of sites ship it untouched. |
| A cyan or violet accent | The two most over-used "AI company" hues on the web. |
| A 1px outline on every card, panel and list | Separation by outline makes a page read as a wireframe of itself. |
| Faint graph paper behind the hero | The single most recognisable starter-template decoration there is. |
| 6–12px corner radii | Nobody chose them. They are what the config shipped with. |
| A developer typeface (IBM Plex, Inter, Geist) | Correct for a dev tool, wrong for a company selling judgement. |
| No photography at all | This was the big one. The site had no `public/` directory. |

## The rules now

**Commit to one colour world.** Pine green, and the neutrals carry a green cast
too. A grey page with a green button is not a green identity; it is a grey
identity with an accent. Light mode is warm paper, dark mode is green-black
rather than blue-black.

**Separate by elevation, not by outline.** The shadow scale in
`tailwind.config.ts` is green-tinted so it reads as shadow on a warm page
instead of grey haze. A hairline ring survives on cards only because shadow is
invisible in dark mode. Hover lifts a card; it does not darken its border.

The exception is a dense data grid, where a 1px separator is genuinely the right
pattern. Those keep their hairlines, softened, in a ringed container.

**Photography carries the page.** Five images in `public/images`, one shoot, one
grade: understated documentary photographs of the kind of places this work
actually happens in, with film grain and available light. Not glossy 3D
renders — a render is the thing that looks machine-made.

Rules for them:

- Every image that carries text gets a scrim layer, never a filter on the image
  itself, so the picture keeps its own contrast underneath.
- Two scrims multiply. `scrim-left` stays light because it stacks on
  `scrim-bottom`, and two heavy gradients erase the photograph.
- Text over an image uses `--on-image`, which is fixed rather than themed,
  because a photograph is dark in both themes.
- Chips and controls on a photograph are glass. A solid chip over a picture
  reads as a sticker.
- Alt text describes the picture. It is not a second place to sell.

**The header floats over a photo hero.** `PhotoHero` marks itself with
`data-photo-hero`, the header looks for it and goes transparent while scrolled
over it. Self-registering, so a new photo hero needs no change to the header.
`PhotoHero` also carries `-mt-16` to slide under the sticky bar, which is what
makes the image run behind the navigation rather than start below it.

**Generous surfaces, tight controls.** Cards are 20–28px. Buttons and chips are
fully round. Display type is tracked to `-0.032em`, because large text set at
body tracking is the other quiet tell of an untouched theme.

**Interior pages do not borrow photographs.** The homepage and the four service
pages have images with a claim to the subject. An inside page that pulls in a
picture it has no relationship to looks like stock, so `PageHero` uses a
gradient that resolves into the page instead.

## Where it lives

```
app/globals.css           Colour tokens, scrims, glass, bloom
tailwind.config.ts        Elevation scale, radii, display tracking
components/ui/photo.tsx   Photo, PhotoChip, PhotoHero, PhotoCard
components/ui/card.tsx    Elevation, not outline
components/ui/button.tsx  Pills, including the glass and light variants
components/page-hero.tsx  Interior pages, no photograph
public/images/            The photographs
```

## The test

Put the page next to three competitors. If the only way to tell them apart is
the logo, the design has not done its job yet — which is the same standard
`WRITING.md` applies to the copy.
