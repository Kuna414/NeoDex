import "./styles.css";

const app = document.querySelector("#app");

function navigate(route) {
  window.location.hash = route;
}

function renderHome() {
  app.innerHTML = `
    <main class="app-shell">
      <section class="master-screen" aria-label="NeoDex Startseite">
        <button class="hotspot hotspot--settings" aria-label="Einstellungen"></button>
        <button class="hotspot hotspot--pokedex" aria-label="Pokédex"></button>
        <button class="hotspot hotspot--route" aria-label="RouteDex"></button>
        <button class="hotspot hotspot--caught" aria-label="Gefangen"></button>
        <button class="hotspot hotspot--favorites" aria-label="Favoriten"></button>
      </section>
    </main>
  `;

  app.querySelector(".hotspot--pokedex").addEventListener("click", () => navigate("pokedex"));
  app.querySelector(".hotspot--route").addEventListener("click", () => navigate("neoui"));
  app.querySelector(".hotspot--caught").addEventListener("click", () => navigate("pokedex"));
  app.querySelector(".hotspot--favorites").addEventListener("click", () => navigate("pokedex"));
  app.querySelector(".hotspot--settings").addEventListener("click", () => navigate("settings"));
}

function pageHeader(title) {
  return `
    <header class="page-header">
      <h1 class="page-title">${title}</h1>
      <button class="back-button" data-back>Startseite</button>
    </header>
  `;
}

function attachBack() {
  app.querySelector("[data-back]")?.addEventListener("click", () => navigate(""));
}

function renderPokedex() {
  app.innerHTML = `
    <main class="page">
      ${pageHeader("Pokédex")}
      <section class="stack">
        <input class="search" type="search" placeholder="Deutsch, Englisch oder Nummer suchen …">
        <div class="card">
          <strong class="status">Sprint 2 – Pokédex UI</strong>
          <p>Die neue Build-Struktur funktioniert. Als Nächstes verbinden wir hier das Pokémon-Repository mit NeoUI.</p>
        </div>
      </section>
    </main>
  `;
  attachBack();
}

function renderNeoUI() {
  app.innerHTML = `
    <main class="page">
      ${pageHeader("NeoUI Lab")}
      <section class="stack">
        <div class="showcase-grid">
          <article class="card component">
            <h3>NeoSearchBar</h3>
            <input class="search" type="search" placeholder="Pokémon suchen …">
          </article>
          <article class="card component">
            <h3>NeoButton</h3>
            <button class="primary-button">Pokédex öffnen</button>
          </article>
          <article class="card component">
            <h3>NeoChip</h3>
            <div class="chips">
              <span class="chip">Pflanze</span>
              <span class="chip">Gift</span>
              <span class="chip">Shiny</span>
            </div>
          </article>
          <article class="card component">
            <h3>Noctuh-Animation</h3>
            <p>Die ruhigen Fortschrittsreaktionen werden als eigene NeoUI-Komponente ergänzt.</p>
          </article>
        </div>
      </section>
    </main>
  `;
  attachBack();
}

function renderSettings() {
  app.innerHTML = `
    <main class="page">
      ${pageHeader("Einstellungen")}
      <section class="card stack">
        <label>
          App-Sprache
          <select class="search">
            <option>Deutsch</option>
            <option>English</option>
          </select>
        </label>
        <p>Die automatische Namenslogik berücksichtigt später die Originalsprache des ROM-Hacks.</p>
      </section>
    </main>
  `;
  attachBack();
}

function render() {
  const route = window.location.hash.replace("#", "");
  if (route === "pokedex") return renderPokedex();
  if (route === "neoui") return renderNeoUI();
  if (route === "settings") return renderSettings();
  renderHome();
}

window.addEventListener("hashchange", render);
render();
