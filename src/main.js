import "./styles.css";
const app=document.querySelector("#app");
const state={seen:28,favorites:12,routePercent:12,changesChecked:143,changesTotal:211};
const nav=r=>location.hash=r;
const head=t=>`<header class="page-head"><h1>${t}</h1><button class="back" data-back>Startseite</button></header>`;
function bindBack(){app.querySelector("[data-back]")?.addEventListener("click",()=>nav(""))}
function renderHome(){
app.innerHTML=`<main class="app">
<section class="top"><div class="brand"><div class="mark">🦉</div><div><h1>NeoDex</h1><p>HeartGold Generations 2.0</p></div></div><div><button class="settings" aria-label="Einstellungen">⚙</button><div class="build">HGG 2.0<br>Build 2.0.1</div></div></section>
<section class="hero">
<h2>Willkommen zurück.</h2><p class="welcome">Schön, dass du wieder da bist.</p>
<div class="owl" aria-hidden="true"><div class="branch"></div><div class="body"></div><div class="head"><div class="ear l"></div><div class="ear r"></div><div class="brow l"></div><div class="brow r"></div><div class="eye l"></div><div class="eye r"></div><div class="beak"></div></div></div>
<div class="stats"><div class="stat"><div class="round">◉</div><div><span>Dein Fortschritt</span><strong>${state.seen} / 1.025</strong><span>gesehen</span></div></div><div class="stat"><div class="round">☆</div><div><span>Favoriten</span><strong>${state.favorites}</strong></div></div></div>
</section>
<section class="tiles">
<button class="tile" data-route="pokedex"><div class="tile-icon">⌕</div><div><h3>Pokédex</h3><p>Deutsch und Englisch durchsuchen.</p></div><div class="chev">›</div></button>
<button class="tile" data-route="routedex"><div class="tile-icon">⌖</div><div><h3>RouteDex</h3><p>Fundorte nach Route und Methode.</p></div><div class="chev">›</div></button>
<button class="tile" data-route="caught"><div class="tile-icon">◉</div><div><h3>Gefangen</h3><p>Deine gesamte Sammlung.</p></div><div class="chev">›</div></button>
<button class="tile" data-route="favorites"><div class="tile-icon">☆</div><div><h3>Favoriten</h3><p>Schneller Zugriff auf deine Favoriten.</p></div><div class="chev">›</div></button>
</section>
<section class="summary"><div class="sum"><strong>${state.seen} / 1025</strong><span>Pokédex</span><div class="bar"><i style="width:${state.seen/1025*100}%"></i></div></div><div class="sum"><strong>${state.routePercent} %</strong><span>RouteDex</span><div class="bar"><i style="width:${state.routePercent}%"></i></div></div><div class="sum"><strong>${state.changesChecked} / ${state.changesTotal}</strong><span>Änderungen</span><div class="bar"><i style="width:${state.changesChecked/state.changesTotal*100}%"></i></div></div></section>
</main>`;
app.querySelector(".settings").addEventListener("click",()=>nav("settings"));
app.querySelectorAll("[data-route]").forEach(b=>b.addEventListener("click",()=>nav(b.dataset.route)));
}
function placeholder(title,msg){app.innerHTML=`<main class="app page">${head(title)}<section class="card"><p>${msg}</p></section></main>`;bindBack()}
function renderPokedex(){app.innerHTML=`<main class="app page">${head("Pokédex")}<input class="search" type="search" placeholder="Deutsch, Englisch oder Nummer suchen …"><section class="card" style="margin-top:14px"><strong>Pokédex UI folgt als nächster Sprint.</strong><p>Die codierte Startseite ist jetzt die feste Basis.</p></section></main>`;bindBack()}
function render(){const r=location.hash.slice(1);if(r==="pokedex")return renderPokedex();if(r==="routedex")return placeholder("RouteDex","RouteDex wird im nächsten Modul ergänzt.");if(r==="caught")return placeholder("Gefangen","Deine Sammlung wird hier angezeigt.");if(r==="favorites")return placeholder("Favoriten","Deine Favoriten werden hier angezeigt.");if(r==="settings")return placeholder("Einstellungen","Sprachwahl und Noctuh-Optionen folgen.");renderHome()}
addEventListener("hashchange",render);render();
