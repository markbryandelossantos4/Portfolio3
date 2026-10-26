# CV redesign QA

## Direction

The site uses a bright editorial studio identity: warm paper, navy type, coral, cobalt, and yellow. Its rhythm alternates between open editorial layouts, a blue academic ledger, a dark student-experience timeline, an orbiting skill composition, a yellow project spread, and a clean certificate gallery. The supplied portrait collage anchors the identity.

The page retains Mark's supplied introduction, BSIT/DNSC fourth-year status, course detail, verified portfolio repository, and certificates. Student experience is described through coursework and project practice; no employment history or unsupported achievement is added. The TESDA caption reflects its printed validity-through date.

## Motion and interaction

- Hero copy and collage enter from different directions, then the collage has restrained ambient movement.
- The learning ticker pauses on hover.
- About copy draws along rules; the academic ledger settles with a slight overshoot.
- Experience rows slide in as a sequential timeline; icons turn on hover.
- The skill composition unfurls, and individual chips spring into place and respond to hover.
- The project window lands at a slight angle; credential scans fan in from opposite sides and open full size.
- Contact heading clips into view; buttons and navigation have clear hover/focus states.
- Mobile navigation exposes `aria-expanded`, closes after selecting a destination, and supports Escape. Reduced-motion preferences remove continuous and scroll motion; content remains visible without JavaScript.

## Responsive browser review

- Local page: `http://127.0.0.1:4173/`.
- Main preview capture: `qa/implementation-redesign-preview.jpg` (908 × 660 preview viewport). Reviewed hero and visual hierarchy, responsive header, project feature, and certificate section.
- Phone capture: `qa/implementation-mobile-redesign.jpg` (site shown at 390 px CSS width inside an 844 px iframe viewport). Reviewed the landing page, single-column credential layout, readable captions/dates, and navigation behavior.
- On the phone layout, the mobile menu opened and exposed all links; choosing Experience closed the menu and navigated to its section. The certificate view stacks both scans vertically and preserves their proportions.
- The browser preview at 908 px uses the compact navigation breakpoint; the CSS provides a separate one-column phone layout at 760 px and below.

## Follow-up review

- The supplied screenshot showed a wide pause between the learning ticker and Profile, with the marquee beginning on a cropped word. Tightened Profile spacing and rebuilt the ticker as two matching seamless sets with soft edge masks and a slower loop.
- At a 319 px phone viewport, the hero artwork and notes now remain inside the page edge. Profile follows the ticker sooner, the academic ledger stacks cleanly, the experience stamp sits below its paragraph, and the rows retain readable descriptions. The skills chips, project window, certificate gallery, and contact actions were reviewed in the same compact view.
- Mobile review captures: `qa/implementation-transition-review.jpg` and `qa/implementation-mobile-experience-review.jpg`.

## Verification

- `node tests/content-check.mjs` — passed.
- `node --check script.js` — passed.
- `node --check tests/content-check.mjs` — passed.
- Local preview returned HTTP 200 for the page, hero artwork, Cisco scan, and TESDA scan.

## Before public launch

Replace `your.email@example.com` with a public address. No GitHub/Vercel deployment URL is recorded yet; add it to the README after the owner connects and publishes the repository.
