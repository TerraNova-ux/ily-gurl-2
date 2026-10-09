const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const checks = [
  // Structure
  ['DOCTYPE',                    html.includes('<!DOCTYPE html>')],
  ['lang=en',                    html.includes('lang="en"')],
  ['viewport + viewport-fit',    html.includes('viewport-fit=cover')],
  ['safe-area-inset',            html.includes('safe-area-inset')],

  // All 7 scenes preserved
  ['scene-open',                 html.includes('id="scene-open"')],
  ['scene-reveal',               html.includes('id="scene-reveal"')],
  ['card-experience',            html.includes('id="card-experience"')],
  ['scene-message',              html.includes('id="scene-message"')],
  ['scene-memories',             html.includes('id="scene-memories"')],
  ['scene-letter',               html.includes('id="scene-letter"')],
  ['scene-song',                 html.includes('id="scene-song"')],
  ['scene-final',                html.includes('id="scene-final"')],

  // Animation additions
  ['layered envelope (env-svg)', html.includes('class="env-svg"')],
  ['flap group',                 html.includes('env-flap-group')],
  ['seal group',                 html.includes('env-seal-group')],
  ['letter group',               html.includes('env-letter-group')],
  ['anim-flapOpen keyframe',     html.includes('anim-flapOpen')],
  ['anim-sealFade keyframe',     html.includes('anim-sealFade')],
  ['anim-letterRise keyframe',   html.includes('anim-letterRise')],
  ['envelope-opening class',     html.includes('envelope-opening')],
  ['IntersectionObserver scroll',html.includes('IntersectionObserver')],
  ['polaroid stagger --delay',   html.includes('--delay')],
  ['in-view class',              html.includes('.in-view')],
  ['anim-fadeUp keyframe',       html.includes('anim-fadeUp')],

  // Visual polish
  ['clamp() fluid type',         (html.match(/clamp\(/g)||[]).length > 15],
  ['focus-visible states',       html.includes(':focus-visible')],
  ['gold gradient rule',         html.includes('linear-gradient(90deg, transparent, var(--gold)')],
  ['polaroid shimmer',           html.includes('anim-shimmer')],
  ['backdrop-filter',            html.includes('backdrop-filter')],
  ['paper texture SVG',          html.includes('fractalNoise')],

  // Photo upload
  ['file upload controls',       html.includes('input-file-hidden')],
  ['file type validation',       html.includes("image/jpeg,image/png,image/webp,image/gif")],
  ['file size validation (4MB)', html.includes('4 * 1024 * 1024')],
  ['preview thumb',              html.includes('photo-preview-thumb')],
  ['upload error display',       html.includes('upload-error')],
  ['FileReader readAsDataURL',   html.includes('readAsDataURL')],
  ['imgData in memories',        html.includes('imgData')],

  // Editor fields — all preserved
  ['ed-recipient',               html.includes('id="ed-recipient"')],
  ['ed-sender',                  html.includes('id="ed-sender"')],
  ['ed-open-text',               html.includes('id="ed-open-text"')],
  ['ed-salutation',              html.includes('id="ed-salutation"')],
  ['ed-message',                 html.includes('id="ed-message"')],
  ['ed-letter',                  html.includes('id="ed-letter"')],
  ['ed-letter-sign',             html.includes('id="ed-letter-sign"')],
  ['ed-song-title',              html.includes('id="ed-song-title"')],
  ['ed-song-artist',             html.includes('id="ed-song-artist"')],
  ['ed-song-url',                html.includes('id="ed-song-url"')],
  ['ed-final-quote',             html.includes('id="ed-final-quote"')],
  ['ed-final-love',              html.includes('id="ed-final-love"')],

  // Save status & sharing
  ['save-status indicator',      html.includes('id="save-status"')],
  ['share-url-wrap',             html.includes('id="share-url-wrap"')],
  ['local-only caveat',          html.includes('Local-only link') || html.includes('local-only')],
  ['no fake backend claim',      !html.includes('public share') && !html.includes('shareable link')],

  // Data & persistence
  ['DEFAULT_TEMPLATE',           html.includes('DEFAULT_TEMPLATE')],
  ['Storage object',             html.includes('const Storage')],
  ['saveCard fn',                html.includes('function saveCard')],
  ['loadCard fn',                html.includes('function loadCard')],
  ['buildCardUrl fn',            html.includes('function buildCardUrl')],
  ['mergeData fn',               html.includes('function mergeData')],
  ['activeCardId reuse',         html.includes('activeCardId')],
  ['render fn',                  html.includes('function render()')],

  // Audio — all preserved
  ['audio element',              html.includes('<audio')],
  ['no autoplay attr',           !html.includes(' autoplay')],
  ['btn-play-pause',             html.includes('id="btn-play-pause"')],
  ['song-fill progress',         html.includes('id="song-fill"')],
  ['seek on progress click',     html.includes('audio.currentTime = ')],
  ['song-no-audio fallback',     html.includes('id="song-no-audio"')],

  // Replay
  ['btn-replay',                 html.includes('id="btn-replay"')],
  ['replay resets letterOpened', html.includes('letterOpened = false')],
  ['replay removes in-view',     html.includes("classList.remove('in-view')")],
  ['replay resets envelope CSS', html.includes("classList.remove('envelope-opening')")],
  ['particlesActive flag',       html.includes('particlesActive')],
  ['particle pause on hide',     html.includes('particlesActive = false')],
  ['particle restart on replay', html.includes('particlesActive = true')],

  // Accessibility
  ['aria-label count > 12',      (html.match(/aria-label/g)||[]).length > 12],
  ['aria-live polite',           html.includes('aria-live="polite"')],
  ['aria-pressed on play',       html.includes('aria-pressed')],
  ['role=dialog on editor',      html.includes('role="dialog"')],
  ['visually-hidden util',       html.includes('visually-hidden')],

  // Performance / responsive
  ['lazy-load img (JS)',         html.includes("img.loading = 'lazy'")],
  ['reduced-motion override',    html.includes('prefers-reduced-motion')],
  ['reduced-motion opacity:1 fallback', html.includes('opacity: 1 !important')],
  ['no horizontal overflow',     html.includes('overflow-x: hidden')],
  ['min touch target 44px',      (html.match(/min-height: 44px/g)||[]).length > 5],
  ['dvh unit',                   html.includes('dvh')],

  // No unnecessary deps
  ['no external JS libs',        !html.includes('<script src="http') && !html.includes('jquery') && !html.includes('react')],
];

let pass = 0, fail = 0;
const failures = [];
checks.forEach(([name, ok]) => {
  if (ok) { console.log('  \u2713', name); pass++; }
  else    { console.log('  \u2717 FAIL:', name); fail++; failures.push(name); }
});

console.log('\n' + ('─'.repeat(52)));
if (failures.length) {
  console.log('FAILED:', failures.join(', '));
  console.log('');
}
console.log('Result:', pass + '/' + checks.length, 'passed' + (fail ? ' (' + fail + ' FAILED)' : ' — all good'));
console.log('File size:', (html.length / 1024).toFixed(1), 'KB');

