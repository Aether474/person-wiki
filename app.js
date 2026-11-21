// Shared layout + page rendering. Content lives in entries.js.

const LOGO = `
<svg viewBox="0 0 100 100" aria-hidden="true">
  <circle cx="50" cy="50" r="44" fill="none" stroke="#ddd" stroke-width="6"/>
  <circle cx="50" cy="50" r="34" fill="none" stroke="#ddd" stroke-width="2" stroke-dasharray="6 5"/>
  <circle cx="50" cy="38" r="10" fill="#ddd"/>
  <path d="M30 72 Q30 52 50 52 Q70 52 70 72 Z" fill="#ddd"/>
  <rect x="47" y="2" width="6" height="14" fill="#ddd"/><rect x="47" y="84" width="6" height="14" fill="#ddd"/>
  <rect x="2" y="47" width="14" height="6" fill="#ddd"/><rect x="84" y="47" width="14" height="6" fill="#ddd"/>
</svg>`;

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Escape, then turn [[text]] into hover-reveal redaction bars and line breaks into paragraphs.
function fmt(text) {
  return esc(text)
    .replace(/\[\[(.+?)\]\]/g, '<span class="redact" title="hover to declassify">$1</span>')
    .split(/\n\s*\n/)
    .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function shell(contentHtml) {
  const list = ENTRIES.map(e => `<li><a href="entry.html?id=${encodeURIComponent(e.id)}">${esc(e.id)}</a></li>`).join("");
  document.body.innerHTML = `
  <div id="header"><div class="inner">
    <a class="logo" href="index.html">${LOGO}
      <div><h1>PERSON WIKI</h1><h2>Secure. Contain. Put Up With.</h2></div>
    </a>
  </div></div>
  <div id="topbar"><div class="inner">
    <a href="index.html">Main</a>
    <a href="series.html">Person SCP Series</a>
    <a href="entry.html?random=1">Random Person</a>
    <a href="about.html">About</a>
  </div></div>
  <div id="layout">
    <div id="side">
      <div class="box"><h3>Person Series</h3><ul>${list}</ul></div>
      <div class="box"><h3>Object Classes</h3><ul>
        <li>Safe – harmless, mostly</li><li>Euclid – unpredictable</li><li>Keter – do not invite</li></ul></div>
      <div class="box"><h3>Your Clearance</h3><span id="clr"></span></div>
    </div>
    <div id="main">${contentHtml}</div>
  </div>
  <div id="footer">Person Wiki is a joke. Any resemblance to real people is entirely intentional.<br>
  Format inspired by the SCP Wiki (scp-wiki.wikidot.com), used under CC BY-SA 3.0. This site's text is likewise CC BY-SA 3.0.</div>
  <div id="gate"><div class="card"></div></div>`;
  document.getElementById("clr").textContent = "Level " + getClearance();
}

function getClearance() {
  try { return parseInt(localStorage.getItem("clearance") || "1", 10); } catch (e) { return 1; }
}
function setClearance(n) {
  try { localStorage.setItem("clearance", String(n)); } catch (e) {}
}

function renderEntry() {
  const params = new URLSearchParams(location.search);
  let entry;
  if (params.get("random")) entry = ENTRIES[Math.floor(Math.random() * ENTRIES.length)];
  else entry = ENTRIES.find(e => e.id === params.get("id"));

  if (!entry) {
    shell(`<h1 id="page-title">Page Not Found</h1>
      <div class="notice">This person does not exist, or has been successfully avoided.</div>
      <p><a href="series.html">Return to the Person Series</a></p>`);
    return;
  }
  document.title = `${entry.id} - Person Wiki`;

  const cls = entry.objectClass.toLowerCase();
  const photo = entry.photo
    ? `<img src="${esc(entry.photo)}" alt="${esc(entry.id)}">`
    : `<div class="ph">[IMAGE REDACTED]</div>`;
  const addenda = (entry.addenda || []).map(a => `
    <div class="addendum"><details class="collapse"><summary>+ ${esc(a.title)}</summary>${fmt(a.body)}</details></div>`).join("");

  shell(`
    <div class="rating">rating: <span id="rt">+${entry.rating}</span>
      <button onclick="vote(1)">+</button><button onclick="vote(-1)">–</button></div>
    <h1 id="page-title">${esc(entry.id)}</h1>
    <div class="img-block">${photo}<p>${esc(entry.photoCaption || "")}</p></div>
    <p class="field"><b>Item #:</b> ${esc(entry.id)}</p>
    <p class="field"><b>Common Name:</b> ${esc(entry.name)}</p>
    <div class="classbar">
      <div><small>Clearance</small><b>Level ${entry.clearance}</b></div>
      <div class="${cls}"><small>Object Class</small><b>${esc(entry.objectClass)}</b></div>
    </div>
    <p class="field"><b>Special Containment Procedures:</b></p>${fmt(entry.containment)}
    <p class="field"><b>Description:</b></p>${fmt(entry.description)}
    ${addenda}
    <p style="clear:both;margin-top:30px">« <a href="series.html">Person Series</a> »</p>`);

  window._rating = entry.rating;
  if (entry.clearance > getClearance()) showGate(entry);
}

function vote(d) {
  window._rating += d;
  document.getElementById("rt").textContent = (window._rating >= 0 ? "+" : "") + window._rating;
}

function showGate(entry) {
  const gate = document.getElementById("gate");
  gate.querySelector(".card").innerHTML = `
    <h2>ACCESS RESTRICTED</h2>
    <p>${esc(entry.id)} requires Level ${entry.clearance} clearance.<br>Your clearance: Level ${getClearance()}.</p>
    <p>Do you swear you are friends with this person and can handle it?</p>
    <button id="swear">I SWEAR</button>`;
  gate.style.display = "flex";
  document.getElementById("swear").onclick = () => {
    setClearance(entry.clearance);
    gate.style.display = "none";
    document.getElementById("clr").textContent = "Level " + entry.clearance;
  };
}

function renderSeries() {
  const rows = ENTRIES.map(e => `<li><a href="entry.html?id=${encodeURIComponent(e.id)}">${esc(e.id)}</a> - ${esc(e.name)}</li>`).join("");
  shell(`<h1 id="page-title">Person SCP Series I</h1>
    <p>Below is every documented person currently under containment, or at least under observation in the group chat.</p>
    <ul class="series">${rows}</ul>`);
}

function renderHome() {
  const latest = ENTRIES.slice(-3).reverse().map(e => `<li><a href="entry.html?id=${encodeURIComponent(e.id)}">${esc(e.id)}</a> - ${esc(e.name)}</li>`).join("");
  shell(`<h1 id="page-title">Person Wiki</h1>
    <div class="notice"><b>WARNING:</b> THE PERSON DATABASE IS CLASSIFIED. ACCESS BY UNAUTHORIZED PERSONNEL IS STRICTLY PROHIBITED. PERPETRATORS WILL BE TRACKED, LOCATED, AND ADDED TO THE GROUP CHAT.</div>
    <p>Welcome to the Person Wiki, the official containment archive for anomalous people. Every entry here documents a human being whose behavior defies natural law, common sense, or basic group chat etiquette.</p>
    <p>Our mission is simple:</p>
    <p style="text-align:center;font-size:16px;letter-spacing:2px"><b>SECURE. CONTAIN. PUT UP WITH.</b></p>
    <h2 class="section">Recently Documented</h2><ul>${latest}</ul>
    <h2 class="section">Browse</h2>
    <ul><li><a href="series.html">Person SCP Series I</a></li><li><a href="entry.html?random=1">Random Person</a></li></ul>`);
}

function renderAbout() {
  shell(`<h1 id="page-title">About the Person Wiki</h1>
    <p>The Person Wiki was established on ██/██/20██ after it became clear that certain individuals could no longer be explained by conventional science.</p>
    <p>All entries are written by people who know the subjects personally, which is how we know they are true. Subjects who object to their entry may file a complaint, which will be <span class="redact">read aloud in the group chat</span>.</p>`);
}
