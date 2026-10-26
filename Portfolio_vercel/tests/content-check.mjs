import { existsSync, readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../script.js', import.meta.url), 'utf8');

assert.match(html, /MARK BRYAN DELOS SANTOS/, 'the landing page should identify the student');
assert.match(html, /IT COLLEGE STUDENT @ DNSC/, 'the landing page should show the student and college context');
assert.match(html, /Detail-oriented and creative BS Information Technology student/, 'the supplied profile should appear at the top of the CV');
assert.match(html, /Career Objective/i, 'the CV should include a career objective');
assert.match(html, /As a student, I’m building experience through coursework, technical projects, and creative practice/, 'experience should be framed around student projects and coursework');
assert.match(html, /Full stack web development/, 'the profile should include the stated web experience');
assert.match(html, /Flutter-based mobile applications/, 'the profile should include the stated mobile development experience');
assert.match(html, /Database-driven systems/, 'the profile should include the stated database experience');
assert.match(html, /Multimedia content creation/, 'the profile should include the stated multimedia experience');
for (const skill of ['C++', 'Java', 'Python', 'PHP', 'React.js', 'Flutter', 'Dart', 'Critical thinking', 'UI/UX design', 'Database management', 'GitHub', 'Photoshop']) {
  assert.match(html, new RegExp(skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `the skills section should include ${skill}`);
}
assert.match(html, /Photoshop <small>Basic editing<\/small>/, 'Photoshop should be qualified as basic editing');
assert.match(html, /IT415 — Application Development and Emerging Technologies/, 'the verified course highlight should appear');
assert.match(html, /href="https:\/\/github\.com\/markbryandelossantos4"/, 'the GitHub profile should use its verified URL');
assert.match(html, /href="mailto:markbryandelossantos4@gmail\.com"/, 'the contact button should open the supplied email address');
assert.match(html, />markbryandelossantos4@gmail\.com<\/a>/, 'the supplied email should be visible in the contact section');
assert.match(html, /id="projects"/, 'the selected project section should have a navigation target');
assert.match(html, /PROJECT 001/, 'the verified portfolio project should be described without invented work');
assert.match(html, /data-project-id="agrisync-app"/, 'the AgriSync mobile app should have its own project card');
assert.match(html, /data-project-id="agrisync-promo"/, 'the AgriSync promotional website should remain a separate project');
assert.match(html, /class="agrisync-project-card" type="button" data-project-id="agrisync-app"/, 'the original app should receive the full-width feature card');
assert.match(html, /class="project-mini-card project-mini-card-agri-promo" type="button" data-project-id="agrisync-promo"/, 'the promotional website should sit in the project-card grid');
for (let index = 1; index <= 4; index += 1) assert.match(html, new RegExp(`agri-screen-${index}\\" src=\\"assets/projects/agrisync-app/agrisync-app-${index}\\.png`), `the full-width app feature should display original screen ${index}`);
for (const stackItem of ['FLUTTER', 'DART', 'SUPABASE']) assert.match(html, new RegExp(stackItem), `the app project should list ${stackItem}`);
assert.match(html, /id="project-dialog"[^>]*aria-labelledby="project-dialog-title"/, 'project details should use a labeled native dialog');
assert.match(js, /'agrisync-app':\s*\{[\s\S]*?stack:\s*\['Flutter', 'Dart', 'Supabase'\]/, 'the AgriSync app should use its mobile stack');
assert.match(js, /'agrisync-promo':\s*\{[\s\S]*?stack:\s*\['HTML', 'CSS', 'JavaScript'\]/, 'the AgriSync promo site should use its web stack');
assert.match(js, /link:\s*'https:\/\/agrisync-blush\.vercel\.app\//, 'the AgriSync promo Vercel link should be available from its dialog');
for (let index = 1; index <= 4; index += 1) {
  const appAsset = `agrisync-app-${index}.png`;
  const promoAsset = `promo-${index}.png`;
  assert.ok(existsSync(new URL(`../assets/projects/agrisync-app/${appAsset}`, import.meta.url)), `AgriSync app screenshot ${appAsset} should be bundled locally`);
  assert.ok(existsSync(new URL(`../assets/projects/agrisync-promo/${promoAsset}`, import.meta.url)), `AgriSync promotional website screenshot ${promoAsset} should be bundled locally`);
}
assert.doesNotMatch(html, /assets\/projects\/agrisync\/hero_phone\.png/, 'the mobile app should not be duplicated using a second asset set');
assert.match(html, /HTML<\/li><li>CSS<\/li><li>VANILLA JS/, 'project technologies should match the implementation');
assert.match(html, /id="certificates"/, 'the CV should include a certificate section');
assert.match(html, /CCNA: Switching, Routing, and Wireless Essentials/, 'the Cisco certificate should be included');
assert.match(html, /Computer Systems Servicing — National Certificate II/, 'the TESDA certificate should be included');
assert.match(html, /PRINTED VALIDITY THROUGH/, 'the TESDA printed validity must be clear');
assert.ok(existsSync(new URL('../assets/hero-collage.png', import.meta.url)), 'the hero collage should be bundled locally');
assert.ok(existsSync(new URL('../assets/certificates/cisco-ccna.png', import.meta.url)), 'the Cisco certificate scan should be bundled locally');
assert.ok(existsSync(new URL('../assets/certificates/tesda-css-nc-ii.jpg', import.meta.url)), 'the TESDA certificate scan should be bundled locally');

assert.match(html, /aria-label="Main navigation"/, 'navigation should have an accessible name');
assert.match(html, /class="theme-switch"[^>]*aria-pressed="false"/, 'the theme switch should start in light mode and expose its state');
assert.match(html, /class="theme-lamp"/, 'the theme control should include the animated lamp');
assert.doesNotMatch(html, /your\.email@example\.com|Replace the sample email/, 'the contact section should not contain a sample email placeholder');
assert.match(html, /class="skip-link"/, 'keyboard users should be able to skip navigation');
assert.match(html, /class="reading-progress"/, 'the page should include a reading progress indicator');
for (const id of ['home', 'about', 'education', 'experience', 'skills', 'projects', 'certificates', 'contact']) {
  assert.match(html, new RegExp(`id="${id}"`), `the ${id} navigation destination should exist`);
}

assert.match(html, /data-reveal="hero-collage"/, 'hero artwork should have a distinct entrance');
assert.match(html, /data-reveal="ledger-in"/, 'education should use its ledger entrance');
assert.ok((html.match(/data-reveal="timeline-row"/g) ?? []).length === 4, 'student experience entries should stagger along the timeline');
assert.match(html, /data-reveal="orbit-in"/, 'the skill composition should unfurl into view');
assert.match(html, /data-reveal="project-window"/, 'the project window should have its own settling entrance');
assert.match(html, /data-reveal="certificate-left"/, 'the first certificate should fan in from the left');
assert.match(html, /data-reveal="certificate-right"/, 'the second certificate should fan in from the right');
assert.equal((html.match(/class="ticker-set"/g) ?? []).length, 4, 'the ticker should have enough matching sets to keep the band full at wide viewports');
assert.match(css, /@keyframes ticker-slide\s*\{\s*to\s*\{\s*transform:\s*translateX\(-25%\)/, 'the ticker should loop by one complete repeated set');
assert.match(css, /:root\[data-theme="dark"\]/, 'the stylesheet should provide a coordinated dark palette');
assert.match(css, /--ticker-bg:\s*#252d41/, 'the ticker should use a muted dark-mode surface');
assert.match(css, /--project-bg:\s*#222b40/, 'the project section should harmonize with the dark palette');
assert.match(css, /--primary-fg:\s*#f5f2e9/, 'the primary action should retain readable text in dark mode');
assert.match(css, /\.ticker::before\s*\{\s*left:\s*0;\s*background:\s*linear-gradient\(90deg,var\(--ticker-bg\),transparent\)/, 'ticker edge fades should adapt to the selected theme');
assert.match(css, /@keyframes cord-pull/, 'the light switch should animate its pull cord');
assert.match(css, /@keyframes ticker-slide/, 'the topic ticker should animate');
assert.match(css, /\.ticker::before, \.ticker::after/, 'the animated ticker should soften its clipped edge text');
assert.match(css, /padding:\s*68px 12% 94px/, 'the profile should sit closer to the hero ticker');
assert.match(css, /@keyframes ledger-settle/, 'the academic ledger should settle into place');
assert.match(css, /@keyframes orbit-unfurl/, 'the skills composition should unfurl instead of using a generic fade');
assert.match(css, /\.skill-composition\[data-reveal="orbit-in"\]\.is-visible \.skill-group:nth-child\(4\)\s*\{\s*transition-delay:\s*\.31s/, 'skill groups should enter in a staggered sequence');
assert.match(css, /@keyframes window-land/, 'the project preview should land with a slight rotation');
assert.match(css, /\.agrisync-project-card:hover \.agri-screen-4/, 'AgriSync app preview screens should respond with a distinct hover motion');
assert.match(css, /\.agrisync-project-card\s*\{[^}]*min-height:\s*390px/, 'the featured app card should have enough height to show its screens cleanly');
assert.match(css, /@keyframes app-screen-drift/, 'the app screen showcase should use its own gentle motion');
assert.match(css, /\.project-mini-card:nth-child\(4\)\s*\{[^}]*--mini-bg:\s*#125c38;[^}]*--mini-accent:\s*#a4e3b6/, 'the other cards should share the app showcase mood while keeping their own color identities');
assert.match(css, /@keyframes mini-card-sheen/, 'project cards should have a restrained directional hover animation');
assert.match(css, /\.project-section\s*\{[^}]*grid-auto-rows:\s*max-content;[^}]*column-gap:\s*8%;[^}]*row-gap:\s*clamp\(32px,5vw,64px\)/, 'project rows should include their full content and spacing instead of clipping the featured card');
assert.match(css, /\.project-gallery\s*\{\s*display:\s*grid/, 'project screenshots should have a responsive gallery layout');
assert.match(css, /@keyframes dialog-arrive/, 'the project dialog should use a custom entrance motion');
assert.match(css, /prefers-reduced-motion:\s*reduce/, 'motion should respect reduced-motion preferences');
assert.match(css, /@media\s*\(max-width:\s*760px\)/, 'the layout should include a phone breakpoint');
assert.match(css, /@media\s*\(max-width:\s*500px\)\s*\{\s*\.project-mini-grid\s*\{\s*grid-template-columns:\s*1fr/, 'project cards should use a readable single-column layout on narrow phones');
assert.match(css, /@media\s*\(max-width:\s*380px\)[\s\S]*?\.hero-art\s*\{\s*margin-right:\s*0;\s*margin-left:\s*0;/, 'the hero collage should stay inside very narrow phone screens');
assert.match(css, /\.experience-stamp\s*\{\s*position:\s*static/, 'the decorative experience stamp should flow below the text on phones');
assert.match(css, /@media\s*\(max-width:\s*1050px\)/, 'the layout should include a tablet breakpoint');
assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.certificate-grid\s*\{[^}]*grid-template-columns:\s*1fr/, 'certificate cards should stack at phone width');
assert.match(css, /body\s*\{[^}]*overflow-x:\s*clip/, 'animated content should not create horizontal page scrolling');
assert.match(js, /aria-expanded/, 'the mobile menu should expose its expanded state');
assert.match(js, /mark-cv-theme/, 'the selected color theme should persist across visits');
assert.match(js, /themeSwitch\?\.addEventListener\('click'/, 'the lamp control should toggle between light and dark modes');
assert.match(js, /projectDialog\.showModal\(\)/, 'project cards should open the accessible native dialog');
assert.match(js, /document\.querySelectorAll\('\[data-project-id\]'\)/, 'all project cards should share the detail dialog interaction');
assert.match(js, /event\.key === 'Escape'/, 'dialogs should remain keyboard-dismissable with Escape');
assert.match(js, /IntersectionObserver/, 'scroll reveals and active navigation should use observers');
assert.match(js, /prefers-reduced-motion/, 'animation setup should check the motion preference');

console.log('PASS: CV facts, project and certificate assets, navigation, motion, accessibility, and responsive layout');
