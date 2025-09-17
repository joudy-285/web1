

document.addEventListener('DOMContentLoaded', () => {
    
    const imgBase = 'assetes/img/';
    const events = [
      { id:'music', title:'حفلة موسيقية', date:'2025-09-20', time:'19:00', location:'ساحة المدينة', category:'موسيقى', short:'حفلة موسيقية مع فرق محلية', full:'تفاصيل المهرجان، البرامج، التعليمات.', images:[imgBase + 'حفلة_موسيقية.jpg'], featured:true },
      { id:'run', title:'سباق الجري', date:'2025-09-22', time:'08:00', location:'واجهة النهر', category:'رياضة', short:'سباق جري لعشّاق اللياقة', full:'مسارات متعددة، فئات عمرية مختلفة.', images:[imgBase + 'الجري.jpg'], featured:true },
      { id:'cycling', title:'سباق دراجات', date:'2025-09-25', time:'07:30', location:'حلبة المدينة', category:'رياضة', short:'سباق دراجات هوائية شيّق', full:'تفاصيل السباق ونقاط الانطلاق.', images:[imgBase + 'سباق_دراجات.jpg'], featured:false },
      { id:'reading', title:'فعالية قراءة', date:'2025-09-18', time:'11:00', location:'المكتبة العامة', category:'ثقافة', short:'جلسة قراءة وكتب جديدة', full:'نقاشات وكتب مقترحة.', images:[imgBase + 'قراءة.jpg'], featured:false },
      { id:'writing', title:'ورشة كتابة', date:'2025-09-19', time:'16:00', location:'مركز الثقافة', category:'ثقافة', short:'تطوير مهارات الكتابة', full:'تمارين عملية ونقاشات.', images:[imgBase + 'كتابة.jpg'], featured:false },
      { id:'poetry', title:'أمسية شعر عربي', date:'2025-09-21', time:'18:30', location:'بيت الشعر', category:'ثقافة', short:'قراءات من الشعر العربي', full:'مشاركات من شعراء محليين.', images:[imgBase + 'الشعر_العربي.jpg'], featured:false },
      { id:'balloon', title:'رحلة منطاد', date:'2025-09-23', time:'06:00', location:'السهول', category:'مغامرة', short:'تجربة منطاد رائعة', full:'انطلاق صباحي ورؤية بانورامية.', images:[imgBase + 'المنطاد.jpg'], featured:false },
      { id:'carnival', title:'كرنفال', date:'2025-09-26', time:'17:00', location:'الحديقة الكبرى', category:'عائلي', short:'ألعاب وعروض لجميع الأعمار', full:'مفاجآت وجوائز.', images:[imgBase + 'كرنفال.jpg'], featured:false },
      { id:'skate', title:'مسابقة تزلج', date:'2025-09-27', time:'15:00', location:'ساحة الشباب', category:'رياضة', short:'مهارات وتحديات التزلج', full:'جوائز للفائزين.', images:[imgBase + 'مسابقة_تزلج.jpg'], featured:false },
      { id:'cars', title:'معرض سيارات', date:'2025-09-29', time:'10:00', location:'المعرض الدولي', category:'معارض', short:'أحدث الموديلات والعروض', full:'تجارب قيادة.', images:[imgBase + 'معرض_سيارات.jpg'], featured:false },
      { id:'art', title:'معرض لوحات', date:'2025-09-28', time:'14:00', location:'قاعة الفنون', category:'فن', short:'لوحات لفنانين محليين', full:'جولات مع الفنانين.', images:[imgBase + 'معرض_لوحات.jpg'], featured:false },
      { id:'musicexpo', title:'معرض موسيقى', date:'2025-09-30', time:'12:00', location:'المسرح الثقافي', category:'موسيقى', short:'آلات وإيقاعات', full:'ورش وتجارب.', images:[imgBase + 'معرض_موسيقا.jpg'], featured:false }
    ];
  
    // ----- Helpers -----
    const $ = s => document.querySelector(s);
    const $$ = s => Array.from(document.querySelectorAll(s));
    function escapeHtml(s=''){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }
    // reveal-on-scroll
    const revealObserver = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('reveal-visible'); revealObserver.unobserve(en.target); } });
    }, {threshold: 0.14});
    function observeReveals(root=document){ root.querySelectorAll('.reveal').forEach(el=> revealObserver.observe(el)); }
  
    // اعرض السنة في الفوتر إن وُجد العنصر
    const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // ---- إعداد المودال العام لتفاصيل الفعالية ----
    const eventModalEl = $('#eventModal'); const eventModal = eventModalEl ? new bootstrap.Modal(eventModalEl) : null;
    function openEventModalById(id){
      const e = events.find(x=>x.id===id); if(!e || !eventModalEl) return;
      const container = eventModalEl.querySelector('.modal-content');
      container.innerHTML = `
        <div class="modal-header">
          <h5 class="modal-title">${escapeHtml(e.title)}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <img src="${e.images[0]}" class="img-fluid rounded mb-3" alt="${escapeHtml(e.title)}">
          <p class="text-muted-small">${e.date} — ${e.time} • ${e.location} • <span class="badge bg-info">${e.category}</span></p>
          <p>${escapeHtml(e.full)}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-primary" id="modalAddCal">أضف للتقويم</button>
            <button class="btn btn-outline-secondary" id="modalShare">شارك</button>
          </div>
        </div>
      `;
      // أزرار داخل المودال
      setTimeout(()=>{
        $('#modalAddCal')?.addEventListener('click', ()=> downloadICS(e));
        $('#modalShare')?.addEventListener('click', ()=> shareEvent(e));
      },50);
      eventModal.show();
    }
  
    // ---- Download ICS ----
    function pad(n){return String(n).padStart(2,'0')}
    function formatDateICSFromLocal(dateStr, timeStr='09:00'){
      // dateStr: YYYY-MM-DD, timeStr: HH:MM
      const dt = new Date(`${dateStr}T${timeStr}:00`);
      const Y = dt.getUTCFullYear(), M = pad(dt.getUTCMonth()+1), D = pad(dt.getUTCDate());
      const h = pad(dt.getUTCHours()), m = pad(dt.getUTCMinutes()), s = pad(dt.getUTCSeconds());
      return `${Y}${M}${D}T${h}${m}${s}Z`;
    }
    function downloadICS(e){
      const uid = 'ev-' + e.id + '@events-guide';
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//EventsGuide//EN',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${formatDateICSFromLocal(new Date().toISOString().slice(0,10),'09:00')}`,
        `DTSTART:${formatDateICSFromLocal(e.date,e.time||'09:00')}`,
        `SUMMARY:${e.title}`,
        `DESCRIPTION:${e.short}`,
        `LOCATION:${e.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const blob = new Blob([ics], {type:'text/calendar;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `${e.title.replace(/\s+/g,'_')}.ics`;
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
      showAlert('تم تنزيل ملف التقويم (.ics)', 'success');
    }
  
    // ---- مشاركة ----
    function shareEvent(e){
      const text = `${e.title} — ${e.date} — ${e.location}`;
      if (navigator.share) {
        navigator.share({title:e.title,text,url:location.href}).catch(()=>{});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(()=> showAlert('تم نسخ تفاصيل الفعالية للحافظة','success')).catch(()=> showAlert('فشل النسخ','danger'));
      } else showAlert('مشاركة غير متاحة','warning');
    }
  
    // ---- Alerts ----
    function showAlert(msg, type='info', timeout=3500){
      const holder = $('#alertHolder') || document.body;
      const id = 'a' + Date.now();
      const wrap = document.createElement('div');
      wrap.innerHTML = `<div id="${id}" class="alert alert-${type} alert-dismissible fade show" role="alert">${escapeHtml(msg)}<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>`;
      holder.prepend(wrap.firstElementChild);
      if (timeout) setTimeout(()=> { const el=document.getElementById(id); if(el) bootstrap.Alert.getOrCreateInstance(el).close(); }, timeout);
    }
  
    // ---- Page-specific rendering ----
    const bodyId = document.body.dataset.page; // set in each HTML: data-page="index" / "events" / "event" / "about" / "contact"
  
    // common: build navbar links active state
    $$('.nav-link[data-page]').forEach(a=>{
      if (a.dataset.page === bodyId) a.classList.add('active'); else a.classList.remove('active');
      a.addEventListener('click', (ev)=>{ /* links are normal anchors across pages */ });
    });

    // إزالة زر الوضع الليلي إن وُجد في أي صفحة قديمة
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.remove();
  
    // --- INDEX page ---
    if (bodyId === 'index') {
      // featured slider (simple swiper, clear, no overlap, shows 5 items)
      const featured = events.slice(0,5);
      const track = document.getElementById('sliderTrack');
      const prevBtn = document.getElementById('sliderPrev');
      const nextBtn = document.getElementById('sliderNext');
      const dotsRoot = document.getElementById('sliderDots');

      featured.forEach((e, idx)=>{
        const card = document.createElement('div');
        card.className = 'slide-card reveal';
        card.innerHTML = `
          <img class="slide-img" src="${e.images[0]}" alt="${escapeHtml(e.title)}">
          <div class="slide-caption">${escapeHtml(e.title)}</div>
        `;
        track.appendChild(card);
        if (dotsRoot) {
          const d = document.createElement('button');
          d.type = 'button'; d.className = 'slider-dot'; d.setAttribute('aria-label', `الانتقال إلى ${idx+1}`);
          d.addEventListener('click', ()=> { index = idx; applyTransforms(); updateDots(); });
          dotsRoot.appendChild(d);
        }
      });

      let index = 0; // current visible slide
      function applyTransforms(){
        const cards = Array.from(track.children);
        if (!cards.length) return;
        cards.forEach((c, i)=>{
          c.style.opacity = i===index ? '1' : '0';
          c.style.transform = i===index ? 'scale(1)' : 'scale(.96)';
          c.style.zIndex = String(i===index ? 2 : 1);
        });
      }
      function updateDots(){ const dots = Array.from(dotsRoot?.children||[]); dots.forEach((el, i)=> el.classList.toggle('active', i===index)); }
      function move(delta){
        const max = Math.max(0, track.children.length - 1);
        index = (index + delta + track.children.length) % track.children.length;
        applyTransforms(); updateDots();
      }
      prevBtn?.addEventListener('click', ()=> move(-1));
      nextBtn?.addEventListener('click', ()=> move(1));
      window.addEventListener('resize', applyTransforms);
      // init
      applyTransforms(); updateDots();
      // autoplay with pause on hover
      let timer = null;
      function start(){ timer = setInterval(()=> move(1), 3500); }
      function stop(){ if (timer) { clearInterval(timer); timer = null; } }
      start();
      document.getElementById('homeSlider')?.addEventListener('mouseenter', stop);
      document.getElementById('homeSlider')?.addEventListener('mouseleave', start);
  
      // category badges quick
      const cats = Array.from(new Set(events.map(x=>x.category)));
      const badges = $('#categoryBadges');
      cats.forEach(c=>{
        const b = document.createElement('button');
        b.className = 'btn btn-sm btn-outline-secondary badge-category';
        b.textContent = c;
        b.addEventListener('click', ()=> location.href = `events.html?cat=${encodeURIComponent(c)}`);
        badges.appendChild(b);
      });
  
      // latest grid (آخر 6)
      const latestGrid = $('#latestGrid');
      events.slice(0,6).forEach(e=>{
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 reveal';
        col.innerHTML = `
          <div class="card h-100">
            <img src="${e.images[0]}" class="event-card-img card-img-top" alt="${escapeHtml(e.title)}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${escapeHtml(e.title)}</h5>
              <p class="text-muted-small">${e.date} — ${e.location}</p>
              <p class="card-text">${escapeHtml(e.short)}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="badge bg-secondary">${e.category}</span>
                <a class="btn btn-sm btn-outline-primary" href="event.html?id=${e.id}">التفاصيل</a>
              </div>
            </div>
          </div>
        `;
        latestGrid.appendChild(col);
      });
    }
  
    // --- EVENTS page ---
    if (bodyId === 'events') {
      const listRoot = $('#eventsList');
      const filterCategory = $('#filterCategory');
      const filterDate = $('#filterDate');
      const filterLocation = $('#filterLocation');
      const searchInput = $('#searchInput');
  
      // populate filters
      const cats = Array.from(new Set(events.map(x=>x.category)));
      cats.forEach(c=> filterCategory.add(new Option(c,c)));
      const locs = Array.from(new Set(events.map(x=>x.location)));
      locs.forEach(l=> filterLocation.add(new Option(l,l)));
  
      function render(list){
        listRoot.innerHTML = '';
        (list.length? list : events).forEach(e=>{
          const col = document.createElement('div'); col.className='col-12 col-md-6 reveal';
          col.innerHTML = `
            <div class="card mb-3">
              <div class="row g-0 align-items-stretch">
                <div class="col-5 d-none d-sm-block">
                  <img src="${e.images[0]}" class="img-fluid rounded-start" style="height:160px;object-fit:cover" alt="${escapeHtml(e.title)}">
                </div>
                <div class="col">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${escapeHtml(e.title)}</h5>
                    <p class="text-muted-small">${e.date} — ${e.time} • ${e.location}</p>
                    <p class="card-text">${escapeHtml(e.short)}</p>
                    <div class="mt-auto d-flex gap-2">
                      <a class="btn btn-sm btn-primary" href="event.html?id=${e.id}">التفاصيل</a>
                      <button class="btn btn-sm btn-outline-secondary" data-add="${e.id}">أضف للتقويم</button>
                      <span class="badge bg-secondary">${e.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
          listRoot.appendChild(col);
        });
        observeReveals(listRoot);
      }
      render(events);
  
      // apply filters
      function apply(){
        const cat = filterCategory.value;
        const date = filterDate.value;
        const loc = filterLocation.value;
        const q = searchInput.value.trim().toLowerCase();
        const filtered = events.filter(ev=>{
          if(cat && ev.category !== cat) return false;
          if(date && ev.date !== date) return false;
          if(loc && ev.location !== loc) return false;
          if(q && !(ev.title.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q))) return false;
          return true;
        });
        render(filtered);
      }
      $('#filterForm')?.addEventListener('submit', e=>{ e.preventDefault(); apply(); });
      $('#clearFiltersBtn')?.addEventListener('click', ()=>{
        filterCategory.value=''; filterDate.value=''; filterLocation.value=''; searchInput.value=''; render(events);
      });
  
      // delegation for add-to-calendar
      document.body.addEventListener('click', (ev)=>{
        const btn = ev.target.closest('[data-add]');
        if(btn){ const id = btn.dataset.add; const e = events.find(x=>x.id===id); if(e) downloadICS(e); }
      });
  
      // if query param cat present (from index quick badge), apply it
      const params = new URLSearchParams(location.search);
      if(params.get('cat')){ filterCategory.value = params.get('cat'); apply(); }
    }
  
    // --- EVENT details page (event.html) ---
    if (bodyId === 'event') {
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      const e = events.find(x=>x.id===id);
      const container = $('#eventDetailCard');
      if (!e) {
        container.innerHTML = `<div class="card"><div class="card-body"><p>الفعالية غير موجودة.</p><a class="btn btn-link" href="events.html">رجوع لصفحة الفعاليات</a></div></div>`;
      } else {
        container.innerHTML = `
          <div class="card">
            <img src="${e.images[0]}" class="card-img-top" alt="${escapeHtml(e.title)}">
            <div class="card-body">
              <h3>${escapeHtml(e.title)}</h3>
              <p class="text-muted-small">${e.date} — ${e.time} • ${e.location} • <span class="badge bg-info">${e.category}</span></p>
              <p>${escapeHtml(e.full)}</p>
              <div class="d-flex gap-2">
                <button id="addCalendarBtn" class="btn btn-primary">أضف للتقويم</button>
                <button id="shareBtn" class="btn btn-outline-secondary">شارك</button>
                <a class="btn btn-outline-dark" href="events.html">رجوع للفعاليات</a>
              </div>
            </div>
          </div>
          <div class="mt-3">
            <h5>فعاليات ذات صلة</h5>
            <div id="relatedRow" class="row g-3 mt-2"></div>
          </div>
        `;
        // related: نفس التصنيف (باستثناء نفس الحدث)
        const related = events.filter(x=>x.category===e.category && x.id!==e.id).slice(0,3);
        const relRoot = $('#relatedRow');
        related.forEach(r=>{
          const col = document.createElement('div'); col.className='col-md-4';
          col.innerHTML = `
            <div class="card h-100">
              <img src="${r.images[0]}" class="img-fluid" style="height:140px;object-fit:cover" alt="${escapeHtml(r.title)}">
              <div class="card-body">
                <h6>${escapeHtml(r.title)}</h6>
                <p class="text-muted-small">${r.date}</p>
                <a class="btn btn-sm btn-outline-primary" href="event.html?id=${r.id}">التفاصيل</a>
              </div>
            </div>
          `;
          relRoot.appendChild(col);
        });
  
        // hooks
        $('#addCalendarBtn')?.addEventListener('click', ()=> downloadICS(e));
        $('#shareBtn')?.addEventListener('click', ()=> shareEvent(e));
      }
    }
  
    // --- ABOUT page ---
    if (bodyId === 'about') {
      // nothing dynamic required now; could inject partners/team from data if desired
    }

    // --- CONTACT page ---
    if (bodyId === 'contact') {
      // handled by shared contact form listener below
    }
  
    // ---- Contact form modal handling (مشترك) ----
    const contactForm = $('#contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (ev)=>{
        ev.preventDefault();
        if (!contactForm.checkValidity()) {
          contactForm.classList.add('was-validated');
          showAlert('يرجى تصحيح الحقول المطلوبة','danger');
          return;
        }
        // simulate إرسال
        showAlert('تم إرسال الرسالة بنجاح. شكراً لتواصلك معنا.','success');
        contactForm.reset(); contactForm.classList.remove('was-validated');
        // إغلاق المودال إن وُجد
        const cm = bootstrap.Modal.getInstance($('#contactModal')); if (cm) cm.hide();
      });
    }
  
    // observe reveals initially
    observeReveals(document);

    // ---- Global delegation for opening event modal from any "data-event-modal" buttons (if exist) ----
    document.body.addEventListener('click', (ev)=>{
      const btn = ev.target.closest('[data-event-modal-id]');
      if (btn){ openEventModalById(btn.dataset.eventModalId); }
    });
  
  });
  