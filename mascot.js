(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 760px)');
  const shell = document.createElement('div');
  shell.className = 'sunny-shell';
  shell.innerHTML = `<div class="sunny-position" hidden><span class="sunny-bubble" aria-hidden="true"></span><button class="sunny-avatar" type="button" aria-label="Play with Sunny, the sunshine mascot"><svg viewBox="0 0 120 128" aria-hidden="true" focusable="false"><ellipse class="sunny-shadow" cx="60" cy="119" rx="27" ry="4"/><g class="sunny-character"><g class="sunny-legs" fill="none" stroke="#252521" stroke-width="5" stroke-linecap="round"><path d="M47 96v16l-8 3"/><path d="M73 96v16l8 3"/></g><g fill="none" stroke="#252521" stroke-width="4" stroke-linecap="round"><path class="sunny-arm-left" d="M27 68L16 78l-7-3"/><path class="sunny-arm-right" d="M93 68l11 10 7-3"/></g><path class="sunny-rays" fill="#ffce29" stroke="#252521" stroke-width="1.8" stroke-linejoin="round" d="M60 6l9 15 16-8 3 18 18 2-6 17 14 11-14 12 6 17-18 2-3 18-16-8-9 15-9-15-16 8-3-18-18-2 6-17L6 61l14-11-6-17 18-2 3-18 16 8z"/><circle cx="60" cy="61" r="35" fill="#ffdf57"/><ellipse cx="35" cy="73" rx="7" ry="4" fill="#ed5543" opacity=".8"/><ellipse cx="85" cy="73" rx="7" ry="4" fill="#ed5543" opacity=".8"/><g class="sunny-brows" stroke="#252521" stroke-width="2.5" stroke-linecap="round" fill="none"><path d="M40 43l10-2"/><path d="M70 41l10 2"/></g><g class="sunny-eyes"><ellipse cx="46" cy="58" rx="8" ry="11" fill="#fffbee"/><ellipse cx="74" cy="58" rx="8" ry="11" fill="#fffbee"/><g class="sunny-pupils"><ellipse cx="47" cy="60" rx="4" ry="6" fill="#252521"/><ellipse cx="75" cy="60" rx="4" ry="6" fill="#252521"/><circle cx="48" cy="58" r="1.3" fill="white"/><circle cx="76" cy="58" r="1.3" fill="white"/></g></g><path class="sunny-mouth sunny-mouth-smile" d="M49 77q11 12 22 0" fill="none" stroke="#252521" stroke-width="3" stroke-linecap="round"/><ellipse class="sunny-mouth sunny-mouth-o" cx="60" cy="80" rx="5" ry="7" fill="#252521"/><path class="sunny-mouth sunny-mouth-grin" d="M47 76h26q-2 17-13 17T47 76" fill="#252521"/><path class="sunny-mouth sunny-mouth-think" d="M55 81h10" stroke="#252521" stroke-width="3" stroke-linecap="round"/><path class="sunny-sleep-eyes" d="M39 58q7 6 14 0m14 0q7 6 14 0" fill="none" stroke="#252521" stroke-width="3" stroke-linecap="round"/></g></svg><span class="sunny-zzz" aria-hidden="true">z z Z</span></button></div><button type="button" class="sunny-toggle" aria-pressed="false" aria-controls="sunny-character">Hide Sunny <span aria-hidden="true">✳</span></button>`;
  document.body.append(shell);
  const position = shell.querySelector('.sunny-position');
  position.id = 'sunny-character';
  const avatar = shell.querySelector('.sunny-avatar');
  const toggle = shell.querySelector('.sunny-toggle');
  const bubble = shell.querySelector('.sunny-bubble');
  const pupils = shell.querySelector('.sunny-pupils');
  let hidden = false;
  try { hidden = localStorage.getItem('portfolio-sunny-hidden') === 'yes'; } catch {}
  let frame = 0, layoutTimer = 0, idleTimer = 0, bubbleTimer = 0, actionTimer = 0;
  let lastHop = 0, lastScroll = window.scrollY, lastAction = 0;
  let currentMood = 'happy', currentSection = 'home', interactiveUntil = 0;
  let lastSpot = null;
  let introPending = true, introRunning = false;
  let introAnimations = [];
  let scrollTime = performance.now(), zoomTimer = 0, bumpTimer = 0;
  let zooming = false, scrollDirection = 'up';
  function stopZoom() {
    clearTimeout(zoomTimer); clearTimeout(bumpTimer);
    zooming = false;
    position.classList.remove('sunny-zooming', 'sunny-bumping');
    avatar.classList.remove('sunny-bump');
  }
  function zoomScroll(delta, elapsed) {
    if (hidden || motion.matches || document.hidden) { stopZoom(); return; }
    // Velocity catches trackpads and touch scrolls, not just large wheel ticks.
    const fast = Math.abs(delta) >= 18 && Math.abs(delta) / Math.max(8, elapsed) > 1.1;
    if (fast) {
      clearTimeout(bumpTimer);
      avatar.classList.remove('sunny-hop', 'sunny-spin', 'sunny-wave', 'sunny-bump');
      position.classList.remove('sunny-bumping');
      bubble.classList.remove('is-visible');
      scrollDirection = delta > 0 ? 'up' : 'down';
      position.dataset.flight = scrollDirection;
      position.classList.add('sunny-zooming');
      zooming = true;
      interactiveUntil = performance.now() + 1000;
      setMood('excited');
    }
    if (!zooming) return;
    clearTimeout(zoomTimer);
    zoomTimer = setTimeout(() => {
      zooming = false;
      position.classList.remove('sunny-zooming');
      // The nearest safe landing spot is our imaginary ceiling or floor.
      place();
      if (hidden || motion.matches || document.hidden || position.classList.contains('is-tucked')) return;
      position.classList.add('sunny-bumping');
      avatar.classList.remove('sunny-hop', 'sunny-spin', 'sunny-wave', 'sunny-bump');
      void avatar.offsetWidth;
      avatar.classList.add('sunny-bump');
      interactiveUntil = performance.now() + 680;
      setMood('surprised');
      bumpTimer = setTimeout(() => {
        avatar.classList.remove('sunny-bump');
        position.classList.remove('sunny-bumping');
        interactiveUntil = 0;
        setMood(currentMood); resetIdle();
      }, 680);
    }, 150);
  }
  function cancelIntro() {
    introPending = false;
    introRunning = false;
    introAnimations.forEach(animation => { animation.onfinish = null; animation.cancel(); });
    introAnimations = [];
    position.classList.remove('sunny-intro');
  }
  function startIntro() {
    if (!introPending) return;
    const star = document.querySelector('.hero-sticker');
    const rect = star && star.getBoundingClientRect();
    // A restored scroll position or deep link should not pull Sunny back to the hero.
    if (hidden || motion.matches || document.hidden || !rect || rect.bottom < 80 || rect.top > window.innerHeight || typeof position.animate !== 'function') {
      cancelIntro(); showState(); return;
    }
    introPending = false;
    position.hidden = false;
    position.classList.add('sunny-intro');
    place();
    if (!lastSpot || position.classList.contains('is-tucked')) {
      cancelIntro(); showState(); return;
    }
    introRunning = true;
    bubble.classList.remove('is-visible');
    clearTimeout(bubbleTimer);
    clearTimeout(idleTimer);
    setMood('excited');
    const width = compact.matches ? 55 : 88;
    const height = compact.matches ? 59 : 94;
    const start = {
      x: rect.left + rect.width / 2 - width / 2,
      y: rect.top + rect.height / 2 - height / 2
    };
    const landing = { ...lastSpot };
    const peakY = Math.max(88, Math.min(start.y, landing.y) - 70);
    const pose = (x, y, scale, angle) => `translate3d(${x}px,${y}px,0) scale(${scale}) rotate(${angle}deg)`;
    const starPose = getComputedStyle(star).transform;
    const pulse = star.animate([
      { transform: starPose },
      { transform: `${starPose} scale(.92)`, offset: .3 },
      { transform: `${starPose} scale(1.12)`, offset: .65 },
      { transform: starPose }
    ], { duration: 600, easing: 'ease-in-out' });
    const entrance = position.animate([
      { transform: pose(start.x, start.y, 0, -20), opacity: 0, offset: 0 },
      { transform: pose(start.x, start.y, .06, -20), opacity: 0, offset: .18 },
      { transform: pose(start.x, start.y - 20, .75, -12), opacity: 1, offset: .38 },
      { transform: pose((start.x + landing.x) / 2, peakY, 1.1, 10), opacity: 1, offset: .65 },
      { transform: pose(landing.x, landing.y + 4, .94, -4), opacity: 1, offset: .86 },
      { transform: pose(landing.x, landing.y, 1, 0), opacity: 1, offset: 1 }
    ], { duration: 1450, easing: 'cubic-bezier(.22,.7,.3,1)' });
    introAnimations = [pulse, entrance];
    entrance.onfinish = () => {
      introAnimations = [];
      introRunning = false;
      position.classList.remove('sunny-intro');
      setMood(currentMood);
      say('Hi, I’m Sunny!');
      act('wave');
      resetIdle();
      place();
    };
  }
  const visited = new Set();
  const chapters = [
    ['home', 'happy', 'Hi, I’m Sunny!'],
    ['work', 'proud', 'Built for people.'],
    ['about', 'curious', 'What if…?'],
    ['play', 'excited', 'Ooh, projects!'],
    ['experience', 'thinking', 'Always learning.'],
    ['contact', 'wave', 'Say hello?']
  ].map(([id, mood, greeting]) => ({node: document.getElementById(id), id, mood, greeting}));
  const setMood = mood => { avatar.dataset.mood = mood; };
  function say(text) {
    if (motion.matches || hidden) return;
    bubble.textContent = text;
    bubble.classList.add('is-visible');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove('is-visible'), 2300);
  }
  function act(action) {
    if (motion.matches || hidden || document.hidden || zooming || position.classList.contains('sunny-bumping')) return;
    if (performance.now() - lastAction < 500) return;
    lastAction = performance.now();
    avatar.classList.remove('sunny-hop', 'sunny-spin', 'sunny-wave');
    // Trigger only a short action, rather than continuously animating on scroll.
    void avatar.offsetWidth;
    avatar.classList.add(`sunny-${action}`);
    clearTimeout(actionTimer);
    actionTimer = setTimeout(() => avatar.classList.remove('sunny-hop', 'sunny-spin', 'sunny-wave'), 850);
  }
  function resetIdle() {
    clearTimeout(idleTimer);
    if (interactiveUntil < performance.now()) setMood(currentMood);
    if (!motion.matches && !hidden && !document.hidden) idleTimer = setTimeout(() => setMood('sleepy'), 14000);
  }
  const overlaps = (a,b) => a.x < b.right+5 && a.x+a.size > b.left-5 && a.y < b.bottom+5 && a.y+a.size > b.top-5;
  function place() {
    if (hidden || document.hidden || introPending || introRunning) return;
    const w = window.innerWidth, h = window.innerHeight;
    const size = compact.matches ? 59 : 94;
    const top = 105, bottom = h - size - 60;
    const blocked = [...document.querySelectorAll('main h1, main h2, main h3, main h4, main p, main a, main summary, main .kicker, main .art-caption, main .section-label, main .institution-logo, header, .paper, .resume-card')]
      .map(node => node.getBoundingClientRect()).filter(rect => rect.bottom > top && rect.top < h && rect.width && rect.height);
    const chapter = [...chapters].reverse().find(ch => ch.node.getBoundingClientRect().top < h*.45) || chapters[0];
    if (chapter.id !== currentSection || !visited.has(chapter.id)) {
      currentSection = chapter.id;
      currentMood = chapter.mood;
      if (interactiveUntil < performance.now()) setMood(currentMood);
      if (!visited.has(chapter.id)) { visited.add(chapter.id); say(chapter.greeting); }
      if (chapter.id === 'contact') act('wave');
    }
    const phase = (window.scrollY % 850) / 850;
    const desired = top + Math.max(0, bottom-top) * (.2+phase*.5);
    const xs = [w-size-9, 9];
    // The gutters are preferred. On narrow screens, use an available gap.
    if (compact.matches) xs.push(w*.55-size/2);
    const candidates = [];
    for (const x of xs) for (let y=top; y<=bottom; y+=22) {
      const spot={x,y,size};
      if (!blocked.some(rect=>overlaps(spot,rect))) candidates.push(spot);
    }
    candidates.sort((a,b)=>(Math.abs(a.y-desired)+(a.x===xs[0]?0:90))-(Math.abs(b.y-desired)+(b.x===xs[0]?0:90)));
    let spot = candidates[0];
    if (lastSpot && lastSpot.x+size<w && lastSpot.y<=bottom && !blocked.some(rect=>overlaps({...lastSpot,size},rect))) {
      if (!spot || Math.abs(lastSpot.y-desired)<85) spot={...lastSpot,size};
    }
    // Tuck away while menus are open or no clear landing space exists.
    const tucked = !spot || !!document.querySelector('#nav.open');
    position.classList.toggle('is-tucked', tucked);
    if (tucked) { position.inert = true; return; }
    position.inert = false;
    position.dataset.edge = spot.x < 100 ? "left" : "right";
    const moved = lastSpot && (Math.abs(lastSpot.x-spot.x)>5 || Math.abs(lastSpot.y-spot.y)>25);
    position.style.transform=`translate3d(${Math.round(spot.x)}px,${Math.round(spot.y)}px,0)`;
    if (moved && performance.now()-lastHop>950) { lastHop=performance.now(); act('hop'); }
    lastSpot=spot;
  }
  function schedule() {
    if (hidden || motion.matches) return;
    if (layoutTimer) return;
    layoutTimer=setTimeout(()=>{layoutTimer=0;frame=requestAnimationFrame(place);},100);
  }
  function showState() {
    position.hidden=hidden || introPending;
    toggle.setAttribute('aria-pressed',String(hidden));
    toggle.firstChild.textContent=hidden?'Show Sunny ':'Hide Sunny ';
    clearTimeout(idleTimer);
    if (!hidden && !introPending) {
      setMood('happy');
      if (motion.matches) {
        // A stationary mascot in a reserved corner; no scroll or pointer motion.
        position.classList.remove('is-tucked');position.inert=false;
        position.style.transform=`translate3d(${Math.max(6,window.innerWidth-(compact.matches?55:88)-9)}px,${Math.max(105,window.innerHeight-(compact.matches?55:88)-65)}px,0)`;
      } else { place();resetIdle(); }
    }
  }
  toggle.addEventListener('click',()=>{
    hidden=!hidden;
    stopZoom();
    cancelIntro();
    try {localStorage.setItem('portfolio-sunny-hidden',hidden?'yes':'no');} catch {}
    showState();
  });
  avatar.addEventListener('click',()=>{
    stopZoom();interactiveUntil=performance.now()+2200;
    setMood('excited');act(Math.random()>.5?'spin':'hop');say('Hello, human!');
    resetIdle();
    setTimeout(()=>{if(!hidden){setMood(currentMood);resetIdle();}},2300);
  });
  avatar.addEventListener('pointerenter',()=>{if(!motion.matches && !zooming && !position.classList.contains('sunny-bumping')){interactiveUntil=performance.now()+2000;setMood('wave');act('wave');resetIdle();}});
  avatar.addEventListener('pointerleave',()=>{if(!zooming && !position.classList.contains('sunny-bumping')){interactiveUntil=0;setMood(currentMood);}});
  window.addEventListener('scroll',()=>{
    if (introRunning || introPending) { cancelIntro(); showState(); }
    const now=performance.now();
    const delta=window.scrollY-lastScroll;
    const elapsed=now-scrollTime;lastScroll=window.scrollY;scrollTime=now;
    zoomScroll(delta,elapsed);
    resetIdle();schedule();
  },{passive:true});
  window.addEventListener('resize',()=>{stopZoom();if(introRunning){cancelIntro();showState();}lastSpot=null;motion.matches?showState():schedule();},{passive:true});
  let pointerFrame=0;
  window.addEventListener('pointermove',event=>{
    if(hidden||motion.matches||compact.matches||pointerFrame||position.classList.contains('is-tucked'))return;
    const px=event.clientX,py=event.clientY;
    pointerFrame=requestAnimationFrame(()=>{
      pointerFrame=0;const r=avatar.getBoundingClientRect();
      pupils.style.transform=`translate(${Math.max(-3,Math.min(3,(px-r.left-r.width/2)/80))}px,${Math.max(-2,Math.min(2,(py-r.top-r.height/2)/100))}px)`;
    });
  },{passive:true});
  motion.addEventListener('change',()=>{stopZoom();cancelIntro();pupils.style.transform='';bubble.classList.remove('is-visible');avatar.classList.remove('sunny-hop','sunny-spin','sunny-wave');lastSpot=null;showState();});
  compact.addEventListener('change',()=>{stopZoom();lastSpot=null;showState();});
  document.addEventListener('visibilitychange',()=>{clearTimeout(idleTimer);if(document.hidden){stopZoom();if(introRunning){cancelIntro();}cancelAnimationFrame(frame);cancelAnimationFrame(pointerFrame);pointerFrame=0;}else{showState();}});
  document.querySelector('header').addEventListener('click',()=>requestAnimationFrame(()=>{if(!motion.matches)place();}));
  showState();
  // Wait for load and typography so the launch origin matches the visible star.
  const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
  Promise.all([loaded, document.fonts ? document.fonts.ready : Promise.resolve()]).then(startIntro);
})();
