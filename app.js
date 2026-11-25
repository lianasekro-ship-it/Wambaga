const BRANCHES = [
  {id:'all',       label:'Wote',          root:gBagha},
  {id:'liana',     label:'Liana',         root:gLiana},
  {id:'mpombeya',  label:'Mpombeyagonja', root:gMpombeya},
  {id:'mkindi',    label:'Mkindi Mangare', root:gMkindi},
  {id:'kinenekejo',label:'Kinenekejo',    root:gKinenekejo},
];

// ══════════════════════════════════════════
//  TREE RENDERING (SVG)
// ══════════════════════════════════════════
let curBranch = 'liana';
// ── NAVIGATION HISTORY STACK ──
let navStack = []; // [{rootId, label, scrollLeft, scrollTop}]
let curRootId = null;
let svgScale = 0.55, svgOffX = 40, svgOffY = 40;
let isDragging = false, dragStartX, dragStartY, dragOffX, dragOffY;

const NODE_W = 100, NODE_H = 80, H_GAP = 20, V_GAP = 70;

function getSubtreeWidth(id){
  const person = PEOPLE[id];
  if(!person.children.length) return NODE_W;
  const childWidths = person.children.map(c=>getSubtreeWidth(c));
  return Math.max(NODE_W, childWidths.reduce((a,b)=>a+b+H_GAP, -H_GAP));
}

function layoutTree(id, x, y){
  const person = PEOPLE[id];
  const positions = {};
  positions[id] = {x, y};
  if(person.children.length){
    const total = person.children.reduce((a,c)=>a+getSubtreeWidth(c)+H_GAP,-H_GAP);
    let cx = x - total/2;
    for(const cid of person.children){
      const cw = getSubtreeWidth(cid);
      const subPos = layoutTree(cid, cx + cw/2, y + NODE_H + V_GAP);
      Object.assign(positions, subPos);
      cx += cw + H_GAP;
    }
  }
  return positions;
}

// Check if personId is in the subtree rooted at rootId
function isInSubtree(personId, rootId){
  if(!rootId || !personId) return false;
  const visited = new Set();
  const queue = [rootId];
  while(queue.length){
    const id = queue.shift();
    if(visited.has(id)) continue;
    visited.add(id);
    if(id === personId) return true;
    if(PEOPLE[id]) for(const c of PEOPLE[id].children) queue.push(c);
  }
  return false;
}

function getColor(person){
  if(person.isUnknown) return {fill:'#F0F7F2',stroke:'rgba(46,125,82,0.35)'};
  if(person.isFemale) return {fill:'#FDF0F8',stroke:'rgba(180,80,160,0.45)'};
  if(person.branch.startsWith('★')) return {fill:'#FFFBF0',stroke:'#C9920A'};
  if(person.gen<=2) return {fill:'#FFF8E8',stroke:'#B8860B'};
  return {fill:'#FFFFFF',stroke:'rgba(184,134,11,0.35)'};
}


// ══════════════════════════════════════════
// GPS PATH — Njia kutoka mtu hadi babu mkubwa
// ══════════════════════════════════════════
function getPathToRoot(personId){
  const path = [];
  let id = personId;
  const visited = new Set();
  while(id && PEOPLE[id] && !visited.has(id)){
    visited.add(id);
    path.unshift(id);
    id = PEOPLE[id].parentId;
  }
  return path; // [root, ..., person]
}

function showGpsPath(personId){
  const path = getPathToRoot(personId);
  if(path.length === 0) return;

  // Build modal
  const modal = document.createElement('div');
  modal.id = 'gps-modal';
  modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem`;
  modal.onclick = e => { if(e.target===modal) modal.remove(); };

  const box = document.createElement('div');
  box.style.cssText = `background:var(--panel);border:1px solid var(--border2);border-radius:16px;padding:1.5rem;max-width:560px;width:100%;max-height:80vh;overflow-y:auto;position:relative`;

  const person = PEOPLE[personId];
  let html = `
    <button onclick="document.getElementById('gps-modal').remove()" style="position:absolute;top:12px;right:12px;background:none;border:none;color:var(--cream3);font-size:1.2rem;cursor:pointer">✕</button>
    <div style="font-family:'Cinzel',serif;font-size:.95rem;font-weight:700;color:var(--cream);margin-bottom:.3rem">🧭 Njia ya Nasaba</div>
    <div style="font-size:.75rem;color:var(--cream3);margin-bottom:1.2rem;letter-spacing:.05em">${escHtml(person.name.split('/')[0].trim())} — vizazi ${path.length}</div>
    <div style="display:flex;flex-direction:column;gap:0">
  `;

  path.forEach((id, i) => {
    const p = PEOPLE[id];
    const isLast = i === path.length - 1;
    const isFirst = i === 0;
    html += `
      <div style="display:flex;align-items:center;gap:0">
        <div style="display:flex;flex-direction:column;align-items:center;width:32px;flex-shrink:0">
          <div style="width:${isFirst?14:10}px;height:${isFirst?14:10}px;border-radius:50%;background:${isLast?'var(--gold)':isFirst?'var(--gold-l)':'var(--border2)'};border:2px solid ${isLast?'var(--gold)':'var(--border2)'};flex-shrink:0"></div>
          ${!isLast?`<div style="width:2px;height:28px;background:var(--border);margin:2px 0"></div>`:''}
        </div>
        <div style="flex:1;padding:.4rem .6rem;border-radius:8px;cursor:pointer;transition:background .15s;${isLast?'background:rgba(184,134,11,0.1);':''}"
          onclick="document.getElementById('gps-modal').remove();closePanel();setTimeout(()=>{highlightAndOpen('${id}')},100)">
          <div style="font-size:.82rem;font-weight:${isLast?'700':'500'};color:${isLast?'var(--gold)':'var(--cream)'}">
            ${escHtml(p.name.split('/')[0].trim())}
            ${isFirst?'<span style="font-size:.65rem;color:var(--cream3);margin-left:.4rem">📍 Asili</span>':''}
            ${isLast?'<span style="font-size:.65rem;color:var(--gold-l);margin-left:.4rem">← Wewe</span>':''}
          </div>
          <div style="font-size:.68rem;color:var(--cream3);margin-top:1px">Kizazi ${p.gen} · ${p.branch.replace('★ ','').replace('Tawi la ','')}</div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  box.innerHTML = html;
  modal.appendChild(box);
  document.body.appendChild(modal);
}

// Highlight node in tree and open panel
function highlightAndOpen(id){
  const person = PEOPLE[id];
  if(!person) return;
  // Drill down to their parent so they're visible, then open panel
  drillDown(id);
  setTimeout(()=>openPanel(id), 200);
  // Scroll to node
  setTimeout(()=>{
    const node = document.querySelector('[data-id="'+id+'"]');
    if(node){
      const wrap = document.getElementById('tree-wrap');
      const rect = node.getBoundingClientRect();
      const wRect = wrap.getBoundingClientRect();
      wrap.scrollLeft += rect.left - wRect.left - wRect.width/2 + rect.width/2;
      wrap.scrollTop += rect.top - wRect.top - wRect.height/2 + rect.height/2;
    }
  }, 350);
}



// ══════════════════════════════════════════
// MINI-MAP — Ramani ndogo ya uko wapi
// ══════════════════════════════════════════

function renderTree(rootId){
  // Resolve rootId — fallback chain
  if(!rootId || !PEOPLE[rootId]) rootId = curRootId;
  if(!rootId || !PEOPLE[rootId]){
    const firstBranch = BRANCHES.find(b => b.root && PEOPLE[b.root]);
    if(!firstBranch) return;
    rootId = firstBranch.root;
    curRootId = rootId;
  }
  curRootId = rootId;
  renderTreeAtScale(rootId, svgScale);
  // Center root node horizontally, show from top
  setTimeout(()=>{
    const wrap = document.getElementById('tree-wrap');
    const svg  = document.getElementById('tree-svg');
    if(wrap && svg){
      const svgW = parseFloat(svg.getAttribute('width')) || wrap.scrollWidth;
      // Scroll so root (center of SVG width) is in center of viewport
      wrap.scrollLeft = (svgW / 2) - (wrap.clientWidth / 2);
      wrap.scrollTop  = 0;
    }

  }, 80);
}

// ══════════════════════════════════════════
// PANEL
// ══════════════════════════════════════════
function openPanel(id){
  const person = PEOPLE[id];
  if(!person) return;
  document.getElementById('dp-name').textContent = person.name;
  document.getElementById('dp-gen').textContent = 'Kizazi cha '+person.gen;
  window._lastOpenedPersonId = id;
  document.getElementById('dp-branch').textContent = person.branch;

  // ── Action buttons — shown for ALL people, below name in header ──
  const pathLen = getPathToRoot(id).length;
  let actionBtns = '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;">';
  // GPS — everyone has a path to root
  actionBtns += `<button onclick="showGpsPath('${id}')"
    style="display:flex;align-items:center;gap:4px;padding:6px 12px;border-radius:20px;border:1.5px solid var(--border2);background:transparent;color:var(--gold);font-size:.72rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Raleway',sans-serif"
    onmouseover="this.style.background='rgba(184,134,11,0.08)'" onmouseout="this.style.background='transparent'">
    🧭 <span>Njia</span></button>`;

  // Uzao — only if has children
  if(person.children.length){
    actionBtns += `<button onclick="closePanel();drillDown('${id}')"
      style="display:flex;align-items:center;gap:4px;padding:6px 12px;border-radius:20px;border:1.5px solid var(--border2);background:transparent;color:var(--gold);font-size:.72rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Raleway',sans-serif"
      onmouseover="this.style.background='rgba(184,134,11,0.08)'" onmouseout="this.style.background='transparent'">
      🌿 <span>Uzao</span></button>`;
  }
  actionBtns += '</div>';
  const btnsEl = document.getElementById('dp-action-btns');
  if(btnsEl) btnsEl.innerHTML = actionBtns;

  const avatarEl = document.getElementById('dp-avatar');
  if(person.profile_photo){
    avatarEl.innerHTML = '<img src="'+person.profile_photo+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block">';
  } else {
    avatarEl.innerHTML = '<span style="font-size:1.6rem">'+(person.isFemale ? '👩' : person.gen<=3 ? '👑' : '👤')+'</span>';
  }


  let html='';
  // Basic info
  html+='<div class="dp-section"><div class="dp-section-title">Maelezo</div>';
  if(person.born) html+=`<div class="dp-info-row"><span class="dp-info-key">Kuzaliwa</span><span class="dp-info-val">${person.born}</span></div>`;
  if(person.died) html+=`<div class="dp-info-row"><span class="dp-info-key">Alifariki</span><span class="dp-info-val">${person.died}</span></div>`;
  if(person.location) html+=`<div class="dp-info-row"><span class="dp-info-key">Mahali</span><span class="dp-info-val">${person.location}</span></div>`;
  if(person.spouse) html+=`<div class="dp-info-row"><span class="dp-info-key">Mke/Mume</span><span class="dp-info-val">${person.spouse}</span></div>`;

  // Parent
  if(person.parentId){
    const par = PEOPLE[person.parentId];
    html+=`<div class="dp-info-row"><span class="dp-info-key">Baba/Mama</span><span class="dp-info-val" style="cursor:pointer;color:var(--gold-l);text-decoration:underline" onclick="openPanel('${person.parentId}')">${par.name}</span></div>`;
  }
  html+='</div>';

  if(person.note){
    html+=`<div class="dp-section"><div class="dp-section-title">Maelezo Zaidi</div><div class="dp-note">${person.note}</div></div>`;
  }

  // Children
  if(person.children.length){
    html+=`<div class="dp-section">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem">
        <div class="dp-section-title" style="margin:0;border:none;padding:0">Watoto (${person.children.length})</div>
        <button onclick="closePanel();drillDown('${id}')" style="font-family:'Raleway',sans-serif;font-size:.58rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:.3rem .8rem;border:1px solid var(--border2);background:rgba(184,134,11,0.08);color:var(--gold);cursor:pointer;transition:all .2s" title="Onyesha mti unaoanzia hapa">🌿 Angalia Uzao</button>
      </div>
      <div class="dp-children-list">`;
    person.children.forEach((cid,i)=>{
      const child = PEOPLE[cid];
      html+=`<div class="dp-child" onclick="openPanel('${cid}')"><span class="dp-child-num">${i+1}.</span>${child.name}</div>`;
    });
    html+='</div></div>';
  }

  // Siblings
  if(person.parentId){
    const parent = PEOPLE[person.parentId];
    const siblings = parent.children.filter(c=>c!==id);
    if(siblings.length){
      html+=`<div class="dp-section"><div class="dp-section-title">Ndugu (${siblings.length})</div><div class="dp-children-list">`;
      siblings.slice(0,8).forEach((sid,i)=>{
        const sib = PEOPLE[sid];
        html+=`<div class="dp-child" onclick="openPanel('${sid}')"><span class="dp-child-num">${i+1}.</span>${sib.name}</div>`;
      });
      if(siblings.length>8) html+=`<div style="font-size:.7rem;color:var(--cream3);padding:.3rem .8rem">... na ${siblings.length-8} zaidi</div>`;
      html+='</div></div>';
    }
  }

  // Photo section handled by renderPhotos below

  document.getElementById('dp-body').innerHTML=html;
  document.getElementById('detail-panel').classList.add('open');
}

function closePanel(){
  document.getElementById('detail-panel').classList.remove('open');
}



// ══════════════════════════════════════════
// SEARCH
// ══════════════════════════════════════════
let searchTimeout;
function handleSearch(q){
  clearTimeout(searchTimeout);
  if(!q.trim()){clearSearch();return;}
  searchTimeout=setTimeout(()=>doSearch(q.trim()),250);
}

function doSearch(q){
  const ql=q.toLowerCase();
  const results = Object.values(PEOPLE).filter(p=>
    p.name.toLowerCase().includes(ql)||
    p.branch.toLowerCase().includes(ql)||
    (p.note&&p.note.toLowerCase().includes(ql))||
    (p.location&&p.location.toLowerCase().includes(ql))
  );

  document.getElementById('sr-title').textContent=`Matokeo: "${q}"`;
  document.getElementById('sr-count').textContent=results.length+' watu wamepatikana';

  let html='';
  results.slice(0,80).forEach(person=>{
    const par = person.parentId?PEOPLE[person.parentId]:null;
    html+=`<div class="sr-card" onclick="selectPerson('${person.id}')">
      <div class="sr-card-name">${person.name}</div>
      <div class="sr-card-gen">Kizazi cha ${person.gen}</div>
      <div class="sr-card-branch">${person.branch}</div>
      ${par?`<div class="sr-card-parents">Mtoto wa ${par.name}</div>`:''}
    </div>`;
  });
  if(!results.length) html='<div style="color:var(--cream3);font-family:\'Cormorant Garamond\',serif;font-size:1.1rem;padding:2rem">Hakuna mtu aliyepatikana kwa utafutaji huo.</div>';

  document.getElementById('sr-grid').innerHTML=html;
  document.getElementById('search-results').classList.add('open');
}

function selectPerson(id){
  clearSearch();
  showView('tree');
  setTimeout(()=>{
    // Find branch
    const person = PEOPLE[id];
    openPanel(id);
  },200);
}

function clearSearch(){
  const inp = document.getElementById('search-input');
  const inpMob = document.getElementById('search-input-mob');
  if(inp) inp.value='';
  if(inpMob) inpMob.value='';
  const res = document.getElementById('search-results');
  if(res) res.classList.remove('open');
}

// ══════════════════════════════════════════
// VIEWS & NAV
// ══════════════════════════════════════════
let viewHistory = [];
let currentView = 'home';

function showView(v, addToHistory=true){
  if(addToHistory && currentView && currentView !== v){
    viewHistory.push(currentView);
    if(viewHistory.length > 20) viewHistory.shift();
  }
  currentView = v;
  document.querySelectorAll('.view').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.tb-nav a').forEach(el=>el.classList.remove('active'));
  document.getElementById('view-'+v).classList.add('active');
  const navEl = document.getElementById('nav-'+v);
  if(navEl) navEl.classList.add('active');
  // Update mobile drawer active state
  document.querySelectorAll('.mob-nav-item').forEach(el=>el.classList.remove('mob-active'));
  const mobEl = document.getElementById('mob-'+v);
  if(mobEl) mobEl.classList.add('mob-active');
  if(v==='tree'){
    setTimeout(()=>{
      // If tree not yet rendered, render it
      if(!curRootId || !document.querySelector('#tree-svg [data-id]')){
        const branch = BRANCHES.find(b=>b.id===curBranch)||BRANCHES[0];
        curRootId = branch.root;
        renderTree(branch.root);
        updateNavUI();
      }
    }, 80);
  }
  if(v==='historia') checkHistoriaAdmin();
  if(v==='proverbs') renderProverbs();
  closePanel();
  // Show/hide global back button
  updateGlobalBackBtn();
  window.scrollTo(0,0);
}

function goBackView(){
  if(viewHistory.length > 0){
    const prev = viewHistory.pop();
    showView(prev, false);
  } else {
    showView('home', false);
  }
}

function updateGlobalBackBtn(){
  const btn = document.getElementById('global-back-btn');
  if(btn){
    btn.style.display = (viewHistory.length > 0 || currentView !== 'home') ? 'flex' : 'none';
  }
}

// ══════════════════════════════════════════
// BRANCH TABS
// ══════════════════════════════════════════
function buildBranchTabs(){
  const container = document.getElementById('branch-tabs');
  BRANCHES.forEach(b=>{
    const btn = document.createElement('button');
    btn.className='btab'+(b.id===curBranch?' active':'');
    btn.textContent=b.label;
    btn.onclick=()=>switchBranch(b.id);
    container.appendChild(btn);
  });
}

function switchBranch(bid){
  curBranch=bid;
  navStack=[];
  document.querySelectorAll('.btab').forEach((btn,i)=>{
    btn.classList.toggle('active',BRANCHES[i].id===bid);
  });
  const branch = BRANCHES.find(b=>b.id===bid)||BRANCHES[0];
  curRootId = branch.root;
  renderTree(branch.root);
  updateNavUI();
}

// Navigate into a subtree rooted at a person (drill-down)
function drillDown(personId){
  const wrap = document.getElementById('tree-wrap');
  // Save current state
  navStack.push({
    rootId: curRootId,
    label: PEOPLE[personId] ? PEOPLE[personId].name.split('/')[0].trim() : '?',
    scrollLeft: wrap.scrollLeft,
    scrollTop: wrap.scrollTop,
  });
  curRootId = personId;
  renderTree(personId);
  updateNavUI();
}

function goBack(){
  if(!navStack.length) return;
  const prev = navStack.pop();
  curRootId = prev.rootId;
  renderTree(prev.rootId);
  updateNavUI();
  // Restore scroll position
  const wrap = document.getElementById('tree-wrap');
  setTimeout(()=>{ wrap.scrollLeft = prev.scrollLeft; wrap.scrollTop = prev.scrollTop; }, 30);
}

function resetToRoot(){
  navStack=[];
  const branch = BRANCHES.find(b=>b.id===curBranch)||BRANCHES[0];
  curRootId = branch.root;
  renderTree(branch.root);
  updateNavUI();
}

function updateNavUI(){
  const backBtn = document.getElementById('back-btn');
  const breadcrumb = document.getElementById('tree-breadcrumb');
  const bcTrail = document.getElementById('bc-trail');

  if(navStack.length > 0){
    backBtn.style.display = 'inline-flex';
    breadcrumb.style.display = 'flex';
    let trail = '';
    navStack.forEach((item, i) => {
      trail += `<span class="bc-sep">›</span><span class="bc-crumb" onclick="jumpToStack(${i})">${item.label}</span>`;
    });
    // current
    const cur = PEOPLE[curRootId];
    if(cur) trail += `<span class="bc-sep">›</span><span class="bc-crumb current">${cur.name.split('/')[0].trim()}</span>`;
    bcTrail.innerHTML = trail;
  } else {
    backBtn.style.display = 'none';
    breadcrumb.style.display = 'none';
    bcTrail.innerHTML = '';
  }
}

function jumpToStack(idx){
  // Go back to a specific point in the stack
  const target = navStack[idx];
  navStack = navStack.slice(0, idx);
  curRootId = target.rootId;
  renderTree(target.rootId);
  updateNavUI();
  const wrap = document.getElementById('tree-wrap');
  setTimeout(()=>{ wrap.scrollLeft = target.scrollLeft; wrap.scrollTop = target.scrollTop; }, 30);
}

// ══════════════════════════════════════════
// ZOOM
// ══════════════════════════════════════════
// ── PROPER ZOOM: re-render SVG at new node sizes ──────
const BASE_NODE_W = 90, BASE_NODE_H = 58, BASE_H_GAP = 16, BASE_V_GAP = 56;

// ── Smooth zoom with requestAnimationFrame ──
let _zoomTarget = null;
let _zoomRAF = null;

function applyZoom(newScale, anchorX, anchorY){
  const wrap = document.getElementById('tree-wrap');
  const prev = svgScale;
  svgScale = Math.max(0.1, Math.min(4, newScale));
  renderTreeAtScale(curRootId, svgScale);
  // Anchor scroll so view stays centered on anchor point
  if(anchorX != null && prev > 0){
    wrap.scrollLeft = anchorX * (svgScale/prev) - (wrap._anchorOffX||wrap.clientWidth/2);
    wrap.scrollTop  = anchorY * (svgScale/prev) - (wrap._anchorOffY||wrap.clientHeight/2);
  }
}

function zoomIn(){
  const wrap = document.getElementById('tree-wrap');
  const cx = wrap.scrollLeft + wrap.clientWidth/2;
  const cy = wrap.scrollTop + wrap.clientHeight/2;
  wrap._anchorOffX = wrap.clientWidth/2;
  wrap._anchorOffY = wrap.clientHeight/2;
  const prev = svgScale;
  applyZoom(svgScale * 1.25, cx, cy);
}

function zoomOut(){
  const wrap = document.getElementById('tree-wrap');
  const cx = wrap.scrollLeft + wrap.clientWidth/2;
  const cy = wrap.scrollTop + wrap.clientHeight/2;
  wrap._anchorOffX = wrap.clientWidth/2;
  wrap._anchorOffY = wrap.clientHeight/2;
  applyZoom(svgScale / 1.25, cx, cy);
}

function resetZoom(){
  svgScale = 0.55;
  renderTreeAtScale(curRootId, svgScale);
  const wrap = document.getElementById('tree-wrap');
  setTimeout(()=>{
    wrap.scrollLeft = (wrap.scrollWidth - wrap.clientWidth)/2;
    wrap.scrollTop = 0;
    }, 60);
}

// ── Wheel + Touch + Minimap ──
document.addEventListener('DOMContentLoaded',()=>{
  const wrap = document.getElementById('tree-wrap');
  if(!wrap) return;

  // Mouse drag — click and drag to pan (laptop)
  let isDrag=false, dragX=0, dragY=0, scrollX=0, scrollY=0;
  let didDrag=false;
  wrap.addEventListener('mousedown', e=>{
    if(e.button!==0) return;
    if(e.target.tagName==='BUTTON'||e.target.closest('button')) return;
    isDrag=true; didDrag=false;
    dragX=e.clientX; dragY=e.clientY;
    scrollX=wrap.scrollLeft; scrollY=wrap.scrollTop;
  });
  window.addEventListener('mousemove', e=>{
    if(!isDrag) return;
    const dx=e.clientX-dragX, dy=e.clientY-dragY;
    if(!didDrag && Math.sqrt(dx*dx+dy*dy)<4) return; // ignore tiny moves
    didDrag=true;
    wrap.style.cursor='grabbing';
    wrap.scrollLeft = scrollX-dx;
    wrap.scrollTop  = scrollY-dy;
    e.preventDefault();
  });
  window.addEventListener('mouseup', e=>{
    if(!isDrag) return;
    isDrag=false;
    wrap.style.cursor='grab';
    // If we dragged, stop the click from propagating to SVG nodes
    if(didDrag){
      didDrag=false;
      e.stopPropagation();
    }
  });

  // Ctrl+Wheel zoom (laptop)
  wrap.addEventListener('wheel', e=>{
    if(e.ctrlKey||e.metaKey){
      e.preventDefault();
      const rect=wrap.getBoundingClientRect();
      const anchorX=e.clientX-rect.left+wrap.scrollLeft;
      const anchorY=e.clientY-rect.top+wrap.scrollTop;
      wrap._anchorOffX=e.clientX-rect.left;
      wrap._anchorOffY=e.clientY-rect.top;
      applyZoom(svgScale*(e.deltaY<0?1.12:0.89), anchorX, anchorY);
    }
  },{passive:false});

  // Touch: 1 finger = scroll, 2 fingers = pinch zoom only
  let lastDist=null, touchMode=null;
  wrap.addEventListener('touchstart', e=>{
    if(e.touches.length===2){
      touchMode='pinch';
      const dx=e.touches[0].clientX-e.touches[1].clientX;
      const dy=e.touches[0].clientY-e.touches[1].clientY;
      lastDist=Math.sqrt(dx*dx+dy*dy);
    } else touchMode='scroll';
  },{passive:true});
  wrap.addEventListener('touchmove', e=>{
    if(touchMode==='pinch'&&e.touches.length===2&&lastDist){
      e.preventDefault();
      const dx=e.touches[0].clientX-e.touches[1].clientX;
      const dy=e.touches[0].clientY-e.touches[1].clientY;
      const dist=Math.sqrt(dx*dx+dy*dy);
      const pcx=(e.touches[0].clientX+e.touches[1].clientX)/2;
      const pcy=(e.touches[0].clientY+e.touches[1].clientY)/2;
      const rect=wrap.getBoundingClientRect();
      wrap._anchorOffX=pcx-rect.left;
      wrap._anchorOffY=pcy-rect.top;
      const anchorX=pcx-rect.left+wrap.scrollLeft;
      const anchorY=pcy-rect.top+wrap.scrollTop;
      if(dist>0) applyZoom(svgScale*(dist/lastDist),anchorX,anchorY);
      lastDist=dist;
    }
  },{passive:false});
  wrap.addEventListener('touchend', e=>{
    if(e.touches.length<2){lastDist=null; touchMode=e.touches.length===1?'scroll':null;}
  },{passive:true});
});

// ── Minimap ──



// renderTreeAtScale: same as renderTree but geometry scaled
function renderTreeAtScale(rootId, scale){
  const NW = BASE_NODE_W * scale;
  const NH = BASE_NODE_H * scale;
  const HG = BASE_H_GAP * scale;
  const VG = BASE_V_GAP * scale;
  const R  = 20 * scale;
  const fontSize1 = Math.max(7, 10 * scale);
  const fontSize2 = Math.max(6,  9 * scale);
  const fontSizeIcon = Math.max(8, 14 * scale);

  const svg = document.getElementById('tree-svg');
  const wrap = document.getElementById('tree-wrap');
  svg.innerHTML='';
  // Add shadow filter defs
  const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
  const filter = document.createElementNS('http://www.w3.org/2000/svg','filter');
  filter.setAttribute('id','node-shadow');
  filter.setAttribute('x','-20%'); filter.setAttribute('y','-20%');
  filter.setAttribute('width','140%'); filter.setAttribute('height','140%');
  const shadow = document.createElementNS('http://www.w3.org/2000/svg','feDropShadow');
  shadow.setAttribute('dx','0'); shadow.setAttribute('dy','1');
  shadow.setAttribute('stdDeviation','2');
  shadow.setAttribute('flood-color','rgba(0,0,0,0.10)');
  filter.appendChild(shadow);
  defs.appendChild(filter);
  svg.appendChild(defs);

  // Collect visible nodes (BFS)
  const visible = new Set();
  const queue = [rootId];
  while(queue.length){
    const id = queue.shift();
    if(visible.has(id)) continue;
    visible.add(id);
    if(PEOPLE[id]) for(const c of PEOPLE[id].children) queue.push(c);
  }

  // Layout with scaled geometry
  // Memoized getSubW — avoids O(n²) recursion with large trees
  const _swCache = {};
  function getSubW(id){
    if(_swCache[id] !== undefined) return _swCache[id];
    const pr = PEOPLE[id];
    if(!pr || !pr.children.length){ _swCache[id]=NW; return NW; }
    const cw = pr.children.map(c=>getSubW(c));
    const w = Math.max(NW, cw.reduce((a,b)=>a+b+HG,-HG));
    _swCache[id] = w;
    return w;
  }
  // Iterative layout using stack — avoids call stack overflow with deep trees
  function layout(rootId, startX, startY){
    const pos = {};
    const stack = [[rootId, startX, startY]];
    while(stack.length){
      const [id, x, y] = stack.pop();
      pos[id] = {x, y};
      const pr = PEOPLE[id];
      if(!pr || !pr.children.length) continue;
      const tot = pr.children.reduce((a,c)=>a+getSubW(c)+HG,-HG);
      let cx2 = x - tot/2;
      for(const cid of pr.children){
        const cw = getSubW(cid);
        stack.push([cid, cx2+cw/2, y+NH+VG]);
        cx2 += cw+HG;
      }
    }
    return pos;
  }

  const positions = layout(rootId, 0, 0);

  let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  for(const [id,pos] of Object.entries(positions)){
    if(!visible.has(id)) continue;
    minX=Math.min(minX,pos.x-NW/2); maxX=Math.max(maxX,pos.x+NW/2);
    minY=Math.min(minY,pos.y);       maxY=Math.max(maxY,pos.y+NH);
  }
  const pad = 60 * scale;
  const totalW = maxX-minX+pad*2;
  const totalH = maxY-minY+pad*2;
  // Guard against empty tree (no visible nodes)
  if(!isFinite(totalW) || !isFinite(totalH) || totalW <= 0 || totalH <= 0){
    console.warn('renderTree: no visible nodes for rootId', rootId);
    return;
  }
  svg.setAttribute('width',totalW);
  svg.setAttribute('height',totalH);
  svg.style.minWidth=totalW+'px';
  svg.style.minHeight=totalH+'px';
  svg.style.transform='';

  const ox = pad-minX, oy = pad-minY;

  // Edges
  const edgeG = document.createElementNS('http://www.w3.org/2000/svg','g');
  for(const [id,pos] of Object.entries(positions)){
    if(!visible.has(id)) continue;
    for(const cid of PEOPLE[id].children){
      if(!visible.has(cid)||!positions[cid]) continue;
      const cpos = positions[cid];
      const px=pos.x+ox, py=pos.y+oy+NH;
      const cx2=cpos.x+ox, cy2=cpos.y+oy;
      const midY=(py+cy2)/2;
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',`M${px},${py} C${px},${midY} ${cx2},${midY} ${cx2},${cy2}`);
      path.setAttribute('stroke','rgba(184,134,11,0.3)');
      path.setAttribute('stroke-width', Math.max(0.5, 1.5*scale));
      path.setAttribute('fill','none');
      edgeG.appendChild(path);
    }
  }
  svg.appendChild(edgeG);

  // Nodes
  const nodeG = document.createElementNS('http://www.w3.org/2000/svg','g');
  for(const [id,pos] of Object.entries(positions)){
    if(!visible.has(id)) continue;
    const person = PEOPLE[id];
    const col = getColor(person);

    // Node dimensions — fixed, clean
    const nW = NW, nH = NH;
    const nx = pos.x + ox - nW/2;  // top-left x
    const ny = pos.y + oy;          // top-left y
    const cx2 = pos.x + ox;         // center x
    const midY = ny + nH/2;         // center y of rect

    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','node-group');
    g.setAttribute('data-id',id);
    g.style.cursor='pointer';
    g.addEventListener('click',()=>openPanel(id));

    // Gen badge above node (root nodes only)
    if(person.gen<=3 && scale > 0.4){
      const badge = document.createElementNS('http://www.w3.org/2000/svg','text');
      badge.setAttribute('x', cx2);
      badge.setAttribute('y', ny - 3*scale);
      badge.setAttribute('text-anchor','middle');
      badge.setAttribute('font-size', Math.max(6, 7*scale));
      badge.setAttribute('fill','rgba(184,134,11,0.8)');
      badge.setAttribute('font-weight','600');
      badge.textContent = 'Kiz.'+person.gen;
      g.appendChild(badge);
    }

    // Glow ring for starred/root
    if(person.branch.startsWith('★') || person.gen<=3){
      const glow = document.createElementNS('http://www.w3.org/2000/svg','rect');
      glow.setAttribute('x', nx-3*scale); glow.setAttribute('y', ny-3*scale);
      glow.setAttribute('width', nW+6*scale); glow.setAttribute('height', nH+6*scale);
      glow.setAttribute('rx', 10*scale); glow.setAttribute('ry', 10*scale);
      glow.setAttribute('fill','none');
      glow.setAttribute('stroke','rgba(184,134,11,0.22)');
      glow.setAttribute('stroke-width', 2.5*scale);
      g.appendChild(glow);
    }

    // Main rectangle
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x', nx); rect.setAttribute('y', ny);
    rect.setAttribute('width', nW); rect.setAttribute('height', nH);
    rect.setAttribute('rx', 7*scale); rect.setAttribute('ry', 7*scale);
    rect.setAttribute('fill', col.fill);
    rect.setAttribute('stroke', col.stroke);
    rect.setAttribute('stroke-width', person.branch.startsWith('★') ? Math.max(1,1.8*scale) : Math.max(0.5,1.2*scale));
    rect.setAttribute('filter','url(#node-shadow)');
    g.appendChild(rect);

    // Name text — split into two lines if needed
    if(scale > 0.3){
      const displayName = person.name.replace(/^Bi /,'').split('/')[0].trim();
      const words = displayName.split(' ');
      const line1 = words[0];
      const line2 = words.length > 1 ? words.slice(1).join(' ') : '';
      const hasLine2 = line2.length > 0 && scale > 0.45;
      const nameColor = person.isFemale ? '#8B1A6B' : person.branch.startsWith('★') ? '#7A5200' : '#1C1C1A';
      const line2Color = person.isFemale ? 'rgba(139,26,107,0.65)' : 'rgba(28,28,26,0.58)';
      const y1 = hasLine2 ? midY - fontSize1*0.3 : midY + fontSize1*0.35;
      const t1 = document.createElementNS('http://www.w3.org/2000/svg','text');
      t1.setAttribute('x', cx2); t1.setAttribute('y', y1);
      t1.setAttribute('text-anchor','middle');
      t1.setAttribute('font-size', fontSize1);
      t1.setAttribute('font-weight','600');
      t1.setAttribute('fill', nameColor);
      t1.textContent = line1.length>13 ? line1.substring(0,12)+'…' : line1;
      g.appendChild(t1);
      if(hasLine2){
        const t2 = document.createElementNS('http://www.w3.org/2000/svg','text');
        t2.setAttribute('x', cx2); t2.setAttribute('y', midY + fontSize2*1.1);
        t2.setAttribute('text-anchor','middle');
        t2.setAttribute('font-size', fontSize2);
        t2.setAttribute('fill', line2Color);
        t2.textContent = line2.length>13 ? line2.substring(0,12)+'…' : line2;
        g.appendChild(t2);
      }
    }

    nodeG.appendChild(g);
  }
  svg.appendChild(nodeG);

  // Centre scroll horizontally
  const wrapW = wrap.clientWidth;
  wrap.scrollLeft = Math.max(0,(totalW-wrapW)/2);
  wrap.scrollTop = 0;
}

// ══════════════════════════════════════════
// PROVERBS DATA — Misemo ya Wapare
// ══════════════════════════════════════════
const PROVERBS = [
  {
    kipare: "Ni kichogha cha Ngujini",
    sw: "Ni uyoga wa ukanda wa juu",
    meaning: "Kuna imani kuwa ukiona uyoga wa Ngujini ukiungoa mama anakufa, ukiuacha baba anakufa. Kwa hiyo unatakiwa uamue kimojawapo. Watu wengi wametafsiri chanjo ya COVID-19 kuwa sawa na mtihani huu — mtu anatakiwa atumie busara yake mwenyewe."
  },
  {
    kipare: "Kiruke cha ibwe kimanywa ni igondwa",
    sw: "Joto la jiwe analijua mjusi — kitanda usichokililalia hujui kunguni wake",
    meaning: "Shida ambayo haijakupata hujui ugumu au urahisi wake. Usimhukumu mtu anayepitia hali ambayo hujapitia wewe mwenyewe."
  },
  {
    kipare: "Ndunyula wesiila na imeie majughuni henyu",
    sw: "Tunda usilolitumia na liote shambani kwenu",
    meaning: "Mtu anayesaidia watu au mwenye uwezo mkubwa anastahili heshima hata kama hakusaidii wewe moja kwa moja — thamini wema uliopo karibu nawe."
  },
  {
    kipare: "Wekiruka kijeghu uaghane na fae",
    sw: "Ukiruka kwenye ngema uelewane na nyonga yako",
    meaning: "Unapotaka kufanya jambo la hatari, ridhika na matokeo yake kwanza — mabaya au mazuri. Jiandae kikamilifu kabla ya hatua kubwa."
  },
  {
    kipare: "Yeghona yedhitika",
    sw: "Debe tupu haliachi kuvuma",
    meaning: "Mwenye kelele na maneno mengi mara nyingi hana madhara ya kweli — nguvu yake ni ya mdomo tu. Jihadhari na anayeonyesha nguvu kwa maneno lakini asiyetenda."
  },
  {
    kipare: "Nesitiwa aha ambu ichuha",
    sw: "Shujaa hatishwi kwa maneno",
    meaning: "Mtu anayejiamini habadili msimamo wake kwa sababu ya maneno ya watu. Imani ya ndani ndiyo nguvu ya kweli ya binadamu."
  },
  {
    kipare: "Limoghie mwana",
    sw: "Zaa mtoto umwite jina hilo",
    meaning: "Usiniite mara kwa mara bila sababu ya msingi. Usiniambie jambo tena na tena bila hatua ya kweli — tenda badala ya kusema."
  },
  {
    kipare: "Ikunguru kudhadhanya mlinga ni ndima kuneta",
    sw: "Kunguru baka jeupe la shingoni — kutokuungana ni kazi zimemzidi",
    meaning: "Ukishika majukumu mengi kwa wakati mmoja hutaweza kukamilisha yote kwa asilimia mia moja. Umakini wa kuchagua kipaumbele ni hekima ya kweli."
  },
  {
    kipare: "Ngoma mbiri nyika ethi mdu na wavo ni mdu na mlamue",
    sw: "Wanaume wawili mbugani — kama sio ndugu ni mtu na shemeji yake",
    meaning: "Ukiona watu wawili wanaambatana daima, wana uhusiano wa karibu — ndugu, rafiki wa kweli, au wanahusiana kwa njia fulani. Urafiki wa kweli unaonekana kwa vitendo."
  },
  {
    kipare: "Uthi omanie He Vuteme Vwako",
    sw: "Usipigane na mtu kwenye shamba lako lenye mazao",
    meaning: "Mtu akianzisha ugomvi nawe katika eneo la mamlaka yako, mkwepe au maliza huo ugomvi kwa hekima — wewe ndiye utaathirika zaidi."
  },
  {
    kipare: "Nineoka mbojo uneoka madio",
    sw: "Nitakuwa kunde na wewe ndizi",
    meaning: "Unayenitakia mabaya atakufata hivi karibuni. Chakula cha mharage (kunde) na ndizi kinapikwa kwa kuivisha maharage kwanza — ndizi huwekwa baadaye. Mabaya unayomtakia mwenzako yanakuja kwako pia."
  },
  {
    kipare: "Mathungo Ena Mda",
    sw: "Vichaka vimebeba mimba",
    meaning: "Usizungumze mambo ya siri njiani unapotembea — hujui ni nani yuko kichakani anakusikia. Siri za ukoo na familia zinahifadhiwe mahali salama."
  },
  {
    kipare: "Ngombe ya thanga ifwa na mkota",
    sw: "Ngombe anayemilikiwa kwa ubia wa watu wawili anakufa na ngozi yake",
    meaning: "Kitu kinachomilikiwa kwa pamoja bila mpango wazi huduma yake inakuwa dhaifu — kila mmoja anategemea mwingine na hakuna anayechukua jukumu. Umiliki ulio wazi unalinda."
  },
  {
    kipare: "Mshombe wahae utonga wehoa na thia",
    sw: "Mchuzi wa mbali unapoa njiani — fimbo ya mbali haiui nyoka",
    meaning: "Unatakiwa uwe karibu na tatizo ndipo unaweza kulikabili kwa urahisi na ufanisi. Kuongoza kwa umbali bila kuelewa hali halisi ni hatari."
  },
  {
    kipare: "Nzovu ikomwa ni mimvi mingi",
    sw: "Tembo anauawa na mishale mingi",
    meaning: "Tatizo kubwa haliwezi kushindwa kwa njia moja tu. Likabili kwa kutumia njia nyingi tofauti — umoja wa mkakati ndiyo nguvu ya ushindi."
  },
  {
    kipare: "Mtwi wa ngombe ubajwa na ithoka mtwi wa mndu ubajwa ni luhembe",
    sw: "Kichwa cha ngombe hupasuliwa kwa shoka — kichwa cha mtu hupasuliwa kwa upembe",
    meaning: "Ukitaka msaada wa kweli kutoka kwa mtu, mpe kwanza heshima na fadhila yake. Kila mtu ana njia yake ya kufunguliwa — jua njia hiyo kabla ya kuomba."
  },
  {
    kipare: "Kio hata itamba lirauma",
    sw: "Usiku hata konokono anauma",
    meaning: "Kuwa makini usiku — hata wale waliokuwa hawana madhara mchana wanaweza kukudhuru usiku. Tahadhari ya mara zote ni hekima."
  },
  {
    kipare: "Mbala kuehija mbembe ni kutethia marioko",
    sw: "Swala kuwa na pembe ndefu ni kwa sababu ameweza kukwepa wawindaji",
    meaning: "Ukiona mtu amefanikiwa katika jambo fulani, ujue amepambana na vikwazo vingi. Mafanikio hayakuja bure — nyuma ya kila ushindi kuna mapambano yasiyoonekana."
  },
  {
    kipare: "Teta ndori ivikwa ni chila",
    sw: "Utawala wa eneo dogo hudumu kutokana na siri za vikao vyake",
    meaning: "Ili utawala udumu — hata kama sio wa eneo kubwa — siri za vikao ni muhimu. Kiongozi anatakiwa kutunza siri za maamuzi ya ndani."
  },
  {
    kipare: "Kiavia cha ngondo ni kukia",
    sw: "Ujanja kwenye vita ni kuokoa roho yako",
    meaning: "Kwenye mapambano yoyote, tumia mbinu zozote ili uokoke. Ukishapona ndipo urekebishe njia uliyotumia. Kuishi ndiko kuendelea kupigana."
  }
];



// ══════════════════════════════════════════
// PROVERBS RENDER
// ══════════════════════════════════════════
function renderProverbs(){
  const c=document.getElementById('proverbs-container');
  if(c.innerHTML) return;
  c.innerHTML=PROVERBS.map((p,i)=>`
    <div class="proverb-card">
      <div class="prov-label">MSEMO ${i+1}</div>
      <div class="prov-kipare">${p.kipare}</div>
      <div class="prov-sw">"${p.sw}"</div>
      <div class="prov-meaning">${p.meaning}</div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ══════════════════════════════════════════
// STATS
// ══════════════════════════════════════════
function updateStats(){
  const total = Object.keys(PEOPLE).length;
  document.getElementById('stat-people').textContent=total+'+';
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
// Global dismissLoader — accessible from anywhere
function dismissLoader(){
  const loader = document.getElementById('loading');
  if(loader){ loader.style.opacity='0'; setTimeout(()=>{ if(loader.parentNode) loader.parentNode.removeChild(loader); },500); }
}

window.addEventListener('load',()=>{
  // Dismiss loader immediately
  dismissLoader();

  // HARD FAILSAFE — force dismiss loading screen after 4 seconds no matter what
  setTimeout(dismissLoader, 4000);

  try{
    buildBranchTabs();
    updateStats();
  } catch(e){ console.warn('Init error:',e); }

  // Keyboard zoom shortcuts
  document.addEventListener('keydown', e=>{
    const treeActive = document.getElementById('view-tree').classList.contains('active');
    if(!treeActive) return;
    if(e.target.tagName==='INPUT') return;
    if(e.key==='=' || e.key==='+') { e.preventDefault(); zoomIn(); }
    if(e.key==='-' || e.key==='_') { e.preventDefault(); zoomOut(); }
    if(e.key==='0')                { e.preventDefault(); resetZoom(); }
  });

  setTimeout(dismissLoader, 800);
  // Failsafe: force dismiss after 3 seconds no matter what
  setTimeout(dismissLoader, 3000);
});


// ═══════════════════════════════════════════════════════════════════
//  SUPABASE CONFIG
//  → Replace these 2 values with your own from supabase.com
// ═══════════════════════════════════════════════════════════════════
const SUPABASE_URL = 'https://mvztgyhivfxwjrqnphlj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12enRneWhpdmZ4d2pycW5waGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyODExMDEsImV4cCI6MjA4ODg1NzEwMX0.3gSNSf_8Hy2PDAd3i2392r0nxuUEvJWhso0MCpCcDuE';

// Admin user IDs (Supabase user UUIDs) — only these 3 can delete people
// Fill in after your family admins register
const ADMIN_IDS = [
  'fe841218-c6b7-4a6f-aab7-fcfd5a9e5d6c', // Rajabu Sekro
];
const BOT_USER_ID = '2b2dfc4f-a0d8-49b1-921c-e34f56af18da'; // WambagaBot

// ── Supabase REST helpers ──────────────────────────────────────────
let currentUser = null;
let currentUserProfile = null;
let currentSession = null;

async function sbFetch(path, opts={}){
  const headers = {
    'Content-Type':'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${currentSession?.access_token || SUPABASE_ANON_KEY}`,
    ...opts.headers
  };
  const res = await fetch(SUPABASE_URL + path, {...opts, headers});
  // 204 No Content (DELETE) — no body to parse
  if(res.status === 204 || res.headers.get('content-length') === '0') return {};
  const text = await res.text();
  if(!text) return {};
  const data = JSON.parse(text);
  if(!res.ok) throw new Error(data.message || data.error_description || JSON.stringify(data));
  return data;
}

async function sbAuth(path, body){
  const res = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method:'POST',
    headers:{'Content-Type':'application/json','apikey':SUPABASE_ANON_KEY},
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if(!res.ok) throw new Error(data.error_description || data.msg || 'Hitilafu ya mfumo');
  return data;
}

// ── AUTH STATE ─────────────────────────────────────────────────────
function isAdmin(){ return currentUser && ADMIN_IDS.includes(currentUser.id); }
function isLoggedIn(){ return !!currentUser; }

function updateAuthUI(){
  showAdminPanel();
  const btn = document.getElementById('auth-btn');
  const fab = document.getElementById('fab');
  if(!btn) return;
  if(isLoggedIn()){
    const name = currentUser.user_metadata?.full_name || currentUser.email || '';
    const displayName = name.includes('@') ? name.split('@')[0] : name.split(' ')[0];
    btn.textContent = '👤 ' + displayName;
    btn.classList.add('logged-in');
    btn.onclick = showUserMenu;
    if(fab) fab.classList.add('visible');
    // Show lounge post button
    const postBtn = document.getElementById('lounge-post-btn');
    if(postBtn) postBtn.style.display = 'flex';
  } else {
    btn.textContent = '🔐 Ingia';
    btn.classList.remove('logged-in');
    btn.onclick = openAuth;
    if(fab) fab.classList.remove('visible');
  }
  const panel = document.getElementById('detail-panel');
  if(panel && panel.classList.contains('open') && window._lastOpenedPersonId){
    openPanel(window._lastOpenedPersonId);
  }
}

function showUserMenu(){
  if(confirm(`Unataka kutoka? (${currentUser.email})`)){
    logOut();
  }
}

async function logOut(){
  try{
    await sbFetch('/auth/v1/logout', {method:'POST'});
  } catch(e){}
  currentUser = null;
  currentSession = null;
  localStorage.removeItem('sb_session');
  localStorage.removeItem('sb_user_persist');
  updateAuthUI();
  showToast('Umetoka. Tutaonana!');
  // Show login wall again
  setTimeout(showForcedLogin, 400);
}

// ── AUTH MODAL ─────────────────────────────────────────────────────
let authMode = 'login'; // 'login' | 'signup'


function openAuth(){
  authMode = 'login';
  document.getElementById('auth-title').textContent = 'Karibu — Ingia Ukoo';
  document.getElementById('auth-sub').textContent = 'Ingia kwa barua pepe na nywila yako';
  document.getElementById('auth-submit-btn').textContent = 'Ingia';
  document.getElementById('auth-name-field').style.display = 'none';
  document.getElementById('auth-switch').innerHTML = 'Sina akaunti? <a onclick="toggleAuthMode()" style="color:var(--gold);cursor:pointer">Jiunge hapa</a>';
  document.getElementById('auth-error').textContent = '';
  document.getElementById('auth-email').value = '';
  document.getElementById('auth-password').value = '';
  document.getElementById('auth-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('auth-email').focus(), 300);
}

function closeAuth(){
  document.getElementById('auth-overlay').classList.remove('open');
}

function toggleAuthMode(){
  authMode = authMode === 'login' ? 'signup' : 'login';
  if(authMode === 'signup'){
    document.getElementById('auth-title').textContent = 'Jisajili — Jiunge na Ukoo';
    document.getElementById('auth-sub').textContent = 'Unda akaunti yako ya familia';
    document.getElementById('auth-submit-btn').textContent = 'Jisajili';
    document.getElementById('auth-name-field').style.display = 'block';
    document.getElementById('auth-switch').innerHTML = 'Una akaunti? <a onclick="toggleAuthMode()" style="color:var(--gold);cursor:pointer">Ingia hapa</a>';
  } else {
    document.getElementById('auth-title').textContent = 'Karibu — Ingia Ukoo';
    document.getElementById('auth-sub').textContent = 'Ingia kwa barua pepe na nywila yako';
    document.getElementById('auth-submit-btn').textContent = 'Ingia';
    document.getElementById('auth-name-field').style.display = 'none';
    document.getElementById('auth-switch').innerHTML = 'Sina akaunti? <a onclick="toggleAuthMode()" style="color:var(--gold);cursor:pointer">Jiunge hapa</a>';
  }
  document.getElementById('auth-error').textContent = '';
}

async function submitAuth(){
  const email    = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const errEl    = document.getElementById('auth-error');
  const btn      = document.getElementById('auth-submit-btn');

  if(!email || !email.includes('@')){ errEl.textContent = 'Weka barua pepe sahihi'; return; }
  if(!password || password.length < 6){ errEl.textContent = 'Nywila lazima iwe herufi 6+'; return; }

  btn.textContent = '...'; btn.disabled = true;
  errEl.textContent = '';

  try {
    let data;
    if(authMode === 'login'){
      data = await sbAuth('/token?grant_type=password', {email, password});
    } else {
      const fullName = document.getElementById('auth-name').value.trim();
      data = await sbAuth('/signup', {email, password, data:{full_name: fullName||email.split('@')[0]}});
      if(data.id && !data.access_token){
        errEl.style.color = '#8fc88f';
        errEl.textContent = '✓ Akaunti imeundwa! Ingia sasa kwa nywila yako.';
        toggleAuthMode(); // switch to login
        btn.textContent = 'Ingia'; btn.disabled = false;
        return;
      }
    }
    await completeLogin(data);
  } catch(e){
    errEl.style.color = '#e87050';
    errEl.textContent = e.message.includes('Invalid') ? 'Barua pepe au nywila si sahihi' :
      e.message.includes('already') ? 'Barua pepe hii ina akaunti tayari — ingia' : e.message;
  }
  btn.textContent = authMode === 'login' ? 'Ingia' : 'Jisajili';
  btn.disabled = false;
}

async function submitDirectAuth(){ submitAuth(); } // legacy compat
async function submitMagicLink(){ submitAuth(); }  // legacy compat
function showAuthStep(n){}
function switchAuthTab(t){}
function verifyOTP(){}

async function completeLogin(data){
  currentSession = data;
  currentUser = data.user;
  localStorage.setItem('sb_session', JSON.stringify(data));
  // Remove login wall
  const wall = document.getElementById('login-wall');
  if(wall) wall.remove();
  // Close any open auth modal
  closeAuth();
  // Update top bar button to show name
  updateAuthUI();
  // Load data
  await loadCloudData();
  const name = (data.user.user_metadata?.full_name || data.user.email || '').split('@')[0].replace(/_/g,' ');
  showToast('✓ Karibu ' + name + '!');
  // Show claim leaf after short delay
  setTimeout(checkAndShowClaim, 1500);
}

// Handle magic link token in URL — supports both hash (#) and query (?) formats
async function handleMagicLinkCallback(){
  const hash   = window.location.hash;
  const search = window.location.search;
  const params_h = new URLSearchParams(hash.replace('#',''));
  const params_s = new URLSearchParams(search);

  let access_token  = params_h.get('access_token')  || params_s.get('access_token');
  let refresh_token = params_h.get('refresh_token') || params_s.get('refresh_token');

  // Supabase PKCE — code param needs exchange
  const code = params_s.get('code');
  if(!access_token && code){
    try {
      const res = await fetch(SUPABASE_URL+'/auth/v1/token?grant_type=pkce',{
        method:'POST',
        headers:{'Content-Type':'application/json','apikey':SUPABASE_ANON_KEY},
        body: JSON.stringify({auth_code: code})
      });
      const d = await res.json();
      access_token  = d.access_token;
      refresh_token = d.refresh_token;
    } catch(e){ console.warn('PKCE exchange error:', e); }
  }

  // Supabase token_hash format
  const token_hash = params_s.get('token_hash') || params_s.get('token');
  if(!access_token && token_hash){
    try {
      const type = params_s.get('type') || 'magiclink';
      const res = await fetch(SUPABASE_URL+'/auth/v1/verify',{
        method:'POST',
        headers:{'Content-Type':'application/json','apikey':SUPABASE_ANON_KEY},
        body: JSON.stringify({token_hash, type})
      });
      const d = await res.json();
      access_token  = d.access_token;
      refresh_token = d.refresh_token;
    } catch(e){ console.warn('Token verify error:', e); }
  }

  if(!access_token){ console.warn('No access_token found in URL'); return; }

  try {
    const res = await fetch(SUPABASE_URL+'/auth/v1/user',{
      headers:{'Authorization':'Bearer '+access_token,'apikey':SUPABASE_ANON_KEY}
    });
    const user = await res.json();
    if(!user.id){ console.warn('No user id:', user); return; }
    currentSession = {access_token, refresh_token, user};
    currentUser = user;
    localStorage.setItem('sb_session', JSON.stringify(currentSession));
    window.history.replaceState(null, '', window.location.pathname);
    updateAuthUI();
    await loadCloudData();
    showToast('✓ Umeingia! Karibu ' + (user.email||'').split('@')[0]);
    await checkAndShowClaim();
  } catch(e){ console.warn('Magic link session error:', e); }
}

// submitAuth legacy compat removed

// ── RESTORE SESSION ────────────────────────────────────────────────
async function restoreSession(){
  try{
    const saved = localStorage.getItem('sb_session');
    if(!saved) return;
    const session = JSON.parse(saved);
    // Refresh token
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method:'POST',
      headers:{'Content-Type':'application/json','apikey':SUPABASE_ANON_KEY},
      body: JSON.stringify({refresh_token: session.refresh_token})
    });
    if(res.ok){
      const data = await res.json();
      currentSession = data;
      currentUser = data.user;
      localStorage.setItem('sb_session', JSON.stringify(data));
      // Remove wall if session restored successfully
      const wall = document.getElementById('login-wall');
      if(wall) wall.remove();
      updateAuthUI();
      await loadCloudData();
    } else {
      localStorage.removeItem('sb_session');
    }
  } catch(e){ localStorage.removeItem('sb_session'); }
}

// ═══════════════════════════════════════════════════════════════════
//  CLOUD DATA — Add People, Photos
// ═══════════════════════════════════════════════════════════════════

// Load additions from Supabase and merge into PEOPLE
async function loadCloudData(){
  if(SUPABASE_URL === 'YOUR_SUPABASE_URL') return; // Not configured yet
  dismissLoader(); // Always dismiss loader when we start loading cloud data
  try{
    // Load added people
    const additions = await sbFetch('/rest/v1/wambaga_people?order=created_at.asc', {
      headers:{'Prefer':'return=representation'}
    });
    // Fetch ALL rows using pagination (Supabase limit is 1000 per request)
    let allAdditions = [];
    let offset = 0;
    const pageSize = 1000;
    while(true){
      const page = await sbFetch(
        `/rest/v1/wambaga_people?order=created_at.asc&limit=${pageSize}&offset=${offset}`,
        { headers:{'Prefer':'return=representation'} }
      );
      if(!page || page.length === 0) break;
      allAdditions = allAdditions.concat(page);
      if(page.length < pageSize) break;
      offset += pageSize;
    }
    console.log('☁️ loadCloudData: total rows from Supabase =', allAdditions.length);

    let newCount = 0;
    for(const row of allAdditions){
      if(!PEOPLE[row.local_id]){
        const id = row.local_id;
        PEOPLE[id] = {
          id, name:row.name, gen:row.gen, branch:row.branch,
          parentId:row.parent_id, children:[],
          note:row.note||'', born:row.born||'', died:row.died||'',
          spouse:row.spouse||'', location:row.location||'',
          isFemale: row.is_female||false, isUnknown:false,
          cloudId: row.id, addedBy: row.added_by,
          profile_photo: row.profile_photo||null
        };
        if(row.parent_id && PEOPLE[row.parent_id] && !PEOPLE[row.parent_id].children.includes(id)){
          PEOPLE[row.parent_id].children.push(id);
        }
        newCount++;
      }
    }
    console.log('☁️ loadCloudData: new people added =', newCount);

    // Load profile photos for all existing people
    const profileData = await sbFetch('/rest/v1/wambaga_people?select=local_id,profile_photo&profile_photo=not.is.null');
    for(const row of profileData){
      if(row.local_id && row.profile_photo && PEOPLE[row.local_id]){
        PEOPLE[row.local_id].profile_photo = row.profile_photo;
      }
    }


    // Load photos
    const photos = await sbFetch('/rest/v1/wambaga_photos?select=id,person_id,url,uploaded_by,created_at&order=created_at.desc');
    for(const photo of photos){
      if(PEOPLE[photo.person_id]){
        if(!PEOPLE[photo.person_id].photos) PEOPLE[photo.person_id].photos = [];
        if(!PEOPLE[photo.person_id].photos.find(p=>p.id===photo.id)){
          PEOPLE[photo.person_id].photos.push({id:photo.id, url:photo.url});
        }
      }
      // Also add to gallery
      addToGallery(photo);
    }

    updateStats();
    // Re-render tree if visible
    if(document.getElementById('view-tree').classList.contains('active') && Object.keys(PEOPLE).length < 500){
      renderTree(curRootId);
    }
    // Update detail panel if open
    if(window._lastOpenedPersonId && document.getElementById('detail-panel').classList.contains('open')){
      openPanel(window._lastOpenedPersonId);
    }
  } catch(e){
    console.warn('Cloud load error:', e.message);
  }
}

// ── ADD PERSON ─────────────────────────────────────────────────────
function openAddModal(){
  if(!isLoggedIn()){ openAuth(); return; }
  document.getElementById('add-name').value='';
  document.getElementById('add-gen').value='';
  document.getElementById('add-parent-search').value='';
  document.getElementById('add-parent-id').value='';
  document.getElementById('add-note').value='';
  document.getElementById('add-born').value='';
  document.getElementById('add-location').value='';
  document.getElementById('add-spouse').value='';
  document.getElementById('add-error').textContent='';
  document.getElementById('parent-suggestions').style.display='none';
  document.getElementById('add-modal').classList.add('open');
}

function closeAddModal(){
  document.getElementById('add-modal').classList.remove('open');
}

function searchParentSuggestions(q){
  const box = document.getElementById('parent-suggestions');
  if(!q || q.length < 2){ box.style.display='none'; return; }
  const lower = q.toLowerCase();
  const matches = Object.values(PEOPLE)
    .filter(p=>p.name.toLowerCase().includes(lower))
    .slice(0,8);
  if(!matches.length){ box.style.display='none'; return; }
  box.style.display='block';
  box.innerHTML = matches.map(p=>`
    <div onclick="selectParent('${p.id}','${p.name.replace(/'/g,"\'")}')"
         style="padding:.5rem .8rem;cursor:pointer;font-size:.8rem;color:var(--cream2);border-bottom:1px solid var(--border);background:var(--panel2)">
      <span style="color:var(--gold-l)">${p.name}</span>
      <span style="color:var(--cream3);font-size:.7rem;margin-left:.5rem">Gen ${p.gen} · ${p.branch}</span>
    </div>`).join('');
}

function selectParent(id, name){
  document.getElementById('add-parent-id').value = id;
  document.getElementById('add-parent-search').value = name;
  document.getElementById('parent-suggestions').style.display='none';
}

async function submitAddPerson(){
  const name = document.getElementById('add-name').value.trim();
  const gen = parseInt(document.getElementById('add-gen').value);
  const parentId = document.getElementById('add-parent-id').value;
  const branch = document.getElementById('add-branch').value;
  const isFemale = document.getElementById('add-gender').value === 'female';
  const note = document.getElementById('add-note').value.trim();
  const born = document.getElementById('add-born').value.trim();
  const location = document.getElementById('add-location').value.trim();
  const spouse = document.getElementById('add-spouse').value.trim();
  const errEl = document.getElementById('add-error');
  const btn = document.getElementById('add-submit-btn');

  if(!name){ errEl.textContent='Jaza jina la mtu'; return; }
  if(!gen || gen<1 || gen>20){ errEl.textContent='Jaza kizazi sahihi (1-20)'; return; }
  if(!parentId){ errEl.textContent='Chagua mzazi kutoka orodha'; return; }

  btn.textContent='...'; btn.disabled=true; errEl.textContent='';

  try{
    // Use UUID to avoid conflicts with existing local IDs
    const localId = 'cloud_' + Date.now() + '_' + Math.random().toString(36).substr(2,9);
    const row = {
      local_id: localId, name, gen, branch,
      parent_id: parentId, note, born, location, spouse,
      is_female: isFemale,
      added_by: currentUser.id
    };

    if(SUPABASE_URL !== 'YOUR_SUPABASE_URL'){
      const result = await sbFetch('/rest/v1/wambaga_people', {
        method:'POST',
        headers:{'Prefer':'return=representation'},
        body: JSON.stringify(row)
      });
      console.log('☁️ POST result:', JSON.stringify(result).substring(0,200));
    }

    // Add locally
    PEOPLE[localId] = {
      id:localId, name, gen, branch, parentId,
      children:[], note, born, died:'', spouse, location,
      isFemale, isUnknown:false, addedBy:currentUser.id
    };
    if(PEOPLE[parentId]) PEOPLE[parentId].children.push(localId);

    closeAddModal();
    updateStats();
    showToast('✓ ' + name + ' ameongezwa katika mti!');
    if(document.getElementById('view-tree').classList.contains('active')){
      // Check if parent is visible in current tree view before re-rendering
      // to avoid -Infinity SVG size error
      const parentInView = curRootId && isInSubtree(parentId, curRootId);
      if(parentInView){
        renderTree(curRootId);
      } else {
        // Navigate to the parent's branch so user can see the new person
        // Find which branch the parent belongs to
        const parentPerson = PEOPLE[parentId];
        if(parentPerson){
          const parentBranch = BRANCHES.find(b => isInSubtree(parentId, b.root));
          if(parentBranch){
            curBranch = parentBranch.id;
            curRootId = parentBranch.root;
            navStack = [];
            renderTree(curRootId);
            updateNavUI();
          }
        }
      }
    }
  } catch(e){
    errEl.textContent = 'Hitilafu: ' + e.message;
  }
  btn.textContent='💾 Hifadhi'; btn.disabled=false;
}

// ── DELETE PERSON (Admins only) ─────────────────────────────────────
async function deletePerson(personId){
  if(!isAdmin()){ showToast('Ruhusa ya kufuta ni ya wasimamizi tu'); return; }
  const person = PEOPLE[personId];
  if(!person) return;
  if(person.children.length > 0){
    showToast('Haiwezekani kufuta — mtu huyu ana watoto ' + person.children.length + ' kwenye mti');
    return;
  }
  if(!confirm(`Futa "${person.name}" kutoka mti wa familia?
Hii haiwezi kurudishwa.`)) return;

  try{
    if(SUPABASE_URL !== 'YOUR_SUPABASE_URL' && person.cloudId){
      await sbFetch('/rest/v1/wambaga_people?id=eq.' + person.cloudId, {method:'DELETE'});
    }
    // Remove from parent's children
    if(person.parentId && PEOPLE[person.parentId]){
      PEOPLE[person.parentId].children = PEOPLE[person.parentId].children.filter(c=>c!==personId);
    }
    delete PEOPLE[personId];
    closePanel();
    updateStats();
    showToast('✓ Mtu amefutwa kutoka mti');
    if(document.getElementById('view-tree').classList.contains('active')) renderTree();
  } catch(e){
    showToast('Hitilafu ya kufuta: ' + e.message);
  }
}


// ── DELETE PHOTO ───────────────────────────────────────────────────
async function deletePhoto(personId, photoId, containerEl){
  if(!isLoggedIn()){ showToast('Ingia kwanza'); return; }
  if(!confirm('Futa picha hii?')) return;
  try {
    if(SUPABASE_URL !== 'YOUR_SUPABASE_URL' && photoId && !photoId.startsWith('local_')){
      await sbFetch('/rest/v1/wambaga_photos?id=eq.'+photoId, {
        method:'DELETE',
        headers:{'Authorization':'Bearer '+currentSession.access_token}
      });
      // Touch wambaga_people updated_at to trigger Realtime for other users
      if(personId){
        sbFetch('/rest/v1/wambaga_people?local_id=eq.'+personId, {
          method:'PATCH',
          headers:{'Prefer':'return=minimal'},
          body: JSON.stringify({updated_at: new Date().toISOString()})
        }).catch(()=>{});
      }
    }
    if(containerEl) containerEl.remove();
    // Remove from ALL local caches
    if(PEOPLE[personId] && PEOPLE[personId].photos)
      PEOPLE[personId].photos = PEOPLE[personId].photos.filter(p=>p.id!==photoId);
    galleryPhotos = galleryPhotos.filter(p=>p.id!==photoId);
    for(const p of Object.values(PEOPLE))
      if(p.photos) p.photos = p.photos.filter(ph=>ph.id!==photoId);
    if(document.getElementById('view-gallery')?.classList.contains('active')) renderGallery();
    showToast('✓ Picha imefutwa');
  } catch(e){ showToast('Hitilafu: '+e.message); }
}

async function deletePhotoGlobal(photoId, containerEl){
  if(!isAdmin()){ showToast('Admini peke yake'); return; }
  if(!confirm('Futa picha hii?')) return;
  try {
    if(SUPABASE_URL !== 'YOUR_SUPABASE_URL' && photoId && !photoId.startsWith('local_')){
      await sbFetch('/rest/v1/wambaga_photos?id=eq.'+photoId, {
        method:'DELETE',
        headers:{'Authorization':'Bearer '+currentSession.access_token}
      });
    }
    if(containerEl) containerEl.remove();
    galleryPhotos = galleryPhotos.filter(p=>p.id!==photoId);
    showToast('✓ Picha imefutwa');
  } catch(e){ showToast('Hitilafu: '+e.message); }
}

// ── SET PROFILE PHOTO ──────────────────────────────────────────────
// Upload a new photo directly as profile picture (Instagram-style)
async function changeProfilePhoto(personId){
  if(!isLoggedIn()){ showToast('Ingia kwanza'); return; }
  if(!personId){ showToast('Fungua mtu kwanza'); return; }
  const input = document.createElement('input');
  input.type='file'; input.accept='image/*';
  input.onchange = async function(e){
    const file = e.target.files[0];
    if(!file) return;
    if(file.size > 5*1024*1024){ showToast('Picha kubwa sana — chini ya 5MB'); return; }
    showToast('Inapakia...');
    try {
      const ext = file.name.split('.').pop().toLowerCase();
      const fpath = 'profiles/' + personId + '_' + Date.now() + '.' + ext;
      const uploadRes = await fetch(SUPABASE_URL+'/storage/v1/object/Wambaga-photos/'+fpath,{
        method:'POST',
        headers:{
          'Authorization':'Bearer '+currentSession.access_token,
          'apikey':SUPABASE_ANON_KEY,
          'Content-Type':file.type,
          'x-upsert':'true'
        },
        body: file
      });
      if(!uploadRes.ok) throw new Error('Upload ilishindwa');
      const photoUrl = SUPABASE_URL+'/storage/v1/object/public/Wambaga-photos/'+fpath;
      await setProfilePhoto(personId, photoUrl);
    } catch(err){ showToast('Hitilafu: '+err.message); }
  };
  input.click();
}

async function setProfilePhoto(personId, url){
  if(!isLoggedIn()){ showToast('Ingia kwanza'); return; }
  try {
    if(SUPABASE_URL !== 'YOUR_SUPABASE_URL'){
      // Use local_id to find record, then patch
      await sbFetch('/rest/v1/wambaga_people?local_id=eq.'+personId, {
        method:'PATCH',
        headers:{'Prefer':'return=minimal','Authorization':'Bearer '+currentSession.access_token},
        body: JSON.stringify({profile_photo: url})
      });
    }
    if(PEOPLE[personId]) PEOPLE[personId].profile_photo = url;
    // Update avatar circle immediately — show real photo like Instagram
    const avatarEl = document.getElementById('dp-avatar');
    if(avatarEl){
      avatarEl.innerHTML = '<img src="'+url+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block">';
    }
    // Also update any tree node for this person if visible
    const treeNode = document.querySelector('[data-pid="'+personId+'"] .node-avatar, [data-pid="'+personId+'"] image');
    if(treeNode){ treeNode.setAttribute('href', url); }
    showToast('✓ Picha ya wasifu imewekwa!');
  } catch(e){ showToast('Hitilafu: '+e.message); }
}

// ── PHOTO UPLOAD ───────────────────────────────────────────────────
async function uploadPhotoForPerson(personId){
  if(!isLoggedIn()){ openAuth(); return; }
  const input = document.createElement('input');
  input.type='file'; input.accept='image/*';
  input.onchange = async (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    if(file.size > 5*1024*1024){ showToast('Picha kubwa sana — lazima iwe chini ya 5MB'); return; }

    showToast('Inapakia picha...');
    try{
      // Upload to Supabase Storage
      const ext = file.name.split('.').pop().toLowerCase();
      const path = `photos/${personId}/${Date.now()}.${ext}`;
      
      if(SUPABASE_URL !== 'YOUR_SUPABASE_URL'){
        const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/Wambaga-photos/${path}`,{
          method:'POST',
          headers:{
            'Authorization':`Bearer ${currentSession.access_token}`,
            'apikey': SUPABASE_ANON_KEY,
            'Content-Type': file.type,
            'x-upsert':'true'
          },
          body: file
        });
        if(!uploadRes.ok){
          const err = await uploadRes.json();
          throw new Error(err.message || 'Upload ilishindwa');
        }
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/Wambaga-photos/${path}`;
        
        // Save to photos table
        const photoRow = {
          person_id: personId,
          url: publicUrl,
          uploaded_by: currentUser.id
        };
        const savedPhoto = await sbFetch('/rest/v1/wambaga_photos',{
          method:'POST',
          headers:{'Prefer':'return=representation'},
          body: JSON.stringify(photoRow)
        });

        if(!PEOPLE[personId].photos) PEOPLE[personId].photos = [];
        const photoObj = {id: savedPhoto[0]?.id, url: publicUrl};
        PEOPLE[personId].photos.push(photoObj);
        addToGallery({...photoRow, id: savedPhoto[0]?.id});
      } else {
        // Demo mode - use local blob URL
        const blobUrl = URL.createObjectURL(file);
        if(!PEOPLE[personId].photos) PEOPLE[personId].photos = [];
        PEOPLE[personId].photos.push({id:'local_'+Date.now(), url:blobUrl});
      }

      showToast('✓ Picha imepakiwa!');
      if(window._lastOpenedPersonId === personId) openPanel(personId);
    } catch(err){
      showToast('Hitilafu ya picha: ' + err.message);
    }
  };
  input.click();
}

// ── GALLERY ────────────────────────────────────────────────────────
let galleryPhotos = [];

function addToGallery(photo){
  if(galleryPhotos.find(p=>p.id===photo.id)) return;
  galleryPhotos.push(photo);
  renderGallery();
}

function renderGallery(){
  const grid = document.getElementById('gallery-dynamic');
  if(!grid) return;
  const empty = document.getElementById('gallery-empty');
  const countEl = document.getElementById('gallery-count');
  if(galleryPhotos.length===0){
    if(empty) empty.style.display='block';
    grid.innerHTML='';
    if(countEl) countEl.textContent='';
    return;
  }
  if(empty) empty.style.display='none';
  if(countEl) countEl.textContent = galleryPhotos.length + ' picha';
  grid.innerHTML = galleryPhotos.map(function(photo){
    var owner = (photo.person_id && PEOPLE[photo.person_id]) ? PEOPLE[photo.person_id].name.split('/')[0].trim() : 'Picha';
    var hasPerson = !!(photo.person_id && PEOPLE[photo.person_id]);
    var delBtn = isAdmin() ? '<button onclick="deletePhotoGlobal(\'' + photo.id + '\',this.parentElement)" style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,0.75);border:none;color:#fff;cursor:pointer;font-size:.7rem;padding:2px 6px;border-radius:2px">✕</button>' : '';
    var labelClick = hasPerson ? ' onclick="goToPersonInTree(\'' + photo.person_id + '\')" style="cursor:pointer;text-decoration:underline dotted;color:var(--gold-l)"' : '';
    return '<div style="position:relative">' +
      '<img class="gal-img" src="' + photo.url + '" alt="' + owner + '" onclick="openLightbox(\'' + photo.url + '\',\'' + owner.replace(/'/g,"\\'") + '\')">' +
      '<div class="gal-item-label"' + labelClick + '>' + owner + (hasPerson ? ' ↗' : '') + '</div>' +
      delBtn + '</div>';
  }).join('');
}

function openLightbox(url, caption){
  document.getElementById('lightbox-img').src = url;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
}

// ── PATCH openPanel to add photo & delete UI ──────────────────────
const _origOpenPanel = openPanel;
window.openPanel = function(personId){
  window._lastOpenedPersonId = personId;
  _origOpenPanel(personId);
  
  const body = document.getElementById('dp-body');
  if(!body) return;

  // Add photo section
  const person = PEOPLE[personId];
  if(!person) return;

  // Photo section
  let photoHTML = `
    <div class="dp-section">
      <div class="dp-section-title">Picha</div>
      <div class="dp-photo-grid" id="dp-photos-${personId}">`;
  
  if(person.photos && person.photos.length){
    photoHTML += person.photos.map(function(ph){
      var pname = person.name.split('/')[0].trim();
      var delBtn = isLoggedIn() ? '<button title="Futa picha" onclick="deletePhoto(\'' + personId + '\',\'' + ph.id + '\',this.closest(\'.photo-card\'))" style="position:absolute;top:3px;right:3px;background:rgba(0,0,0,0.75);border:none;color:#fff;cursor:pointer;font-size:.65rem;padding:2px 5px;border-radius:2px;line-height:1">✕</button>' : '';
      var profBtn = isLoggedIn() ? '<button title="Weka picha ya wasifu" onclick="setProfilePhoto(\'' + personId + '\',\'' + ph.url + '\')" style="display:block;width:100%;margin-top:3px;background:rgba(201,146,42,0.15);border:1px solid rgba(201,146,42,0.4);color:var(--gold-l);cursor:pointer;font-size:.6rem;padding:2px 4px;border-radius:2px;white-space:nowrap">👤 Wasifu</button>' : '';
      return '<div class="photo-card" style="position:relative;display:inline-block;vertical-align:top"><img class="dp-photo-img" src="' + ph.url + '" alt="' + pname + '" onclick="openLightbox(\'' + ph.url + '\',\'' + pname.replace(/'/g, "\\'") + '\')">' + delBtn + profBtn + '</div>';
    }).join('');
  }

  if(isLoggedIn()){
    photoHTML += `
      <div class="dp-photo-add" onclick="uploadPhotoForPerson('${personId}')">
        <div class="dp-photo-add-icon">📷</div>
        <div class="dp-photo-add-label">Pakia</div>
      </div>`;
  } else {
    photoHTML += `
      <div class="dp-photo-add" onclick="openAuth()">
        <div class="dp-photo-add-icon">🔐</div>
        <div class="dp-photo-add-label">Ingia</div>
      </div>`;
  }
  photoHTML += `</div></div>`;

  // Delete button (admins only) — check with delay if needed
  let deleteHTML = '';
  const adminCheck = () => ADMIN_IDS.includes(currentUser?.id);
  if(adminCheck()){
    deleteHTML = `<button class="dp-delete-btn" onclick="deletePerson('${personId}')">🗑 Futa Mtu Huyu</button>`;
  } else if(currentUser && !adminCheck()){
    // Not admin, no button
    deleteHTML = '';
  } else if(!currentUser){
    // User not loaded yet — add placeholder that checks again
    deleteHTML = `<div id="delete-btn-placeholder-${personId}"></div>`;
    setTimeout(()=>{
      const ph = document.getElementById('delete-btn-placeholder-${personId}');
      if(ph && adminCheck()){
        ph.outerHTML = '<button class="dp-delete-btn" onclick="deletePerson(\'${personId}\')">🗑 Futa Mtu Huyu</button>';
      }
    }, 500);
  }

  body.insertAdjacentHTML('beforeend', photoHTML + deleteHTML);
};

// Gallery is called from showView directly

// ══════════════════════════════════════════
// MOBILE DRAWER
// ══════════════════════════════════════════
function openMobDrawer(){
  document.getElementById('mob-drawer').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeMobDrawer(){
  document.getElementById('mob-drawer').classList.remove('open');
  document.body.style.overflow='';
}

// ══════════════════════════════════════════
// UPDATED showView — also marks mobile drawer active item
// ══════════════════════════════════════════
(function(){
  const _orig = showView;
  window.showView = function(v){
    _orig(v);
    document.querySelectorAll('.mob-nav-item').forEach(el=>el.classList.remove('mob-active'));
    const mobEl = document.getElementById('mob-'+v);
    if(mobEl) mobEl.classList.add('mob-active');
    if(v === 'gallery') renderGallery();
    if(v === 'historia') checkHistoriaAdmin();
    window.scrollTo(0,0);
  };
})();

// ══════════════════════════════════════════
// ANCESTOR NAVIGATION IN PANEL
// ══════════════════════════════════════════
(function(){
  const _origOpen = openPanel;
  window.openPanel = function(id){
    _origOpen(id);
    window._lastOpenedId = id;
    const person = PEOPLE[id];
    if(!person) return;
    // Build ancestor breadcrumb and prepend to dp-body
    const ancestors = [];
    let cur = person;
    while(cur.parentId && PEOPLE[cur.parentId] && ancestors.length < 8){
      cur = PEOPLE[cur.parentId];
      ancestors.unshift(cur);
    }
    if(!ancestors.length) return;
    const body = document.getElementById('dp-body');
    let html = '<div class="dp-ancestors">';
    ancestors.forEach(anc=>{
      html += `<button class="dp-anc-btn" onclick="openPanel('${anc.id}')">${anc.name.split('/')[0].trim()}</button>`;
      html += '<span class="dp-anc-sep">›</span>';
    });
    html += `<span style="color:var(--cream2);font-size:.63rem">${person.name.split('/')[0].trim()}</span>`;
    html += '</div>';
    body.insertAdjacentHTML('afterbegin', html);
    // Add Edit button for logged-in users
    if(isLoggedIn()){
      const firstSection = body.querySelector('.dp-section-title');
      if(firstSection && !firstSection.querySelector('.edit-inline-btn')){
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-inline-btn';
        editBtn.style.cssText = 'float:right;font-family:Raleway,sans-serif;font-size:.56rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:.22rem .6rem;border:1px solid var(--border2);background:rgba(201,146,42,.08);color:var(--gold-l);cursor:pointer';
        editBtn.textContent = '✏️ Hariri';
        editBtn.onclick = ()=>openEditModal(id);
        firstSection.appendChild(editBtn);
      }
    }
  };
})();

// ══════════════════════════════════════════
// EDIT PERSON MODAL
// ══════════════════════════════════════════
function openEditModal(personId){
  const person = PEOPLE[personId];
  if(!person || !isLoggedIn()){ if(!isLoggedIn()) openAuth(); return; }
  const overlay = document.getElementById('edit-overlay');
  document.getElementById('edit-person-id').value = personId;
  document.getElementById('edit-modal-name').textContent = person.name.split('/')[0].trim();
  document.getElementById('edit-born').value  = person.born || '';
  document.getElementById('edit-died').value  = person.died || '';
  document.getElementById('edit-location').value = person.location || '';
  document.getElementById('edit-spouse').value = person.spouse || '';
  document.getElementById('edit-note').value   = person.note || '';
  overlay.classList.add('open');
}
function closeEditModal(){
  document.getElementById('edit-overlay').classList.remove('open');
}
async function submitEditPerson(){
  const id = document.getElementById('edit-person-id').value;
  const person = PEOPLE[id];
  if(!person) return;
  const btn = document.getElementById('edit-submit-btn');
  btn.textContent = 'Inahifadhi...'; btn.disabled = true;
  person.born     = document.getElementById('edit-born').value.trim();
  person.died     = document.getElementById('edit-died').value.trim();
  person.location = document.getElementById('edit-location').value.trim();
  person.spouse   = document.getElementById('edit-spouse').value.trim();
  person.note     = document.getElementById('edit-note').value.trim();
  // Save to Supabase if configured
  if(SUPABASE_URL !== 'YOUR_SUPABASE_URL'){
    try{
      const updateData = {
        born:person.born||null,
        died:person.died||null,
        location:person.location||null,
        spouse:person.spouse||null,
        note:person.note||null,
        updated_at: new Date().toISOString()
      };
      // Check if person exists in Supabase (has cloudId = UUID) or by local_id
      if(person.cloudId){
        // Person was added via app — use UUID
        await sbFetch('/rest/v1/wambaga_people?id=eq.'+person.cloudId,{
          method:'PATCH',
          headers:{'Prefer':'return=minimal'},
          body:JSON.stringify(updateData)
        });
      } else {
        // Person from data.js — try by local_id, insert if not found
        const existing = await sbFetch('/rest/v1/wambaga_people?local_id=eq.'+encodeURIComponent(id)+'&select=id');
        if(existing && existing.length > 0){
          await sbFetch('/rest/v1/wambaga_people?local_id=eq.'+encodeURIComponent(id),{
            method:'PATCH',
            headers:{'Prefer':'return=minimal'},
            body:JSON.stringify(updateData)
          });
        } else {
          // Insert new record for this local person
          await sbFetch('/rest/v1/wambaga_people',{
            method:'POST',
            headers:{'Prefer':'return=minimal'},
            body:JSON.stringify({
              local_id:id, name:person.name, gen:person.gen,
              branch:person.branch, parent_id:person.parentId||null,
              is_female:person.isFemale||false,
              ...updateData
            })
          });
        }
      }
      console.log('✅ Saved to Supabase:', id);
    }catch(e){console.warn('Edit save error:',e)}
  }
  showToast('✅ Maelezo yamehifadhiwa!');
  closeEditModal();
  if(window._lastOpenedId === id) openPanel(id);
  btn.textContent = '💾 Hifadhi'; btn.disabled = false;
}

function searchAndOpenEdit(name){
  const match = Object.values(PEOPLE).find(p=>p.name.toLowerCase().includes(name.toLowerCase()));
  if(match){ showView('tree'); setTimeout(()=>openPanel(match.id),300); }
  else showToast('Mtu "'+name+'" hajapatikana. Ongeza kwanza.');
}

// ═══════════════════════════════════════════════════════════════════
//  STARTUP
// ═══════════════════════════════════════════════════════════════════
// Restore session on load
window.addEventListener('load', async ()=>{
  // Handle magic link callback first
  const _url = window.location;
  const _hasToken = _url.hash.includes('access_token') ||
    _url.search.includes('access_token') ||
    _url.search.includes('token_hash') ||
    _url.search.includes('token=') ||
    _url.search.includes('code=');

  if(_hasToken){
    await handleMagicLinkCallback();
  } else {
    // Try to restore saved session
    if(SUPABASE_URL !== 'YOUR_SUPABASE_URL'){
      await restoreSession();
    }
  }

  updateAuthUI();

  // Always dismiss loader here — whether logged in or not
  dismissLoader();

  if(!isLoggedIn()){
    // Load cloud data in background while showing login wall
    loadCloudData(); // intentionally not awaited
    showForcedLogin();
    return;
  }

  // Logged in — load everything
  await loadCloudData();
});

function showForcedLogin(){
  // Cover entire app with login wall
  const wall = document.createElement('div');
  wall.id = 'login-wall';
  wall.style.cssText = 'position:fixed;inset:0;z-index:99999;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem';

  wall.innerHTML = `
  <div style="background:var(--panel);border:1px solid var(--border);border-radius:20px;padding:2rem;width:100%;max-width:360px;box-shadow:0 8px 40px rgba(0,0,0,0.1)">
    <div style="text-align:center;margin-bottom:1.8rem">
      <div style="font-family:'Cinzel',serif;font-size:1.4rem;font-weight:700;color:var(--gold);letter-spacing:.1em">WAMBAGA</div>
      <div style="font-size:.65rem;color:var(--ink3);letter-spacing:.2em;text-transform:uppercase;margin-top:4px">Ukoo wa Wapare · Tanzania</div>
    </div>
    <div id="wall-error" style="color:#e07050;font-size:.8rem;margin-bottom:.8rem;min-height:1.2rem;text-align:center;padding:0 .5rem"></div>
    <div id="wall-success" style="color:#4a9a6a;font-size:.8rem;margin-bottom:.8rem;min-height:1.2rem;text-align:center;display:none;padding:8px;background:rgba(74,154,106,0.1);border-radius:8px;border:1px solid rgba(74,154,106,0.3)"></div>

    <!-- LOGIN FORM -->
    <div id="wall-login-form">
      <input type="email" id="wall-email" placeholder="Barua pepe yako" autocomplete="email"
        style="width:100%;background:var(--panel2);border:1.5px solid var(--border);border-radius:10px;padding:.75rem 1rem;color:var(--ink);font-size:.9rem;box-sizing:border-box;margin-bottom:.7rem;outline:none;font-family:'Raleway',sans-serif"
        onfocus="this.style.borderColor='var(--gold-l)'" onblur="this.style.borderColor='var(--border)'"
        onkeydown="if(event.key==='Enter')document.getElementById('wall-password').focus()">
      <input type="password" id="wall-password" placeholder="Nywila" autocomplete="current-password"
        style="width:100%;background:var(--panel2);border:1.5px solid var(--border);border-radius:10px;padding:.75rem 1rem;color:var(--ink);font-size:.9rem;box-sizing:border-box;margin-bottom:1rem;outline:none;font-family:'Raleway',sans-serif"
        onfocus="this.style.borderColor='var(--gold-l)'" onblur="this.style.borderColor='var(--border)'"
        onkeydown="if(event.key==='Enter')submitWallLogin()">
      <button onclick="submitWallLogin()" id="wall-login-btn"
        style="width:100%;background:var(--gold);color:#fff;border:none;border-radius:10px;padding:.85rem;font-size:.95rem;font-weight:700;cursor:pointer;font-family:'Raleway',sans-serif;transition:all .2s"
        onmouseover="this.style.background='var(--gold-l)'" onmouseout="this.style.background='var(--gold)'">Ingia →</button>
      <div style="text-align:center;margin-top:1rem;font-size:.8rem;color:var(--ink3)">
        Huna akaunti? 
        <span onclick="wallShowRegister()" style="color:var(--gold);cursor:pointer;font-weight:700;text-decoration:underline">Jiunge hapa</span>
      </div>
    </div>

    <!-- REGISTER FORM (hidden initially) -->
    <div id="wall-register-form" style="display:none">
      <input type="text" id="wall-username" placeholder="Jina utakalotumia (username)" autocomplete="username"
        style="width:100%;background:var(--panel2);border:1.5px solid var(--border);border-radius:10px;padding:.75rem 1rem;color:var(--ink);font-size:.9rem;box-sizing:border-box;margin-bottom:.7rem;outline:none;font-family:'Raleway',sans-serif"
        onfocus="this.style.borderColor='var(--gold-l)'" onblur="this.style.borderColor='var(--border)'"
        onkeydown="if(event.key==='Enter')document.getElementById('wall-reg-email').focus()">
      <input type="email" id="wall-reg-email" placeholder="Barua pepe yako" autocomplete="email"
        style="width:100%;background:var(--panel2);border:1.5px solid var(--border);border-radius:10px;padding:.75rem 1rem;color:var(--ink);font-size:.9rem;box-sizing:border-box;margin-bottom:.7rem;outline:none;font-family:'Raleway',sans-serif"
        onfocus="this.style.borderColor='var(--gold-l)'" onblur="this.style.borderColor='var(--border)'"
        onkeydown="if(event.key==='Enter')document.getElementById('wall-reg-password').focus()">
      <input type="password" id="wall-reg-password" placeholder="Nywila (herufi 6+)" autocomplete="new-password"
        style="width:100%;background:var(--panel2);border:1.5px solid var(--border);border-radius:10px;padding:.75rem 1rem;color:var(--ink);font-size:.9rem;box-sizing:border-box;margin-bottom:1rem;outline:none;font-family:'Raleway',sans-serif"
        onfocus="this.style.borderColor='var(--gold-l)'" onblur="this.style.borderColor='var(--border)'"
        onkeydown="if(event.key==='Enter')submitWallRegister()">
      <button onclick="submitWallRegister()" id="wall-reg-btn"
        style="width:100%;background:var(--gold);color:#fff;border:none;border-radius:10px;padding:.85rem;font-size:.95rem;font-weight:700;cursor:pointer;font-family:'Raleway',sans-serif;transition:all .2s"
        onmouseover="this.style.background='var(--gold-l)'" onmouseout="this.style.background='var(--gold)'">Jiunge →</button>
      <div style="text-align:center;margin-top:1rem;font-size:.8rem;color:var(--ink3)">
        Una akaunti? 
        <span onclick="wallShowLogin()" style="color:var(--gold);cursor:pointer;font-weight:700;text-decoration:underline">Ingia hapa</span>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(wall);
}

function wallShowLogin(){
  document.getElementById('wall-login-form').style.display = 'block';
  document.getElementById('wall-register-form').style.display = 'none';
  document.getElementById('wall-error').textContent = '';
  document.getElementById('wall-success').style.display = 'none';
  setTimeout(()=>document.getElementById('wall-email')?.focus(), 100);
}

function wallShowRegister(){
  document.getElementById('wall-login-form').style.display = 'none';
  document.getElementById('wall-register-form').style.display = 'block';
  document.getElementById('wall-error').textContent = '';
  document.getElementById('wall-success').style.display = 'none';
  setTimeout(()=>document.getElementById('wall-username')?.focus(), 100);
}

async function submitWallLogin(){
  const email    = (document.getElementById('wall-email')?.value||'').trim();
  const password = document.getElementById('wall-password')?.value||'';
  const errEl    = document.getElementById('wall-error');
  const btn      = document.getElementById('wall-login-btn');
  errEl.textContent = '';
  if(!email || !email.includes('@')){ errEl.textContent = '⚠ Weka barua pepe sahihi'; return; }
  if(!password || password.length < 6){ errEl.textContent = '⚠ Weka nywila (herufi 6+)'; return; }
  btn.textContent = '...'; btn.disabled = true;
  try {
    const data = await sbAuth('/token?grant_type=password', {email, password});
    await completeLogin(data);
    const wall = document.getElementById('login-wall');
    if(wall) wall.remove();
  } catch(e){
    const msg = e.message||'';
    if(msg.includes('Invalid') || msg.includes('invalid') || msg.includes('credentials') || msg.includes('not found')){
      errEl.innerHTML = '⚠ Barua pepe au nywila si sahihi. &nbsp;<span onclick="wallShowRegister()" style="color:var(--gold);cursor:pointer;text-decoration:underline;font-weight:700">Jiunge hapa →</span>';
    } else {
      errEl.textContent = '⚠ ' + msg;
    }
  }
  btn.textContent = 'Ingia →'; btn.disabled = false;
}

async function submitWallRegister(){
  const username = (document.getElementById('wall-username')?.value||'').trim();
  const email    = (document.getElementById('wall-reg-email')?.value||'').trim();
  const password = document.getElementById('wall-reg-password')?.value||'';
  const errEl    = document.getElementById('wall-error');
  const btn      = document.getElementById('wall-reg-btn');
  errEl.textContent = '';
  if(!username || username.length < 2){ errEl.textContent = '⚠ Weka username (herufi 2+)'; return; }
  if(!email || !email.includes('@')){ errEl.textContent = '⚠ Weka barua pepe sahihi'; return; }
  if(!password || password.length < 6){ errEl.textContent = '⚠ Nywila lazima iwe herufi 6+'; return; }
  btn.textContent = '...'; btn.disabled = true;
  try {
    const data = await sbAuth('/signup', {email, password, data:{full_name: username}});
    if(data.id && !data.access_token){
      // Email confirmation needed
      const successEl = document.getElementById('wall-success');
      successEl.textContent = '✓ Akaunti imeundwa! Angalia barua pepe yako uthibitishe, kisha urudi uingie.';
      successEl.style.display = 'block';
      errEl.textContent = '';
      btn.textContent = 'Jiunge →'; btn.disabled = false;
      return;
    }
    // Auto-logged in — save username to profile and open app
    await completeLogin(data);
    // Save username profile immediately (no more asking)
    if(currentUser){
      const uname = username.toLowerCase().replace(/[^a-z0-9_]/g,'_');
      await sbFetch('/rest/v1/user_profiles',{
        method:'POST',
        headers:{'Prefer':'return=representation','on_conflict':'id'},
        body: JSON.stringify({id:currentUser.id, username:uname, display_name:username, leaf_id:null, branch:null})
      }).catch(()=>{});
      currentUserProfile = {id:currentUser.id, username:uname, display_name:username, leaf_id:null, branch:null};
    }
    const wall = document.getElementById('login-wall');
    if(wall) wall.remove();
    showToast('✓ Karibu '+username+'! Uko kwenye ukoo wa Wambaga! 🎉');
  } catch(e){
    const msg = e.message||'';
    if(msg.includes('already') || msg.includes('registered')){
      errEl.innerHTML = '⚠ Barua pepe hii ina akaunti tayari. &nbsp;<span onclick="wallShowLogin()" style="color:var(--gold);cursor:pointer;text-decoration:underline;font-weight:700">Ingia hapa →</span>';
    } else {
      errEl.textContent = '⚠ ' + msg;
    }
  }
  btn.textContent = 'Jiunge →'; btn.disabled = false;
}


// ── HISTORIA PHOTO UPLOAD (Admin only) ────────────────────────────
async function uploadHistoriaPhoto(sectionId){
  if(!isAdmin()){ showToast('Admini peke yake'); return; }
  const input = document.createElement('input');
  input.type='file'; input.accept='image/*';
  input.onchange = async function(e){
    const file = e.target.files[0];
    if(!file) return;
    if(file.size > 5*1024*1024){ showToast('Picha kubwa sana — chini ya 5MB'); return; }
    showToast('Inapakia...');
    try {
      const ext = file.name.split('.').pop().toLowerCase();
      const sid = sectionId || 'general';
      const fpath = 'historia/' + sid + '_' + Date.now() + '.' + ext;
      const uploadRes = await fetch(SUPABASE_URL+'/storage/v1/object/Wambaga-photos/'+fpath,{
        method:'POST',
        headers:{'Authorization':'Bearer '+currentSession.access_token,'apikey':SUPABASE_ANON_KEY,'Content-Type':file.type,'x-upsert':'true'},
        body: file
      });
      if(!uploadRes.ok) throw new Error('Upload ilishindwa');
      const photoUrl = SUPABASE_URL+'/storage/v1/object/public/Wambaga-photos/'+fpath;
      await sbFetch('/rest/v1/wambaga_photos',{
        method:'POST',
        headers:{'Prefer':'return=representation'},
        body: JSON.stringify({person_id:null, url:photoUrl, uploaded_by:currentUser.id, note:'Historia:'+sid})
      });
      const grid = document.getElementById('hpg-'+sid);
      if(grid){
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:relative;display:inline-block';
        const img = document.createElement('img');
        img.src = photoUrl;
        img.style.cssText = 'height:110px;width:110px;object-fit:cover;cursor:pointer;border:1px solid rgba(201,146,42,0.3)';
        img.onclick = function(){ openLightbox(photoUrl,'Historia'); };
        const xBtn = document.createElement('button');
        xBtn.textContent = '✕';
        xBtn.style.cssText = 'position:absolute;top:2px;right:2px;background:rgba(0,0,0,0.75);border:none;color:#fff;cursor:pointer;font-size:.65rem;padding:2px 5px';
        xBtn.onclick = function(){ wrapper.remove(); };
        wrapper.appendChild(img);
        wrapper.appendChild(xBtn);
        grid.appendChild(wrapper);
      }
      showToast('✓ Picha imepakiwa!');
    } catch(err){ showToast('Hitilafu: '+err.message); }
  };
  input.click();
}

function goToPersonInTree(personId){
  if(!PEOPLE[personId]) return;
  showView('tree');
  setTimeout(()=>{ openPanel(personId); }, 350);
}

function checkHistoriaAdmin(){
  document.querySelectorAll('.hs-photo-admin').forEach(div => {
    div.style.display = isAdmin() ? 'block' : 'none';
  });
}

// ══════════════════════════════════════════════════════════════════
//  SUPABASE REALTIME — mabadiliko yanaonekana mara moja kwa wote
// ══════════════════════════════════════════════════════════════════
let realtimeSocket = null;
let realtimeHeartbeat = null;
let realtimeRef = 1;

function rtSend(obj){
  if(realtimeSocket && realtimeSocket.readyState === WebSocket.OPEN){
    realtimeSocket.send(JSON.stringify(obj));
  }
}

function startRealtime(){
  if(SUPABASE_URL === 'YOUR_SUPABASE_URL') return;
  if(realtimeSocket && realtimeSocket.readyState === WebSocket.OPEN) return;

  const wsUrl = SUPABASE_URL.replace('https://','wss://')
    + '/realtime/v1/websocket?apikey=' + SUPABASE_ANON_KEY + '&vsn=1.0.0';

  try { realtimeSocket = new WebSocket(wsUrl); }
  catch(e){ console.warn('Realtime WS failed:', e); return; }

  realtimeSocket.onopen = function(){
    console.log('🟢 Realtime connected');
    showRealtimeDot(true);
    realtimeRef = 1;

    // Subscribe to wambaga_people changes
    rtSend({
      topic: 'realtime:db-changes',
      event: 'phx_join',
      payload: {
        config: {
          postgres_changes: [
            { event: '*', schema: 'public', table: 'wambaga_people' },
            { event: '*', schema: 'public', table: 'wambaga_photos'  }
          ]
        }
      },
      ref: String(realtimeRef++)
    });

    // Heartbeat kila sekunde 25
    clearInterval(realtimeHeartbeat);
    realtimeHeartbeat = setInterval(function(){
      rtSend({ topic:'phoenix', event:'heartbeat', payload:{}, ref:'hb'+Date.now() });
    }, 25000);
  };

  realtimeSocket.onmessage = function(evt){
    try {
      const msg = JSON.parse(evt.data);

      // DEBUG — log everything to see what Supabase sends
      if(msg.event !== 'heartbeat' && msg.topic !== 'phoenix'){
        console.log('📨 RT msg:', JSON.stringify(msg).substring(0,300));
      }

      // Handle subscription confirmation
      if(msg.event === 'phx_reply' && msg.payload && msg.payload.status === 'ok'){
        console.log('✅ Realtime subscribed to db-changes');
        return;
      }

      // Handle actual data changes — try both event formats
      const isChange = msg.event === 'postgres_changes' || 
                       (msg.payload && msg.payload.type && ['INSERT','UPDATE','DELETE'].includes(msg.payload.type));
      if(!isChange) return;
      
      // Support both message structures
      const change = (msg.payload && msg.payload.data) || msg.payload || {};

      const table = change.table || (msg.payload && msg.payload.table) || '';
      const type  = change.type  || (msg.payload && msg.payload.type)  || '';
      const rec   = change.record     || (msg.payload && msg.payload.record)     || {};
      const old   = change.old_record || (msg.payload && msg.payload.old_record) || {};
      
      console.log('📊 Change:', type, table, JSON.stringify(rec).substring(0,100));

      // ── wambaga_people ──────────────────────────────────────────
      if(table === 'wambaga_people'){

        if(type === 'UPDATE'){
          const pid = rec.local_id;
          if(pid && PEOPLE[pid]){
            if(rec.born     !== undefined) PEOPLE[pid].born     = rec.born    ||'';
            if(rec.died     !== undefined) PEOPLE[pid].died     = rec.died    ||'';
            if(rec.location !== undefined) PEOPLE[pid].location = rec.location||'';
            if(rec.spouse   !== undefined) PEOPLE[pid].spouse   = rec.spouse  ||'';
            if(rec.note     !== undefined) PEOPLE[pid].note     = rec.note    ||'';
            if(rec.profile_photo!==undefined) PEOPLE[pid].profile_photo = rec.profile_photo||null;

            const dname = PEOPLE[pid].name.split('/')[0].trim();
            showRealtimeToast('✏️ ' + dname + ' amesasishwa');

            // Refresh open panel
            if(window._lastOpenedPersonId === pid) openPanel(pid);
          }
        }

        if(type === 'INSERT'){
          const pid = rec.local_id;
          if(!pid) return;
          if(PEOPLE[pid]){
            // Person exists in data.js — update their fields from Supabase record
            if(rec.born     ) PEOPLE[pid].born      = rec.born;
            if(rec.died     ) PEOPLE[pid].died      = rec.died;
            if(rec.location ) PEOPLE[pid].location  = rec.location;
            if(rec.spouse   ) PEOPLE[pid].spouse    = rec.spouse;
            if(rec.note     ) PEOPLE[pid].note      = rec.note;
            if(rec.profile_photo) PEOPLE[pid].profile_photo = rec.profile_photo;
            PEOPLE[pid].cloudId = rec.id;
            const dname = PEOPLE[pid].name.split('/')[0].trim();
            showRealtimeToast('✏️ ' + dname + ' amesasishwa');
            if(window._lastOpenedPersonId === pid) openPanel(pid);
          } else {
            // Truly new person — add to tree
            PEOPLE[pid] = {
              id:pid, name:rec.name, gen:rec.gen, branch:rec.branch,
              parentId:rec.parent_id, children:[],
              note:rec.note||'', born:rec.born||'', died:rec.died||'',
              spouse:rec.spouse||'', location:rec.location||'',
              isFemale:rec.is_female||false, isUnknown:false,
              cloudId:rec.id, profile_photo:rec.profile_photo||null
            };
            if(rec.parent_id && PEOPLE[rec.parent_id] && !PEOPLE[rec.parent_id].children.includes(pid))
              PEOPLE[rec.parent_id].children.push(pid);
            const adderDisplay = rec.added_by
              ? (rec.added_by === currentUser?.id ? 'wewe'
                : (onlineUsers[rec.added_by] || 'mwanafamilia'))
              : 'mwanafamilia';
            showRealtimeToast('🌱 ' + rec.name.split('/')[0].trim() + ' ameongezwa na ' + adderDisplay);
            if(document.getElementById('view-tree').classList.contains('active')){
              // Re-render current position in tree without resetting to branch root
              setTimeout(()=>{
                if(curRootId && PEOPLE[curRootId]) renderTree(curRootId);
                else switchBranch(curBranch);
              }, 300);
            }
          }
        }

        if(type === 'DELETE'){
          const pid = old.local_id;
          if(pid && PEOPLE[pid]){
            const dname = PEOPLE[pid].name.split('/')[0].trim();
            delete PEOPLE[pid];
            showRealtimeToast('🗑 ' + dname + ' amefutwa');
            if(document.getElementById('view-tree').classList.contains('active')){
              setTimeout(()=>{
                if(curRootId && PEOPLE[curRootId]) renderTree(curRootId);
                else switchBranch(curBranch);
              }, 300);
            }
          }
        }
      }

      // ── wambaga_photos ──────────────────────────────────────────
      if(table === 'wambaga_photos'){
        if(type === 'INSERT'){
          const photo = { id:rec.id, person_id:rec.person_id, url:rec.url };
          if(rec.person_id && PEOPLE[rec.person_id]){
            if(!PEOPLE[rec.person_id].photos) PEOPLE[rec.person_id].photos = [];
            if(!PEOPLE[rec.person_id].photos.find(p=>p.id===rec.id)){
              PEOPLE[rec.person_id].photos.push(photo);
              const pname = PEOPLE[rec.person_id].name.split('/')[0].trim();
              showRealtimeToast('📸 Picha mpya ya ' + pname);
            }
          }
          addToGallery(photo);
          if(document.getElementById('view-gallery').classList.contains('active')) renderGallery();
          if(rec.person_id && window._lastOpenedPersonId === rec.person_id) openPanel(rec.person_id);
        }
        if(type === 'DELETE'){
          galleryPhotos = galleryPhotos.filter(p=>p.id !== old.id);
          for(const p of Object.values(PEOPLE))
            if(p.photos) p.photos = p.photos.filter(ph=>ph.id !== old.id);
          if(document.getElementById('view-gallery').classList.contains('active')) renderGallery();
        }
      }

    } catch(e){ console.warn('Realtime msg error:', e); }
  };

  realtimeSocket.onclose = function(e){
    console.log('🔴 Realtime closed — reconnecting in 4s', e.code);
    showRealtimeDot(false);
    clearInterval(realtimeHeartbeat);
    setTimeout(startRealtime, 4000);
  };

  realtimeSocket.onerror = function(){ realtimeSocket.close(); };
}

// ── Realtime UI ───────────────────────────────────────────────────
// ── ONLINE USERS TRACKING ─────────────────────────────────────────
let onlineUsers = {};

function updateOnlineCount(){
  const count = Object.keys(onlineUsers).length || 1;
  const el = document.getElementById('online-count');
  if(el) el.textContent = count;
}

function trackOnlinePresence(){
  if(!isLoggedIn() || SUPABASE_URL === 'YOUR_SUPABASE_URL') return;
  // Register presence via heartbeat in wambaga_presence table
  const userId = currentUser.id;
  const displayName = currentUserProfile?.display_name || currentUser.email?.split('@')[0] || 'Mgeni';

  // Update presence every 30 seconds
  const sendPresence = async () => {
    try {
      await sbFetch('/rest/v1/wambaga_presence', {
        method: 'POST',
        headers: {'Prefer': 'resolution=merge-duplicates,return=minimal'},
        body: JSON.stringify({
          user_id: userId,
          display_name: displayName,
          last_seen: new Date().toISOString()
        })
      });
    } catch(e){}

    // Fetch all online users (active in last 2 minutes)
    try {
      const since = new Date(Date.now() - 2*60*1000).toISOString();
      const online = await sbFetch(`/rest/v1/wambaga_presence?last_seen=gte.${encodeURIComponent(since)}&select=user_id,display_name`);
      if(online && online.length){
        onlineUsers = {};
        online.forEach(u => { onlineUsers[u.user_id] = u.display_name; });
        updateOnlineCount();
      }
    } catch(e){}
  };

  sendPresence();
  setInterval(sendPresence, 30000);
}

function showRealtimeDot(on){
  let dot = document.getElementById('rt-dot');
  if(!dot){
    dot = document.createElement('div');
    dot.id = 'rt-dot';
    dot.style.cssText = 'width:7px;height:7px;border-radius:50%;display:inline-block;margin-left:6px;flex-shrink:0;transition:background .5s;vertical-align:middle';
    const logo = document.querySelector('.tb-logo');
    if(logo) logo.appendChild(dot);
  }
  dot.style.background = on ? '#4caf50' : '#f44336';
  dot.title = on ? '🟢 Live — unganishwa' : '🔴 Imekatika...';
}

function showRealtimeToast(msg){
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(247,247,244,0.93);border:1px solid rgba(201,146,42,0.4);color:var(--cream);padding:.45rem 1.1rem;border-radius:20px;font-size:.74rem;z-index:9999;pointer-events:none;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,0.5)';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.cssText += ';opacity:0;transition:opacity .5s'; setTimeout(()=>t.remove(),500); }, 3500);
}

// Start realtime when page loads
window.addEventListener('load', function(){
  setTimeout(startRealtime, 2500);
});

// ══════════════════════════════════════════════════════════════════
//  POLLING SYNC — backup kwa realtime, kila sekunde 15
//  Inashughulikia hali ambapo WebSocket haifanyi kazi vizuri
// ══════════════════════════════════════════════════════════════════
let lastPollTime = new Date().toISOString();
let pollInterval = null;

async function pollForChanges(){
  if(SUPABASE_URL === 'YOUR_SUPABASE_URL') return;
  try {
    const since = lastPollTime;
    lastPollTime = new Date().toISOString();

    // Check wambaga_people for updates since last poll
    // Use OR filter: updated_at OR created_at — catches both edits and new inserts
    const updatedPeople = await sbFetch(
      '/rest/v1/wambaga_people?or=(updated_at.gt.' + encodeURIComponent(since) + ',created_at.gt.' + encodeURIComponent(since) + ')' +
      '&select=local_id,name,born,died,location,spouse,note,profile_photo,is_female,gen,branch,parent_id'
    );

    for(const row of updatedPeople){
      const pid = row.local_id;
      if(!pid) continue;

      if(PEOPLE[pid]){
        // Update existing person (from data.js or previously added)
        let changed = false;
        if(row.born     !== undefined && PEOPLE[pid].born     !== (row.born    ||'')){ PEOPLE[pid].born     = row.born    ||''; changed=true; }
        if(row.died     !== undefined && PEOPLE[pid].died     !== (row.died    ||'')){ PEOPLE[pid].died     = row.died    ||''; changed=true; }
        if(row.location !== undefined && PEOPLE[pid].location !== (row.location||'')){ PEOPLE[pid].location = row.location||''; changed=true; }
        if(row.spouse   !== undefined && PEOPLE[pid].spouse   !== (row.spouse  ||'')){ PEOPLE[pid].spouse   = row.spouse  ||''; changed=true; }
        if(row.note     !== undefined && PEOPLE[pid].note     !== (row.note    ||'')){ PEOPLE[pid].note     = row.note    ||''; changed=true; }
        if(row.profile_photo !== undefined && PEOPLE[pid].profile_photo !== row.profile_photo){ PEOPLE[pid].profile_photo = row.profile_photo||null; changed=true; }

        if(changed){
          const dname = PEOPLE[pid].name.split('/')[0].trim();
          showRealtimeToast('✏️ ' + dname + ' amesasishwa');
          // Refresh open panel if this person is showing
          if(window._lastOpenedPersonId === pid) openPanel(pid);
        }
      } else {
        // New person added
        PEOPLE[pid] = {
          id:pid, name:row.name, gen:row.gen, branch:row.branch,
          parentId:row.parent_id, children:[],
          note:row.note||'', born:row.born||'', died:row.died||'',
          spouse:row.spouse||'', location:row.location||'',
          isFemale:row.is_female||false, isUnknown:false,
          profile_photo:row.profile_photo||null
        };
        if(row.parent_id && PEOPLE[row.parent_id] && !PEOPLE[row.parent_id].children.includes(pid)){
          PEOPLE[row.parent_id].children.push(pid);
        }
        showRealtimeToast('🌱 ' + row.name.split('/')[0].trim() + ' ameongezwa');
        if(document.getElementById('view-tree').classList.contains('active')){
          setTimeout(()=>switchBranch(curBranch), 300);
        }
      }
    }

    // Check new photos
    const newPhotos = await sbFetch(
      '/rest/v1/wambaga_photos?created_at=gt.' + encodeURIComponent(since) +
      '&select=id,person_id,url,created_at'
    );
    for(const photo of newPhotos){
      const alreadyExists = galleryPhotos.find(p=>p.id===photo.id);
      if(!alreadyExists){
        if(photo.person_id && PEOPLE[photo.person_id]){
          if(!PEOPLE[photo.person_id].photos) PEOPLE[photo.person_id].photos = [];
          PEOPLE[photo.person_id].photos.push({id:photo.id, url:photo.url});
          showRealtimeToast('📸 Picha mpya ya ' + PEOPLE[photo.person_id].name.split('/')[0].trim());
          if(window._lastOpenedPersonId === photo.person_id) openPanel(photo.person_id);
        }
        addToGallery(photo);
        if(document.getElementById('view-gallery').classList.contains('active')) renderGallery();
      }
    }

  } catch(e){
    console.warn('Poll error:', e.message);
  }
}

function startPolling(){
  if(SUPABASE_URL === 'YOUR_SUPABASE_URL') return;
  if(pollInterval) clearInterval(pollInterval);
  lastPollTime = new Date().toISOString();
  pollInterval = setInterval(pollForChanges, 15000); // kila sekunde 15
  console.log('🔄 Polling started — sync kila sekunde 15');
}

// Start polling after page loads (as reliable backup to WebSocket)
window.addEventListener('load', function(){
  setTimeout(startPolling, 3000);
});

// ══════════════════════════════════════════════════════════════════
//  ADMIN BACKUP & SYNC TOOLS
// ══════════════════════════════════════════════════════════════════

function showAdminPanel(){
  const panel = document.getElementById('admin-backup-panel');
  if(!panel) return;
  // isAdmin() checks currentUser — if not ready yet, try again shortly
  if(!currentUser){
    setTimeout(showAdminPanel, 800);
    return;
  }
  panel.style.display = isAdmin() ? 'block' : 'none';
  updateBackupStatus();
}

function updateBackupStatus(){
  const el = document.getElementById('backup-sync-status');
  if(!el) return;
  const total = Object.keys(PEOPLE).length;
  el.textContent = 'Watu ' + total + ' kwenye mti';
}

// ── EXPORT JSON ───────────────────────────────────────────────────
function exportBackup(){
  if(!isAdmin()){ showToast('Admini peke yake'); return; }

  const data = {
    exported_at: new Date().toISOString(),
    exported_by: currentUser ? currentUser.email : 'admin',
    total_people: Object.keys(PEOPLE).length,
    people: Object.values(PEOPLE).map(p => ({
      id:           p.id,
      name:         p.name,
      gen:          p.gen,
      branch:       p.branch,
      parentId:     p.parentId || null,
      born:         p.born     || null,
      died:         p.died     || null,
      location:     p.location || null,
      spouse:       p.spouse   || null,
      note:         p.note     || null,
      isFemale:     p.isFemale || false,
      profile_photo:p.profile_photo || null,
      cloudId:      p.cloudId  || null,
      photos:       (p.photos||[]).map(ph=>({id:ph.id, url:ph.url}))
    }))
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'wambaga_backup_' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('✅ Backup imepakiwa — watu ' + data.total_people);
}

// ── EXPORT CSV ────────────────────────────────────────────────────
function exportBackupCSV(){
  if(!isAdmin()){ showToast('Admini peke yake'); return; }

  const rows = [['ID','Jina','Kizazi','Tawi','Baba/Mama ID','Kuzaliwa','Kufariki','Mahali','Mke/Mume','Maelezo','Jinsia']];
  Object.values(PEOPLE).forEach(p => {
    rows.push([
      p.id, p.name, p.gen, p.branch,
      p.parentId||'', p.born||'', p.died||'',
      p.location||'', p.spouse||'', (p.note||'').replace(/,/g,';'),
      p.isFemale ? 'Kike' : 'Kiume'
    ]);
  });

  const csv  = rows.map(r => r.map(c => '"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'wambaga_backup_' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('✅ CSV imepakiwa — watu ' + (rows.length-1));
}

// ── SYNC ALL PEOPLE → SUPABASE ────────────────────────────────────
async function syncAllToSupabase(){
  if(!isAdmin()){ showToast('Admini peke yake'); return; }
  if(!confirm('Utasync watu WOTE (' + Object.keys(PEOPLE).length + ') kwenye Supabase. Inaweza kuchukua dakika. Endelea?')) return;

  const progress = document.getElementById('backup-progress');
  progress.style.display = 'block';

  const allPeople = Object.values(PEOPLE);
  let done = 0, skipped = 0, errors = 0;
  const BATCH = 20;

  // First get all existing local_ids from Supabase
  progress.textContent = 'Inaangalia Supabase...';
  let existingIds = new Set();
  try {
    const existing = await sbFetch('/rest/v1/wambaga_people?select=local_id');
    existing.forEach(r => existingIds.add(r.local_id));
  } catch(e){ console.warn('Could not fetch existing:', e); }

  progress.textContent = 'Inaanza sync... (0/' + allPeople.length + ')';

  for(let i = 0; i < allPeople.length; i += BATCH){
    const batch = allPeople.slice(i, i+BATCH);
    const toInsert = [];
    const toUpdate = [];

    for(const p of batch){
      const row = {
        local_id:   p.id,
        name:       p.name,
        gen:        p.gen,
        branch:     p.branch,
        parent_id:  p.parentId || null,
        born:       p.born     || null,
        died:       p.died     || null,
        location:   p.location || null,
        spouse:     p.spouse   || null,
        note:       p.note     || null,
        is_female:  p.isFemale || false,
        profile_photo: p.profile_photo || null,
        updated_at: new Date().toISOString()
      };
      if(existingIds.has(p.id)) toUpdate.push(row);
      else toInsert.push(row);
    }

    try {
      // Insert new people in batch
      if(toInsert.length > 0){
        await sbFetch('/rest/v1/wambaga_people', {
          method: 'POST',
          headers: {'Prefer': 'return=minimal'},
          body: JSON.stringify(toInsert)
        });
        done += toInsert.length;
      }
      // Update existing (one by one — Supabase REST doesn't batch update)
      for(const row of toUpdate){
        await sbFetch('/rest/v1/wambaga_people?local_id=eq.' + encodeURIComponent(row.local_id), {
          method: 'PATCH',
          headers: {'Prefer': 'return=minimal'},
          body: JSON.stringify(row)
        });
        done++;
      }
    } catch(e){
      console.warn('Batch error:', e);
      errors += batch.length;
    }

    progress.textContent = 'Imesync: ' + done + ' | Imeshindwa: ' + errors + ' | Jumla: ' + allPeople.length;
    await new Promise(r => setTimeout(r, 100)); // small delay between batches
  }

  progress.textContent = '✅ Imekamilika! Imesync: ' + done + ' | Makosa: ' + errors;
  showToast('✅ Sync imekamilika — watu ' + done);
  setTimeout(()=>{ progress.style.display='none'; }, 8000);
}

// Show admin panel when on home view and logged in as admin
(function(){
  const _orig = showView;
  window.showView = function(v){
    _orig(v);
    if(v === 'home') showAdminPanel();
  };
})();

// Also show on initial load
window.addEventListener('load', function(){
  setTimeout(showAdminPanel, 1500);
});

// ══════════════════════════════════════════════════════════════════
//  CLAIM YOUR LEAF
// ══════════════════════════════════════════════════════════════════

let userProfile = null;

async function checkAndShowClaim(){
  if(!currentUser) return;
  try {
    const res = await sbFetch('/rest/v1/user_profiles?id=eq.'+currentUser.id+'&select=*');
    if(res && res.length > 0){
      currentUserProfile = res[0];
      userProfile = res[0]; // legacy compat
      return;
    }
    // Auto-create profile silently
    const username = (currentUser.email||'user').split('@')[0].replace(/[^a-z0-9]/gi,'_').toLowerCase();
    const autoProfile = {
      id: currentUser.id,
      username,
      display_name: currentUser.user_metadata?.full_name || username,
      leaf_id: null,
      branch: null
    };
    await sbFetch('/rest/v1/user_profiles',{
      method:'POST', headers:{'Prefer':'return=minimal'},
      body: JSON.stringify(autoProfile)
    }).catch(()=>{});
    currentUserProfile = autoProfile;
    userProfile = autoProfile;
    // Profile auto-created — no need to show claim modal
  } catch(e){
    // Fallback so app never breaks
    currentUserProfile = {
      id: currentUser?.id,
      display_name: currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || 'Mgeni'
    };
  }
}

function claimSearch(q){
  const res = document.getElementById('claim-results');
  const sugg = document.getElementById('claim-suggestions');
  if(!q || q.length < 2){
    res.innerHTML='';
    if(sugg) sugg.style.display='block';
    return;
  }
  // Hide suggestions panel when user is typing
  if(sugg) sugg.style.display='none';
  const matches = Object.values(PEOPLE).filter(p=>
    p.name.toLowerCase().includes(q.toLowerCase()) && !p.isUnknown
  ).slice(0,8);
  if(!matches.length){ res.innerHTML='<div style="padding:.5rem;font-size:.8rem;color:var(--cream3)">Hakuna mtu aliyepatikana</div>'; return; }
  res.innerHTML = matches.map(p=>`
    <div onclick="selectLeaf('${p.id}')" style="padding:.5rem .75rem;cursor:pointer;border-radius:6px;font-size:.85rem;color:var(--cream);border-bottom:1px solid var(--border)" onmouseover="this.style.background='rgba(201,146,42,.1)'" onmouseout="this.style.background='none'">
      <div style="font-weight:600">${p.name}</div>
      <div style="font-size:.7rem;color:var(--cream3)">Kizazi ${p.gen} · ${p.branch||''}</div>
    </div>`).join('');
}

function initClaimSuggestions(){
  // Build Gen 14-15 people grouped by simplified branch name
  const branchMap = {};
  const branchLabels = {
    '★ Tawi la Chachika': 'Chachika',
    'Tawi la Chasimba': 'Chasimba',
    'Tawi la Bangalala': 'Bangalala',
    'Tawi la Tenameso': 'Tenameso',
    'Tawi la Mpombeyagonja': 'Mpombeyagonja',
    '★ Tawi la Mpombeyagonja': 'Mpombeyagonja',
    'Tawi la Kinenekejo': 'Kinenekejo',
    'Tawi la Kagulu': 'Kagulu',
    'Tawi la Kilango': 'Kilango',
    'Tawi la Chikira': 'Chikira',
    'Tawi la Luvigho': 'Luvigho',
    'Tawi la Chalambo': 'Chalambo',
    '★ Tawi la Chayoa': 'Chayoa',
  };

  Object.values(PEOPLE).forEach(p => {
    if(p.gen < 14 || p.gen > 15) return;
    if(p.isUnknown) return;
    if(p.name.includes('?') || p.name.includes('.....')) return;
    const label = branchLabels[p.branch] || p.branch || 'Wengine';
    if(!branchMap[label]) branchMap[label] = [];
    branchMap[label].push(p);
  });

  // Sort branches by number of people (biggest first)
  const sortedBranches = Object.entries(branchMap)
    .sort((a,b) => b[1].length - a[1].length);

  if(!sortedBranches.length) return;

  // Build branch tabs
  const tabsEl = document.getElementById('claim-branch-tabs');
  const peopleEl = document.getElementById('claim-branch-people');
  if(!tabsEl || !peopleEl) return;

  let activeBranch = sortedBranches[0][0];

  function renderBranch(branchName){
    activeBranch = branchName;
    // Update tab styles
    tabsEl.querySelectorAll('.branch-tab').forEach(t => {
      t.style.background = t.dataset.branch === branchName ? 'var(--gold)' : 'rgba(255,255,255,.07)';
      t.style.color = t.dataset.branch === branchName ? '#000' : 'var(--cream3)';
      t.style.fontWeight = t.dataset.branch === branchName ? '700' : '400';
    });
    // Render people
    const people = branchMap[branchName] || [];
    peopleEl.innerHTML = people
      .sort((a,b) => a.gen - b.gen || a.name.localeCompare(b.name))
      .map(p => `
        <div onclick="selectLeaf('${p.id}')"
          style="padding:.35rem .6rem;cursor:pointer;border-radius:5px;font-size:.78rem;
                 color:var(--cream);border:1px solid var(--border);
                 background:rgba(255,255,255,.03)"
          onmouseover="this.style.background='rgba(201,146,42,.12)';this.style.borderColor='var(--gold)'"
          onmouseout="this.style.background='rgba(255,255,255,.03)';this.style.borderColor='var(--border)'">
          <div style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</div>
          <div style="font-size:.68rem;color:var(--cream3)">Gen ${p.gen}</div>
        </div>`)
      .join('');
  }

  // Build tabs
  tabsEl.innerHTML = sortedBranches.map(([branch, people]) => `
    <button class="branch-tab" data-branch="${branch}"
      onclick="initClaimBranchRender('${branch}')"
      style="padding:.2rem .6rem;border:none;border-radius:20px;cursor:pointer;
             font-size:.72rem;transition:all .15s;
             background:rgba(255,255,255,.07);color:var(--cream3)">
      ${branch} <span style="opacity:.6">(${people.length})</span>
    </button>`).join('');

  // Store renderBranch globally for onclick
  window._claimBranchData = branchMap;
  window.initClaimBranchRender = renderBranch;

  // Show first branch
  renderBranch(activeBranch);
}

function selectLeaf(pid){
  claimSelectedLeaf = pid;
  const p = PEOPLE[pid];
  document.getElementById('claim-results').innerHTML = '';
  document.getElementById('claim-search').value = p.name;
  const sel = document.getElementById('claim-selected');
  sel.style.display = 'block';
  sel.innerHTML = `✓ Umechagua: <strong>${p.name}</strong> · Kizazi ${p.gen}`;
}

function claimSkip(){
  const username = document.getElementById('claim-username').value.trim();
  if(!username){ document.getElementById('claim-error').textContent='Weka jina la kutumia'; return; }
  saveClaim(username, null);
}

async function submitClaim(){
  const username = document.getElementById('claim-username').value.trim();
  if(!username){ document.getElementById('claim-error').textContent='Weka jina la kutumia'; return; }
  await saveClaim(username, claimSelectedLeaf);
}

async function saveClaim(username, leafId){
  const btn = document.getElementById('claim-submit-btn');
  btn.textContent='...'; btn.disabled=true;
  try {
    const branch = leafId && PEOPLE[leafId] ? PEOPLE[leafId].branch : null;
    const display = leafId && PEOPLE[leafId] ? PEOPLE[leafId].name.split('/')[0].trim() : username;
    await sbFetch('/rest/v1/user_profiles', {
      method:'POST',
      headers:{'Prefer':'return=minimal'},
      body:JSON.stringify({ id:currentUser.id, username, leaf_id:leafId||null, display_name:display, branch })
    });
    userProfile = { id:currentUser.id, username, leaf_id:leafId, display_name:display, branch };
    document.getElementById('claim-overlay').classList.remove('open');
    showToast('✓ Karibu, '+display+'! Uko kwenye ukoo.');
  } catch(e){
    const errEl = document.getElementById('claim-error');
    errEl.textContent = e.message.includes('unique') ? 'Jina hilo linatumiwa — chagua jingine' : e.message;
  }
  btn.textContent='Thibitisha'; btn.disabled=false;
}

// ══════════════════════════════════════════════════════════════════
//  FAMILY LOUNGE
// ══════════════════════════════════════════════════════════════════
let loungeFilter = 'all';
let loungeLastSeen = null;
let loungePostPhotoFile = null;
let activeCommentPostId = null;
let commentReplyToId = null;
let activeReactionPostId = null;

function filterLounge(tag, btn){
  loungeFilter = tag;
  if(btn){ document.querySelectorAll('.lounge-tab').forEach(t => t.classList.remove('active')); btn.classList.add('active'); }

}

async function loadLounge(){
  // Only load if lounge view is active
  const feed = document.getElementById('lounge-feed');
  const empty = document.getElementById('lounge-empty');
  if(!feed) return;
  // Only run when lounge view is actually visible
  const galleryView = document.getElementById('view-gallery');
  if(!galleryView) return;
  // Check if active OR if called directly from gallery navigation
  const isVisible = galleryView.classList.contains('active') || 
    galleryView.style.display === 'block';
  if(!isVisible) return;

  // Show post button if logged in
  const postBtn = document.getElementById('lounge-post-btn');
  if(postBtn) postBtn.style.display = isLoggedIn() ? 'flex' : 'none';
  const emptyBtn = document.querySelector('#lounge-empty button');

  try {
    const url = '/rest/v1/lounge_posts?select=id,user_id,user_name,user_leaf,content,photo_url,branch,tag,pinned,created_at&order=pinned.desc,created_at.desc&limit=40';
    const posts = await sbFetch(url);
    if(!posts || posts.length === 0){
      feed.innerHTML = ''; empty.style.display = 'block'; return;
    }
    empty.style.display = 'none';

    // Fetch reactions count per post
    const postIds = posts.map(p => p.id);
    let reactions = [];
    try { reactions = await sbFetch('/rest/v1/lounge_reactions?post_id=in.('+postIds.join(',')+')&select=post_id,reaction,user_id'); } catch(e){}

    feed.innerHTML = posts.map(post => renderLoungePost(post, reactions)).join('');

    // Load comment counts for all posts
    loadAllCommentCounts(posts.map(p => p.id));

    // Mark lounge dot as seen
    hideLoungeNewDot();
    loungeLastSeen = new Date().toISOString();

  } catch(e){ console.warn('Lounge load error:', e); }
}

function renderLoungePost(post, allReactions){
  const postReactions = allReactions.filter(r => r.post_id === post.id);
  const counts = {upendo:0, amina:0, safi:0, kicheko:0};
  postReactions.forEach(r => { if(counts[r.reaction] !== undefined) counts[r.reaction]++; });
  const myReaction = isLoggedIn() ? postReactions.find(r => r.user_id === currentUser.id) : null;

  const timeAgo = getTimeAgo(post.created_at);
  const tagLabels = {general:'👨‍👩‍👧 Familia', soko_letu:'🛒 Soko Letu', matangazo:'📢 Tangazo'};
  const tagLabel = tagLabels[post.tag] || '';

  const totalReactions = Object.values(counts).reduce((a,b)=>a+b,0);
  const reactionSummary = [
    counts.upendo ? `❤️${counts.upendo}` : '',
    counts.amina  ? `🙏${counts.amina}`  : '',
    counts.safi   ? `👏${counts.safi}`   : '',
    counts.kicheko? `😂${counts.kicheko}`: ''
  ].filter(Boolean).join(' ');

  const initials = (post.user_name||'?').slice(0,1).toUpperCase();
  const branchColor = post.branch ? 'var(--gold)' : 'var(--cream3)';
  // Bot post gets special avatar
  const isBot = post.user_id === BOT_USER_ID;
  // Get profile photo if user is linked to a person
  const postPersonId = post.user_leaf || null;
  const postPerson = (!isBot && postPersonId) ? PEOPLE[postPersonId] : null;
  const postPhoto = postPerson?.profile_photo || null;
  const avatarContent = isBot
    ? `<span style="font-size:1.3rem">🤖</span>`
    : (postPhoto ? `<img src="${postPhoto}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : initials);
  const avatarBg = isBot ? 'linear-gradient(135deg,#1a1a2e,#16213e)' : getAvatarColor(post.user_name);

  const myReactionEmoji = myReaction ? ({upendo:'❤️',amina:'🙏',safi:'👏',kicheko:'😂'}[myReaction.reaction]||'❤️') : null;
  const likeCount = totalReactions;

  return `<div class="lounge-card${post.pinned?' lounge-pinned':''}" id="post-${post.id}">
    ${post.pinned ? '<div style="padding:.5rem 1rem .2rem;font-size:.65rem;color:var(--gold);letter-spacing:.12em;display:flex;align-items:center;gap:.3rem">📌 IMEPIGWA PINI NA MSIMAMIZI</div>' : ''}
    <div class="lounge-card-header">
      <div class="lounge-avatar" style="background:${isBot ? 'linear-gradient(135deg,#1a1a2e,#16213e)' : getAvatarColor(post.user_name)};overflow:hidden;cursor:${(!isBot&&postPersonId)?'pointer':'default'}" onclick="${(!isBot&&postPersonId)?`openPanel('${postPersonId||''}')`:''}">${isBot ? '<span style="font-size:1.2rem;display:flex;align-items:center;justify-content:center;height:100%">🤖</span>' : (postPhoto ? `<img src="${postPhoto}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : initials)}</div>
      <div style="flex:1;min-width:0">
        <div class="lounge-user" style="${(!isBot&&postPersonId)?'cursor:pointer;':''}" onclick="${(!isBot&&postPersonId)?`openPanel('${postPersonId||''}')`:''}">${escHtml(post.user_name||'Mgeni')}${isBot ? ' <span style="font-size:.6rem;background:var(--gold);color:#000;padding:0 4px;border-radius:3px;font-weight:700">BOT</span>' : ''}</div>
        <div class="lounge-branch">${post.branch ? '🌿 '+post.branch : post.tag==='picha'?'📸 Picha':''}</div>
      </div>
      <div style="display:flex;align-items:center;gap:.4rem">
        <div class="lounge-time">${timeAgo}</div>
        ${isAdmin() ? `<button onclick="togglePin('${post.id}',${!post.pinned})" style="background:none;border:none;color:var(--cream3);cursor:pointer;font-size:.75rem;padding:.2rem" title="${post.pinned?'Ondoa pini':'Piga pini'}">📌</button>` : ''}
        ${isAdmin() && post.user_id === '2b2dfc4f-a0d8-49b1-921c-e34f56af18da' ? `<button onclick="editBotPost('${post.id}',this)" style="background:none;border:none;color:var(--cream3);cursor:pointer;font-size:.75rem;padding:.2rem" title="Hariri post ya bot">✏️</button>` : ''}
        ${isAdmin() ? `<button onclick="deletePost('${post.id}')" style="background:none;border:none;color:var(--cream3);cursor:pointer;font-size:.8rem;padding:.2rem" title="Futa">✕</button>` : ''}
      </div>
    </div>
    ${post.content ? `<div class="lounge-content">${formatContent(escHtml(post.content))}</div>` : ''}
    <!-- Photo: natural size, tap to fullscreen -->
    ${post.photo_url ? `
    <div onclick="openPhotoFull('${post.photo_url}')" style="cursor:pointer;margin:0 0 0 0">
      <img src="${post.photo_url}" style="width:100%;height:auto;max-height:320px;object-fit:contain;background:#111;display:block">
    </div>` : ''}
    <!-- Action bar: like count + comment count -->
    <div style="display:flex;align-items:center;border-top:1px solid rgba(255,255,255,.06)">
      <button onclick="quickReact('${post.id}')" style="flex:1;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;padding:.6rem;color:${myReaction?'var(--gold)':'var(--cream3)'};transition:background .15s;border-radius:0 0 0 14px" onmouseover="this.style.background='rgba(201,146,42,.08)'" onmouseout="this.style.background='none'">
        <span style="font-size:1rem">${myReactionEmoji || '🤍'}</span>
        <span style="font-size:.82rem;font-weight:${likeCount>0?'600':'400'}">${likeCount > 0 ? likeCount : ''} Like</span>
      </button>
      <div style="width:1px;height:24px;background:rgba(255,255,255,.08)"></div>
      <button onclick="openInlineComment('${post.id}')" style="flex:1;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;padding:.6rem;color:var(--cream3);transition:background .15s;border-radius:0 0 14px 0" onmouseover="this.style.background='rgba(201,146,42,.08)'" onmouseout="this.style.background='none'">
        <span style="font-size:1rem">💬</span>
        <span style="font-size:.82rem" id="comment-count-${post.id}">Maoni</span>
      </button>
    </div>
    <!-- Comments section: shown on tap -->
    <div id="comments-inline-${post.id}" style="display:none;border-top:1px solid rgba(255,255,255,.06);padding:.7rem .85rem .8rem">
      <div id="comments-list-${post.id}" style="margin-bottom:.7rem"></div>
      <div style="display:flex;gap:.5rem;align-items:center;background:var(--panel2);border:1px solid var(--border);border-radius:20px;padding:.3rem .3rem .3rem .85rem;position:relative">
        <input type="text" placeholder="Andika maoni... (@WambagaBot)" autocomplete="off"
          style="flex:1;background:transparent;border:none;color:var(--cream);font-size:.88rem;min-width:0;outline:none;padding:.2rem 0"
          id="comment-input-${post.id}"
          oninput="handleMentionInput(this,'mention-drop-${post.id}')"
          onkeydown="if(event.key==='Enter')submitInlineComment('${post.id}',this)">
        <div id="mention-drop-${post.id}" style="display:none;position:absolute;bottom:100%;left:0;right:0;background:var(--panel);border:1px solid var(--border);border-radius:8px;max-height:160px;overflow-y:auto;z-index:300;box-shadow:0 -4px 20px rgba(0,0,0,.4);margin-bottom:4px"></div>
        <button onclick="submitInlineComment('${post.id}',document.getElementById('comment-input-${post.id}'))" style="background:var(--gold);border:none;border-radius:50%;width:32px;height:32px;min-width:32px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0">➤</button>
      </div>
    </div>
  </div>`;
}

function getAvatarColor(name){
  const colors = ['#c9922a','#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];
  let hash = 0;
  for(let i=0;i<(name||'').length;i++) hash = (hash + (name||'').charCodeAt(i)) % colors.length;
  return colors[hash];
}

function getTimeAgo(ts){
  const diff = (Date.now() - new Date(ts)) / 1000;
  if(diff < 60) return 'sasa hivi';
  if(diff < 3600) return Math.floor(diff/60) + ' dak';
  if(diff < 86400) return Math.floor(diff/3600) + ' saa';
  if(diff < 604800) return Math.floor(diff/86400) + ' siku';
  return new Date(ts).toLocaleDateString('sw');
}

function escHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function formatContent(s){
  // Highlight @mentions
  return s.replace(/@([a-zA-Z0-9_]+)/g, '<span style="color:var(--gold)">@$1</span>');
}

function openPhotoFull(url){
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:99999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
  overlay.innerHTML = `<img src="${url}" style="max-width:95vw;max-height:95vh;object-fit:contain;border-radius:8px">`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
}

// ── NEW POST ──────────────────────────────────────────────────────
function openNewPost(){
  if(!isLoggedIn()){ openAuth(); return; }
  document.getElementById('post-content').value = '';
  document.getElementById('post-photo-preview').textContent = '';
  loungePostPhotoFile = null;
  document.getElementById('post-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('post-content').focus(), 300);
}

function closeNewPost(){
  document.getElementById('post-overlay').classList.remove('open');
}

function pickPostPhoto(){
  document.getElementById('post-photo-input').click();
}

function handlePostPhoto(input){
  const file = input.files[0];
  if(!file) return;
  if(file.size > 8*1024*1024){ showToast('Picha kubwa sana — chini ya 8MB'); return; }
  loungePostPhotoFile = file;
  document.getElementById('post-photo-preview').textContent = '📷 ' + file.name;
}

async function submitPost(){
  if(!currentUser || !currentUser.id){ showToast('Ingia kwanza!'); openAuth(); return; }
  const content = document.getElementById('post-content').value.trim();
  const tagEl = document.getElementById('post-tag');
  const tag = tagEl ? tagEl.value : 'general';
  if(!content && !loungePostPhotoFile){ showToast('Andika kitu au chagua picha'); return; }

  const btn = document.querySelector('#post-overlay .btn-g');
  if(!btn){ showToast('Hitilafu ya UI'); return; }
  btn.textContent = '...'; btn.disabled = true;

  try {
    let photo_url = null;
    if(loungePostPhotoFile){
      const ext = loungePostPhotoFile.name.split('.').pop();
      const path = 'lounge/' + Date.now() + '.' + ext;
      const token = currentSession?.access_token || '';
      const upRes = await fetch(SUPABASE_URL+'/storage/v1/object/Wambaga-photos/'+path,{
        method:'POST',
        headers:{'Authorization':'Bearer '+token,'apikey':SUPABASE_ANON_KEY,'Content-Type':loungePostPhotoFile.type},
        body: loungePostPhotoFile
      });
      if(upRes.ok) photo_url = SUPABASE_URL+'/storage/v1/object/public/Wambaga-photos/'+path;
    }

    const displayName = currentUserProfile?.display_name || currentUserProfile?.username ||
      currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
    const branch = currentUserProfile?.branch || null;

    await sbFetch('/rest/v1/lounge_posts',{
      method:'POST',
      headers:{'Prefer':'return=minimal'},
      body: JSON.stringify({
        user_id: currentUser.id,
        user_name: displayName,
        user_leaf: currentUserProfile?.leaf_id || null,
        content: content || null,
        photo_url,
        branch,
        tag
      })
    });

    closeNewPost();
    showToast('✅ Post imechapishwa!');
  
    showLoungeNewDot();
  } catch(e){ 
    console.error('submitPost error:', e);
    showToast('Hitilafu: '+(e.message||'Angalia console'));
  }
  btn.textContent = 'Chapisha'; btn.disabled = false;
}

// ── REACTIONS ─────────────────────────────────────────────────────
function openReactions(postId){
  if(!isLoggedIn()){ openAuth(); return; }
  activeReactionPostId = postId;
  document.getElementById('reactions-overlay').classList.add('open');
}

function closeReactions(){
  document.getElementById('reactions-overlay').classList.remove('open');
}

async function submitReaction(reaction){
  closeReactions();
  if(!isLoggedIn() || !activeReactionPostId) return;
  try {
    // Toggle — delete if same reaction exists
    const existing = await sbFetch('/rest/v1/lounge_reactions?post_id=eq.'+activeReactionPostId+'&user_id=eq.'+currentUser.id+'&select=id,reaction');
    if(existing && existing.length > 0){
      if(existing[0].reaction === reaction){
        await sbFetch('/rest/v1/lounge_reactions?id=eq.'+existing[0].id,{method:'DELETE'});
      } else {
        await sbFetch('/rest/v1/lounge_reactions?id=eq.'+existing[0].id,{
          method:'PATCH', headers:{'Prefer':'return=minimal'}, body:JSON.stringify({reaction})
        });
      }
    } else {
      await sbFetch('/rest/v1/lounge_reactions',{
        method:'POST', headers:{'Prefer':'return=minimal'},
        body:JSON.stringify({post_id:activeReactionPostId, user_id:currentUser.id, reaction})
      });
    }
  
  } catch(e){ console.warn('Reaction error:', e); }
}

// ── COMMENTS ──────────────────────────────────────────────────────
function openComments(postId){
  if(!isLoggedIn()){ openAuth(); return; }
  activeCommentPostId = postId;
  commentReplyToId = null;
  document.getElementById('comment-input').value = '';
  document.getElementById('comment-reply-to').style.display = 'none';
  document.getElementById('comment-overlay').classList.add('open');
  loadComments(postId);
  setTimeout(()=>document.getElementById('comment-input').focus(), 300);
}

function closeComments(){
  document.getElementById('comment-overlay').classList.remove('open');
  activeCommentPostId = null;
  commentReplyToId = null;
}

async function loadComments(postId){
  const list = document.getElementById('comments-list');
  list.innerHTML = '<div style="color:var(--cream3);font-size:.8rem;text-align:center;padding:1rem">Inapakia...</div>';
  try {
    const comments = await sbFetch('/rest/v1/lounge_comments?post_id=eq.'+postId+'&order=created_at.asc&select=*');
    if(!comments || comments.length === 0){
      list.innerHTML = '<div style="color:var(--cream3);font-size:.8rem;text-align:center;padding:1rem;font-style:italic">Bado hakuna maoni — kuwa wa kwanza!</div>';
      return;
    }
    // Separate top-level and replies
    const topLevel = comments.filter(c => !c.parent_id);
    const replies  = comments.filter(c =>  c.parent_id);
    list.innerHTML = topLevel.map(c => {
      const childReplies = replies.filter(r => r.parent_id === c.id);
      return `<div class="comment-item">
        <div style="display:flex;align-items:center;gap:.5rem">
          <div style="width:26px;height:26px;border-radius:50%;background:${getAvatarColor(c.user_name)};display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#fff;flex-shrink:0">${(c.user_name||'?').slice(0,1).toUpperCase()}</div>
          <span class="comment-user">${escHtml(c.user_name||'Mgeni')}</span>
          <span style="font-size:.65rem;color:var(--cream3)">${getTimeAgo(c.created_at)}</span>
        </div>
        <div class="comment-text">${formatContent(escHtml(c.content))}</div>
        <div class="comment-reply-btn" onclick="setReplyTo('${c.id}','${escHtml(c.user_name||'')}')">↩ Jibu</div>
        ${childReplies.map(r => `
          <div class="comment-reply">
            <span class="comment-user" style="font-size:.75rem">${escHtml(r.user_name||'Mgeni')}</span>
            <span style="font-size:.65rem;color:var(--cream3);margin-left:.3rem">${getTimeAgo(r.created_at)}</span>
            <div class="comment-text" style="font-size:.83rem">${formatContent(escHtml(r.content))}</div>
          </div>`).join('')}
      </div>`;
    }).join('');
  } catch(e){ list.innerHTML = '<div style="color:#e87050;font-size:.8rem;text-align:center;padding:1rem">Hitilafu ya kupakia maoni</div>'; }
}

function setReplyTo(commentId, userName){
  commentReplyToId = commentId;
  const el = document.getElementById('comment-reply-to');
  el.style.display = 'block';
  el.innerHTML = `↩ Unajibu <strong>${escHtml(userName)}</strong> <span onclick="clearReplyTo()" style="cursor:pointer;color:var(--cream3);margin-left:.5rem">✕</span>`;
  document.getElementById('comment-input').focus();
}

function clearReplyTo(){
  commentReplyToId = null;
  document.getElementById('comment-reply-to').style.display = 'none';
}

async function submitComment(){
  if(!isLoggedIn()){ openAuth(); return; }
  const input = document.getElementById('comment-input');
  const content = input.value.trim();
  if(!content || !activeCommentPostId) return;
  const displayName = currentUserProfile?.display_name || currentUserProfile?.username ||
    currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
  try {
    await sbFetch('/rest/v1/lounge_comments',{
      method:'POST', headers:{'Prefer':'return=minimal'},
      body: JSON.stringify({
        post_id: activeCommentPostId,
        parent_id: commentReplyToId || null,
        user_id: currentUser.id,
        user_name: displayName,
        user_leaf: currentUserProfile?.leaf_id || null,
        content
      })
    });
    input.value = '';
    clearReplyTo();
    loadComments(activeCommentPostId);
    showLoungeNewDot();
  } catch(e){ showToast('Hitilafu: '+e.message); }
}

// ── ADMIN POST CONTROLS ───────────────────────────────────────────
async function deletePost(postId){
  if(!isAdmin()) return;
  if(!confirm('Futa post hii?')) return;
  await sbFetch('/rest/v1/lounge_posts?id=eq.'+postId,{method:'DELETE'});

}

async function editBotPost(postId, btn){
  if(!isAdmin()) return;
  // Find the content div for this post
  const card = btn.closest('.lounge-card') || btn.closest('[data-post-id]');
  const contentEl = card ? card.querySelector('.lounge-content') : null;
  const currentText = contentEl ? contentEl.innerText : '';
  const newText = prompt('Hariri post ya WambagaBot:', currentText);
  if(!newText || newText.trim() === currentText.trim()) return;
  await sbFetch('/rest/v1/lounge_posts?id=eq.'+postId,{
    method:'PATCH', headers:{'Prefer':'return=minimal'},
    body: JSON.stringify({content: newText.trim()})
  });
  if(contentEl) contentEl.innerText = newText.trim();
  showToast('✅ Post imehaririwa');
}

async function togglePin(postId, pin){
  if(!isAdmin()) return;
  await sbFetch('/rest/v1/lounge_posts?id=eq.'+postId,{
    method:'PATCH', headers:{'Prefer':'return=minimal'}, body:JSON.stringify({pinned:pin})
  });

}

// ── LOUNGE DOT ────────────────────────────────────────────────────
function showLoungeNewDot(){
  ['lounge-dot','lounge-dot-mob','mbn-lounge-dot'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.style.display = 'inline-block';
  });
  // Update nav link text to show unread indicator
  const navLink = document.getElementById('nav-gallery');
  if(navLink) navLink.style.color = 'var(--gold)';
  const mbnLounge = document.getElementById('mbn-gallery');
  if(mbnLounge) mbnLounge.style.color = 'var(--gold)';
}

function hideLoungeNewDot(){
  ['lounge-dot','lounge-dot-mob','mbn-lounge-dot'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.style.display = 'none';
  });
  const navLink = document.getElementById('nav-gallery');
  if(navLink) navLink.style.color = '';
  const mbnLounge = document.getElementById('mbn-gallery');
  if(mbnLounge) mbnLounge.style.color = '';
}

// ── CONNECTION ENGINE ─────────────────────────────────────────────
function showConnectionEngine(leafId){
  if(!leafId || !PEOPLE[leafId]){ showToast('Mtu huyu hajajiunga na mti'); return; }
  if(!isLoggedIn() || !currentUserProfile?.leaf_id){
    showToast('Ingia na ujihusishe na mti kwanza');
    return;
  }
  const myId = currentUserProfile.leaf_id;
  const theirId = leafId;
  if(myId === theirId){ showToast('Hii ni wewe mwenyewe! 😄'); return; }
  const path = findRelationshipPath(myId, theirId);
  const overlay = document.getElementById('connection-overlay');
  const content = document.getElementById('connection-content');
  if(!path){
    content.innerHTML = '<div style="color:var(--cream3);text-align:center;padding:1rem">Uhusiano haukupatikana kati yenu katika mti huu.</div>';
  } else {
    content.innerHTML = `<div style="margin-bottom:.75rem;font-size:.8rem;color:var(--cream3)">Njia ya ukoo kati yenu:</div>` +
      path.map((id,i) => {
        const p = PEOPLE[id];
        const name = p ? p.name.split('/')[0].trim() : id;
        return `<div style="display:flex;align-items:center;gap:.5rem;padding:.3rem 0">
          ${i>0?'<span style="color:var(--cream3);font-size:.8rem;margin-left:.5rem">↓</span>':''}
          <span style="color:${i===0||i===path.length-1?'var(--gold)':'var(--cream)'};font-weight:${i===0||i===path.length-1?'600':'400'}">${escHtml(name)}</span>
          ${p?`<span style="font-size:.7rem;color:var(--cream3)">· Kizazi ${p.gen}</span>`:''}
        </div>`;
      }).join('') +
      `<div style="margin-top:1rem;font-size:.8rem;color:var(--cream3);border-top:1px solid var(--border);padding-top:.75rem">Hatua ${path.length-1} za ukoo</div>`;
  }
  overlay.classList.add('open');
}

function closeConnection(){
  document.getElementById('connection-overlay').classList.remove('open');
}

function findRelationshipPath(fromId, toId){
  // BFS to find path between two people in the tree
  if(fromId === toId) return [fromId];
  const visited = new Set();
  const queue = [[fromId]];
  visited.add(fromId);
  // Build adjacency (parent + children)
  const adj = {};
  Object.values(PEOPLE).forEach(p => {
    if(!adj[p.id]) adj[p.id] = [];
    if(p.parentId && PEOPLE[p.parentId]){
      adj[p.id].push(p.parentId);
      if(!adj[p.parentId]) adj[p.parentId] = [];
      adj[p.parentId].push(p.id);
    }
  });
  while(queue.length){
    const path = queue.shift();
    const node = path[path.length-1];
    for(const neighbor of (adj[node]||[])){
      if(visited.has(neighbor)) continue;
      const newPath = [...path, neighbor];
      if(neighbor === toId) return newPath;
      visited.add(neighbor);
      queue.push(newPath);
    }
  }
  return null;
}

// ── AI WAMBAGABOT ─────────────────────────────────────────────────
let aiMessages = [];
let aiDrawerOpen = false;

const WAMBAGA_SYSTEM_PROMPT = `Wewe ni WambagaBot — msaidizi wa historia ya Ukoo wa Wambaga wa jamii ya Wapare wa Tanzania. Una ujuzi wa kina wa historia yote ya familia hii kutoka kwenye kumbukumbu za familia.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFARI YA NASABA — MUHTASARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ethiopia (Asmara) ~1545 → Uganda (Mbale) → Kenya (Nairobi → Kitui → Machakosi → Voi/Mwandau) → Tanzania (Tsavo → Mkomazi → Kisiwani/Hamteta → Usangi, Milima ya Pare)

MUHIMU: Bagha HAKUVUKA Tanzania. Mlavi HAKUVUKA Tanzania. Shambiro alikaa Kenya (Voi). SENGASU SHAMBIRO ndiye WA KWANZA KUVUKA TANZANIA kupitia Mbuga ya Tsavo na Mkomazi.

UHUSIANO WA TSAVO NA WAMBAGA:
Sengasu Shambiro (Kizazi cha 4) alipita kupitia Mbuga ya Tsavo wakati wa safari yake kutoka Kenya kwenda Tanzania. Hii ilikuwa safari ya kihistoria — alitoka Voi (Kijiji cha Mwandau) akavuka Tsavo, Mkomazi, Kilima cha Mazara, Kilima cha Kamirangi hadi Kisiwani. Hapo akapewa jina "Hamteta" (mtu anayetoka Teta/Taveta). Tsavo ni njia ya kihistoria ya Wambaga kwenda Tanzania.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WATU WA MTI NA HISTORIA ZAO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Bagha (Kiz.1, Wambaga wote) — Mahali: Asmara, Ethiopia
  Historia: Mzee wa kwanza wa Wambaga. Alitoka Asmara, Ethiopia ~1545. Kulitokea vita vya wenyewe kwa wenyewe  -  akakimbia Uganda (Mbale) pamoja na kundi lake, ikiwemo Mndome (babu wa Wandeme).

• Mlavi (Kiz.2, Wambaga wote) — Mahali: Uganda → Nairobi, Kenya
  Historia: Mtoto pekee wa Bagha. Walihamia Uganda (Mbale) ~1575, kisha wakaenda Nairobi. Mlavi alimzaa watoto wawili: Mwangi (alibaki Kenya) na Shambiro (aliendelea kusini).

• Mwangi Mlavi (Kiz.3, Tawi la Kenya) — Mahali: Kenya
  Historia: Alibaki Kenya. Uzao wake wako Kenya hadi leo.

• Shambiro Mlavi (Kiz.3, Wambaga wote) — Mahali: Voi, Kijiji cha Mwandau, Kenya
  Historia: Alikaa Kitui, Machakosi, na Voi (Kijiji cha Mwandau). Baba wa matawi yote makuu ya Wambaga Tanzania. Watoto wake: Bangalala, Mbaniko, Sengasu, Sinta/Sinda, na Bi Kokidia.

• Bangalala Shambiro (Kiz.4, Tawi la Bangalala) — Mahali: Usangi Ndanda, Kiriche
  Historia: Wambaga wa Usangi Ndanda, Kiriche. Uzao wake: Mtira (akina Ringania, Ngomasere) na Mwangi (uzao haujulikani).

• Mbaniko Shambiro (Kiz.4, Tawi la Mbaniko) — Mahali: Usangi Kirongaya / Ngujini
  Historia: Alioa mke wa Kimasai: Namanga Sayore. Watoto wake: Kalighi na Tenameso. Uzao wake wako Usangi Kirongaya na Ngujini.

• Sengasu Shambiro (Kiz.4, Tawi la Sengasu) — Mahali: Mbaga Madiveni
  Historia: Wa kwanza kuvuka Tanzania. Akapita Mbuga ya Tsavo, Mbuga ya Mkomazi, Kilima cha Mazara, Kilima cha Kamirangi hadi Kisiwani  -  pakaitwa Hamteta (maana: mtu anayetoka Teta/Taveta). Watoto: Rindi, Kuare, Walongwa, Bi Nankondo, Bi Namhezi.

• Sinta / Sinda Shambiro (Kiz.4, Tawi la Sinta) — Mahali: Mbagha
  Historia: Wambaga wa Mbagha.

• Mtira Bangalala (Kiz.5, Tawi la Bangalala)
  Historia: Mtoto wa Bangalala Shambiro. Uzao wake kupitia Ringania: Sekanyonge (akina Nziamwe, Maliare, Lichmen), Mnyalo (akina Varisanga, Kiagho), na wengine.

• Mwangi Bangalala (Kiz.5, Tawi la Bangalala)
  Historia: Uzao wake haujulikani.

• Kalighi Mbaniko (Kiz.5, Tawi la Mbaniko)
  Historia: Watoto wake: Kinyunyu na Chikira Kalighi.

• Tenameso Mbaniko (Kiz.5, Tawi la Tenameso)
  Historia: Watoto wake: Kizigha (Mkisangara) na Mshewa (Tatiro).

• Kinyunyu Kalighi (Kiz.6, Tawi la Mbaniko)
  Historia: Watoto wake: Kitagha, Kagulu, Kilango, Bi Nambojo.

• Chikira Kalighi (Kiz.6, Tawi la Chikira)
  Historia: Watoto wake: Mrighwa, Mwanyika, Kanyange, Sayore. Uzao wako Kisangara juu na maeneo mengine.

• Kitagha Kinyunyu (Kiz.7, Tawi la Mbaniko)
  Historia: Watoto wake: Mpombeyagonja/Thekiro, Kinenekejo, Tegurwa.

• Kagulu Kinyunyu (Kiz.7, Tawi la Kagulu)
  Historia: Watoto wake: Mlavi Kagulu, Angida Kagulu.

• Kilango Kinyunyu (Kiz.7, Tawi la Kilango)
  Historia: Watoto wake: Varinoi, Mlau, Ngwaru, Shai.

• Mpombeyagonja / Thekiro (Kiz.8, ★ Tawi la Mpombeyagonja)
  Historia: Mzee maarufu wa tawi la Mpombeyagonja. Alioa wanawake wawili: (1) Navuri na (2) Kitukule. Watoto wake: Mashanga/Masudi, Mwejuma/Naneka, Kinonga/Athumani, Bi Zaina/Majwii.

• Kinenekejo Kitagha (Kiz.8, Tawi la Kinenekejo)
  Historia: Kinenekejo mwana Kitagha mwana Kinyunyu mwana Kalighi mwana Mbaniko mwana Shambiro mwana Mlavi mwana Bagha. Watoto wake: Abdalah, Haji, Nasoro, Rashidi, Juma, Kutua, Simbano, na wengine.

• Mashanga / Masudi (Kiz.9, Tawi la Mpombeyagonja)
  Historia: Alifariki 9/5/1959 Usangi Kirongaya. Alioa wanawake wanne. Watoto 18 (waume 9, wake 9).

• Mwejuma / Naneka (Kiz.9, Tawi la Mpombeyagonja)
  Historia: Alizaliwa 1911, alifariki 1993. Alioa wake wawili. Watoto 12.

• Kinonga / Athumani (Kiz.9, Tawi la Mpombeyagonja)
  Historia: Alifanya kazi Arusha. Alifariki Kisangiro (he Mramba) kwa ugonjwa wa malaria akiwa njiani kurudi Usangi kutoka Arusha  -  alizikwa Kisangiro kwani hapakuwa na usafiri. Alioa wake wawili: (1) Mwanaidi/Shange (baadaye aliolewa na Mashanga), (2) Mwanaidi/Namkeshe (baadaye aliolewa na Mwejuma).

• Bi Zaina / Majwii (Kiz.9, Tawi la Mpombeyagonja)
  Historia: Aliolewa na Khalifani Kiure Mziray wa Kirongaya (Kijelwa).

• Amiri Masudi (Kiz.10, Tawi la Mpombeyagonja)
  Historia: Hana Uzao

• Saidi / Bule Masudi (Kiz.10, Tawi la Mpombeyagonja)
  Historia: Hana Uzao

• Isumaili Mwejuma (Kiz.10, Tawi la Mpombeyagonja)
  Historia: Alifariki 4/8/1918

• Halifa / Mkulungu Mwejuma (Kiz.10, Tawi la Mpombeyagonja)
  Historia: Alifariki mwaka 1983

• Ishaki / Chayoa / Sekro Mwejuma (Kiz.10, ★ Mwandishi wa Historia) — Mahali: Mwanga Mji Mpya
  Historia: Mwana wa Mwejuma/Naneka. Anaishi Mwanga Mji Mpya.

• Mwejuma / Mwinyi Sekro (Kiz.11, ★ Tawi la Chayoa)
  Historia: Mtoto wa Chayoa/Sekro. Msaidizi wa familia.

• Kanyange Chikira (Kiz.7, Tawi la Chikira)
  Historia: Taarifa zake hazijapatikana

• Sayore Chikira (Kiz.7, Tawi la Chikira) — Mahali: Kisangara juu

• Thumuni Mgaya (Kiz.9, Tawi la Chikira)
  Historia: Hana Uzao

• Kizigha Tenameso (Kiz.6, Tawi la Tenameso) — Mahali: Mkisangara

• Bi Mvuni Kadori (Kiz.8, Tawi la Tenameso)
  Historia: Aliolewa na Ghuhia Chachika. Mama yake Mfumwa Liana Ghuhia.

• Kachenje Kanyempwe (Kiz.9, Tawi la Tenameso)
  Historia: Mzee Aliamani Kachenje ni mtoto wake. Baba wa historia ya Wambaga.

• Bi Kodawa / Amina Kanyempwe (Kiz.9, Tawi la Tenameso)
  Historia: Aliolewa na Mfumwa Liana  -  mama yake Liana Ghuhia.

• Bi Tekinacha / Nakiete Kanyempwe (Kiz.9, Tawi la Tenameso)
  Historia: Aliolewa na Sekondo Sareva Mndeme.

• Bi Kitente / Nakiete Kanyempwe (Kiz.9, Tawi la Tenameso)
  Historia: Aliolewa na Kisenge Ghuhia.

• Eliamani / Aliamani Kachenje (Kiz.10, Tawi la Tenameso) — Mahali: Usangi Ngujini
  Historia: Mzee Aliamani Kachenje  -  Mlezi mkubwa wa Historia ya Wambaga. Alihifadhi historia ya vizazi vya kila ukoo wa Wambaga kichwani hadi kizazi cha saba. Mwandishi Chayoa/Sekro alikutana naye ~1982 akaandika historia ile. Anaishi Usangi Ngujini.

• Rindi Sengasu (Kiz.5, Tawi la Sengasu) — Mahali: Milima ya Nguu, Handeni
  Historia: Mtoto wa Sengasu. Alikaa Milima ya Nguu karibu na Handeni. Baba wa Shebughe Mkilindi - mzazi wa nasaba ya watawala wa Ufalme wa Shambaa (Kilindi dynasty). Historia ya Wambaga inadai Mbegha Vuga - mwanzilishi wa Ufalme wa Shambaa - ni mzao wake.

• Kuare / Nkuare Sengasu (Kiz.5, Tawi la Sengasu) — Mahali: Mbaga Madiveni
  Historia: Mmbagha wa Madiveni. Watoto wake: Kijomu na Shambiro II.

• Walongwa Sengasu (Kiz.5, Tawi la Sengasu) — Mahali: Mramba
  Historia: Mmbagha wa Mramba. Kazi yake: kubariki vyakula (kuhoja kwa Kipare) na utaalam wa kuondoa wadudu mashambani (menda). Aliishi karibu na msitu wa Wambaga uitwao Mashankwe.

• Shebughe Mkilindi (Kiz.6, Tawi la Sengasu/Mkilindi)
  Historia: Mtoto wa Rindi Sengasu. Baba wa Kimweri Mkilindi. Mzazi wa mwanzo wa nasaba ya Kilindi ya Milima ya Usambara.

• Kimweri Mkilindi (Kiz.7, Tawi la Sengasu/Mkilindi) — Mahali: Milima ya Usambara
  Historia: Mtoto wa Shebughe. Baba wa Mbegha Vuga - Mfalme wa kwanza wa Ufalme wa Shambaa.

• Simba Mwene / Mbega Vuga (Kiz.8, Tawi la Sengasu/Mkilindi) — Mahali: Vuga, Milima ya Usambara
  Historia: "Simba Mwene" - Mfalme na Simba wa Milima. Mwanzilishi wa Ufalme wa Shambaa (Kilindi dynasty). Mara kwa mara Wafalme wa Shambaa waliwaomba Wambaga wataalamu wa mvua (rainmakers) kwa ada kubwa.

• Kirota Moshi (Kiz.11, Tawi la Sengasu/Mkilindi)
  Historia: 1882

• Madiva / Nzovu Shambiro II (Kiz.7, Tawi la Sengasu/Madiveni)
  Historia: Watoto wake 5: Luvigho, Chasimba, Chalambo, Chachika, Kikwa  -  walikaa Mbaga na Usangi.

• Luvigho Madiva/Nzovu (Kiz.8, Tawi la Luvigho/Mbaga) — Mahali: Mbaga
  Historia: Wambaga wa Mbaga. Watoto wake 10 wakiwemo Ngoka, Mfumwa Mashombo, na wengine.

• Chasimba Madiva/Nzovu (Kiz.8, Tawi la Chasimba) — Mahali: Kiriche, Kilaweni, Mabweni, Butu
  Historia: Wambaga wa Kiriche (Chali), Kilaweni (Mmbati), Mabweni (Sabuni), Butu (Munga). Alitumwa Usangi kama jemadari wa pili  -  lakini Wagweno hawakuja tena.

• Chalambo Madiva/Nzovu (Kiz.8, Tawi la Chalambo) — Mahali: Vudee, Makanya, Usangi
  Historia: Alihamia Manka, Mbaga hadi Muheza Mwembe. Uzao wake unakaa Mvureni Ibutu.

• Chachika Madiva/Nzovu (Kiz.8, ★ Chifu Chachika) — Mahali: Usangi Kighare, Kilaweni, Shunguri
  Historia: ★ JEMADARI WA KWANZA  -  Alipelekwa Usangi na Chifu Nzovu baba yake akiwa na miaka 20 (~1805) kukabiliana na Wagweno waliosaidiwa na Wachaga na Wasangi. Baada ya ushindi mkubwa, Chifu Munga wa Usangi alimzawadia Chachika uchifu  -  akawa chifu wa kwanza wa Usangi kutoka ukoo wa Wambaga.

• Kikwa Madiva/Nzovu (Kiz.8, Tawi la Kikwa) — Mahali: Kizungo, Vumari Same
  Historia: Wambaga wa Kizungo, Vumari Same. Wachache wako Usangi: akina Kireti na Ngereka.

• Mfumwa Mashombo Luvigho (Kiz.9, Tawi la Luvigho)
  Historia: Mtoto wa Luvigho  -  mzazi wa Mfumwa Joseph Mapande Mashombo (chifu wa mwisho wa Mbaga South Pare).

• Mfumwa Joseph Mapande Mashombo (Kiz.12, Tawi la Luvigho)
  Historia: Chifu wa mwisho wa Mbaga South Pare.

• Kengia Chasimba (Kiz.9, Tawi la Chasimba) — Mahali: Usangi
  Historia: Chifu wa Wambaga wa Chasimba. Katika enzi ya kibonda (karne ya 19), alihamisha makao yake mashariki mwa Usangi kufuatilia njia za biashara. Alifungua soko la watumwa Usangi. Biashara ya pembe za ndovu na utumwa ilisababisha migogoro ya ndani na kuporomoka kwa miundo ya kimila.

• Sabuni / Salimu Naguvu (Kiz.11, Tawi la Chasimba) — Mahali: Usangi
  Historia: Mfumwa  -  Chifu wa Usangi. Alimzaa watoto wengi sana (34+).

• Ghuhia Chachika (Kiz.9, ★ Tawi la Chachika) — Mahali: Usangi Kighare
  Historia: Mtoto mkubwa wa Chachika. Aliongoza tawi la uchifu wa Usangi. Watoto: Liana (Chifu), Yatera, Kichawele, Chelangwa, Ndaghine, Kisenge, Nguruta, Bi Nankumbi (aliolewa na Kachenje Kanyembwe - endogamy ya matawi mawili), Bi Tekuiwa.

• Mronga Chachika (Kiz.9, ★ Tawi la Chachika) — Mahali: Mangare, Mkindi
  Historia: Mtoto wa Chachika. Uzao wake kupitia Mangare na Mpoa.

• Lunga Chachika (Kiz.9, ★ Tawi la Chachika) — Mahali: Kibakaya
  Historia: Mtoto wa Chachika. Uzao wake kupitia Kibakaya. Binti yake Bi Mtundu aliolewa na Kanyempwe.

• Sekalati Chachika (Kiz.9, ★ Tawi la Chachika) — Mahali: Kisaka
  Historia: Mtoto wa Chachika.

• Ibura Chachika (Kiz.9, ★ Tawi la Chachika)
  Historia: Mtoto wa Chachika. Hatibu Mshanga. Warithi wake wanajulikana kama akina Mshanga.

• Igombe / Lukwaro Chachika (Kiz.9, ★ Tawi la Chachika)
  Historia: Mtoto wa Chachika. Ukoo wake: Omari - wanaishi Gadi Shunguri.

• Mgayo Chachika (Kiz.9, ★ Tawi la Chachika)
  Historia: Mtoto wa Chachika. Alifariki bila watoto.

• Ringania Mtira (Kiz.6, Tawi la Bangalala)
  Historia: Mtoto wa Mtira Bangalala.

• Sekanyonge Ringania (Kiz.7, Tawi la Bangalala)
  Historia: Watoto wake: Ngomasere, Nziamwe, Kasala, Kimalo, Kipwili, Kimario, Maleko, Kabora.

• Senkoro Kiagho (Kiz.10, Tawi la Bangalala)
  Historia: Binti yake Bi Ezena aliolewa na Mfumwa Athumani Issa Liana  -  kuunganisha tawi la Bangalala na Sengasu.

• Keramiti Chalambo (Kiz.9, Tawi la Chalambo)
  Historia: Mtoto wa Chalambo Madiva/Nzovu. Uzao wake ulihamia Muheza Mwembe, Mvureni Ibutu.

• Manase Kijo (Kiz.11, Tawi la Chalambo)
  Historia: Mtu wa ajabu  -  aliishi miaka 120 (1856-1976)! Alilelewa na wamisionari wa Kijerumani wa Shighatini. Baba wa watoto 13+.

• Mchungaji Kiravu Manase (Kiz.12, Tawi la Chalambo)
  Historia: Alihusika sana na muundo wa kidini wa Kikristo.

• Mfumwa Liana Ghuhia (Kiz.10, ★ Tawi la Chachika) — Mahali: Usangi Kighare
  Historia: Chifu wa Usangi. Aloa wake wengi. Baba wa Mavura aliyemrithi. Mzazi wa Alhaji Issa Mlao  -  mwandishi wa kitabu cha historia ya Wambaga (2020). Watoto 16+ wa kiume na 16 wa kike.

• Yatera Ghuhia (Kiz.10, ★ Tawi la Chachika) — Mahali: Usangi

• Kisenge Ghuhia (Kiz.10, ★ Tawi la Chachika)
  Historia: Bi Kitente Kanyembwe aliolewa na Kisenge Ghuhia  -  endogamy ya Mbaniko na Sengasu.

• Bi Nankumbi Ghuhia (Kiz.10, ★ Tawi la Chachika)
  Historia: Aliolewa na Kachenje Kanyembwe  -  mama wa Aliamani Kachenje! Hii ni endogamy inayounganisha tawi la Sengasu (Chachika) na tawi la Mbaniko (Tenameso).

• Mfumwa Mavura Liana (Kiz.11, ★ Tawi la Chachika) — Mahali: Usangi
  Historia: Alimrithi baba yake Liana kama Chifu wa Usangi.

• Issa / Mlao Liana (Kiz.11, ★ Tawi la Chachika) — Mahali: Usangi
  Historia: Mzazi wa Alhaji Issa Mlao Yusufu Mavura  -  mwandishi wa kitabu kikuu cha Wambaga 2020. Pia Mfumwa Athumani (mtoto wake) alitawazwa Chifu Mkuu wa Wambaga wote wa Usangi 1985.

• Daudi Liana (Kiz.11, ★ Tawi la Chachika)
  Historia: Mwana wa Mfumwa Liana Ghuhia. Aliishi Usangi Kighare. Alikuwa na watoto wengi — vizazi vyake viko sehemu nyingi za Usangi na Tanzania.

• Balozi Fadhili Daudi Liana (Kiz.12, ★ Tawi la Chachika)
  Historia: Balozi — alihudumu katika sekta ya diplomasia.

• Nasibu / Kamando Daudi Liana (Kiz.12, ★ Tawi la Chachika)
  Historia: Kamando — alihudumu katika jeshi.

• Bi Amina Amiri Daudi (Kiz.13, ★ Tawi la Chachika)
  Historia: Alioa Athumani Juma Mashanga wa Kirongaya.

• Dr Issa Hemedi Daudi (Kiz.13, ★ Tawi la Chachika)
  Historia: Daktari.

• Prof Saidi Hemedi Daudi (Kiz.13, ★ Tawi la Chachika)
  Historia: Profesa.

• Bi Dr Mwajabu Rashidi Daudi (Kiz.13, ★ Tawi la Chachika)
  Historia: Daktari.

• Bi Hidaya Rajabu Daudi (Kiz.13, ★ Tawi la Chachika)
  Historia: Alioa Sekro Mwejuma Mpombeyagonja — mwandishi wa kitabu hiki.

• Bi Dr Amina Nasibu Daudi (Kiz.13, ★ Tawi la Chachika)
  Historia: Daktari.

• Hemedi / Kakindo Liana (Kiz.11, ★ Tawi la Chachika)
  Historia: Alioa Mwanamisi/Namvua Isae wa Kighare. Makao yake yalikuwa Moshi.

• Mwalimu Leonard / Ngayo Liana (Kiz.11, ★ Tawi la Chachika)
  Historia: Mwalimu — alihudumu katika elimu.

• Ramadhani / Kanana Liana (Kiz.11, ★ Tawi la Chachika)
  Historia: Mwalimu Ramadhani Kanana.

• Mapande Liana (Kiz.11, ★ Tawi la Chachika)
  Historia: Alifariki kabla ya kupata mtoto.

• Afande Salehe Mwedadi Liana (Kiz.12, ★ Tawi la Chachika)
  Historia: Afande — alihudumu katika jeshi.

• Alhaj Abdu / Liana Hemedi Liana (Kiz.12, ★ Tawi la Chachika)
  Historia: Alhaj.

• Bi Hasani Liana (Kiz.11, ★ Tawi la Chachika)
  Historia: Habari zaidi zinahitajika.

• Alhaji Issa Mlao Mavura (Kiz.13, ★ Tawi la Chachika)
  Historia: ★ MWANDISHI wa kitabu kikuu cha historia ya Wambaga (2020). Jina lake kamili: Alhaji Issa Mlao Yusufu Mavura. Yeye ni mzao wa Chachika (chifu wa kwanza wa Usangi) kupitia Ghuhia → Liana → Mavura → Yusufu → Alhaji Issa. Historia aliyoiandika ni hazina ya ukoo wote wa Wambaga.

• Prof Walidi Yusufu Mavura (Kiz.13, ★ Tawi la Chachika)
  Historia: Profesa.

• Mfumwa Athumani Issa Liana (Kiz.12, ★ Tawi la Chachika) — Mahali: Usangi
  Historia: Alitawazwa Chifu Mkuu wa Wambaga wote wa Usangi mwaka 1985 kwa njia ya mila za Kipare. Alioa binti ya Kiagho Varisanga (tawi la Bangalala)  -  kuunganisha matawi mawili makuu.

• Mangare Mronga (Kiz.10, ★ Tawi la Chachika) — Mahali: Mangare, Mkindi

• Mkindi Mangare (Kiz.11, ★ Tawi la Chachika) — Mahali: Mkindi

• Ramadhani Athumani Mkindi (Kiz.13, ★ Tawi la Chachika)
  Historia: Mtoto wake Alhaji Abdallah ni wa kizazi cha 14.

• Kibakaya Lunga (Kiz.10, ★ Tawi la Chachika) — Mahali: Kibakaya

• Bi Mtundu Lunga (Kiz.10, ★ Tawi la Chachika)
  Historia: Aliolewa na Kanyempwe (Tekina)  -  mama wa Tekina Kanyempwe.

• Mburia Chachika (Kiz.9, ★ Tawi la Chachika)
  Historia: Watoto wake: Nziamwe na Kadari - wote wawili ni watoto wa Mburia (si wa Kadari). Uzao wa Kadari unaendelea kupitia Lewanga na Salimu hadi kizazi cha 14.

• Nziamwe Mburia (Kiz.10, ★ Tawi la Chachika)
  Historia: Mtoto wa Mburia Chachika. Kaka wa Kadari.

• Kadari Mburia (Kiz.10, ★ Tawi la Chachika)
  Historia: Mtoto wa Mburia Chachika. Baba wa Lewanga.

• Kiraghinja Magiri (Kiz.10, ★ Tawi la Chachika)
  Historia: Alifariki bila watoto.

• Munga Magwero (Kiz.11, Tawi la Chasimba)
  Historia: Mtoto wa kwanza wa Magwero Kengia Chasimba.

• Suedi Munga Magwero (Kiz.12, Tawi la Chasimba)
  Historia: Baba wa Kanali Yunusi (Gen 13).

• Kanali Yunusi Suedi Magwero (Kiz.13, Tawi la Chasimba)
  Historia: Kanali  -  afisa wa jeshi. Kizazi cha 13 cha ukoo wa Wambaga (kutoka Bagha).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MWELEKEO WA KUJIBU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Jibu kwa Kiswahili au Kiingereza kulingana na swali
- Kuwa wa karibu na wa familia — si rasmi sana
- Toa maelezo ya kina ukiulizwa kuhusu mtu au tukio lolote — una data kamili
- Sahihisha makosa kama ukijua ukweli
- Kama hujui jibu, sema ukweli — usibuni kamwe
- Unaweza kuelezea uhusiano kati ya watu (mfano: X ni mtoto wa Y ambaye ni mjukuu wa Z)
- Unaweza kutoa ushauri wa familia na maadili ya Kipare`;

function toggleAiDrawer(){
  aiDrawerOpen = !aiDrawerOpen;
  const drawer = document.getElementById('ai-drawer');
  if(aiDrawerOpen){
    drawer.classList.add('open');
    setTimeout(()=>{
      const inp = document.getElementById('ai-input');
      inp.value = ''; // Clear any autofill
      inp.focus();
    }, 400);
  } else {
    drawer.classList.remove('open');
  }
}

async function sendAiMessage(){
  const input = document.getElementById('ai-input');
  const msg = input.value.trim();
  if(!msg) return;
  input.value = '';
  appendAiMessage('user', msg);
  aiMessages.push({role:'user', content: msg});
  const typingEl = appendAiMessage('bot', '...');
  try {
    const res = await fetch('/.netlify/functions/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-haiku-4-5-20251001',
        max_tokens:1000,
        system: WAMBAGA_SYSTEM_PROMPT,
        messages: aiMessages.slice(-10)
      })
    });
    const data = await res.json();
    const rawReply = data.content?.[0]?.text || 'Samahani, kuna hitilafu. Jaribu tena.';
    // Strip markdown
    const reply = rawReply
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/---/g, '')
      .replace(/━+/g, '')
      .trim();
    typingEl.textContent = reply;
    aiMessages.push({role:'assistant', content: reply});
  } catch(e){
    typingEl.textContent = 'Hitilafu ya mtandao. Angalia internet yako.';
  }
}

// Handle @WambagaBot mentions in lounge comments
async function handleBotMention(content, postId, parentCommentId){
  if(!content.includes('@WambagaBot') && !content.includes('@wambagabot')) return;
  // Extract the actual question - remove @WambagaBot tag
  const question = content.replace(/@WambagaBot/gi,'').replace(/@wambagabot/gi,'').trim();
  if(!question){ 
    // No question — ask them to provide one
    await postBotComment(postId, 'Tafadhali andika swali lako baada ya @WambagaBot. Mfano: "@WambagaBot Tsavo ina uhusiano gani na Wambaga?"');
    return; 
  }
  // Show typing indicator
  await postBotComment(postId, '⏳ Ninajibu...', parentCommentId);
  try {
    const res = await fetch('/.netlify/functions/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-haiku-4-5-20251001',
        max_tokens:400,
        messages:[{role:'user', content: question}]
      })
    });
    const data = await res.json();
    const reply = data.content?.[0]?.text;
    if(!reply) return;
    // Remove markdown symbols from reply
    const cleanReply = reply
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/---/g, '')
      .replace(/━+/g, '')
      .trim();
    // Update the typing indicator comment with real reply
    await postBotComment(postId, cleanReply, parentCommentId);
    if(activeCommentPostId === postId) loadInlineComments(postId);
  } catch(e){ 
    await postBotComment(postId, 'Samahani, kuna tatizo la mtandao. Jaribu tena.', parentCommentId);
    console.warn('Bot mention error:', e); 
  }
}

async function postBotComment(postId, text, parentId){
  try {
    await sbFetch('/rest/v1/lounge_comments',{
      method:'POST', headers:{'Prefer':'return=minimal'},
      body: JSON.stringify({
        post_id: postId,
        parent_id: parentId || null,
        user_id: currentUser.id,
        user_name: '🤖 WambagaBot',
        content: text
      })
    });
    if(activeCommentPostId === postId) loadInlineComments(postId);
  } catch(e){ console.warn('postBotComment error:', e); }
}

function appendAiMessage(role, text){
  const msgs = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.className = 'ai-msg ' + role;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

// Intercept submitComment to handle @WambagaBot
const _origSubmitComment = submitComment;
window.submitComment = async function(){
  const content = document.getElementById('comment-input').value.trim();
  await _origSubmitComment();
  if(content.includes('@WambagaBot') || content.includes('@wambagabot')){
    await handleBotMention(content, activeCommentPostId);
  }
};

// Load lounge + update bottom nav when view changes
(function(){
  const _origShowView2 = window.showView;
  window.showView = function(v){
    _origShowView2(v);
    if(v === 'gallery') loadLounge();
    // Update bottom nav active state
    const map = {home:'mbn-home', tree:'mbn-tree', gallery:'mbn-gallery', history:'mbn-history'};
    document.querySelectorAll('.mob-bottom-item').forEach(el => el.classList.remove('active'));
    if(map[v]){ const el = document.getElementById(map[v]); if(el) el.classList.add('active'); }
    // Hide AI FAB on lounge (avoid overlap), show elsewhere
    const aiFab = document.getElementById('ai-fab');
    if(aiFab) aiFab.style.display = v === 'gallery' ? 'none' : 'flex';
    // Start activity polling when leaving lounge
    if(v !== 'gallery') startLoungeActivityPoll();
    else stopLoungeActivityPoll();
    // Hide + FAB on lounge too
    const fab = document.getElementById('fab');
    if(fab){
      if(v === 'gallery') fab.classList.remove('visible');
      else if(isLoggedIn()) fab.classList.add('visible');
    }
  };
})();

// Auth UI handled by updateAuthUI above

// ══════════════════════════════════════════════════════════════════
//  @MENTION AUTOCOMPLETE
// ══════════════════════════════════════════════════════════════════
function getMentionSuggestions(){
  return [
    { name: 'WambagaBot', label: '🤖 WambagaBot', desc: 'Muulize bot kuhusu historia' },
    ...Object.values(PEOPLE || {})
      .filter(p => !p.isUnknown && p.name)
      .slice(0, 100)
      .map(p => ({ name: p.name.split('/')[0].trim().replace(/\s+/g,'_'), label: '👤 '+p.name.split('/')[0].trim(), desc: 'Kizazi '+(p.gen||'?')+' · '+(p.branch||'') }))
  ];
}

function handleMentionInput(el, dropdownId){
  const val = el.value;
  const cursor = el.selectionStart;
  const before = val.slice(0, cursor);
  const match = before.match(/@(\w*)$/);
  const dropdown = document.getElementById(dropdownId);
  if(!dropdown) return;

  if(!match){ dropdown.style.display = 'none'; return; }

  const query = match[1].toLowerCase();
  const results = getMentionSuggestions()
    .filter(s => s.name.toLowerCase().includes(query) || s.label.toLowerCase().includes(query))
    .slice(0, 6);

  if(!results.length){ dropdown.style.display = 'none'; return; }

  dropdown.style.display = 'block';
  dropdown.innerHTML = results.map(s => `
    <div onclick="insertMention('${s.name}','${dropdownId}')" 
      style="padding:.5rem .75rem;cursor:pointer;border-bottom:1px solid var(--border);transition:background .1s"
      onmouseover="this.style.background='rgba(201,146,42,.1)'" 
      onmouseout="this.style.background=''">
      <div style="font-size:.85rem;color:var(--cream)">${s.label}</div>
      <div style="font-size:.68rem;color:var(--cream3)">${s.desc}</div>
    </div>`).join('');
}

function insertMention(name, dropdownId){
  // Find the input associated with this dropdown
  const dropdown = document.getElementById(dropdownId);
  if(!dropdown) return;
  
  // Find input: sibling or nearby input
  let el = null;
  if(dropdownId === 'post-mention-dropdown'){
    el = document.getElementById('post-content');
  } else if(dropdownId === 'compose-mention-dropdown'){
    el = document.getElementById('compose-input');
  } else {
    // Dynamic dropdown like mention-drop-{postId}
    // Find the parent and look for input inside
    const parent = dropdown.parentElement;
    el = parent ? parent.querySelector('input[type="text"]') : null;
  }
  
  if(!el) return;
  const val = el.value || el.textContent || '';
  const cursor = el.selectionStart || val.length;
  const before = val.slice(0, cursor);
  const after = val.slice(cursor);
  const newBefore = before.replace(/@\w*$/, '@' + name + ' ');
  el.value = newBefore + after;
  el.focus();
  try { el.selectionStart = el.selectionEnd = newBefore.length; } catch(e){}
  dropdown.style.display = 'none';
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e){
  if(!e.target.closest('#post-mention-dropdown') && !e.target.id !== 'post-content')
    document.querySelectorAll('[id$="-mention-dropdown"]').forEach(d => d.style.display = 'none');
});

// ══════════════════════════════════════════════════════════════════
//  TELEGRAM-STYLE COMPOSE
// ══════════════════════════════════════════════════════════════════
let composePhotoFile = null;

function autoResizeCompose(el){
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function pickComposePhoto(){
  if(!currentUser){ openAuth(); return; }
  document.getElementById('compose-photo-input').click();
}

function handleComposePhoto(input){
  const file = input.files[0];
  if(!file) return;
  if(file.size > 8*1024*1024){ showToast('Picha kubwa sana — chini ya 8MB'); return; }
  composePhotoFile = file;
  const preview = document.getElementById('compose-photo-preview');
  const name = document.getElementById('compose-photo-name');
  if(preview) preview.style.display = 'flex';
  if(name) name.textContent = '📷 ' + file.name;
}

function clearComposePhoto(){
  composePhotoFile = null;
  const preview = document.getElementById('compose-photo-preview');
  if(preview) preview.style.display = 'none';
  document.getElementById('compose-photo-input').value = '';
}

async function sendComposePost(){
  if(!currentUser){ openAuth(); return; }
  const input = document.getElementById('compose-input');
  const content = input?.value.trim();
  if(!content && !composePhotoFile){ showToast('Andika kitu au chagua picha'); return; }

  const btn = document.querySelector('#lounge-compose button[onclick="sendComposePost()"]');
  if(btn){ btn.textContent = '...'; btn.disabled = true; }

  try {
    let photo_url = null;
    if(composePhotoFile){
      try {
        const ext = composePhotoFile.name.split('.').pop().toLowerCase();
        const path = 'lounge/' + currentUser.id.slice(0,8) + '_' + Date.now() + '.' + ext;
        const token = currentSession?.access_token || '';
        const upRes = await fetch(SUPABASE_URL+'/storage/v1/object/Wambaga-photos/'+path,{
          method:'POST',
          headers:{
            'Authorization':'Bearer '+token,
            'apikey':SUPABASE_ANON_KEY,
            'Content-Type':composePhotoFile.type,
            'x-upsert':'true'
          },
          body: composePhotoFile
        });
        if(upRes.ok){
          photo_url = SUPABASE_URL+'/storage/v1/object/public/Wambaga-photos/'+path;
        } else {
          const err = await upRes.json().catch(()=>({}));
          console.warn('Photo upload failed:', err);
          showToast('Picha haikupakia — post itatumwa bila picha');
        }
      } catch(e){ console.warn('Photo upload error:', e); }
    }

    const profile = currentUserProfile || {};
    const displayName = profile.display_name || profile.username ||
      currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];

    await sbFetch('/rest/v1/lounge_posts',{
      method:'POST',
      headers:{'Prefer':'return=minimal'},
      body: JSON.stringify({
        user_id: currentUser.id,
        user_name: displayName,
        user_leaf: profile.leaf_id || null,
        content: content || null,
        photo_url,
        branch: profile.branch || null,
        tag: 'general'
      })
    });

    // Clear input
    if(input){ input.value = ''; input.style.height = 'auto'; }
    clearComposePhoto();
  

    // Handle @WambagaBot
    if(content && (content.includes('@WambagaBot') || content.includes('@wambagabot'))){
      setTimeout(()=>handleBotMentionInPost(content), 1000);
    }

  } catch(e){ showToast('Hitilafu: '+(e.message||'jaribu tena')); }

  if(btn){ btn.textContent = '➤'; btn.disabled = false; }
}

// ── INLINE REACTIONS ──────────────────────────────────────────────
async function quickReact(postId){
  if(!currentUser){ openAuth(); return; }
  // Find the like button and update instantly (optimistic UI)
  const card = document.getElementById('post-'+postId);
  if(!card) return;
  const likeBtn = card.querySelector('button[onclick*="quickReact"]');
  const likeSpan = likeBtn ? likeBtn.querySelector('span:last-child') : null;
  const emojiSpan = likeBtn ? likeBtn.querySelector('span:first-child') : null;
  // Get current count
  const currentText = likeSpan ? likeSpan.textContent : '';
  const currentCount = parseInt(currentText) || 0;
  // Check if already liked (red heart)
  const alreadyLiked = likeBtn && likeBtn.style.color === 'var(--gold)';

  // Instant visual update
  if(likeBtn){
    if(alreadyLiked){
      likeBtn.style.color = 'var(--cream3)';
      if(emojiSpan) emojiSpan.textContent = '🤍';
      if(likeSpan) likeSpan.textContent = Math.max(0, currentCount-1) + ' Like';
    } else {
      likeBtn.style.color = '#e04444';
      if(emojiSpan) emojiSpan.textContent = '❤️';
      if(likeSpan) likeSpan.textContent = (currentCount+1) + ' Like';
    }
  }

  try {
    const existing = await sbFetch('/rest/v1/lounge_reactions?post_id=eq.'+postId+'&user_id=eq.'+currentUser.id+'&select=id,reaction');
    if(existing && existing.length > 0){
      await sbFetch('/rest/v1/lounge_reactions?id=eq.'+existing[0].id,{method:'DELETE'});
    } else {
      await sbFetch('/rest/v1/lounge_reactions',{
        method:'POST', headers:{'Prefer':'return=minimal'},
        body:JSON.stringify({post_id:postId, user_id:currentUser.id, reaction:'upendo'})
      });
    }
  } catch(e){ 
    // Revert on error
  
    console.warn('quickReact error:', e); 
  }
}

// ── INLINE COMMENTS ───────────────────────────────────────────────
function openInlineComment(postId){
  if(!currentUser){ openAuth(); return; }
  const section = document.getElementById('comments-inline-'+postId);
  if(!section) return;
  const isOpen = section.style.display !== 'none';
  section.style.display = isOpen ? 'none' : 'block';
  if(!isOpen){
    loadInlineComments(postId);
    setTimeout(()=>section.querySelector('input')?.focus(), 200);
  }
}

async function loadInlineComments(postId){
  const list = document.getElementById('comments-list-'+postId);
  if(!list) return;
  try {
    const comments = await sbFetch('/rest/v1/lounge_comments?post_id=eq.'+postId+'&order=created_at.asc&select=*');
    // Update comment count
    const countEl = document.getElementById('comment-count-'+postId);
    if(countEl && comments) countEl.textContent = comments.length > 0 ? comments.length+' Maoni' : 'Maoni';
    if(!comments || !comments.length){
      list.innerHTML = '<div style="font-size:.75rem;color:var(--cream3);text-align:center;padding:.5rem;font-style:italic">Bado hakuna maoni</div>';
      return;
    }
    list.innerHTML = comments.map(c => {
      const canDelete = currentUser && (currentUser.id === c.user_id || isAdmin());
      const replies = comments.filter(r => r.parent_id === c.id);
      const replyCount = replies.length;
      if(c.parent_id) return ''; // skip replies here, shown under parent
      return `<div id="comment-${c.id}" style="margin-bottom:.6rem">
        <div style="display:flex;gap:.4rem;align-items:flex-start">
          <div style="width:28px;height:28px;border-radius:50%;background:${getAvatarColor(c.user_name)};display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#fff;flex-shrink:0;font-weight:700;overflow:hidden;cursor:${c.user_leaf?'pointer':'default'}" onclick="${c.user_leaf?`openPanel('${c.user_leaf}')`:''}">${(()=>{const cp=c.user_leaf?PEOPLE[c.user_leaf]:null;return cp?.profile_photo?`<img src="${cp.profile_photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:(c.user_name||'?').slice(0,1).toUpperCase()})()}</div>
          <div style="flex:1;min-width:0">
            <div style="background:var(--panel2);border-radius:4px 12px 12px 12px;padding:.4rem .7rem;display:inline-block;max-width:100%">
              <div style="font-size:.72rem;font-weight:700;color:var(--gold);margin-bottom:.15rem;cursor:${c.user_leaf?'pointer':'default'}" onclick="${c.user_leaf?`openPanel('${c.user_leaf}')`:''}">${escHtml(c.user_name||'Mgeni')}</div>
              <div style="font-size:.86rem;color:var(--cream2);line-height:1.5;word-break:break-word">${formatContent(escHtml(c.content||''))}</div>
            </div>
            <!-- Comment actions -->
            <div style="display:flex;align-items:center;gap:.6rem;margin-top:.2rem;padding-left:.3rem">
              <button onclick="likeComment('${c.id}',this)" style="background:none;border:none;color:var(--cream3);font-size:.72rem;cursor:pointer;padding:.1rem .2rem;display:flex;align-items:center;gap:.2rem" id="like-comment-${c.id}">
                🤍 <span id="like-count-${c.id}">0</span>
              </button>
              <button onclick="setCommentReply('${c.id}','${escHtml(c.user_name||'')}','${postId}')" style="background:none;border:none;color:var(--cream3);font-size:.72rem;cursor:pointer;padding:.1rem .2rem">
                ↩ Jibu
              </button>
              ${replyCount > 0 ? `<button onclick="toggleCommentReplies('${c.id}')" style="background:none;border:none;color:var(--gold);font-size:.72rem;cursor:pointer;padding:.1rem .2rem" id="replies-toggle-${c.id}">
                💬 ${replyCount} jibu
              </button>` : ''}
              ${canDelete ? `<button onclick="deleteComment('${c.id}','${postId}')" style="background:none;border:none;color:var(--cream3);font-size:.7rem;cursor:pointer;padding:.1rem .2rem;margin-left:auto">✕</button>` : ''}
            </div>
            <!-- Replies (hidden by default) -->
            ${replyCount > 0 ? `<div id="replies-${c.id}" style="display:none;margin-top:.3rem;margin-left:.5rem;border-left:2px solid rgba(201,146,42,.2);padding-left:.5rem">
              ${replies.map(r => `<div style="display:flex;gap:.3rem;align-items:flex-start;margin-bottom:.35rem">
                <div style="width:22px;height:22px;border-radius:50%;background:${getAvatarColor(r.user_name)};display:flex;align-items:center;justify-content:center;font-size:.65rem;color:#fff;flex-shrink:0;font-weight:700;overflow:hidden">${(()=>{const rp=r.user_leaf?PEOPLE[r.user_leaf]:null;return rp?.profile_photo?`<img src="${rp.profile_photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:(r.user_name||'?').slice(0,1).toUpperCase()})()}</div>
                <div style="background:var(--panel2);border-radius:4px 10px 10px 10px;padding:.3rem .55rem;flex:1">
                  <div style="font-size:.68rem;font-weight:700;color:var(--gold)">${escHtml(r.user_name||'Mgeni')}</div>
                  <div style="font-size:.82rem;color:var(--cream2)">${formatContent(escHtml(r.content||''))}</div>
                </div>
                ${currentUser && (currentUser.id === r.user_id || isAdmin()) ? `<button onclick="deleteComment('${r.id}','${postId}')" style="background:none;border:none;color:var(--cream3);font-size:.68rem;cursor:pointer;padding:.1rem">✕</button>` : ''}
              </div>`).join('')}
            </div>` : ''}
          </div>
        </div>
      </div>`;
    }).filter(Boolean).join('');
    // Load comment likes
    loadCommentLikes(postId);
  } catch(e){ console.warn('loadInlineComments error:', e); }
}

async function submitInlineComment(postId, inputEl){
  if(!currentUser){ openAuth(); return; }
  const content = inputEl.value.trim();
  if(!content) return;
  const displayName = currentUserProfile?.display_name || currentUserProfile?.username ||
    currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
  try {
    await sbFetch('/rest/v1/lounge_comments',{
      method:'POST', headers:{'Prefer':'return=minimal'},
      body: JSON.stringify({
        post_id: postId,
        user_id: currentUser.id,
        user_name: displayName,
        user_leaf: currentUserProfile?.leaf_id || null,
        content
      })
    });
    inputEl.value = '';
    loadInlineComments(postId);
    // Handle @WambagaBot in comment
    if(content.includes('@WambagaBot') || content.includes('@wambagabot')){
      await handleBotMention(content, postId, replyTo || null);
    }
  } catch(e){ showToast('Hitilafu: '+e.message); }
}

async function handleBotMentionInPost(content){
  // Bot replies as a comment on the latest post
  try {
    const posts = await sbFetch('/rest/v1/lounge_posts?order=created_at.desc&limit=1&select=id');
    if(posts && posts.length) await handleBotMention(content, posts[0].id);
  } catch(e){}
}

// ── COMMENT INTERACTIONS ──────────────────────────────────────────

function toggleCommentReplies(commentId){
  const el = document.getElementById('replies-'+commentId);
  const btn = document.getElementById('replies-toggle-'+commentId);
  if(!el) return;
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  if(btn) btn.style.color = isOpen ? 'var(--gold)' : 'var(--cream)';
}

function setCommentReply(commentId, userName, postId){
  if(!currentUser){ openAuth(); return; }
  const input = document.querySelector(`#comments-inline-${postId} input`);
  if(!input) return;
  input.dataset.replyTo = commentId;
  input.placeholder = `Unajibu ${userName}...`;
  input.focus();
  // Show cancel reply option
  const cancelId = 'cancel-reply-'+postId;
  let cancel = document.getElementById(cancelId);
  if(!cancel){
    cancel = document.createElement('div');
    cancel.id = cancelId;
    cancel.style.cssText = 'font-size:.72rem;color:var(--gold);padding:.2rem .5rem;cursor:pointer';
    cancel.onclick = ()=>{ 
      input.dataset.replyTo = ''; 
      input.placeholder = 'Andika maoni...'; 
      cancel.remove(); 
    };
    input.parentElement.insertBefore(cancel, input);
  }
  cancel.textContent = `↩ Unajibu ${userName} · Gusa kufuta`;
}

async function likeComment(commentId, btn){
  if(!currentUser){ openAuth(); return; }
  // Simple toggle using localStorage for now (no DB table for comment likes)
  const key = 'clike_'+commentId+'_'+currentUser.id;
  const liked = localStorage.getItem(key);
  const countEl = document.getElementById('like-count-'+commentId);
  const current = parseInt(countEl?.textContent||'0');
  if(liked){
    localStorage.removeItem(key);
    if(btn){ btn.style.color='var(--cream3)'; btn.querySelector('span:first-child').textContent='🤍'; }
    if(countEl) countEl.textContent = Math.max(0,current-1);
  } else {
    localStorage.setItem(key,'1');
    if(btn){ btn.style.color='#e04444'; btn.querySelector('span:first-child').textContent='❤️'; }
    if(countEl) countEl.textContent = current+1;
  }
}

function loadCommentLikes(postId){
  if(!currentUser) return;
  // Restore like states from localStorage
  setTimeout(()=>{
    document.querySelectorAll('[id^="like-comment-"]').forEach(btn=>{
      const commentId = btn.id.replace('like-comment-','');
      const key = 'clike_'+commentId+'_'+currentUser.id;
      if(localStorage.getItem(key)){
        btn.style.color = '#e04444';
        const emojiEl = btn.firstChild;
        if(emojiEl) emojiEl.textContent = '❤️';
      }
    });
  }, 100);
}

async function deleteComment(commentId, postId){
  if(!currentUser) return;
  if(!confirm('Futa maoni haya?')) return;
  try {
    const res = await fetch(SUPABASE_URL+'/rest/v1/lounge_comments?id=eq.'+commentId, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + (currentSession?.access_token || ''),
        'Content-Type': 'application/json'
      }
    });
    if(res.ok || res.status === 204){
      loadInlineComments(postId);
      showToast('Imefutwa');
    } else {
      const err = await res.json().catch(()=>({}));
      showToast('Hitilafu: ' + (err.message || err.hint || 'Jaribu tena'));
    }
  } catch(e){ showToast('Hitilafu: '+e.message); }
}

// Override submitInlineComment to handle replies
const _origSubmitInline = submitInlineComment;
window.submitInlineComment = async function(postId, inputEl){
  const replyTo = inputEl.dataset?.replyTo || null;
  if(!currentUser){ openAuth(); return; }
  const content = inputEl.value.trim();
  if(!content) return;
  const profile = currentUserProfile || {};
  const displayName = profile.display_name || profile.username ||
    currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
  try {
    await sbFetch('/rest/v1/lounge_comments',{
      method:'POST', headers:{'Prefer':'return=minimal'},
      body: JSON.stringify({
        post_id: postId,
        parent_id: replyTo || null,
        user_id: currentUser.id,
        user_name: displayName,
        user_leaf: currentUserProfile?.leaf_id || null,
        user_leaf: profile.leaf_id || null,
        content
      })
    });
    inputEl.value = '';
    inputEl.dataset.replyTo = '';
    inputEl.placeholder = 'Andika maoni...';
    const cancel = document.getElementById('cancel-reply-'+postId);
    if(cancel) cancel.remove();
    loadInlineComments(postId);
    if(content.includes('@WambagaBot') || content.includes('@wambagabot')){
      await handleBotMention(content, postId, replyTo || null);
    }
  } catch(e){ showToast('Hitilafu: '+e.message); }
};

// ── COMMENT COUNTS & LIKE LIST ────────────────────────────────────

async function loadAllCommentCounts(postIds){
  if(!postIds || !postIds.length) return;
  try {
    const comments = await sbFetch(
      '/rest/v1/lounge_comments?post_id=in.('+postIds.join(',')+')'+'&select=post_id,id&parent_id=is.null'
    );
    if(!comments) return;
    // Count per post
    const counts = {};
    comments.forEach(c => {
      counts[c.post_id] = (counts[c.post_id]||0) + 1;
    });
    // Update DOM
    Object.entries(counts).forEach(([postId, count]) => {
      const el = document.getElementById('comment-count-'+postId);
      if(el) el.textContent = count + (count===1?' Maoni':' Maoni');
    });
  } catch(e){ console.warn('loadAllCommentCounts error:', e); }
}

// ── WHO LIKED THIS POST ───────────────────────────────────────────
async function showWhoLiked(postId){
  if(!currentUser) return;
  // Only post owner or admin
  try {
    const reactions = await sbFetch(
      '/rest/v1/lounge_reactions?post_id=eq.'+postId+'&select=user_id,reaction,user_name'
    );
    if(!reactions || !reactions.length){
      showToast('Bado hakuna likes kwenye post hii');
      return;
    }

    // Build list from reactions - need user names from profiles
    const profileIds = reactions.map(r => r.user_id).join(',');
    let profiles = [];
    try {
      profiles = await sbFetch('/rest/v1/user_profiles?id=in.('+profileIds+')&select=id,display_name,username');
    } catch(e){}

    const nameMap = {};
    profiles.forEach(p => { nameMap[p.id] = p.display_name || p.username || 'Mgeni'; });

    const emojiMap = {upendo:'❤️', amina:'🙏', safi:'👏', kicheko:'😂'};

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:99999;display:flex;align-items:flex-end;justify-content:center';
    overlay.innerHTML = `
      <div style="background:var(--bg);border-radius:16px 16px 0 0;width:100%;max-width:500px;padding:1.2rem 1.2rem 2rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
          <div style="font-family:'Cinzel',serif;color:var(--gold);font-size:.95rem">Waliopenda Post Hii</div>
          <button onclick="this.closest('div[style*=fixed]').remove()" style="background:none;border:none;color:var(--cream3);font-size:1.2rem;cursor:pointer">✕</button>
        </div>
        ${reactions.map(r => `
          <div style="display:flex;align-items:center;gap:.75rem;padding:.5rem 0;border-bottom:1px solid var(--border)">
            <div style="width:32px;height:32px;border-radius:50%;background:${getAvatarColor(nameMap[r.user_id]||'?')};display:flex;align-items:center;justify-content:center;font-size:.85rem;color:#fff;font-weight:700">${(nameMap[r.user_id]||'?').slice(0,1).toUpperCase()}</div>
            <div style="flex:1;font-size:.88rem;color:var(--cream)">${escHtml(nameMap[r.user_id]||'Mgeni')}</div>
            <div style="font-size:1.1rem">${emojiMap[r.reaction]||'❤️'}</div>
          </div>`).join('')}
      </div>`;
    overlay.onclick = e => { if(e.target===overlay) overlay.remove(); };
    document.body.appendChild(overlay);
  } catch(e){ showToast('Hitilafu: '+e.message); }
}

// ── LOUNGE ACTIVITY POLLING ───────────────────────────────────────
let loungeActivityInterval = null;
let loungeLastPostTime = null;

function startLoungeActivityPoll(){
  if(loungeActivityInterval) return; // already running
  if(!currentUser) return;
  loungeActivityInterval = setInterval(checkLoungeActivity, 30000); // every 30s
}

function stopLoungeActivityPoll(){
  if(loungeActivityInterval){
    clearInterval(loungeActivityInterval);
    loungeActivityInterval = null;
  }
}

async function checkLoungeActivity(){
  // Don't check if lounge is open
  const gallery = document.getElementById('view-gallery');
  if(gallery && gallery.classList.contains('active')) return;
  try {
    const since = loungeLastPostTime || new Date(Date.now() - 3600000).toISOString();
    const newPosts = await sbFetch(
      '/rest/v1/lounge_posts?created_at=gt.'+encodeURIComponent(since)+'&select=id&limit=1'
    );
    if(newPosts && newPosts.length > 0){
      showLoungeNewDot();
    }
    // Update last check time
    loungeLastPostTime = new Date().toISOString();
  } catch(e){}
}

// Start polling after login
const _origCompleteLogin = completeLogin;
window.completeLogin = async function(data){
  await _origCompleteLogin(data);
  setTimeout(startLoungeActivityPoll, 3000);
};
