(() => {
  const cfg = window.ARS_CONFIG || {name:"ARS — Adarsh Ke Alfaz", founder:"Adarsh Raj Shayar", backendConnected:false};
  const nav = [
    ["Home","index.html"],["Education","education.html"],["Knowledge Power","knowledge-power.html"],
    ["Exams","exams.html"],["Entrance Prep","exam-prep.html"],["Shayari","shayari.html"],
    ["Stories","stories.html"],["Poetry","poetry.html"],["Biography","biography.html"],
    ["Founder","founder.html"],["ARS Book","ars-book.html"],["SJR–ARS Book","sjr-ars-book.html"],
    ["Updates","updates.html"],["Join ARS","join-ars.html"],["Certificate","certificate.html"],
    ["About","about.html"],["Contact","contact.html"],["Sponsor","sponsor.html"]
  ];
  const current = location.pathname.split('/').pop() || 'index.html';
  const headerHost = document.getElementById('site-header');
  if (headerHost) {
    headerHost.innerHTML = `<a class="skip-link" href="#main-content">Skip to content</a>
      <header class="site-header"><div class="header-inner"><a class="brand" href="index.html" aria-label="ARS home"><img src="assets/logo.png" alt="ARS logo"><span><b>ARS</b><small>Adarsh Ke Alfaz</small></span></a>
      <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button>
      <nav class="main-nav" aria-label="Main navigation">${nav.map(([label,url])=>`<a href="${url}" ${current===url?'aria-current="page"':''}>${label}</a>`).join('')}<a href="search.html" ${current==='search.html'?'aria-current="page"':''}>Search</a></nav>
      <button class="theme-toggle" type="button" aria-label="Toggle colour theme" title="Toggle theme">◐</button></div></header>`;
  }
  const footerHost = document.getElementById('site-footer');
  if (footerHost) footerHost.innerHTML = `<footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="index.html">ARS — Adarsh Ke Alfaz</a><p>Education, knowledge, literature and learner growth in one place.</p><p class="small">Founder: Adarsh Raj Shayar</p></div><div><b>Explore</b><a href="education.html">Education</a><a href="exam-prep.html">Entrance preparation</a><a href="ars-book.html">ARS Book</a><a href="sjr-ars-book.html">SJR–ARS Book</a></div><div><b>Support</b><a href="about.html">About ARS</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="exam-rules.html">Exam rules</a></div><div><b>Connect</b><a href="${cfg.social?.instagram||'#'}" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="${cfg.social?.youtube||'#'}" target="_blank" rel="noopener noreferrer">YouTube ↗</a><a href="sponsor.html">Sponsor ARS</a><a class="private-link" href="private.html">Private</a></div></div><div class="footer-bottom"><span>© <span data-year></span> ARS — Adarsh Ke Alfaz</span><span>Learning • Fairness • Creativity</span></div></footer>`;
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const toggle=document.querySelector('.menu-toggle');
  const navEl=document.querySelector('.main-nav');
  if(toggle&&navEl) toggle.addEventListener('click',()=>{const open=navEl.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕':'☰';});
  const themeBtn=document.querySelector('.theme-toggle');
  const savedTheme=localStorage.getItem('ars-theme');
  if(savedTheme==='dark') document.documentElement.dataset.theme='dark';
  if(themeBtn) themeBtn.addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';if(dark)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;localStorage.setItem('ars-theme',dark?'dark':'light');});
  document.querySelectorAll('[data-filter-group]').forEach(group=>{
    const targetSelector=group.dataset.filterTarget; const target=document.querySelector(targetSelector);
    if(!target)return; const items=[...target.querySelectorAll('[data-category]')];
    group.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{group.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===button));const f=button.dataset.filter;items.forEach(item=>item.hidden=f!=='all'&&!item.dataset.category.split(' ').includes(f));}));
  });
  const searchInput=document.querySelector('[data-site-search]');
  if(searchInput){ const results=document.querySelector('[data-search-results]'); const pages=[['Home','index.html','Explore all sections of ARS'],['Education','education.html','Learning resources for classes 5–8'],['Knowledge Power','knowledge-power.html','Science, India, Bihar, environment and more'],['Exams','exams.html','ARS examination information'],['Sainik, JNV and RMS preparation','exam-prep.html','Notes, revision, practice and study plan'],['Shayari','shayari.html','Original shayari collection'],['Stories','stories.html','Stories and lessons'],['Poetry','poetry.html','Poems about life, hope and nature'],['Biography','biography.html','Writer biography draft'],['Founder','founder.html','Founder vision'],['ARS Book','ars-book.html','Literary book page'],['SJR–ARS Entrance Preparation Book','sjr-ars-book.html','Separate entrance preparation book'],['Join ARS','join-ars.html','Join ARS application overview'],['Certificate','certificate.html','Certificate information'],['Contact','contact.html','Contact options'],['Sponsor','sponsor.html','Sponsor proposal overview']]; const draw=()=>{const q=searchInput.value.trim().toLowerCase();results.innerHTML=pages.filter(p=>!q||(p.join(' ').toLowerCase().includes(q))).map(p=>`<a class="result-card" href="${p[1]}"><b>${p[0]}</b><span>${p[2]}</span><span class="result-arrow">Explore →</span></a>`).join('')||'<p class="notice">No matching sections found. Try another keyword.</p>';};searchInput.addEventListener('input',draw);draw(); }
  document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',ev=>{ev.preventDefault();const msg=form.querySelector('[data-form-message]');if(msg)msg.textContent='Demo only: no information has been sent or saved. A verified backend/email service must be connected first.';}));
  document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{const el=document.querySelector(btn.dataset.copy);if(!el)return;try{await navigator.clipboard.writeText(el.innerText);btn.textContent='Copied!';}catch{btn.textContent='Select text to copy';}}));
  const sampleQuiz=document.querySelector('[data-sample-quiz]');
  if(sampleQuiz)sampleQuiz.addEventListener('submit',ev=>{ev.preventDefault();const picked=sampleQuiz.querySelector('input[name="sample-answer"]:checked');const out=document.querySelector('[data-quiz-feedback]');if(!out)return;out.textContent=picked?(picked.value==='b'?'Well done! This sample answer is correct.':'Review the concept and try again. The sample answer is option B.'):'Please select an answer.';});
})();
