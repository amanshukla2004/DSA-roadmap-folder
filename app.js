/**
 * DSA Tracker Pro & 150 Days Daily Challenge
 * Unified application logic for Daily Roadmap & Topic-wise Roadmap
 */

const V2_KEY = 'dsa_tracker_data_v2';

let appState = {
  done: [],
  bookmarks: [],
  notes: {},
  customQs: {},
  completionDates: {},
  activeView: 'daily' // 'daily' | 'topic'
};

let currentFilter = 'all'; // all | unsolved | bookmarks | dsa | design | behavioral
let globalNumbering = new Map();
let openDays = new Set([1]); // default Day 1 open
let collapsedWeeks = new Set();

const SLUG_OVERRIDES = {
  'Sqrt(x)': 'sqrtx',
  'Pow(x, n)': 'powx-n',
  "Pascal's Triangle": 'pascals-triangle',
  'Insert Delete GetRandom O(1)': 'insert-delete-getrandom-o1',
  'Reverse Nodes in k-Group': 'reverse-nodes-in-k-group',
  'Subarrays with K Different Integers': 'subarrays-with-k-different-integers',
  'Shortest Subarray with Sum at Least K': 'shortest-subarray-with-sum-at-least-k',
  'All Nodes Distance K in Binary Tree': 'all-nodes-distance-k-in-binary-tree',
  'Longest Substring with At Least K Repeating Characters': 'longest-substring-with-at-least-k-repeating-characters',
  'Cheapest Flights Within K Stops': 'cheapest-flights-within-k-stops',
  'Partition to K Equal Sum Subsets': 'partition-to-k-equal-sum-subsets',
  'Find K Closest Elements': 'find-k-closest-elements',
  'Find K Pairs with Smallest Sums': 'find-k-pairs-with-smallest-sums',
  'Smallest Range Covering Elements from K Lists': 'smallest-range-covering-elements-from-k-lists',
  'Merge k Sorted Lists': 'merge-k-sorted-lists',
  'K-th Symbol in Grammar': 'k-th-symbol-in-grammar',
  'K-diff Pairs in an Array': 'k-diff-pairs-in-an-array',
  'String to Integer (atoi)': 'string-to-integer-atoi',
  'Implement Queue using Stacks': 'implement-queue-using-stacks',
  'Implement Trie (Prefix Tree)': 'implement-trie-prefix-tree',
  'Range Sum Query - Immutable': 'range-sum-query-immutable',
  'Range Sum of BST': 'range-sum-of-bst',
  'Reverse Words in a String III': 'reverse-words-in-a-string-iii',
  'Remove All Adjacent Duplicates In String': 'remove-all-adjacent-duplicates-in-string',
  'Remove All Adjacent Duplicates in String II': 'remove-all-adjacent-duplicates-in-string-ii',
  'Next Greater Element I': 'next-greater-element-i',
  'Next Greater Element II': 'next-greater-element-ii',
  'Next Greater Element III': 'next-greater-element-iii',
  'Valid Palindrome II': 'valid-palindrome-ii',
  'Reverse String II': 'reverse-string-ii',
  'Intersection of Two Arrays II': 'intersection-of-two-arrays-ii',
  'Remove Duplicates from Sorted Array II': 'remove-duplicates-from-sorted-array-ii',
  'Remove Duplicates from Sorted List II': 'remove-duplicates-from-sorted-list-ii',
  'Contains Duplicate II': 'contains-duplicate-ii',
  'Majority Element II': 'majority-element-ii',
  'Add Two Numbers II': 'add-two-numbers-ii',
  'Reverse Linked List II': 'reverse-linked-list-ii',
  'Basic Calculator II': 'basic-calculator-ii',
  'Binary Tree Zigzag Level Order Traversal': 'binary-tree-zigzag-level-order-traversal',
  'Populating Next Right Pointers in Each Node II': 'populating-next-right-pointers-in-each-node-ii',
  'Path Sum II': 'path-sum-ii',
  'Path Sum III': 'path-sum-iii',
  'Search in Rotated Sorted Array II': 'search-in-rotated-sorted-array-ii',
  'Search a 2D Matrix II': 'search-a-2d-matrix-ii',
  'Spiral Matrix II': 'spiral-matrix-ii',
  'Course Schedule II': 'course-schedule-ii',
  'Coin Change II': 'coin-change-ii',
  'Jump Game II': 'jump-game-ii',
  'Jump Game III': 'jump-game-iii',
  'Unique Paths II': 'unique-paths-ii',
  'House Robber II': 'house-robber-ii',
  'House Robber III': 'house-robber-iii',
  'Best Time to Buy and Sell Stock II': 'best-time-to-buy-and-sell-stock-ii',
  'Best Time to Buy and Sell Stock IV': 'best-time-to-buy-and-sell-stock-iv',
  'Unique Binary Search Trees II': 'unique-binary-search-trees-ii',
  'Permutations II': 'permutations-ii',
  'Subsets II': 'subsets-ii',
  'Combination Sum III': 'combination-sum-iii',
  'Combination Sum IV': 'combination-sum-iv',
  'Single Number II': 'single-number-ii',
  'Single Number III': 'single-number-iii',
  'Word Search II': 'word-search-ii',
  'Word Ladder II': 'word-ladder-ii',
  'Word Break II': 'word-break-ii',
  'Palindrome Partitioning II': 'palindrome-partitioning-ii',
  'Find Minimum in Rotated Sorted Array II': 'find-minimum-in-rotated-sorted-array-ii',
  'Unique Paths III': 'unique-paths-iii'
};

function generateLeetCodeLink(name) {
  if (SLUG_OVERRIDES[name]) {
    return 'https://leetcode.com/problems/' + SLUG_OVERRIDES[name] + '/';
  }
  const slug = name
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return 'https://leetcode.com/problems/' + slug + '/';
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

// Initialize Application
function init() {
  const stored = localStorage.getItem(V2_KEY);
  if (stored) {
    try {
      appState = Object.assign(appState, JSON.parse(stored));
    } catch (e) {}
  } else {
    // Legacy migration
    const storedV1 = localStorage.getItem('dsa_60day_done_v1');
    if (storedV1) {
      try { appState.done = JSON.parse(storedV1); } catch (e) {}
    }
  }

  if (!appState.customQs) appState.customQs = {};
  if (!appState.notes) appState.notes = {};
  if (!appState.bookmarks) appState.bookmarks = [];
  if (!appState.completionDates) appState.completionDates = {};
  if (!appState.activeView) appState.activeView = 'daily';

  // Backfill completion dates
  const today = getTodayStr();
  appState.done.forEach(q => {
    if (!appState.completionDates[q]) {
      appState.completionDates[q] = today;
    }
  });

  // Build global numbering & inject custom qs for Topic view
  let qCounter = 1;
  if (typeof topics !== 'undefined') {
    topics.forEach((t) => {
      t.subpatterns.forEach((sp, spIdx) => {
        const key = t.id + '-' + spIdx;
        if (appState.customQs[key]) {
          const customQuestions = appState.customQs[key].map(q => Object.assign({}, q, { custom: true }));
          const existingNames = new Set(sp.qs.map(x => x.n));
          customQuestions.forEach(cq => {
            if (!existingNames.has(cq.n)) sp.qs.push(cq);
          });
        }
        sp.qs.forEach(q => {
          globalNumbering.set(q.n, qCounter++);
        });
      });
    });
  }

  saveState();
  renderHeatmap();
  renderStats();
  renderWeekNavigator();

  // If in daily_roadmap.html standalone, activeView is always daily
  if (window.location.pathname.endsWith('daily_roadmap.html')) {
    appState.activeView = 'daily';
  }

  switchView(appState.activeView, false);
}

function saveState() {
  localStorage.setItem(V2_KEY, JSON.stringify(appState));
  renderStats();
  renderHeatmap();
}

function switchView(viewName, doSave = true) {
  appState.activeView = viewName;
  if (doSave) saveState();

  const tabDaily = document.getElementById('tabDaily');
  const tabTopic = document.getElementById('tabTopic');
  const dailyControls = document.getElementById('dailyControls');
  const weekNavigator = document.getElementById('weekNavigator');
  const dailyView = document.getElementById('dailyView');
  const topicView = document.getElementById('topicView');
  const viewSubtitle = document.getElementById('viewSubtitle');

  if (viewName === 'daily') {
    if (tabDaily) tabDaily.classList.add('active');
    if (tabTopic) tabTopic.classList.remove('active');
    if (dailyControls) dailyControls.style.display = 'flex';
    if (weekNavigator) weekNavigator.style.display = 'flex';
    if (dailyView) dailyView.style.display = 'block';
    if (topicView) topicView.style.display = 'none';
    if (viewSubtitle) viewSubtitle.textContent = '150 Days Master Challenge & Daily LeetCode Roadmap';
    renderDailyView();
  } else {
    if (tabDaily) tabDaily.classList.remove('active');
    if (tabTopic) tabTopic.classList.add('active');
    if (dailyControls) dailyControls.style.display = 'none';
    if (weekNavigator) weekNavigator.style.display = 'none';
    if (dailyView) dailyView.style.display = 'none';
    if (topicView) topicView.style.display = 'block';
    if (viewSubtitle) viewSubtitle.textContent = 'Professional Topic-wise DSA Roadmap';
    renderTopicView();
  }
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
  if (appState.activeView === 'daily') renderDailyView();
  else renderTopicView();
  renderWeekNavigator();
}

function toggleBookmark(e, qName) {
  if (e) { e.stopPropagation(); e.preventDefault(); }
  const idx = appState.bookmarks.indexOf(qName);
  if (idx > -1) appState.bookmarks.splice(idx, 1);
  else appState.bookmarks.push(qName);
  saveState();
  if (appState.activeView === 'daily') renderDailyView();
  else renderTopicView();
}

function toggleNotes(e, qIdStr) {
  if (e) { e.stopPropagation(); e.preventDefault(); }
  const panel = document.getElementById('notes-' + qIdStr);
  const btn = document.getElementById('noteBtn-' + qIdStr);
  if (panel) panel.classList.toggle('open');
  if (btn) btn.classList.toggle('active');
}

function saveNote(qName, val) {
  if (!val.trim()) delete appState.notes[qName];
  else appState.notes[qName] = val;
  saveState();
}

function setFilter(f) {
  currentFilter = f;
  ['All', 'Unsolved', 'Bookmarks', 'DSA', 'Design', 'Behavioral'].forEach(btn => {
    const el = document.getElementById('filterBtn' + btn);
    if (el) {
      if (currentFilter === btn.toLowerCase()) {
        el.style.borderColor = 'var(--accent)';
        el.style.color = '#fff';
      } else {
        el.style.borderColor = 'var(--border)';
        el.style.color = 'var(--text-primary)';
      }
    }
  });

  if (appState.activeView === 'daily') renderDailyView();
  else renderTopicView();
}

function handleSearch() {
  if (appState.activeView === 'daily') renderDailyView();
  else renderTopicView();
}

function toggleDay(dayNum) {
  if (openDays.has(dayNum)) openDays.delete(dayNum);
  else openDays.add(dayNum);
  renderDailyView();
}

function toggleWeek(weekNum) {
  if (collapsedWeeks.has(weekNum)) collapsedWeeks.delete(weekNum);
  else collapsedWeeks.add(weekNum);
  renderDailyView();
}

function expandAllDays() {
  if (typeof dailyRoadmap !== 'undefined') {
    dailyRoadmap.forEach(d => openDays.add(d.day));
    collapsedWeeks.clear();
    renderDailyView();
  }
}

function collapseAllDays() {
  openDays.clear();
  renderDailyView();
}

function jumpToCurrentDay() {
  if (typeof dailyRoadmap === 'undefined') return;
  // Find first uncompleted day
  let target = dailyRoadmap.find(d => !isDayCompleted(d));
  if (!target) target = dailyRoadmap[dailyRoadmap.length - 1];
  openDays.add(target.day);
  collapsedWeeks.delete(target.week);
  renderDailyView();
  setTimeout(() => {
    const el = document.getElementById('day-card-' + String(target.day).replace(/\s+/g, '-'));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function jumpToWeek(weekNum) {
  collapsedWeeks.delete(weekNum);
  renderDailyView();
  setTimeout(() => {
    const el = document.getElementById('week-sec-' + weekNum);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function isDayCompleted(dayEntry) {
  if (dayEntry.type === 'revision') {
    return appState.done.includes(`Day-${dayEntry.day}-Revision`);
  }
  if (!dayEntry.questions || dayEntry.questions.length === 0) return true;
  return dayEntry.questions.every(q => appState.done.includes(q.name));
}

function countDayProgress(dayEntry) {
  if (dayEntry.type === 'revision') {
    const isDone = appState.done.includes(`Day-${dayEntry.day}-Revision`);
    return { done: isDone ? 1 : 0, total: 1 };
  }
  let total = dayEntry.questions.length;
  let done = dayEntry.questions.filter(q => appState.done.includes(q.name)).length;
  return { done, total };
}

// Render Week Navigator Bar
function renderWeekNavigator() {
  const nav = document.getElementById('weekNavigator');
  if (!nav || typeof dailyRoadmap === 'undefined') return;

  const weeks = new Map();
  dailyRoadmap.forEach(d => {
    if (!weeks.has(d.week)) {
      weeks.set(d.week, { week: d.week, title: d.weekTitle, days: [] });
    }
    weeks.get(d.week).days.push(d);
  });

  let html = '';
  weeks.forEach(w => {
    let allDone = w.days.every(d => isDayCompleted(d));
    let someDone = w.days.some(d => isDayCompleted(d));
    let statusIcon = allDone ? '✓ ' : (someDone ? '◐ ' : '');
    html += `<button class="week-pill" onclick="jumpToWeek(${w.week})">${statusIcon}W${w.week}</button>`;
  });
  nav.innerHTML = html;
}

// Render 150-Day Daily Roadmap View
function renderDailyView() {
  const container = document.getElementById('dailyView');
  if (!container || typeof dailyRoadmap === 'undefined') return;

  const searchInput = document.getElementById('searchInput');
  const searchQ = searchInput ? searchInput.value.toLowerCase().trim() : '';

  // Group by week
  const weekMap = new Map();
  dailyRoadmap.forEach(day => {
    if (!weekMap.has(day.week)) {
      weekMap.set(day.week, {
        week: day.week,
        title: day.weekTitle,
        phase: day.phase,
        days: []
      });
    }
    weekMap.get(day.week).days.push(day);
  });

  let html = '';
  let overallMatches = 0;

  weekMap.forEach((w) => {
    let weekDaysHtml = '';
    let weekTotal = 0;
    let weekDone = 0;

    w.days.forEach(dayEntry => {
      const dayProgress = countDayProgress(dayEntry);
      weekTotal += dayProgress.total;
      weekDone += dayProgress.done;

      // Filter check
      let matchesFilter = true;
      if (currentFilter === 'unsolved') {
        matchesFilter = !isDayCompleted(dayEntry);
      } else if (currentFilter === 'bookmarks') {
        matchesFilter = dayEntry.questions && dayEntry.questions.some(q => appState.bookmarks.includes(q.name));
      } else if (currentFilter === 'dsa') {
        matchesFilter = dayEntry.type === 'dsa';
      } else if (currentFilter === 'design') {
        matchesFilter = dayEntry.type === 'design';
      } else if (currentFilter === 'behavioral') {
        matchesFilter = dayEntry.type === 'behavioral';
      }

      // Search check
      let matchesSearch = true;
      if (searchQ) {
        const dayStr = `day ${dayEntry.day} ${dayEntry.category} ${dayEntry.title || ''}`.toLowerCase();
        const qMatches = dayEntry.questions && dayEntry.questions.some(q => q.name.toLowerCase().includes(searchQ));
        matchesSearch = dayStr.includes(searchQ) || qMatches;
      }

      if (!matchesFilter || !matchesSearch) return;

      overallMatches++;
      const isCompleted = isDayCompleted(dayEntry);
      const isDayOpen = openDays.has(dayEntry.day) || searchQ.length > 0;
      const safeDayId = String(dayEntry.day).replace(/\s+/g, '-');

      // Day Type Badge info
      let typeBadgeClass = 'badge-type-dsa';
      let typeBadgeLabel = 'DSA Challenge';
      if (dayEntry.type === 'design') {
        typeBadgeClass = 'badge-type-design';
        typeBadgeLabel = 'System Design & OOD';
      } else if (dayEntry.type === 'behavioral') {
        typeBadgeClass = 'badge-type-behavioral';
        typeBadgeLabel = 'Behavioral & Leadership';
      } else if (dayEntry.type === 'revision') {
        typeBadgeClass = 'badge-type-revision';
        typeBadgeLabel = 'Revision Milestone';
      }

      // Render Day items
      let itemsHtml = '';
      if (dayEntry.type === 'dsa') {
        itemsHtml = dayEntry.questions.map((q, qIdx) => {
          const isDone = appState.done.includes(q.name);
          const isBookmarked = appState.bookmarks.includes(q.name);
          const noteVal = appState.notes[q.name] || '';
          const safeQId = `d${safeDayId}-q${qIdx}`;
          const link = q.url || generateLeetCodeLink(q.name);

          return `
            <div class="q-item-container">
              <div class="q-item">
                <div class="q-check ${isDone ? 'done' : ''}" onclick="toggleDone('${q.name.replace(/'/g, "\\'")}')" title="Mark Done"></div>
                <div class="q-num">${qIdx + 1}.</div>
                <a href="${link}" target="_blank" rel="noopener noreferrer" class="q-name ${isDone ? 'done' : ''}">
                  ${q.name}
                  <span class="ext-icon" title="Open on LeetCode">↗</span>
                </a>
                <span class="diff-badge badge-${q.diff}">${q.diff}</span>
                <div class="q-actions">
                  <button class="icon-btn ${noteVal ? 'active note' : ''}" id="noteBtn-${safeQId}" onclick="toggleNotes(event, '${safeQId}')" title="Notes">📝</button>
                  <button class="icon-btn ${isBookmarked ? 'active star' : ''}" onclick="toggleBookmark(event, '${q.name.replace(/'/g, "\\'")}')" title="Bookmark">⭐</button>
                </div>
              </div>
              <div class="notes-panel" id="notes-${safeQId}">
                <textarea class="notes-textarea" placeholder="Add problem notes, approach, complexity..." onblur="saveNote('${q.name.replace(/'/g, "\\'")}', this.value)">${noteVal}</textarea>
              </div>
            </div>
          `;
        }).join('');
      } else if (dayEntry.type === 'design') {
        itemsHtml = dayEntry.questions.map((q, qIdx) => {
          const isDone = appState.done.includes(q.name);
          const isBookmarked = appState.bookmarks.includes(q.name);
          const noteVal = appState.notes[q.name] || '';
          const safeQId = `d${safeDayId}-design${qIdx}`;
          const searchUrl = q.url || `https://www.google.com/search?q=${encodeURIComponent(q.name + ' system design interview')}`;

          return `
            <div class="design-item">
              <div class="q-check ${isDone ? 'done' : ''}" onclick="toggleDone('${q.name.replace(/'/g, "\\'")}')" title="Mark Studied"></div>
              <div class="design-details">
                <a href="${searchUrl}" target="_blank" rel="noopener noreferrer" class="design-title ${isDone ? 'done' : ''}">
                  ${q.name}
                  <span class="ext-icon">↗</span>
                </a>
                <div class="design-meta">
                  <span class="design-tag">${q.type}</span>
                  <span>Architecture & High-Level / Low-Level Component Design</span>
                </div>
                <div class="notes-panel" id="notes-${safeQId}">
                  <textarea class="notes-textarea" placeholder="Key concepts: DB schema, API design, trade-offs, scaling..." onblur="saveNote('${q.name.replace(/'/g, "\\'")}', this.value)">${noteVal}</textarea>
                </div>
              </div>
              <div class="q-actions">
                <button class="icon-btn ${noteVal ? 'active note' : ''}" id="noteBtn-${safeQId}" onclick="toggleNotes(event, '${safeQId}')" title="Design Notes">📝</button>
                <button class="icon-btn ${isBookmarked ? 'active star' : ''}" onclick="toggleBookmark(event, '${q.name.replace(/'/g, "\\'")}')" title="Bookmark">⭐</button>
              </div>
            </div>
          `;
        }).join('');
      } else if (dayEntry.type === 'behavioral') {
        itemsHtml = dayEntry.questions.map((q, qIdx) => {
          const isDone = appState.done.includes(q.name);
          const isBookmarked = appState.bookmarks.includes(q.name);
          const noteVal = appState.notes[q.name] || '';
          const safeQId = `d${safeDayId}-behav${qIdx}`;
          const searchUrl = q.url || `https://www.google.com/search?q=${encodeURIComponent(q.name + ' behavioral interview question STAR')}`;

          return `
            <div class="behavioral-item">
              <div class="q-check ${isDone ? 'done' : ''}" onclick="toggleDone('${q.name.replace(/'/g, "\\'")}')" title="Mark Answer Prepared"></div>
              <div class="behavioral-details">
                <div class="behavioral-question ${isDone ? 'done' : ''}">${q.name}</div>
                <div class="star-hint">💡 Structure response with STAR: Situation, Task, Action, Result</div>
                <div class="notes-panel" id="notes-${safeQId}">
                  <textarea class="notes-textarea" placeholder="Draft your story: Situation, Task, Action taken, measurable Result..." onblur="saveNote('${q.name.replace(/'/g, "\\'")}', this.value)">${noteVal}</textarea>
                </div>
              </div>
              <div class="q-actions">
                <a href="${searchUrl}" target="_blank" rel="noopener noreferrer" class="icon-btn" title="Search sample answers">🔍</a>
                <button class="icon-btn ${noteVal ? 'active note' : ''}" id="noteBtn-${safeQId}" onclick="toggleNotes(event, '${safeQId}')" title="Draft Notes">📝</button>
                <button class="icon-btn ${isBookmarked ? 'active star' : ''}" onclick="toggleBookmark(event, '${q.name.replace(/'/g, "\\'")}')" title="Bookmark">⭐</button>
              </div>
            </div>
          `;
        }).join('');
      } else if (dayEntry.type === 'revision') {
        const revKey = `Day-${dayEntry.day}-Revision`;
        const isDone = appState.done.includes(revKey);
        itemsHtml = `
          <div class="revision-box">
            <div class="revision-title">
              <span>🔄</span> ${dayEntry.title || 'Revision & Problem Review'}
            </div>
            <div class="revision-desc">
              Dedicated review interval from the MAANG Roadmap. Revisit tricky problems, review your saved notes, redo bookmarked problems without hints, and reinforce optimal patterns.
            </div>
            <div class="revision-action">
              <div class="q-check ${isDone ? 'done' : ''}" onclick="toggleDone('${revKey}')" title="Mark Revision Done"></div>
              <span style="font-weight: 500; font-size: 13px; color: ${isDone ? 'var(--success)' : 'var(--text-primary)'}">
                ${isDone ? 'Revision Milestone Completed! 🎉' : 'Mark revision milestone as completed'}
              </span>
            </div>
          </div>
        `;
      }

      weekDaysHtml += `
        <div class="day-card ${isDayOpen ? 'open' : ''} ${isCompleted ? 'completed' : ''}" id="day-card-${safeDayId}">
          <div class="day-header" onclick="toggleDay('${dayEntry.day}')">
            <div class="day-num">Day ${dayEntry.day}</div>
            <div class="day-info">
              <span class="day-category">${dayEntry.category}</span>
              <span class="day-type-badge ${typeBadgeClass}">${typeBadgeLabel}</span>
            </div>
            <div class="day-progress">
              ${isCompleted 
                ? '<span class="day-done-pill">✓ Finished</span>' 
                : `<span>${dayProgress.done}/${dayProgress.total}</span>`}
            </div>
            <div class="day-chevron">▼</div>
          </div>
          <div class="day-body">
            ${itemsHtml}
          </div>
        </div>
      `;
    });

    if (weekDaysHtml) {
      const isWeekCollapsed = collapsedWeeks.has(w.week) && !searchQ;
      const weekPct = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0;
      html += `
        <div class="week-container" id="week-sec-${w.week}">
          <div class="week-header" onclick="toggleWeek(${w.week})">
            <div class="week-header-left">
              <span>📅 ${w.title}</span>
            </div>
            <div class="week-header-right">
              <span>${weekDone} / ${weekTotal} Done (${weekPct}%)</span>
              <span>${isWeekCollapsed ? '▼ Expand' : '▲ Collapse'}</span>
            </div>
          </div>
          <div class="week-days ${isWeekCollapsed ? 'collapsed' : ''}">
            ${weekDaysHtml}
          </div>
        </div>
      `;
    }
  });

  if (overallMatches === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 48px 20px; background: var(--bg-card); border: 1px dashed var(--border); border-radius: var(--radius); color: var(--text-secondary);">
        <p style="font-size: 16px; font-weight: 500; color: #fff;">No questions found matching your filter</p>
        <p style="margin-top: 8px;">Try clearing your search query or selecting "All".</p>
        <button class="btn btn-primary" style="margin: 16px auto 0;" onclick="clearFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = html;
}

function clearFilters() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  setFilter('all');
}

// Render Heatmap (Activity last 60 days)
function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const countsByDate = {};
  Object.values(appState.completionDates || {}).forEach(date => {
    countsByDate[date] = (countsByDate[date] || 0) + 1;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentStreak = 0;
  for (let i = 0; i < 365; i++) {
    let d = new Date(today);
    d.setDate(d.getDate() - i);
    let dStr = d.toISOString().split('T')[0];
    if (countsByDate[dStr]) {
      currentStreak++;
    } else {
      if (i === 0) continue; // skipped today, but streak might be alive from yesterday
      break;
    }
  }
  const streakEl = document.getElementById('streakCount');
  if (streakEl) streakEl.textContent = currentStreak + ' Day Streak 🔥';

  // Render 60 day boxes
  for (let i = 59; i >= 0; i--) {
    let d = new Date(today);
    d.setDate(d.getDate() - i);
    let dStr = d.toISOString().split('T')[0];
    let count = countsByDate[dStr] || 0;

    let box = document.createElement('div');
    box.className = 'heatmap-day';
    box.title = dStr + ': ' + count + ' items finished';
    if (count > 0) box.dataset.count = Math.min(count, 4);
    grid.appendChild(box);
  }
}

// Render Header Statistics
function renderStats() {
  let tot = 0, doneCount = 0;
  let stats = { E: { t: 0, d: 0 }, M: { t: 0, d: 0 }, H: { t: 0, d: 0 }, SD: { t: 0, d: 0 } };

  // Calculate based on dailyRoadmap if present
  if (typeof dailyRoadmap !== 'undefined') {
    dailyRoadmap.forEach(d => {
      if (d.type === 'dsa') {
        d.questions.forEach(q => {
          tot++;
          const isDone = appState.done.includes(q.name);
          if (isDone) doneCount++;
          if (stats[q.diff]) {
            stats[q.diff].t++;
            if (isDone) stats[q.diff].d++;
          }
        });
      }
    });

    // Days finished count
    let completedDays = dailyRoadmap.filter(d => isDayCompleted(d)).length;
    const doneDaysEl = document.getElementById('doneDays');
    const totDaysEl = document.getElementById('totDays');
    const daysPctEl = document.getElementById('daysPct');
    if (doneDaysEl) doneDaysEl.textContent = completedDays;
    if (totDaysEl) totDaysEl.textContent = dailyRoadmap.length;
    if (daysPctEl) {
      const pct = dailyRoadmap.length > 0 ? Math.round((completedDays / dailyRoadmap.length) * 100) : 0;
      daysPctEl.textContent = pct + '%';
    }
  } else if (typeof topics !== 'undefined') {
    topics.forEach(t => t.subpatterns.forEach(s => s.qs.forEach(q => {
      tot++;
      const isDone = appState.done.includes(q.n);
      if (isDone) doneCount++;
      if (stats[q.d]) {
        stats[q.d].t++;
        if (isDone) stats[q.d].d++;
      } else {
        stats.SD.t++;
        if (isDone) stats.SD.d++;
      }
    })));
  }

  const totalQEl = document.getElementById('totalQ');
  const doneQEl = document.getElementById('doneQ');
  const totalPctEl = document.getElementById('totalPct');
  if (totalQEl) totalQEl.textContent = tot;
  if (doneQEl) doneQEl.textContent = doneCount;
  if (totalPctEl) {
    const pct = tot > 0 ? Math.round((doneCount / tot) * 100) : 0;
    totalPctEl.textContent = pct + '%';
  }

  const totEEl = document.getElementById('totE');
  const doneEEl = document.getElementById('doneE');
  const totMEl = document.getElementById('totM');
  const doneMEl = document.getElementById('doneM');
  const totHEl = document.getElementById('totH');
  const doneHEl = document.getElementById('doneH');

  if (totEEl) totEEl.textContent = stats.E.t;
  if (doneEEl) doneEEl.textContent = stats.E.d;
  if (totMEl) totMEl.textContent = stats.M.t;
  if (doneMEl) doneMEl.textContent = stats.M.d;
  if (totHEl) totHEl.textContent = stats.H.t;
  if (doneHEl) doneHEl.textContent = stats.H.d;
}

// Render Topic View (Original Categorized Roadmap)
function toggleTopic(id) {
  if (typeof topics === 'undefined') return;
  const t = topics.find(topic => topic.id === id);
  if (t) {
    t.isOpen = !t.isOpen;
    renderTopicView();
  }
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

function renderTopicView() {
  const container = document.getElementById('topicView');
  if (!container || typeof topics === 'undefined') return;

  const searchInput = document.getElementById('searchInput');
  const searchQ = searchInput ? searchInput.value.toLowerCase().trim() : '';

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
        const num = globalNumbering.get(q.n) || '•';
        const safeQId = q.n.replace(/[^a-zA-Z0-9]/g, '') + '-' + num;

        return `
          <div class="q-item-container">
            <div class="q-item">
              <div class="q-check ${isDone ? 'done' : ''}" onclick="toggleDone('${q.n.replace(/'/g, "\\'")}')"></div>
              <div class="q-num">${num}.</div>
              <a href="${link}" target="_blank" rel="noopener noreferrer" class="q-name ${isDone ? 'done' : ''}">${q.n}</a>
              <span class="diff-badge badge-${q.d}">${q.d}</span>
              <div class="q-actions">
                <button class="icon-btn ${noteVal ? 'active note' : ''}" id="noteBtn-${safeQId}" onclick="toggleNotes(event, '${safeQId}')" title="Notes">📝</button>
                <button class="icon-btn ${isBookmarked ? 'active star' : ''}" onclick="toggleBookmark(event, '${q.n.replace(/'/g, "\\'")}')" title="Bookmark">⭐</button>
              </div>
            </div>
            <div class="notes-panel" id="notes-${safeQId}">
              <textarea class="notes-textarea" placeholder="Add notes here..." onblur="saveNote('${q.n.replace(/'/g, "\\'")}', this.value)">${noteVal}</textarea>
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
            <div class="topic-sub">${tTot} Questions • Days: ${topic.days || ''}</div>
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

// Data Export & Import
function exportData() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
  const el = document.createElement('a');
  el.setAttribute('href', dataStr);
  el.setAttribute('download', 'dsa_tracker_pro.json');
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
        appState = Object.assign(appState, imported);
        saveState();
        alert('Data imported successfully!');
        location.reload();
      }
    } catch (err) {
      alert('Invalid backup file');
    }
  };
  reader.readAsText(file);
}

// Start Application
window.addEventListener('DOMContentLoaded', init);
