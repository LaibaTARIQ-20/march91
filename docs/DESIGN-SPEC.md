# March '91 homepage: design spec

Source of truth: `docs/reference/homepage-mockup.html` (layout, spacing, sizes, type, motion). This file lists its values so they can be built as Tailwind v4 tokens and components. If this file and the mockup disagree, the mockup wins, except for the "Intentional differences" at the bottom.

## Tokens (globals.css, @theme)
| Token | Value | Used for |
|---|---|---|
| navy | #142850 | headings, buttons, dark bands, footer |
| cream | #F6F1E4 | page background |
| cream-dark | #EAE3D2 | row hover, Shorts band, quotes band, empty image blocks |
| gold-text | #735831 | kickers, hover colour, italic accent word (terry, telling) |
| gold | #8A6B3F | kept, not used on the homepage |
| ink | #4A4A46 | body text |
| muted | #5C5C58 | bylines |
| line | rgba(20,40,80,.15) | every hairline |
No other colours. No red. Custom breakpoint `desk` = 821px (the mockup collapses at 820px). Wrap = max-width 1320px, padding 40px (20px below desk).

## Type
- Display: Playfair Display 500, 700, 900 and italic 500, 700. UI and small text: Lexend 300, 400, 500. Page body font is Lexend.
- Kicker: Lexend 500, 11px, uppercase, tracking .14em, gold-text. Byline: 11px, uppercase, tracking .12em, muted.
- Section heading (.h2): Playfair 900, clamp(40px, 5vw, 72px), line-height 1, tracking -.02em, navy. One word in the heading is italic 500 (In *this* issue, March '91 *Shorts*, Style & *Campus Life*, Watch & *Listen*, NUST *Box'd*).
- Button: 1px navy border, navy text, padding 14px 26px, 11px uppercase tracking .16em, weight 500. Hover: navy fill, cream text. Solid variant: navy fill, cream text.
- Rule: 1px line colour.

## Sections, top to bottom
1. **Masthead**: centred "March ’91" (curly apostrophe), Playfair 900, clamp(48px, 7vw, 104px), tracking -.03em, padding 34px 0 22px. No top bar.
2. **Nav**: sticky top 0, cream, hairline above and below, centred, gap 40px, padding 16px 0, 11px uppercase tracking .16em navy. Items: Samaj, Karobaar, NUST Box'd, Lifestyle, Opinion, Sports, a "|" at 30% opacity, Videos, Archive. Hidden below desk (hamburger menu instead).
3. **Cover**: grid 5fr / 7fr, min-height 760px.
   - Left: padding 80px 56px 56px 64px, column, space-between. Top: kicker "NUST Fall '26 · Cover Story", headline Playfair 900 clamp(52px, 6.4vw, 104px) line-height .95 tracking -.025em, margin 24px 0 20px, with one italic 500 gold-text word ("terry"), deck Playfair italic 22px ink, button "Read the issue →". Bottom: 2px progress line (line colour, navy fill, margin-top 40px).
   - Right: grid 1fr / 240px, gap 36px, padding 0 48px 48px 0. Image area (min-height 620px, cream-dark) crossfades four covers, 5s each, each scaling 1.04 to 1. Third column at the bottom: kicker "Also in this issue" (navy), then 3 rows with hairline on top, padding 18px 0 22px: kicker section, title Playfair 700 21px line-height 1.15 navy.
4. **Ticker**: navy band, cream text, padding 15px 0, 12px uppercase tracking .12em, items gap 56px, marquee 40s linear, list repeated twice.
5. **In this issue**: wrap padding 110px 0. Header row: h2 left, issue label right (byline style). Grid 2 columns, column-gap 72px. Row: grid 96px / 1fr / 1.3fr / auto, gap 22px, padding 22px 0, hairline on top, hover cream-dark. Thumbnail 3:4. Section name Playfair italic 500 clamp(30px, 3.2vw, 46px). Story line 14px ink (max 380px). "Read →" kicker, right aligned. Below desk: 72px / 1fr and the Read link hidden.
6. **Feature spread**: wrap, grid 7fr / 5fr, centred vertically, padding-bottom 120px. Image 4:5. Text block overlaps the image by 90px (margin-left -90px), cream background, padding 48px 0 48px 48px: kicker, headline Playfair 900 clamp(40px, 4.6vw, 68px) line-height 1 tracking -.02em (margin 20px 0 28px, one italic 500 phrase), button.
7. **The Edit**: wrap, padding-bottom 120px. Header: hairline on top, padding-top 28px, margin-bottom 48px, h2 at clamp(32px, 3.6vw, 52px) left, small byline-style line right. Grid 3 columns, gap 40px, columns pushed down 0 / 80px / 30px. Images 3:4, 4:5, 3:4. Under each: kicker (margin-top 16px), title Playfair 28px line-height 1.1 navy (margin 8px 0), byline.
8. **Shorts**: cream-dark band, padding 90px 0. Header row (wrap) h2 left, button "Follow on Instagram →" right, margin-bottom 36px. Row of cards 220px wide, 9:16, gap 20px, marquee 45s, pauses on hover. Card: play triangle top left (18px), title bottom (Playfair 19px line-height 1.15 navy).
9. **Style & Campus Life**: wrap padding 110px 0. Header: kicker "Lifestyle" and h2 (margin-top 10px), margin-bottom 44px. Grid 1.35fr / 1fr, gap 56px. Left: image 4:5, title Playfair 40px line-height 1.05 (margin 20px 0 8px), byline. Right: 4 rows, grid 130px / 1fr, gap 20px, padding 24px 0, hairline on top (the first row has none and padding-bottom 24px). Square thumb, kicker, title Playfair 24px line-height 1.1, byline.
10. **Watch & Listen**: navy band, cream text, padding 100px 0. Header: h2 cream left, "All videos →" right (11px, uppercase, tracking .16em, cream underline). Grid 1.6fr / 1fr, gap 48px. Left: 16:9 frame with an 84px circle play button (1.5px cream border, 26px triangle), title Playfair 36px line-height 1.05 (margin-top 22px). Right: column, space-between, 4 rows grid 150px / 1fr, gap 18px, 16:9 thumb, title Playfair 19px; rows have a cream 18% hairline below (padding-bottom 20px), last row none.
11. **NUST Box'd**: wrap, grid 1fr / 1.4fr, gap 72px, centred, padding 120px 0. Left: kicker "Culture", h2 (margin 12px 0 24px), italic Playfair 22px line "The critics’ shelf.", button "Browse the shelf →". Right: 2 columns gap 32px, posters 2:3, title Playfair 24px (margin 16px 0 6px), byline; the second column is pushed down 56px.
12. **Quotes**: cream-dark band, padding 110px 0 90px, centred. Two notes crossfade (14s loop; fade plus 14px vertical move), min-height 330px (460px below desk). Each: kicker "A note from the …", quote Playfair italic 500 clamp(26px, 3.6vw, 52px) line-height 1.18 tracking -.01em navy max-width 1000px, byline "— role". Two 34×3px indicator bars below (margin-top 40px).
13. **Call to action**: hairline on top, padding 110px 0 100px, centred. h2 clamp(40px, 5.6vw, 84px): "Got a story worth *telling?*" (italic 500 gold-text). Solid button "Send your word →" (margin-top 36px).
14. **Footer**: navy, cream text, padding-top 80px. Grid 1.4fr / 1fr / 1fr / 1fr, gap 40px, padding-bottom 70px. Column heads in kicker style (cream-dark), links 14px line-height 2. Bottom bar directly under the columns with a hairline between them (cream at 18% opacity): 11px uppercase tracking .12em, cream-dark, padding-top 34px, padding-bottom 24px, two items left and right.

Below desk: every grid becomes one column, the In-this-issue row becomes 72px / 1fr, The Edit offsets go to 0, nav hides, wrap padding 20px.

## Intentional differences (do not "fix" these)
1. All text, names, images, links and bylines come from `src/content`. The mockup's placeholder items (Weekly NUST News, Community Service Club, cafeterias, S3H Film Circle, "Issue No. 2", "March ’91 Style Desk") are not content. Its byline "By Faiza Majeed" on A Glamorous Junkyard is wrong: the article data decides.
2. Ticker label "Start the day here" is cream with a small gold square, because gold on navy is too faint to read. The ticker items are the call for articles plus real article titles.
3. Tagline and credit in the footer come from `siteConfig` (Sarah's wording), not the mockup's text.
4. The cover keeps small previous/next buttons and a "01 / 04" counter beside the progress line, and pauses on hover and focus.
5. Shorts and Watch & Listen show designed "Coming soon" slots while their data files are empty (flag `showMediaPlaceholders`).
6. Kickers and bylines stay at 11px as in the mockup. All other text is at least 13px.
7. The cover image area takes the aspect ratio of the real cover images so the printed cover text is never cropped.
