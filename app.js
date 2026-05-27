
const V2_KEY = 'dsa_tracker_data_v2';

let appState = {
  done: [],
  bookmarks: [],
  notes: {},
  customQs: {},
  completionDates: {} // { "Q Name": "YYYY-MM-DD" }
};

let currentFilter = 'all'; // all | unsolved | bookmarks
let globalNumbering = new Map();

// Initialize State
function init() {
  const stored = localStorage.getItem(V2_KEY);
  if (stored) {
    try { 
      appState = Object.assign(appState, JSON.parse(stored)); 
    } catch (e) {}
  } else {
    // Try V1 migration
    const storedV1 = localStorage.getItem('dsa_60day_done_v1');
    if (storedV1) {
      try { appState.done = JSON.parse(storedV1); } catch(e){}
    }
  }

  if (!appState.customQs) appState.customQs = {};
  if (!appState.notes) appState.notes = {};
  if (!appState.bookmarks) appState.bookmarks = {};
  if (!appState.completionDates) appState.completionDates = {};

  // Backfill completionDates for existing done items (set to today)
  const today = new Date().toISOString().split('T')[0];
  appState.done.forEach(q => {
    if (!appState.completionDates[q]) {
      appState.completionDates[q] = today;
    }
  });

  // Build global numbering & inject custom qs
  let qCounter = 1;
  topics.forEach((t) => {
    t.subpatterns.forEach((sp, spIdx) => {
      const key = t.id + '-' + spIdx;
      if (appState.customQs[key]) {
        const customQuestions = appState.customQs[key].map(q => Object.assign({}, q, {custom: true}));
        // filter out duplicates
        const existingNames = new Set(sp.qs.map(x=>x.n));
        customQuestions.forEach(cq => {
          if(!existingNames.has(cq.n)) sp.qs.push(cq);
        });
      }
      sp.qs.forEach(q => {
        globalNumbering.set(q.n, qCounter++);
      });
    });
  });

  saveState();
  renderHeatmap();
  renderStats();
  renderTopicView();
}

function saveState() {
  localStorage.setItem(V2_KEY, JSON.stringify(appState));
  renderStats();
  renderHeatmap();
}

function generateLeetCodeLink(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return 'https://leetcode.com/problems/' + slug + '/';
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function toggleDone(qName) {
  const idx = appState.done.indexOf(qName);
  if (idx > -1) {
    appState.done.splice(idx, 1);
    delete appState.completionDates[qName];
  } else {
    appState.done.push(qName);
    appState.completionDates[qName] = getTodayStr();
  }
  saveState();
  renderTopicView();
}

function toggleBookmark(e, qName) {
  e.stopPropagation(); e.preventDefault();
  const idx = appState.bookmarks.indexOf(qName);
  if (idx > -1) appState.bookmarks.splice(idx, 1);
  else appState.bookmarks.push(qName);
  saveState();
  renderTopicView();
}

function toggleNotes(e, qIdStr) {
  e.stopPropagation(); e.preventDefault();
  const panel = document.getElementById('notes-' + qIdStr);
  const btn = document.getElementById('noteBtn-' + qIdStr);
  panel.classList.toggle('open');
  btn.classList.toggle('active');
}

function saveNote(qName, val) {
  if (!val.trim()) delete appState.notes[qName];
  else appState.notes[qName] = val;
  saveState();
}

function addCustomQuestion(tId, spIdx) {
  const nameInput = document.getElementById('new-q-name-' + tId + '-' + spIdx);
  const diffInput = document.getElementById('new-q-diff-' + tId + '-' + spIdx);
  const name = nameInput.value.trim();
  const diff = diffInput.value;
  if (!name) return alert('Please enter a question name');
  
  const key = tId + '-' + spIdx;
  if (!appState.customQs[key]) appState.customQs[key] = [];
  if (appState.customQs[key].find(q => q.n === name)) return alert('Question already exists here.');
  
  const newQ = { n: name, d: diff, custom: true };
  appState.customQs[key].push(newQ);
  
  const t = topics.find(topic => topic.id === tId);
  t.subpatterns[spIdx].qs.push(newQ);
  globalNumbering.set(name, globalNumbering.size + 1);
  
  saveState();
  renderTopicView();
}

function setFilter(f) {
  currentFilter = f;
  renderTopicView();
}

function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  grid.innerHTML = '';
  
  const countsByDate = {};
  Object.values(appState.completionDates || {}).forEach(date => {
    countsByDate[date] = (countsByDate[date] || 0) + 1;
  });

  const today = new Date();
  today.setHours(0,0,0,0);
  
  let currentStreak = 0;
  for(let i=0; i<365; i++) {
    let d = new Date(today);
    d.setDate(d.getDate() - i);
    let dStr = d.toISOString().split('T')[0];
    if (countsByDate[dStr]) {
      currentStreak++;
    } else {
      if (i===0) continue; // skipped today, but streak might be alive if yesterday was done
      break;
    }
  }
  document.getElementById('streakCount').textContent = currentStreak + ' Day Streak 🔥';

  // render 60 boxes
  for(let i=59; i>=0; i--) {
    let d = new Date(today);
    d.setDate(d.getDate() - i);
    let dStr = d.toISOString().split('T')[0];
    let count = countsByDate[dStr] || 0;
    
    let box = document.createElement('div');
    box.className = 'heatmap-day';
    box.title = dStr + ": " + count + " questions";
    if(count > 0) box.dataset.count = Math.min(count, 4);
    grid.appendChild(box);
  }
}

function renderStats() {
  let tot = 0, doneCount = 0;
  let stats = { E: {t:0, d:0}, M: {t:0, d:0}, H: {t:0, d:0}, SD: {t:0, d:0} };
  
  topics.forEach(t => t.subpatterns.forEach(s => s.qs.forEach(q => {
    tot++;
    const isDone = appState.done.includes(q.n);
    if (isDone) doneCount++;
    if (stats[q.d]) {
      stats[q.d].t++;
      if (isDone) stats[q.d].d++;
    } else {
      stats.SD.t++;
      if(isDone) stats.SD.d++;
    }
  })));
  
  document.getElementById('totalQ').textContent = tot;
  document.getElementById('doneQ').textContent = doneCount;
  const pct = tot > 0 ? (doneCount / tot) * 100 : 0;
  document.getElementById('totalPct').textContent = Math.round(pct) + '%';
  
  document.getElementById('totE').textContent = stats.E.t;
  document.getElementById('doneE').textContent = stats.E.d;
  document.getElementById('totM').textContent = stats.M.t;
  document.getElementById('doneM').textContent = stats.M.d;
  document.getElementById('totH').textContent = stats.H.t;
  document.getElementById('doneH').textContent = stats.H.d;
}

function toggleTopic(id) {
  const t = topics.find(topic => topic.id === id);
  if (t) { t.isOpen = !t.isOpen; renderTopicView(); }
}

function renderTopicView() {
  const container = document.getElementById('topicView');
  const searchQ = document.getElementById('searchInput').value.toLowerCase();
  
  ['All','Unsolved','Bookmarks'].forEach(btn => {
    const el = document.getElementById('filterBtn' + btn);
    if (el) el.style.borderColor = currentFilter === btn.toLowerCase() ? 'var(--text-secondary)' : 'var(--border)';
  });

  let html = '';
  topics.forEach(topic => {
    let tTot = 0, tDone = 0;
    let renderedSubpatterns = '';
    
    topic.subpatterns.forEach((sp, spIdx) => {
      let filteredQs = sp.qs.filter(q => {
        let matchSearch = q.n.toLowerCase().includes(searchQ);
        let isDone = appState.done.includes(q.n);
        let isBookmarked = appState.bookmarks.includes(q.n);
        
        let matchFilter = true;
        if (currentFilter === 'unsolved') matchFilter = !isDone;
        if (currentFilter === 'bookmarks') matchFilter = isBookmarked;
        
        return matchSearch && matchFilter;
      });
      
      tTot += sp.qs.length;
      tDone += sp.qs.filter(q => appState.done.includes(q.n)).length;
      
      if (filteredQs.length === 0 && searchQ) return;
      
      let qListHtml = filteredQs.map(q => {
        const isDone = appState.done.includes(q.n);
        const isBookmarked = appState.bookmarks.includes(q.n);
        const noteVal = appState.notes[q.n] || '';
        const link = generateLeetCodeLink(q.n);
        const safeQId = q.n.replace(/[^a-zA-Z0-9]/g, '') + '-' + globalNumbering.get(q.n);
        const num = globalNumbering.get(q.n);
        
        // Proper escaping for backticks inside template literal
        return `
          <div class="q-item-container">
            <div class="q-item">
              <div class="q-check ${isDone ? 'done' : ''}" onclick="toggleDone('${q.n.replace(/'/g,"\\'")}')"></div>
              <div class="q-num">${num}.</div>
              <a href="${link}" target="_blank" class="q-name ${isDone ? 'done' : ''}">${q.n}</a>
              <span class="diff-badge badge-${q.d}">${q.d}</span>
              <div class="q-actions">
                <button class="icon-btn ${noteVal ? 'active note' : ''}" id="noteBtn-${safeQId}" onclick="toggleNotes(event, '${safeQId}')">📝</button>
                <button class="icon-btn ${isBookmarked ? 'active star' : ''}" onclick="toggleBookmark(event, '${q.n.replace(/'/g,"\\'")}')">⭐</button>
              </div>
            </div>
            <div class="notes-panel" id="notes-${safeQId}">
              <textarea class="notes-textarea" placeholder="Add notes here..." onblur="saveNote('${q.n.replace(/'/g,"\\'")}', this.value)">${noteVal}</textarea>
            </div>
          </div>
        `;
      }).join('');
      
      renderedSubpatterns += `
        <div class="subpattern">
          <div class="sub-header">
            <span>${sp.name}</span>
            <span style="color:var(--text-secondary);font-weight:400">${filteredQs.length} questions</span>
          </div>
          <div class="q-list">
            ${qListHtml}
            <div class="add-q-form">
              <input type="text" id="new-q-name-${topic.id}-${spIdx}" class="search-input" placeholder="Custom question...">
              <select id="new-q-diff-${topic.id}-${spIdx}" class="search-input" style="min-width:80px;flex:none;">
                <option value="E">Easy</option><option value="M">Medium</option><option value="H">Hard</option>
              </select>
              <button class="btn btn-primary" onclick="addCustomQuestion('${topic.id}', ${spIdx})">Add</button>
            </div>
          </div>
        </div>
      `;
    });
    
    if (renderedSubpatterns === '' && searchQ) return;

    const isOpen = (topic.isOpen || searchQ.length > 0) ? 'open' : '';
    
    html += `
      <div class="topic-card ${isOpen}">
        <div class="topic-header" onclick="toggleTopic('${topic.id}')">
          <div class="topic-icon">${topic.isOpen ? '📂' : '📁'}</div>
          <div class="topic-title">
            <div class="topic-name">${topic.name}</div>
            <div class="topic-sub">${tTot} Questions</div>
          </div>
          <div class="topic-progress">${tDone} / ${tTot} Done</div>
        </div>
        <div class="topic-body ${isOpen}">
          ${renderedSubpatterns}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function exportData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const el = document.createElement('a');
  el.setAttribute("href", dataStr);
  el.setAttribute("download", "dsa_tracker_pro.json");
  document.body.appendChild(el);
  el.click();
  el.remove();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.done && typeof imported === 'object') {
        appState = imported;
        saveState();
        alert('Imported successfully!');
        location.reload();
      }
    } catch (err) { alert('Invalid file'); }
  };
  reader.readAsText(file);
}

// Start
init();
