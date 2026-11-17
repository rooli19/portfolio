# TranspoGAPO scrapbook revision

## Agreed design

Replace only the TranspoGAPO case study with eight navigable scrapbook chapters: overview, people, journey, design, system, implementation, evaluation, and next steps. Retain the existing URL and portfolio visual language. Plane navigation, chapter shortcuts, browser history, accessible screenshot enlargement, a selectable journey, and a reconstructed prototype make the content explorable. Mobile chapters scroll normally; reduced motion changes chapters immediately.

Rholly confirmed the role “Team lead, project coordinator, and implementation lead” and October–November 2026 as the implementation period. The instructor’s 26-slide deck guides the narrative; its prompts are reference material, not instructions to invent research artifacts. Use the updated project context as the factual source. Label the persona and journey as illustrative and wireframes/prototype as retrospective reconstructions. Keep team attribution and study limitations.

## Delivery

- Dedicated, lazy-loaded React scrapbook; other projects retain the shared case-study view.
- Shared TranspoGAPO role, technologies, summary, and card imagery updated.
- Four original screenshots captured from the live app on November 17, 2026: route selection, terminal selection, trip options, and expanded mobile itinerary.
- Verified demo journey: SM City Olongapo Central → Ulo ng Apo, including the J-03 jeepney itinerary with walking legs. No live GPS navigation or route reports were submitted.
- No new dependencies or backend changes; no publication.

## Verification

- Production build passed. Existing large-chunk warning concerns the unchanged Playground canvas.
- Full portfolio browser suite passed in Chromium, Firefox, and WebKit, including repeated mobile navigation and existing interactive features.
- Dedicated scrapbook suite passed: eight chapters, deep links, reload/history, invalid fragment fallback, keyboard navigation, rapid-click protection, focus restoration, reduced motion, image failure fallback, journey, prototype reset, and screenshot dialog.
- All chapter layouts checked at 320, 768, 1024, and 1440 pixels without horizontal overflow.
- Built with the GitHub Pages `/portfolio/` base and passed the scrapbook suite against that production preview, including all four image assets.
- Desktop and mobile screenshots visually reviewed. Paper contrast, narrow tabs, loading layout, and persistent plane controls refined from observed issues.
- Physical-phone and assistive-technology testing were not performed.

## Maintenance references

The navigation uses the installed Motion package’s documented transform keyframes: https://motion.dev/docs/react-animation. Watermelon’s journal-navigation reference informed the chapter-selection pattern; the implementation uses existing portfolio components/styles without installing its dependency stack.

Source materials: `C:/hackathon/psc/transpogapo-2.0/TRANSPOGAPO-CASE-STUDY-CONTEXT.md` and `C:/Users/Rholly Cao/Downloads/CASE STUDY SLIDE DECK TEMPLATE.pptx`. The source documents are not bundled into the public website.
