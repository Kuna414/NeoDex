import "./styles.css";

const app = document.querySelector("#app");
const BASE = import.meta.env.BASE_URL;
const DATA_URL = `${BASE}data/pokemon.json`;
const ART_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
const API_URL = "https://pokeapi.co/api/v2";

const I18N = {
  de: {
    subtitle: "HeartGold Generations 2.0",
    welcomeTitle: "Willkommen zurück.",
    welcomeText: "Schön, dass du wieder da bist.",
    progress: "Dein Fortschritt",
    seen: "gesehen",
    favorites: "Favoriten",
    pokedex: "Pokédex",
    pokedexHelp: "Deutsch und Englisch durchsuchen.",
    routedex: "RouteDex",
    routedexHelp: "Fundorte nach Route und Methode.",
    caught: "Gefangen",
    caughtHelp: "Deine gesamte Sammlung.",
    favoritesHelp: "Schneller Zugriff auf deine Favoriten.",
    changes: "HGG-Änderungen",
    settings: "Einstellungen",
    back: "‹ Startseite",
    search: "Deutsch, Englisch oder Nummer suchen …",
    allGenerations: "Alle Generationen",
    generation: "Generation",
    allPokemon: "Alle Pokémon",
    changed: "HGG-Änderungen",
    shiny: "Shiny",
    noResults: "Keine Pokémon gefunden.",
    loading: "Detaildaten werden geladen …",
    detailsUnavailable: "Detaildaten nicht verfügbar",
    ability: "Fähigkeit",
    hiddenAbility: "Versteckte Fähigkeit",
    abilities: "Fähigkeiten",
    baseStats: "Basiswerte",
    physicalData: "Körperdaten",
    height: "Größe",
    weight: "Gewicht",
    statTotal: "Basiswertsumme",
    evolution: "Entwicklung",
    startForm: "Startform",
    markCaught: "Als gefangen",
    markShiny: "Als Shiny",
    favorite: "Favorit",
    appLanguage: "App-Sprache",
    german: "Deutsch",
    english: "English",
    languageExplanation: "Da HeartGold Generations 2.0 Englisch verwendet, zeigt die deutsche App deutsche Namen zusammen mit den englischen Namen aus dem Spiel.",
    routedexLater: "RouteDex wird im nächsten großen Modul ergänzt.",
    close: "Schließen",
    retry: "Erneut versuchen",
  },
  en: {
    subtitle: "HeartGold Generations 2.0",
    welcomeTitle: "Welcome back.",
    welcomeText: "It is good to see you again.",
    progress: "Your progress",
    seen: "seen",
    favorites: "Favorites",
    pokedex: "Pokédex",
    pokedexHelp: "Search by English name or number.",
    routedex: "RouteDex",
    routedexHelp: "Encounters by route and method.",
    caught: "Caught",
    caughtHelp: "Your complete collection.",
    favoritesHelp: "Quick access to your favorites.",
    changes: "HGG changes",
    settings: "Settings",
    back: "‹ Home",
    search: "Search by English name or number …",
    allGenerations: "All generations",
    generation: "Generation",
    allPokemon: "All Pokémon",
    changed: "HGG changes",
    shiny: "Shiny",
    noResults: "No Pokémon found.",
    loading: "Loading details …",
    detailsUnavailable: "Details unavailable",
    ability: "Ability",
    hiddenAbility: "Hidden Ability",
    abilities: "Abilities",
    baseStats: "Base stats",
    physicalData: "Physical data",
    height: "Height",
    weight: "Weight",
    statTotal: "Base stat total",
    evolution: "Evolution",
    startForm: "Base form",
    markCaught: "Mark caught",
    markShiny: "Mark shiny",
    favorite: "Favorite",
    appLanguage: "App language",
    german: "Deutsch",
    english: "English",
    languageExplanation: "HeartGold Generations 2.0 uses English, so the English app shows the in-game names only.",
    routedexLater: "RouteDex will be added in the next major module.",
    close: "Close",
    retry: "Try again",
  }
};

const TYPE_LABELS = {
  normal: { de: "Normal", en: "Normal" },
  fire: { de: "Feuer", en: "Fire" },
  water: { de: "Wasser", en: "Water" },
  electric: { de: "Elektro", en: "Electric" },
  grass: { de: "Pflanze", en: "Grass" },
  ice: { de: "Eis", en: "Ice" },
  fighting: { de: "Kampf", en: "Fighting" },
  poison: { de: "Gift", en: "Poison" },
  ground: { de: "Boden", en: "Ground" },
  flying: { de: "Flug", en: "Flying" },
  psychic: { de: "Psycho", en: "Psychic" },
  bug: { de: "Käfer", en: "Bug" },
  rock: { de: "Gestein", en: "Rock" },
  ghost: { de: "Geist", en: "Ghost" },
  dragon: { de: "Drache", en: "Dragon" },
  dark: { de: "Unlicht", en: "Dark" },
  steel: { de: "Stahl", en: "Steel" },
  fairy: { de: "Fee", en: "Fairy" },
};

const STAT_LABELS = {
  hp: { de: "KP", en: "HP" },
  attack: { de: "Angriff", en: "Attack" },
  defense: { de: "Verteidigung", en: "Defense" },
  "special-attack": { de: "Sp.-Angriff", en: "Sp. Atk" },
  "special-defense": { de: "Sp.-Verteidigung", en: "Sp. Def" },
  speed: { de: "Initiative", en: "Speed" },
};

const FALLBACK_ABILITIES_DE = {
  overgrow: "Notdünger", chlorophyll: "Chlorophyll", blaze: "Großbrand",
  "solar-power": "Solarkraft", torrent: "Sturzbach", "rain-dish": "Regengenuss",
  shield-dust: "Puderabwehr", shed-skin: "Expidermis", compound-eyes: "Facettenauge",
  swarm: "Hexaplaga", keen-eye: "Adlerauge", tangled-feet: "Fußangel",
  run-away: "Angsthase", guts: "Adrenalin", intimidate: "Bedroher",
  static: "Statik", "lightning-rod": "Blitzfänger", levitate: "Schwebe",
  synchronize: "Synchro", inner-focus: "Konzentrator", pressure: "Erzwinger",
  sturdy: "Robustheit", rock-head: "Steinhaupt", clear-body: "Neutraltorso",
  natural-cure: "Innere Kraft", serene-grace: "Edelmut", technician: "Techniker",
  adaptability: "Anpassung", magic-guard: "Magieschild", prankster: "Strolch",
};

const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getSet(key) {
    return new Set(this.get(key, []));
  },
  setSet(key, value) {
    this.set(key, [...value]);
  }
};

const state = {
  pokemon: [],
  language: storage.get("neodex-language", "de"),
  query: storage.get("neodex-query", ""),
  generation: storage.get("neodex-generation", ""),
  filter: storage.get("neodex-filter", "all"),
  seen: storage.getSet("neodex-seen"),
  caught: storage.getSet("neodex-caught"),
  shiny: storage.getSet("neodex-shiny"),
  favorites: storage.getSet("neodex-favorites"),
  detailCache: new Map(Object.entries(storage.get("neodex-details-v2", {}))),
  localizedCache: new Map(Object.entries(storage.get("neodex-localized-v1", {}))),
};

const t = key => I18N[state.language][key] ?? I18N.de[key] ?? key;
const normalize = value => String(value ?? "")
  .toLocaleLowerCase("de")
  .replace(/ß/g, "ss")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9♀♂]+/g, " ")
  .trim();

const artwork = id => `${ART_URL}/${id}.png`;

function saveState() {
  storage.set("neodex-language", state.language);
  storage.set("neodex-query", state.query);
  storage.set("neodex-generation", state.generation);
  storage.set("neodex-filter", state.filter);
  storage.setSet("neodex-seen", state.seen);
  storage.setSet("neodex-caught", state.caught);
  storage.setSet("neodex-shiny", state.shiny);
  storage.setSet("neodex-favorites", state.favorites);
}

function persistCaches() {
  try {
    storage.set("neodex-details-v2", Object.fromEntries(state.detailCache));
    storage.set("neodex-localized-v1", Object.fromEntries(state.localizedCache));
  } catch {
    // Cache persistence is optional.
  }
}

function navigate(route) {
  location.hash = route;
}

function displayNames(pokemon) {
  if (state.language === "en") {
    return { primary: pokemon.en, secondary: "" };
  }
  return { primary: pokemon.de, secondary: pokemon.en };
}

function pageHeader(title) {
  return `<header class="page-head">
    <div><button class="back" data-back>${t("back")}</button><h1>${title}</h1></div>
    <span class="result-count" data-count></span>
  </header>`;
}

function bindBack() {
  app.querySelector("[data-back]")?.addEventListener("click", () => navigate(""));
}

function renderHome() {
  const total = 1025;
  const changesTotal = state.pokemon.reduce((sum, p) => sum + (p.changes?.length || 0), 0);
  const seenPercent = state.seen.size / total * 100;
  const caughtPercent = state.caught.size / total * 100;

  app.innerHTML = `
    <main class="coded-home">
      <header class="home-header">
        <div class="home-brand">
          <img class="home-brand__logo" src="${BASE}assets/neodex-logo.jpg" alt="">
          <div><h1>NeoDex</h1><p>${t("subtitle")}</p></div>
        </div>
        <div class="home-tools">
          <button class="home-settings" data-route="settings" aria-label="${t("settings")}">⚙</button>
          <span class="home-build">NeoDex<br>0.10</span>
        </div>
      </header>

      <section class="home-hero">
        <div class="home-hero__copy">
          <h2>${t("welcomeTitle")}</h2>
          <p>${t("welcomeText")}</p>
        </div>
        <img class="home-hero__owl" src="${BASE}assets/noctuh-hero.jpg" alt="Noctuh">
        <div class="home-hero__stats">
          <div class="hero-stat"><span class="hero-stat__icon">◉</span><div><span>${t("progress")}</span><strong>${state.seen.size} / 1.025</strong><small>${t("seen")}</small></div></div>
          <div class="hero-stat"><span class="hero-stat__icon">☆</span><div><span>${t("favorites")}</span><strong>${state.favorites.size}</strong></div></div>
        </div>
      </section>

      <section class="home-nav">
        ${homeTile("pokedex", "⌕", t("pokedex"), t("pokedexHelp"))}
        ${homeTile("routedex", "⌖", t("routedex"), t("routedexHelp"))}
        ${homeTile("caught", "◉", t("caught"), t("caughtHelp"))}
        ${homeTile("favorites", "☆", t("favorites"), t("favoritesHelp"))}
      </section>

      <section class="home-summary">
        ${summaryCard("◉", t("pokedex"), `${state.seen.size} / 1025`, seenPercent)}
        ${summaryCard("⌖", t("caught"), `${state.caught.size} / 1025`, caughtPercent)}
        ${summaryCard("▣", t("changes"), String(changesTotal), changesTotal ? 100 : 0)}
      </section>
    </main>`;

  app.querySelectorAll("[data-route]").forEach(button =>
    button.addEventListener("click", () => navigate(button.dataset.route))
  );
}

function homeTile(route, icon, title, help) {
  return `<button class="home-tile" data-route="${route}">
    <span class="home-tile__icon">${icon}</span>
    <span class="home-tile__copy"><strong>${title}</strong><small>${help}</small></span>
    <span class="home-tile__arrow">›</span>
  </button>`;
}

function summaryCard(icon, label, value, percent) {
  return `<article class="summary-card"><span class="summary-card__icon">${icon}</span><div><span>${label}</span><strong>${value}</strong><div class="summary-progress"><i style="width:${Math.min(100, percent)}%"></i></div></div></article>`;
}

function filteredPokemon(forcedFilter = null) {
  const query = normalize(state.query);
  const filter = forcedFilter || state.filter;

  return state.pokemon.filter(p => {
    const searchable = normalize(`${p.id} ${String(p.id).padStart(4, "0")} ${p.de} ${p.en}`);
    const queryMatch = !query || searchable.includes(query);
    const generationMatch = !state.generation || String(p.gen) === state.generation;
    const statusMatch =
      filter === "all" ||
      (filter === "changed" && p.changes?.length) ||
      (filter === "seen" && state.seen.has(p.id)) ||
      (filter === "caught" && state.caught.has(p.id)) ||
      (filter === "shiny" && state.shiny.has(p.id)) ||
      (filter === "favorites" && state.favorites.has(p.id));

    return queryMatch && generationMatch && statusMatch;
  });
}

function pokemonCard(p) {
  const names = displayNames(p);
  const badges = [
    p.changes?.length ? `<span class="mini-badge changed">${p.changes.length} HGG</span>` : "",
    state.caught.has(p.id) ? `<span class="mini-badge caught">✓ ${t("caught")}</span>` : "",
    state.shiny.has(p.id) ? `<span class="mini-badge shiny">✦ ${t("shiny")}</span>` : "",
  ].join("");

  return `<article class="pokemon-card" data-id="${p.id}">
    <button class="favorite ${state.favorites.has(p.id) ? "on" : ""}" data-favorite="${p.id}" aria-label="${t("favorite")}">★</button>
    <span class="dex-number">#${String(p.id).padStart(4, "0")}</span>
    <img loading="lazy" src="${artwork(p.id)}" alt="${names.primary}">
    <h2>${names.primary}</h2>
    ${names.secondary ? `<p>${names.secondary}</p>` : `<p>&nbsp;</p>`}
    <div class="card-badges">${badges}</div>
  </article>`;
}

function renderPokedex(forcedFilter = null, title = t("pokedex")) {
  if (forcedFilter) state.filter = forcedFilter;
  const results = filteredPokemon(forcedFilter);

  app.innerHTML = `
    <main class="app page">
      ${pageHeader(title)}
      <section class="dex-controls">
        <label class="search-wrap"><span>⌕</span><input class="search" value="${escapeAttr(state.query)}" type="search" placeholder="${t("search")}"></label>
        <div class="filters">
          <select data-generation>
            <option value="">${t("allGenerations")}</option>
            ${Array.from({ length: 9 }, (_, index) => {
              const value = String(index + 1);
              return `<option value="${value}" ${state.generation === value ? "selected" : ""}>${t("generation")} ${value}</option>`;
            }).join("")}
          </select>
          <select data-filter>
            ${filterOption("all", t("allPokemon"))}
            ${filterOption("changed", t("changed"))}
            ${filterOption("seen", t("seen"))}
            ${filterOption("caught", t("caught"))}
            ${filterOption("shiny", t("shiny"))}
            ${filterOption("favorites", t("favorites"))}
          </select>
        </div>
      </section>
      <section class="pokemon-grid">
        ${results.length ? results.map(pokemonCard).join("") : `<div class="empty">${t("noResults")}</div>`}
      </section>
    </main>
    <dialog class="detail-dialog"><div class="detail-content"></div></dialog>`;

  bindBack();
  app.querySelector("[data-count]").textContent = `${results.length} / 1.025`;

  const search = app.querySelector(".search");
  search.addEventListener("input", event => {
    state.query = event.target.value;
    saveState();
    renderPokedex(forcedFilter, title);
    requestAnimationFrame(() => {
      const field = app.querySelector(".search");
      field?.focus();
      field?.setSelectionRange(state.query.length, state.query.length);
    });
  });

  app.querySelector("[data-generation]").addEventListener("change", event => {
    state.generation = event.target.value;
    saveState();
    renderPokedex(forcedFilter, title);
  });

  app.querySelector("[data-filter]").addEventListener("change", event => {
    state.filter = event.target.value;
    saveState();
    renderPokedex(null, t("pokedex"));
  });

  app.querySelectorAll("[data-favorite]").forEach(button =>
    button.addEventListener("click", event => {
      event.stopPropagation();
      toggleSet(state.favorites, Number(button.dataset.favorite));
      saveState();
      renderPokedex(forcedFilter, title);
    })
  );

  app.querySelectorAll(".pokemon-card").forEach(card =>
    card.addEventListener("click", () => openDetail(Number(card.dataset.id)))
  );
}

function filterOption(value, label) {
  return `<option value="${value}" ${state.filter === value ? "selected" : ""}>${label}</option>`;
}

function escapeAttr(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function toggleSet(set, id) {
  set.has(id) ? set.delete(id) : set.add(id);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status}`);
  return response.json();
}

async function loadDetails(id) {
  const key = String(id);
  if (state.detailCache.has(key)) return state.detailCache.get(key);

  const pokemon = await fetchJson(`${API_URL}/pokemon/${id}`);
  const species = await fetchJson(pokemon.species.url);
  const chain = await fetchJson(species.evolution_chain.url);

  const abilities = await Promise.all(
    pokemon.abilities
      .sort((a, b) => Number(a.is_hidden) - Number(b.is_hidden))
      .map(async entry => ({
        slug: entry.ability.name,
        hidden: entry.is_hidden,
        names: await loadLocalizedNames(entry.ability.url, entry.ability.name)
      }))
  );

  const detail = {
    types: pokemon.types.sort((a, b) => a.slot - b.slot).map(entry => entry.type.name),
    abilities,
    stats: pokemon.stats.map(entry => ({ slug: entry.stat.name, value: entry.base_stat })),
    heightM: pokemon.height / 10,
    weightKg: pokemon.weight / 10,
    evolution: flattenEvolution(chain.chain),
  };

  state.detailCache.set(key, detail);
  persistCaches();
  return detail;
}

async function loadLocalizedNames(url, slug) {
  if (state.localizedCache.has(url)) return state.localizedCache.get(url);

  let result = { en: humanize(slug), de: FALLBACK_ABILITIES_DE[slug] || humanize(slug) };

  try {
    const data = await fetchJson(url);
    const names = Object.fromEntries(data.names.map(entry => [entry.language.name, entry.name]));
    result = {
      en: names.en || result.en,
      de: names.de || FALLBACK_ABILITIES_DE[slug] || result.de,
    };
  } catch {
    // Fallback translations remain available.
  }

  state.localizedCache.set(url, result);
  persistCaches();
  return result;
}

function humanize(slug) {
  return String(slug).split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function flattenEvolution(chain) {
  const rows = [];
  function walk(node, depth = 0) {
    const id = Number(node.species.url.split("/").filter(Boolean).pop());
    rows.push({
      id,
      slug: node.species.name,
      depth,
      condition: describeEvolution(node.evolution_details?.[0])
    });
    node.evolves_to.forEach(child => walk(child, depth + 1));
  }
  walk(chain);
  return rows;
}

function describeEvolution(detail) {
  if (!detail) return t("startForm");
  const parts = [];

  if (detail.min_level) parts.push(state.language === "de" ? `Level ${detail.min_level}` : `Level ${detail.min_level}`);
  if (detail.item?.name) parts.push(humanize(detail.item.name));
  if (detail.held_item?.name) parts.push(state.language === "de" ? `mit ${humanize(detail.held_item.name)}` : `holding ${humanize(detail.held_item.name)}`);
  if (detail.min_happiness) parts.push(state.language === "de" ? "Hohe Freundschaft" : "High friendship");
  if (detail.time_of_day) {
    const labels = { de: { day: "tagsüber", night: "nachts" }, en: { day: "during daytime", night: "at night" } };
    parts.push(labels[state.language][detail.time_of_day] || detail.time_of_day);
  }
  if (detail.trigger?.name === "trade") parts.push(state.language === "de" ? "Tausch" : "Trade");

  return parts.length ? parts.join(" · ") : humanize(detail.trigger?.name || "special");
}

async function openDetail(id) {
  const p = state.pokemon.find(entry => entry.id === id);
  if (!p) return;

  state.seen.add(id);
  saveState();

  const dialog = app.querySelector(".detail-dialog");
  const names = displayNames(p);

  dialog.querySelector(".detail-content").innerHTML = `
    <header class="detail-head"><button class="close" data-close>×</button><span>#${String(id).padStart(4, "0")}</span></header>
    <div class="detail-loading"><img class="detail-art" src="${artwork(id)}" alt="${names.primary}"><h2>${names.primary}</h2>${names.secondary ? `<p>${names.secondary}</p>` : ""}<div class="loading-line"></div><span>${t("loading")}</span></div>`;

  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.showModal();

  try {
    const detail = await loadDetails(id);
    renderLoadedDetail(dialog, p, detail);
  } catch (error) {
    renderDetailError(dialog, p);
  }
}

function renderLoadedDetail(dialog, p, detail) {
  const id = p.id;
  const names = displayNames(p);
  const types = detail.types.map(type => `<span class="type-chip type-${type}">${TYPE_LABELS[type]?.[state.language] || humanize(type)}</span>`).join("");
  const abilities = detail.abilities.map(ability => {
    const abilityName = ability.names[state.language] || ability.names.en;
    const secondary = state.language === "de" && ability.names.en !== abilityName ? `<small>${ability.names.en}</small>` : "";
    return `<div class="ability-row"><div><strong>${abilityName}</strong>${secondary}</div><span>${ability.hidden ? t("hiddenAbility") : t("ability")}</span></div>`;
  }).join("");
  const stats = detail.stats.map(stat => `<div class="detail-stat-row"><span>${STAT_LABELS[stat.slug]?.[state.language] || stat.slug}</span><strong>${stat.value}</strong><div class="detail-stat-track"><i style="width:${Math.min(100, stat.value / 2.55)}%"></i></div></div>`).join("");
  const evolution = detail.evolution.map(entry => {
    const record = state.pokemon.find(pokemon => pokemon.id === entry.id);
    const evoNames = record ? displayNames(record) : { primary: humanize(entry.slug), secondary: "" };
    return `<button class="evolution-card" data-evolution="${entry.id}"><img src="${artwork(entry.id)}" alt="${evoNames.primary}"><span><strong>${evoNames.primary}</strong>${evoNames.secondary ? `<small>${evoNames.secondary}</small>` : ""}<em>${entry.condition}</em></span></button>`;
  }).join("");
  const hggChanges = p.changes?.length
    ? `<section class="detail-section"><h3>${t("changes")}</h3>${p.changes.map(change => `<div class="change"><strong>${change.category}</strong><p>${change.detail}</p></div>`).join("")}</section>`
    : "";

  dialog.querySelector(".detail-content").innerHTML = `
    <header class="detail-head"><button class="close" data-close>×</button><span>#${String(id).padStart(4, "0")}</span></header>
    <section class="detail-identity"><img class="detail-art" src="${artwork(id)}" alt="${names.primary}"><h2>${names.primary}</h2>${names.secondary ? `<p class="detail-en">${names.secondary}</p>` : ""}<div class="type-list">${types}</div></section>
    <div class="detail-actions">
      <button data-action="caught">${state.caught.has(id) ? `✓ ${t("caught")}` : `○ ${t("markCaught")}`}</button>
      <button data-action="shiny">${state.shiny.has(id) ? `✦ ${t("shiny")}` : `◇ ${t("markShiny")}`}</button>
      <button data-action="favorite">${state.favorites.has(id) ? `★ ${t("favorite")}` : `☆ ${t("favorite")}`}</button>
    </div>
    ${hggChanges}
    <section class="detail-section"><h3>${t("baseStats")}</h3><div class="details-stats">${stats}</div></section>
    <section class="detail-section detail-columns">
      <div><h3>${t("abilities")}</h3><div class="ability-list">${abilities}</div></div>
      <div><h3>${t("physicalData")}</h3><dl class="physical-data"><div><dt>${t("height")}</dt><dd>${formatNumber(detail.heightM)} m</dd></div><div><dt>${t("weight")}</dt><dd>${formatNumber(detail.weightKg)} kg</dd></div><div><dt>${t("statTotal")}</dt><dd>${detail.stats.reduce((sum, stat) => sum + stat.value, 0)}</dd></div></dl></div>
    </section>
    <section class="detail-section"><h3>${t("evolution")}</h3><div class="evolution-list">${evolution}</div></section>`;

  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());

  dialog.querySelectorAll("[data-action]").forEach(button =>
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const set = action === "favorite" ? state.favorites : action === "caught" ? state.caught : state.shiny;
      toggleSet(set, id);
      if (action === "caught" || action === "shiny") state.seen.add(id);
      if (action === "shiny") state.caught.add(id);
      saveState();
      renderLoadedDetail(dialog, p, detail);
    })
  );

  dialog.querySelectorAll("[data-evolution]").forEach(button =>
    button.addEventListener("click", () => {
      dialog.close();
      requestAnimationFrame(() => openDetail(Number(button.dataset.evolution)));
    })
  );
}

function formatNumber(value) {
  return value.toLocaleString(state.language === "de" ? "de-DE" : "en-US");
}

function renderDetailError(dialog, p) {
  const names = displayNames(p);
  dialog.querySelector(".detail-content").innerHTML = `
    <header class="detail-head"><button class="close" data-close>×</button><span>#${String(p.id).padStart(4, "0")}</span></header>
    <section class="detail-identity"><img class="detail-art" src="${artwork(p.id)}" alt="${names.primary}"><h2>${names.primary}</h2>${names.secondary ? `<p class="detail-en">${names.secondary}</p>` : ""}</section>
    <section class="detail-section error-card"><h3>${t("detailsUnavailable")}</h3><p>${state.language === "de" ? "Bitte prüfe deine Internetverbindung. Deine Sammlung bleibt gespeichert." : "Please check your internet connection. Your collection remains saved."}</p></section>`;
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
}

function renderSettings() {
  app.innerHTML = `
    <main class="app page">
      ${pageHeader(t("settings"))}
      <section class="settings-panel">
        <label><span>${t("appLanguage")}</span><select data-language><option value="de" ${state.language === "de" ? "selected" : ""}>${t("german")}</option><option value="en" ${state.language === "en" ? "selected" : ""}>${t("english")}</option></select></label>
        <p>${t("languageExplanation")}</p>
      </section>
    </main>`;
  bindBack();
  app.querySelector("[data-count]").textContent = "";
  app.querySelector("[data-language]").addEventListener("change", event => {
    state.language = event.target.value;
    saveState();
    renderSettings();
  });
}

function renderPlaceholder(title, text) {
  app.innerHTML = `<main class="app page">${pageHeader(title)}<section class="settings-panel"><p>${text}</p></section></main>`;
  bindBack();
  app.querySelector("[data-count]").textContent = "";
}

function render() {
  const route = location.hash.slice(1);
  if (route === "pokedex") return renderPokedex(null, t("pokedex"));
  if (route === "caught") return renderPokedex("caught", t("caught"));
  if (route === "favorites") return renderPokedex("favorites", t("favorites"));
  if (route === "settings") return renderSettings();
  if (route === "routedex") return renderPlaceholder(t("routedex"), t("routedexLater"));
  renderHome();
}

async function boot() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error();
    state.pokemon = await response.json();
    render();
  } catch {
    app.innerHTML = `<main class="app page"><section class="settings-panel"><h1>NeoDex</h1><p>Pokémon data could not be loaded.</p></section></main>`;
  }
}

addEventListener("hashchange", render);
boot();
