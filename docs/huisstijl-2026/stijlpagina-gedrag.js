/* Referentie-JS uit de stijlpagina: productloop (10 s), berglijn tekenen, curve-demo, kopieerknop.
   Niet direct importeren: zet de productloop om naar een component. */

(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Productloop, 10 s: melding komt binnen, systeem leest, meter stopt onder de drempel, naar jou. */
  (function () {
    var row = document.getElementById('d-row'), soort = document.getElementById('d-soort'), status = document.getElementById('d-status');
    var herk = document.getElementById('d-herk'), fill = document.getElementById('d-fill'), pct = document.getElementById('d-pct');
    var callout = document.getElementById('d-callout'), actions = document.getElementById('d-actions'), detail = document.getElementById('d-detail');
    var toggle = document.getElementById('d-toggle');
    if (!row || !toggle) return;
    var timers = [], raf = 0, playing = !reduce;
    function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
    function stop() { timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf); }
    function setStatus(cls, txt) { status.className = 'status' + (cls ? ' ' + cls : ''); status.textContent = txt; }
    function setHerk(txt, reading) { herk.textContent = txt; herk.classList.toggle('reading', !!reading); }
    function countTo(target, dur) {
      var t0 = performance.now();
      cancelAnimationFrame(raf);
      (function step(now) {
        var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        pct.textContent = Math.round(target * e);
        if (k < 1) raf = requestAnimationFrame(step);
      })(t0);
    }
    function finalState() {
      stop();
      fill.classList.remove('anim'); fill.style.width = '64%'; pct.textContent = '64';
      setHerk('Geelpoothoornaar'); soort.textContent = 'Onzeker'; setStatus('warn', 'Naar jou');
      callout.classList.remove('hide'); actions.classList.remove('hide'); row.classList.remove('off'); detail.classList.remove('dim');
    }
    function cycle() {
      stop();
      fill.classList.remove('anim'); fill.style.width = '0%'; pct.textContent = '0';
      setHerk('wacht', true); soort.textContent = '…'; setStatus('', 'Nieuw');
      callout.classList.add('hide'); actions.classList.add('hide'); row.classList.add('off'); detail.classList.remove('dim');
      void fill.offsetWidth;
      at(300, function () { row.classList.remove('off'); });
      at(900, function () { setStatus('busy', 'Leest'); setHerk('foto 1 van 2', true); });
      at(1700, function () { setHerk('foto 2 van 2', true); fill.classList.add('anim'); fill.style.width = '64%'; countTo(64, 2200); });
      at(3900, function () { setHerk('Geelpoothoornaar'); soort.textContent = 'Onzeker'; });
      at(4300, function () { setStatus('warn', 'Naar jou'); callout.classList.remove('hide'); });
      at(4700, function () { actions.classList.remove('hide'); });
      at(9400, function () { detail.classList.add('dim'); row.classList.add('off'); });
      at(10000, cycle);
    }
    function setPlaying(p) {
      playing = p;
      toggle.textContent = p ? 'Pauzeer' : 'Speel af';
      toggle.setAttribute('aria-pressed', String(!p));
      if (p) cycle(); else finalState();
    }
    toggle.addEventListener('click', function () { setPlaying(!playing); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) finalState(); else if (playing) cycle();
    });
    setPlaying(playing);
  })();

  /* Berglijn: tekent zich één keer als de grafiek in beeld komt; knop speelt hem opnieuw af. */
  (function () {
    var m = document.getElementById('motif'), btnR = document.getElementById('motif-replay');
    if (!m) return;
    function draw() { m.classList.remove('drawing'); void m.getBoundingClientRect(); m.classList.add('drawing'); }
    if (btnR) btnR.addEventListener('click', draw);
    if (reduce || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { draw(); io.disconnect(); }
    }, { threshold: .6 });
    io.observe(m);
  })();

  /* Curve-demo */
  (function () {
    var d = document.getElementById('ease-demo'), p = document.getElementById('ease-play');
    if (!d || !p) return;
    p.addEventListener('click', function () { d.classList.remove('go'); void d.offsetWidth; d.classList.add('go'); });
  })();

  var btn = document.getElementById('copy-brief'), pre = document.getElementById('brief-text');
  btn.addEventListener('click', function () {
    var text = pre.innerText;
    var done = function () { btn.textContent = 'Gekopieerd'; setTimeout(function () { btn.textContent = 'Kopieer'; }, 1800); };
    var fallback = function () {
      var r = document.createRange(); r.selectNodeContents(pre);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      btn.textContent = 'Geselecteerd, druk ⌘C';
    };
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
  });
})();
