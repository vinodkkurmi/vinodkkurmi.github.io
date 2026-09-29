const data = window.ROOM_DATA;
const select = document.getElementById("courseSelect");
const tabs = document.getElementById("courseTabs");
const seatGrid = document.getElementById("seatGrid");
const systemList = document.getElementById("systemList");

let selected = data.courses[0].code;

function courseInfo(code) {
  return data.courses.find(c => c.code === code);
}

function initControls() {
  data.courses.forEach(c => {
    const option = document.createElement("option");
    option.value = c.code;
    option.textContent = `${c.code} — ${c.name}`;
    select.appendChild(option);

    const tab = document.createElement("button");
    tab.className = "course-tab";
    tab.dataset.course = c.code;
    tab.textContent = `${c.code} · ${c.name}`;
    tab.addEventListener("click", () => setCourse(c.code));
    tabs.appendChild(tab);
  });
  select.addEventListener("change", e => setCourse(e.target.value));
}

function setCourse(code) {
  selected = code;
  select.value = code;
  document.querySelectorAll(".course-tab").forEach(btn => {
    const active = btn.dataset.course === code;
    btn.classList.toggle("active", active);
    if (active) btn.style.background = courseInfo(code).color;
    else btn.style.background = "";
  });
  render();
}

function getCourseSystems() {
  return data.records.filter(r => r.course === selected);
}

function renderStats(systems) {
  document.getElementById("totalCount").textContent = systems.length;
  document.getElementById("ram8").textContent = systems.filter(s => s.ram === 8).length;
  document.getElementById("ram12").textContent = systems.filter(s => s.ram === 12).length;
  document.getElementById("ram16").textContent = systems.filter(s => s.ram === 16).length;
}

function renderGrid() {
  seatGrid.innerHTML = "";
  const byRowCol = new Map(data.records.map(r => [`${r.row}-${r.excelCell[0]}`, r]));
  const cols = data.layout.columns;

  for (let row = 1; row <= data.layout.rows; row++) {
    for (let i = 0; i < cols.length; i++) {
      const col = cols[i];
      const rec = byRowCol.get(`${row}-${col.id}`);
      const cell = document.createElement("div");

      if (!rec) {
        cell.className = "seat empty";
        seatGrid.appendChild(cell);
        continue;
      }

      const isSelected = rec.course === selected;
      cell.className = `seat ${isSelected ? "selected" : "other"} ${rec.working ? "" : "off"}`.trim();
      cell.style.background = rec.working ? (isSelected ? rec.color : "#eef0f4") : "#434343";
      cell.title = rec.working
        ? `${rec.course} — Seat ${rec.seat} — ${rec.ram} GB`
        : `Seat ${rec.seat} — Not working`;

      const marker = rec.raw.includes("*") ? "*" : rec.raw.includes("#") ? "#" : "";
      cell.innerHTML = `
        <span class="num">${rec.seat}</span>
        <span class="ram">${rec.working ? rec.ram + " GB" : "OFF"}</span>
        ${marker ? `<span class="marker">${marker}</span>` : ""}
      `;
      if (isSelected) cell.style.color = "#fff";
      else if (rec.working) cell.style.color = "#536071";
      seatGrid.appendChild(cell);
    }
  }
}

function renderList(systems) {
  const info = courseInfo(selected);
  document.getElementById("listTitle").textContent = `${info.code} — ${info.name}`;
  document.getElementById("listCount").textContent = systems.length;
  systemList.innerHTML = "";

  systems.sort((a,b) => a.seat - b.seat).forEach(s => {
    const marker = s.raw.includes("*") ? "*" : s.raw.includes("#") ? "#" : "";
    const item = document.createElement("div");
    item.className = "system-item";
    item.innerHTML = `
      <div class="system-id">
        <span class="seat-mini" style="background:${s.color}">${s.seat}</span>
        <div>
          <strong>System ${s.seat}</strong>
          <small>Room row ${s.row} · Excel ${s.excelCell}${marker ? ` · marker ${marker}` : ""}</small>
        </div>
      </div>
      <span class="ram-badge">${s.ram} GB</span>
    `;
    systemList.appendChild(item);
  });
}

function render() {
  const systems = getCourseSystems();
  renderStats(systems);
  renderGrid();
  renderList(systems);
  document.getElementById("footerSummary").textContent =
    `${selected}: ${systems.length} allocated systems`;
}

initControls();
setCourse(selected);
