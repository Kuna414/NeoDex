import "./styles.css";

const app = document.querySelector("#app");
const DATA_URL = `${import.meta.env.BASE_URL}data/pokemon.json`;
const ART_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const storage = {
  readSet(key) {
    try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); }
    catch { return new Set(); }
  },
  writeSet(key, value) {
    localStorage.setItem(key, JSON.stringify([...value]));
  },
};

const state = {
  pokemon: [],
  route: location.hash.slice(1) || "home",
  query: "",
  generation: "",
  filter: "all",
  seen: storage.readSet("neodex-seen"),
  caught: storage.readSet("neodex-caught"),
  shiny: storage.readSet("neodex-shiny"),
  favorites: storage.readSet("neodex-favorites"),
};

const normalize = (value) => String(value ?? "")
  .toLocaleLowerCase("de")
  .replace(/ß/g, "ss")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9♀♂]+/g, " ")
  .trim();

function artwork(id) {
  return `${ART_URL}/${id}.png`;
}

function navigate(route) {
  location.hash = route;
}

function saveProgress() {
  storage.writeSet("neodex-seen", state.seen);
  storage.writeSet("neodex-caught", state.caught);
  storage.writeSet("neodex-shiny", state.shiny);
  storage.writeSet("neodex-favorites", state.favorites);
}

function pageHeader(title) {
  return `<header class="page-head"><div><button class="back" data-back>‹ Startseite</button><h1>${title}</h1></div><span class="result-count" data-count></span></header>`;
}

function bindBack() {
  app.querySelector("[data-back]")?.addEventListener("click", () => navigate(""));
}

function renderHome() {
  const changesTotal = state.pokemon.reduce((sum, p) => sum + (p.changes?.length || 0), 0);
  app.innerHTML = `
    <main class="app">
      <section class="top">
        <div class="brand"><div class="mark">🦉</div><div><h1>NeoDex</h1><p>HeartGold Generations 2.0</p></div></div>
        <div><button class="settings" aria-label="Einstellungen">⚙</button><div class="build">HGG 2.0<br>Build 2.0.1</div></div>
      </section>

      <section class="hero">
        <h2>Willkommen zurück.</h2>
        <p class="welcome">Schön, dass du wieder da bist.</p>
        <div class="owl" aria-hidden="true"><div class="branch"></div><div class="body"></div><div class="head"><div class="ear l"></div><div class="ear r"></div><div class="brow l"></div><div class="brow r"></div><div class="eye l"></div><div class="eye r"></div><div class="beak"></div></div></div>
        <div class="stats">
          <div class="stat"><div class="round">◉</div><div><span>Dein Fortschritt</span><strong>${state.seen.size} / 1.025</strong><span>gesehen</span></div></div>
          <div class="stat"><div class="round">☆</div><div><span>Favoriten</span><strong>${state.favorites.size}</strong></div></div>
        </div>
      </section>

      <section class="tiles">
        <button class="tile" data-route="pokedex"><div class="tile-icon">⌕</div><div><h3>Pokédex</h3><p>Deutsch und Englisch durchsuchen.</p></div><div class="chev">›</div></button>
        <button class="tile" data-route="routedex"><div class="tile-icon">⌖</div><div><h3>RouteDex</h3><p>Fundorte nach Route und Methode.</p></div><div class="chev">›</div></button>
        <button class="tile" data-route="caught"><div class="tile-icon">◉</div><div><h3>Gefangen</h3><p>Deine gesamte Sammlung.</p></div><div class="chev">›</div></button>
        <button class="tile" data-route="favorites"><div class="tile-icon">☆</div><div><h3>Favoriten</h3><p>Schneller Zugriff auf deine Favoriten.</p></div><div class="chev">›</div></button>
      </section>

      <section class="summary">
        <div class="sum"><strong>${state.seen.size} / 1025</strong><span>Pokédex</span><div class="bar"><i style="width:${state.seen.size / 1025 * 100}%"></i></div></div>
        <div class="sum"><strong>0 %</strong><span>RouteDex</span><div class="bar"><i style="width:0%"></i></div></div>
        <div class="sum"><strong>${changesTotal}</strong><span>HGG-Änderungen</span><div class="bar"><i style="width:100%"></i></div></div>
      </section>
    </main>`;

  app.querySelector(".settings").addEventListener("click", () => navigate("settings"));
  app.querySelectorAll("[data-route]").forEach(button =>
    button.addEventListener("click", () => navigate(button.dataset.route))
  );
}

function filteredPokemon(forcedFilter) {
  const query = normalize(state.query);
  const selectedFilter = forcedFilter || state.filter;
  return state.pokemon.filter(p => {
    const matchesQuery = !query || normalize(`${p.id} ${String(p.id).padStart(4,"0")} ${p.de} ${p.en}`).includes(query);
    const matchesGeneration = !state.generation || String(p.gen) === state.generation;
    const matchesStatus =
      selectedFilter === "all" ||
      (selectedFilter === "changed" && p.changes?.length) ||
      (selectedFilter === "seen" && state.seen.has(p.id)) ||
      (selectedFilter === "caught" && state.caught.has(p.id)) ||
      (selectedFilter === "shiny" && state.shiny.has(p.id)) ||
      (selectedFilter === "favorites" && state.favorites.has(p.id));
    return matchesQuery && matchesGeneration && matchesStatus;
  });
}

function pokemonCard(p) {
  const badges = [
    p.changes?.length ? `<span class="mini-badge changed">${p.changes.length} HGG</span>` : "",
    state.caught.has(p.id) ? `<span class="mini-badge caught">✓ Gefangen</span>` : "",
    state.shiny.has(p.id) ? `<span class="mini-badge shiny">✦ Shiny</span>` : "",
  ].join("");

  return `
    <article class="pokemon-card" data-id="${p.id}">
      <button class="favorite ${state.favorites.has(p.id) ? "on" : ""}" data-favorite="${p.id}" aria-label="Favorit">★</button>
      <span class="dex-number">#${String(p.id).padStart(4,"0")}</span>
      <img loading="lazy" src="${artwork(p.id)}" alt="${p.de}" onerror="this.classList.add('image-error')">
      <h2>${p.de}</h2>
      <p>${p.en}</p>
      <div class="card-badges">${badges}</div>
    </article>`;
}

function renderPokedex(forcedFilter = null, title = "Pokédex") {
  if (forcedFilter) state.filter = forcedFilter;
  const results = filteredPokemon(forcedFilter);
  app.innerHTML = `
    <main class="app page">
      ${pageHeader(title)}
      <section class="dex-controls">
        <label class="search-wrap"><span>⌕</span><input class="search" value="${state.query.replace(/"/g,"&quot;")}" type="search" placeholder="Deutsch, Englisch oder Nummer suchen …"></label>
        <div class="filters">
          <select data-generation>
            <option value="">Alle Generationen</option>
            ${Array.from({length:9},(_,i)=>`<option value="${i+1}" ${state.generation===String(i+1)?"selected":""}>Generation ${i+1}</option>`).join("")}
          </select>
          <select data-filter>
            <option value="all" ${state.filter==="all"?"selected":""}>Alle Pokémon</option>
            <option value="changed" ${state.filter==="changed"?"selected":""}>HGG-Änderungen</option>
            <option value="seen" ${state.filter==="seen"?"selected":""}>Gesehen</option>
            <option value="caught" ${state.filter==="caught"?"selected":""}>Gefangen</option>
            <option value="shiny" ${state.filter==="shiny"?"selected":""}>Shiny</option>
            <option value="favorites" ${state.filter==="favorites"?"selected":""}>Favoriten</option>
          </select>
        </div>
      </section>
      <section class="pokemon-grid">${results.length ? results.map(pokemonCard).join("") : `<div class="empty">Keine Pokémon gefunden.</div>`}</section>
    </main>
    <dialog class="detail-dialog"><div class="detail-content"></div></dialog>`;

  bindBack();
  app.querySelector("[data-count]").textContent = `${results.length} / 1.025`;
  const search = app.querySelector(".search");
  search.addEventListener("input", e => { state.query = e.target.value; renderPokedex(forcedFilter, title); requestAnimationFrame(()=>app.querySelector(".search")?.focus()); });
  app.querySelector("[data-generation]").addEventListener("change", e => { state.generation = e.target.value; renderPokedex(forcedFilter, title); });
  app.querySelector("[data-filter]").addEventListener("change", e => { state.filter = e.target.value; renderPokedex(null, "Pokédex"); });

  app.querySelectorAll("[data-favorite]").forEach(btn => btn.addEventListener("click", e => {
    e.stopPropagation();
    const id = Number(btn.dataset.favorite);
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    saveProgress();
    renderPokedex(forcedFilter, title);
  }));
  app.querySelectorAll(".pokemon-card").forEach(card =>
    card.addEventListener("click", () => openDetail(Number(card.dataset.id)))
  );
}

function openDetail(id) {
  const p = state.pokemon.find(entry => entry.id === id);
  if (!p) return;
  state.seen.add(id);
  saveProgress();
  const dialog = app.querySelector(".detail-dialog");
  const changes = p.changes?.length
    ? `<section class="detail-section"><h3>HGG 2.0 Änderungen</h3>${p.changes.map(c=>`<div class="change"><strong>${c.category}</strong><p>${c.detail}</p></div>`).join("")}</section>`
    : "";

  dialog.querySelector(".detail-content").innerHTML = `
    <header class="detail-head"><button class="close" data-close>×</button><span>#${String(id).padStart(4,"0")}</span></header>
    <img class="detail-art" src="${artwork(id)}" alt="${p.de}">
    <h2>${p.de}</h2><p class="detail-en">${p.en}</p>
    <div class="detail-actions">
      <button data-action="caught">${state.caught.has(id) ? "✓ Gefangen" : "○ Als gefangen"}</button>
      <button data-action="shiny">${state.shiny.has(id) ? "✦ Shiny" : "◇ Als Shiny"}</button>
      <button data-action="favorite">${state.favorites.has(id) ? "★ Favorit" : "☆ Favorit"}</button>
    </div>
    ${changes}
    <section class="detail-section"><p>Weitere Detaildaten, Typen, Fähigkeiten, Entwicklungen und Attacken folgen im nächsten Schritt.</p></section>`;

  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.querySelectorAll("[data-action]").forEach(button => button.addEventListener("click", () => {
    const action = button.dataset.action;
    const set = action === "favorite" ? state.favorites : action === "caught" ? state.caught : state.shiny;
    set.has(id) ? set.delete(id) : set.add(id);
    if (action === "caught" || action === "shiny") state.seen.add(id);
    if (action === "shiny") state.caught.add(id);
    saveProgress();
    dialog.close();
    renderPokedex(state.filter === "caught" || state.filter === "favorites" ? state.filter : null, state.filter === "caught" ? "Gefangen" : state.filter === "favorites" ? "Favoriten" : "Pokédex");
  }));
  dialog.showModal();
}

function renderPlaceholder(title, message) {
  app.innerHTML = `<main class="app page">${pageHeader(title)}<section class="card"><p>${message}</p></section></main>`;
  bindBack();
}

function renderSettings() {
  app.innerHTML = `<main class="app page">${pageHeader("Einstellungen")}<section class="card settings-card"><h2>Sprache</h2><label>App-Sprache<select><option>Deutsch</option><option>English</option></select></label><p>Die Umschaltung wird in einem kommenden Sprint vollständig angebunden.</p></section></main>`;
  bindBack();
}

function render() {
  const route = location.hash.slice(1);
  if (route === "pokedex") return renderPokedex(null, "Pokédex");
  if (route === "caught") return renderPokedex("caught", "Gefangen");
  if (route === "favorites") return renderPokedex("favorites", "Favoriten");
  if (route === "routedex") return renderPlaceholder("RouteDex", "RouteDex wird als nächstes Datenmodul ergänzt.");
  if (route === "settings") return renderSettings();
  renderHome();
}

async function boot() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error("Pokémon-Daten konnten nicht geladen werden.");
    state.pokemon = await response.json();
    render();
  } catch (error) {
    app.innerHTML = `<main class="app page"><section class="card"><h1>NeoDex konnte nicht starten</h1><p>${error.message}</p></section></main>`;
  }
}

addEventListener("hashchange", render);
boot();
