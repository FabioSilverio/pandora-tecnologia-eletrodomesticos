const raceLabels = {
  president: "Presidente",
  "governor-sp": "Governo SP",
  "governor-pr": "Governo PR",
};

const colors = {
  Lula: "#1f7a4d",
  "Flavio Bolsonaro": "#2368a2",
  "Jair Bolsonaro": "#b43b45",
  "Tarcisio de Freitas": "#b7781f",
  "Ronaldo Caiado": "#1d7f7a",
  "Romeu Zema": "#7457a7",
  "Fernando Haddad": "#b43b45",
  "Guilherme Boulos": "#8f4ca7",
  "Paulo Serra": "#60716a",
  "Kim Kataguiri": "#365f8f",
  "Felipe d'Avila": "#7a8a39",
  "Geraldo Alckmin": "#b7781f",
  "Marcio Franca": "#1d7f7a",
  "Simone Tebet": "#7457a7",
  "Capitao Derrite": "#3b4b55",
  "Gilberto Kassab": "#8c6f4f",
  "Marina Silva": "#2f8f5b",
  "Sergio Moro": "#2368a2",
  "Requiao Filho": "#b43b45",
  "Rafael Greca": "#b7781f",
  "Alexandre Curi": "#1d7f7a",
  "Guto Silva": "#7457a7",
  "Luiz Franca": "#60716a",
  "Alvaro Dias": "#8c6f4f",
  "Beto Richa": "#365f8f",
  "Enio Verri": "#8f4ca7",
  "Ratinho Jr.": "#1f7a4d",
  Indecisos: "#9aa7a1",
  Other: "#60716a",
};

const candidateLean = {
  Lula: 1,
  "Fernando Haddad": 1,
  "Guilherme Boulos": 1,
  "Requiao Filho": 1,
  "Flavio Bolsonaro": -1,
  "Jair Bolsonaro": -1,
  "Tarcisio de Freitas": -1,
  "Ronaldo Caiado": -1,
  "Romeu Zema": -1,
  "Sergio Moro": -1,
  "Ratinho Jr.": -1,
  "Rafael Greca": -0.5,
  "Alexandre Curi": -0.5,
};

const starterPolls = [
  ["president", "2026-01-11", "Quaest", "1o turno - principal", "first", "Lula", 39, 2004, 2, "https://static.poder360.com.br/2026/03/integra-pesquisas-eleitorais-2026-empresasselecionadas-jan-abr.pdf"],
  ["president", "2026-01-11", "Quaest", "1o turno - principal", "first", "Flavio Bolsonaro", 31, 2004, 2, "https://static.poder360.com.br/2026/03/integra-pesquisas-eleitorais-2026-empresasselecionadas-jan-abr.pdf"],
  ["president", "2026-01-20", "AtlasIntel", "1o turno - principal", "first", "Lula", 45, 5418, 1, "https://atlasintel.org/polls"],
  ["president", "2026-01-20", "AtlasIntel", "1o turno - principal", "first", "Flavio Bolsonaro", 40, 5418, 1, "https://atlasintel.org/polls"],
  ["president", "2026-03-05", "Datafolha", "1o turno - principal", "first", "Lula", 39, 2004, 2, "https://www.riotimesonline.com/brazil-election-poll-tracker-2026/"],
  ["president", "2026-03-05", "Datafolha", "1o turno - principal", "first", "Flavio Bolsonaro", 33, 2004, 2, "https://www.riotimesonline.com/brazil-election-poll-tracker-2026/"],
  ["president", "2026-03-05", "Datafolha", "1o turno - principal", "first", "Ronaldo Caiado", 4, 2004, 2, "https://www.riotimesonline.com/brazil-election-poll-tracker-2026/"],
  ["president", "2026-03-05", "Datafolha", "1o turno - principal", "first", "Romeu Zema", 5, 2004, 2, "https://www.riotimesonline.com/brazil-election-poll-tracker-2026/"],
  ["president", "2026-03-09", "Quaest", "1o turno - principal", "first", "Lula", 39, 2004, 2, "https://www.riotimesonline.com/brazil-election-poll-tracker-2026/"],
  ["president", "2026-03-09", "Quaest", "1o turno - principal", "first", "Flavio Bolsonaro", 32, 2004, 2, "https://www.riotimesonline.com/brazil-election-poll-tracker-2026/"],
  ["president", "2026-03-09", "Quaest", "1o turno - principal", "first", "Ronaldo Caiado", 4, 2004, 2, "https://www.riotimesonline.com/brazil-election-poll-tracker-2026/"],
  ["president", "2026-03-09", "Quaest", "1o turno - principal", "first", "Romeu Zema", 2, 2004, 2, "https://www.riotimesonline.com/brazil-election-poll-tracker-2026/"],
  ["president", "2026-03-25", "AtlasIntel", "1o turno - principal", "first", "Lula", 46, 5220, 1, "https://www.atlasintel.org/poll/brazil-national-2026-03-25"],
  ["president", "2026-03-25", "AtlasIntel", "1o turno - principal", "first", "Flavio Bolsonaro", 42, 5220, 1, "https://www.atlasintel.org/poll/brazil-national-2026-03-25"],
  ["president", "2026-03-25", "AtlasIntel", "2o turno - Lula x Tarcisio", "runoff", "Lula", 45, 5220, 1, "https://www.atlasintel.org/poll/brazil-national-2026-03-25"],
  ["president", "2026-03-25", "AtlasIntel", "2o turno - Lula x Tarcisio", "runoff", "Tarcisio de Freitas", 44, 5220, 1, "https://www.atlasintel.org/poll/brazil-national-2026-03-25"],
  ["president", "2026-04-18", "Datafolha", "2o turno - Lula x Flavio", "runoff", "Lula", 45, 2004, 2, "https://www.riotimesonline.com/lula-government-brazil-2026-guide/"],
  ["president", "2026-04-18", "Datafolha", "2o turno - Lula x Flavio", "runoff", "Flavio Bolsonaro", 46, 2004, 2, "https://www.riotimesonline.com/lula-government-brazil-2026-guide/"],
  ["governor-sp", "2025-02-23", "Quaest", "1o turno - SP", "first", "Tarcisio de Freitas", 38, 1644, 2.4, "https://noticias.uol.com.br/politica/ultimas-noticias/2025/02/27/pesquisa-quaest-intencao-de-voto-2026.htm"],
  ["governor-sp", "2025-02-23", "Quaest", "1o turno - SP", "first", "Fernando Haddad", 15, 1644, 2.4, "https://noticias.uol.com.br/politica/ultimas-noticias/2025/02/27/pesquisa-quaest-intencao-de-voto-2026.htm"],
  ["governor-sp", "2025-02-23", "Quaest", "1o turno - SP", "first", "Guilherme Boulos", 12, 1644, 2.4, "https://noticias.uol.com.br/politica/ultimas-noticias/2025/02/27/pesquisa-quaest-intencao-de-voto-2026.htm"],
  ["governor-sp", "2026-02-10", "Parana Pesquisas", "1o turno - SP", "first", "Tarcisio de Freitas", 51, 1580, 2.5, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-02-10", "Parana Pesquisas", "1o turno - SP", "first", "Fernando Haddad", 27.7, 1580, 2.5, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-02-10", "Parana Pesquisas", "1o turno - SP", "first", "Paulo Serra", 4.2, 1580, 2.5, "https://en.wikipedia.org/wiki/2026_S%C3%A3o_Paulo_general_election"],
  ["governor-sp", "2026-02-10", "Parana Pesquisas", "1o turno - SP", "first", "Kim Kataguiri", 1.6, 1580, 2.5, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-05", "Datafolha", "1o turno - SP", "first", "Tarcisio de Freitas", 44, 1608, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-05", "Datafolha", "1o turno - SP", "first", "Fernando Haddad", 31, 1608, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-05", "Datafolha", "1o turno - SP", "first", "Paulo Serra", 5, 1608, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-05", "Datafolha", "1o turno - SP", "first", "Felipe d'Avila", 3, 1608, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-07", "Real Time Big Data", "1o turno - SP", "first", "Tarcisio de Freitas", 47, 2000, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-07", "Real Time Big Data", "1o turno - SP", "first", "Fernando Haddad", 31, 2000, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-07", "Real Time Big Data", "1o turno - SP", "first", "Paulo Serra", 7, 2000, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-19", "Instituto Verita", "1o turno - SP", "first", "Tarcisio de Freitas", 41.1, 3025, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-19", "Instituto Verita", "1o turno - SP", "first", "Fernando Haddad", 27.7, 3025, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-29", "AtlasIntel", "1o turno - SP", "first", "Tarcisio de Freitas", 49.1, 2200, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-03-29", "AtlasIntel", "1o turno - SP", "first", "Fernando Haddad", 42.6, 2200, 2, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-04-14", "Parana Pesquisas", "1o turno - SP", "first", "Tarcisio de Freitas", 47.8, 1600, 2.5, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-04-14", "Parana Pesquisas", "1o turno - SP", "first", "Fernando Haddad", 33.1, 1600, 2.5, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-04-14", "Parana Pesquisas", "1o turno - SP", "first", "Paulo Serra", 4.6, 1600, 2.5, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-sp", "2026-04-14", "Parana Pesquisas", "1o turno - SP", "first", "Kim Kataguiri", 3.5, 1600, 2.5, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_em_S%C3%A3o_Paulo"],
  ["governor-pr", "2025-02-23", "Quaest", "1o turno - PR", "first", "Sergio Moro", 30, 1100, 3, "https://noticias.uol.com.br/politica/ultimas-noticias/2025/02/27/pesquisa-quaest-intencao-de-voto-2026.htm"],
  ["governor-pr", "2025-02-23", "Quaest", "1o turno - PR", "first", "Rafael Greca", 18, 1100, 3, "https://noticias.uol.com.br/politica/ultimas-noticias/2025/02/27/pesquisa-quaest-intencao-de-voto-2026.htm"],
  ["governor-pr", "2025-02-23", "Quaest", "1o turno - PR", "first", "Requiao Filho", 12, 1100, 3, "https://noticias.uol.com.br/politica/ultimas-noticias/2025/02/27/pesquisa-quaest-intencao-de-voto-2026.htm"],
  ["governor-pr", "2025-08-22", "Quaest", "Aprovacao - governo PR", "first", "Ratinho Jr.", 84, 1104, 3, "https://www.band.com.br/band-parana/noticias/pesquisa-quaest-mostra-84-de-aprovacao-ao-governo-ratinho-jr-no-parana-202508221433"],
  ["governor-pr", "2026-01-22", "Parana Pesquisas", "1o turno - PR", "first", "Sergio Moro", 41.6, 1300, 2.8, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-01-22", "Parana Pesquisas", "1o turno - PR", "first", "Requiao Filho", 19.5, 1300, 2.8, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-01-22", "Parana Pesquisas", "1o turno - PR", "first", "Alvaro Dias", 19.7, 1300, 2.8, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-03-04", "Parana Pesquisas", "1o turno - PR", "first", "Sergio Moro", 44, 1500, 2.6, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-03-04", "Parana Pesquisas", "1o turno - PR", "first", "Requiao Filho", 23.1, 1500, 2.6, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-03-04", "Parana Pesquisas", "1o turno - PR", "first", "Alexandre Curi", 11.3, 1500, 2.6, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-03-20", "Neokemp Pesquisas", "1o turno - PR", "first", "Sergio Moro", 43.3, 1008, 3.1, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-03-20", "Neokemp Pesquisas", "1o turno - PR", "first", "Requiao Filho", 17.8, 1008, 3.1, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-03-20", "Neokemp Pesquisas", "1o turno - PR", "first", "Rafael Greca", 10.1, 1008, 3.1, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-03-30", "AtlasIntel", "1o turno - PR", "first", "Sergio Moro", 51.5, 1254, 3, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-03-30", "AtlasIntel", "1o turno - PR", "first", "Requiao Filho", 28.4, 1254, 3, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-03-30", "AtlasIntel", "1o turno - PR", "first", "Rafael Greca", 8.4, 1254, 3, "https://pt.wikipedia.org/wiki/Pesquisas_eleitorais_para_a_elei%C3%A7%C3%A3o_estadual_de_2026_no_Paran%C3%A1"],
  ["governor-pr", "2026-04-12", "Parana Pesquisas", "1o turno - PR", "first", "Sergio Moro", 46.6, 1500, 2.6, "https://www.poder360.com.br/poder-eleicoes/moro-lidera-com-folga-a-disputa-ao-governo-do-pr-diz-pesquisa/"],
  ["governor-pr", "2026-04-12", "Parana Pesquisas", "1o turno - PR", "first", "Requiao Filho", 17.7, 1500, 2.6, "https://www.poder360.com.br/poder-eleicoes/moro-lidera-com-folga-a-disputa-ao-governo-do-pr-diz-pesquisa/"],
  ["governor-pr", "2026-04-12", "Parana Pesquisas", "1o turno - PR", "first", "Rafael Greca", 19.7, 1500, 2.6, "https://www.poder360.com.br/poder-eleicoes/moro-lidera-com-folga-a-disputa-ao-governo-do-pr-diz-pesquisa/"],
  ["governor-pr", "2026-04-12", "Parana Pesquisas", "2o turno - Moro x Requiao", "runoff", "Sergio Moro", 53.9, 1500, 2.6, "https://www.exame.com/brasil/parana-pesquisas-moro-lidera-disputa-pelo-governo-do-pr-com-46/"],
  ["governor-pr", "2026-04-12", "Parana Pesquisas", "2o turno - Moro x Requiao", "runoff", "Requiao Filho", 33.8, 1500, 2.6, "https://www.exame.com/brasil/parana-pesquisas-moro-lidera-disputa-pelo-governo-do-pr-com-46/"],
].map(([race, endDate, pollster, scenario, round, candidate, value, sample, margin, source], index) => ({
  id: `seed-${index}`,
  race,
  endDate,
  pollster,
  scenario,
  round,
  candidate,
  value,
  sample,
  margin,
  source,
}));

let polls = mergeStarterPolls(loadJson("brazilPollTracker.polls", starterPolls)).map((poll) => ({
  race: poll.race || "president",
  round: poll.round || "first",
  ...poll,
}));
let feeds = loadJson("brazilPollTracker.feeds", []);
let trends = loadJson("brazilPollTracker.trends", []);
let trendsStatus = localStorage.getItem("brazilPollTracker.trendsStatus") || "";
let trendsSource = localStorage.getItem("brazilPollTracker.trendsSource") || "";
let selectedRace = localStorage.getItem("brazilPollTracker.race") || "president";
let selectedPollsters = new Set();
let averageMode = false;

const scenarioSelect = document.querySelector("#scenarioSelect");
const pollsterFilters = document.querySelector("#pollsterFilters");
const rawMode = document.querySelector("#rawMode");
const averageModeButton = document.querySelector("#averageMode");
const pollTable = document.querySelector("#pollTable");
const dialog = document.querySelector("#pollDialog");
const pollForm = document.querySelector("#pollForm");
const tooltip = document.querySelector("#tooltip");

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function pollKey(poll) {
  return [poll.race || "president", poll.endDate, poll.pollster, poll.scenario, poll.round || "first", poll.candidate].join("|");
}

function mergeStarterPolls(savedPolls) {
  const seen = new Set(savedPolls.map(pollKey));
  const missing = starterPolls.filter((poll) => !seen.has(pollKey(poll)));
  return [...savedPolls, ...missing];
}

function saveState() {
  localStorage.setItem("brazilPollTracker.polls", JSON.stringify(polls));
  localStorage.setItem("brazilPollTracker.feeds", JSON.stringify(feeds));
  localStorage.setItem("brazilPollTracker.trends", JSON.stringify(trends));
  localStorage.setItem("brazilPollTracker.race", selectedRace);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function fullDate(value) {
  return new Intl.DateTimeFormat("pt-BR", { year: "numeric", month: "short", day: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function dateLabel(value) {
  return new Intl.DateTimeFormat("pt-BR", { month: "short", day: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function racePolls() {
  return polls.filter((poll) => poll.race === selectedRace);
}

function initControls(keepScenario = false) {
  const previousScenario = scenarioSelect.value;
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.race === selectedRace));
  const scenarios = unique(racePolls().map((poll) => poll.scenario));
  scenarioSelect.innerHTML = scenarios.map((scenario) => `<option value="${scenario}">${scenario}</option>`).join("");
  if (keepScenario && scenarios.includes(previousScenario)) scenarioSelect.value = previousScenario;

  const pollsters = unique(racePolls().map((poll) => poll.pollster));
  selectedPollsters = new Set([...selectedPollsters].filter((pollster) => pollsters.includes(pollster)));
  if (!selectedPollsters.size) selectedPollsters = new Set(pollsters);
  pollsterFilters.innerHTML = pollsters
    .map((pollster) => `<label><input type="checkbox" value="${pollster}" ${selectedPollsters.has(pollster) ? "checked" : ""} />${pollster}</label>`)
    .join("");

  const candidates = unique(racePolls().map((poll) => poll.candidate));
  document.querySelector("#boostCandidate").innerHTML = candidates.map((candidate) => `<option value="${candidate}">${candidate}</option>`).join("");
  const trendsUrl = `https://trends.google.com/trends/explore?date=today%203-m&geo=BR&q=${encodeURIComponent(candidates.slice(0, 5).join(","))}`;
  document.querySelector("#googleTrendsLink").href = trendsUrl;
}

function filteredPolls() {
  return racePolls()
    .filter((poll) => selectedPollsters.has(poll.pollster))
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
}

function chartRows() {
  let rows = filteredPolls().filter((poll) => poll.scenario === scenarioSelect.value);
  if (averageMode) rows = averageSeries(rows);
  return rows;
}

function averageSeries(rows) {
  const grouped = new Map();
  rows.forEach((row) => {
    const key = `${row.endDate.slice(0, 7)}|${row.candidate}|${row.scenario}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });
  return [...grouped.values()].map((items) => ({
    ...items.at(-1),
    endDate: `${items[0].endDate.slice(0, 7)}-15`,
    pollster: "Media mensal",
    value: Number((items.reduce((sum, item) => sum + Number(item.value), 0) / items.length).toFixed(1)),
  }));
}

function latestRows(rows = chartRows()) {
  const latestDate = rows.at(-1)?.endDate;
  return rows.filter((row) => row.endDate === latestDate).sort((a, b) => b.value - a.value);
}

function renderLegend(targetId, candidates) {
  document.querySelector(targetId).innerHTML = candidates
    .map((candidate) => `<span class="legend-item"><span class="legend-dot" style="background:${colors[candidate] || colors.Other}"></span>${candidate}</span>`)
    .join("");
}

function chartFrame(svg, rows, maxFloor = 55) {
  const width = svg.clientWidth || 760;
  const height = svg.clientHeight || 360;
  const padding = { top: 24, right: 54, bottom: 46, left: 42 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const dates = rows.map((row) => new Date(`${row.endDate}T12:00:00`).getTime());
  const values = rows.map((row) => Number(row.value));
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const maxValue = Math.max(maxFloor, Math.ceil(Math.max(...values) / 10) * 10);
  const x = (date) => padding.left + ((date - minDate) / Math.max(1, maxDate - minDate)) * innerWidth;
  const y = (value) => padding.top + innerHeight - (value / maxValue) * innerHeight;

  [0, 10, 20, 30, 40, 50, 60, 70, 80, 90].filter((tick) => tick <= maxValue).forEach((tick) => {
    const yPos = y(tick);
    svg.insertAdjacentHTML("beforeend", `<line class="grid-line" x1="${padding.left}" x2="${width - padding.right}" y1="${yPos}" y2="${yPos}"></line><text class="chart-label" x="${padding.left - 10}" y="${yPos + 4}" text-anchor="end">${tick}</text>`);
  });
  svg.insertAdjacentHTML("beforeend", `<line class="axis" x1="${padding.left}" x2="${width - padding.right}" y1="${height - padding.bottom}" y2="${height - padding.bottom}"></line><line class="axis" x1="${padding.left}" x2="${padding.left}" y1="${padding.top}" y2="${height - padding.bottom}"></line>`);
  unique(rows.map((row) => row.endDate)).forEach((date, index, allDates) => {
    if (index !== 0 && index !== allDates.length - 1 && index % Math.ceil(allDates.length / 4) !== 0) return;
    svg.insertAdjacentHTML("beforeend", `<text class="chart-label" x="${x(new Date(`${date}T12:00:00`).getTime())}" y="${height - 16}" text-anchor="middle">${dateLabel(date)}</text>`);
  });
  return { x, y };
}

function showTooltip(event, html) {
  tooltip.innerHTML = html;
  tooltip.style.display = "block";
  tooltip.style.left = `${Math.min(event.clientX + 14, window.innerWidth - 280)}px`;
  tooltip.style.top = `${event.clientY + 14}px`;
}

function hideTooltip() {
  tooltip.style.display = "none";
}

function drawTrend() {
  const rows = chartRows();
  const svg = document.querySelector("#trendChart");
  svg.innerHTML = "";
  if (!rows.length) {
    svg.innerHTML = `<text x="50%" y="50%" text-anchor="middle" class="chart-label">Sem dados para este filtro</text>`;
    return;
  }
  const candidates = unique(rows.map((row) => row.candidate));
  renderLegend("#trendLegend", candidates);
  const frame = chartFrame(svg, rows, selectedRace === "governor-pr" && scenarioSelect.value.includes("Aprovacao") ? 90 : 55);

  candidates.forEach((candidate) => {
    const candidateRows = rows.filter((row) => row.candidate === candidate);
    const color = colors[candidate] || colors.Other;
    const path = candidateRows.map((row, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command}${frame.x(new Date(`${row.endDate}T12:00:00`).getTime()).toFixed(2)},${frame.y(Number(row.value)).toFixed(2)}`;
    }).join(" ");
    svg.insertAdjacentHTML("beforeend", `<path class="line-path" d="${path}" stroke="${color}"></path>`);
    candidateRows.forEach((row) => {
      const cx = frame.x(new Date(`${row.endDate}T12:00:00`).getTime());
      const cy = frame.y(Number(row.value));
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("class", "point");
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", "5.2");
      circle.setAttribute("fill", color);
      circle.addEventListener("mousemove", (event) => showTooltip(event, `<strong>${row.candidate}: ${row.value}%</strong><br>${row.pollster}<br>${fullDate(row.endDate)}<br>${row.sample || "n/a"} entrevistas / +/-${row.margin || "n/a"} pp`));
      circle.addEventListener("mouseleave", hideTooltip);
      svg.appendChild(circle);
    });
  });
}

function drawBars(svgId, rows, valueKey = "value") {
  const svg = document.querySelector(svgId);
  svg.innerHTML = "";
  if (!rows.length) return;
  const width = svg.clientWidth || 520;
  const height = svg.clientHeight || 300;
  const padding = { top: 18, right: 32, bottom: 28, left: 128 };
  const barGap = 9;
  const barHeight = Math.max(18, (height - padding.top - padding.bottom - barGap * (rows.length - 1)) / rows.length);
  const maxValue = Math.max(10, Math.max(...rows.map((row) => Number(row[valueKey]))));
  rows.forEach((row, index) => {
    const y = padding.top + index * (barHeight + barGap);
    const w = ((width - padding.left - padding.right) * Number(row[valueKey])) / maxValue;
    const color = colors[row.candidate] || colors.Other;
    svg.insertAdjacentHTML("beforeend", `<text class="chart-label" x="${padding.left - 10}" y="${y + barHeight * 0.65}" text-anchor="end">${row.candidate}</text><rect x="${padding.left}" y="${y}" width="${Math.max(2, w)}" height="${barHeight}" rx="5" fill="${color}"></rect><text class="bar-label" x="${padding.left + w + 8}" y="${y + barHeight * 0.65}">${row[valueKey]}%</text>`);
  });
}

function renderSimulation() {
  const base = latestRows().map((row) => ({ candidate: row.candidate, value: Number(row.value) }));
  const swing = Number(document.querySelector("#swingSlider").value);
  const undecidedShare = Number(document.querySelector("#undecidedSlider").value) / 100;
  const boosted = document.querySelector("#boostCandidate").value;
  const boost = Number(document.querySelector("#boostSlider").value);
  const used = base.reduce((sum, row) => sum + row.value, 0);
  const undecided = Math.max(0, 100 - used);
  const leader = base[0]?.candidate;
  const simulated = base.map((row) => {
    const lean = candidateLean[row.candidate] || 0;
    let value = row.value + swing * lean * 0.55;
    if (row.candidate === leader) value += undecided * undecidedShare;
    if (row.candidate === boosted) value += boost;
    return { candidate: row.candidate, value: Number(Math.max(0, value).toFixed(1)) };
  }).sort((a, b) => b.value - a.value);
  drawBars("#simulationChart", simulated);
}

function renderInterest() {
  const raceCandidates = unique(racePolls().map((poll) => poll.candidate));
  const trendRows = trends.filter((row) => row.race === selectedRace);
  const latestTrendDate = trendRows.sort((a, b) => new Date(a.date) - new Date(b.date)).at(-1)?.date;
  const rows = latestTrendDate
    ? trendRows.filter((row) => row.date === latestTrendDate).map((row) => ({ candidate: row.candidate, value: Number(row.value) }))
    : raceCandidates.map((candidate) => ({ candidate, value: feeds.filter((feed) => (feed.title || "").toLowerCase().includes(candidate.toLowerCase())).length }));
  const normalized = rows.sort((a, b) => b.value - a.value).slice(0, 8);
  drawBars("#interestChart", normalized.length ? normalized : raceCandidates.map((candidate) => ({ candidate, value: 0 })));
  const leader = normalized[0];
  document.querySelector("#searchLeader").textContent = leader && leader.value > 0 ? `${leader.candidate} ${leader.value}` : "Aguardando dados";
  const sourceLabel = trendsSource === "google-news-rss-fallback" ? "Google News RSS fallback" : "Google Trends";
  document.querySelector("#searchMeta").textContent = latestTrendDate ? `${sourceLabel}: ${fullDate(latestTrendDate)}` : trendsStatus || "Proxy automatico: mencoes em noticias";
}

function renderMetrics() {
  const latest = latestRows();
  const top = latest[0];
  document.querySelector("#latestPollTitle").textContent = latest[0] ? `${latest[0].pollster} / ${fullDate(latest[0].endDate)}` : "-";
  document.querySelector("#latestPollMeta").textContent = latest[0] ? `${raceLabels[selectedRace]} / ${latest[0].sample || "n/a"} entrevistas` : "-";
  document.querySelector("#topCandidate").textContent = top ? `${top.candidate} ${top.value}%` : "-";
  document.querySelector("#topCandidateMeta").textContent = scenarioSelect.value || "-";
  document.querySelector("#feedCount").textContent = feeds.length;
  document.querySelector("#feedMeta").textContent = localStorage.getItem("brazilPollTracker.lastFeedCheck") || "ainda nao buscou hoje";
}

function renderFeeds() {
  const target = document.querySelector("#feedList");
  const raceTerms = {
    president: ["presidente", "Lula", "Bolsonaro", "Datafolha", "Quaest"],
    "governor-sp": ["governador", "Sao Paulo", "Tarcisio", "Haddad", "Boulos"],
    "governor-pr": ["governador", "Parana", "Moro", "Greca", "Requiao"],
  }[selectedRace];
  const rows = feeds.filter((feed) => raceTerms.some((term) => `${feed.title} ${feed.source}`.toLowerCase().includes(term.toLowerCase()))).slice(0, 18);
  target.innerHTML = rows.length
    ? rows.map((feed) => `<article class="feed-item"><a href="${feed.url}" target="_blank" rel="noreferrer">${feed.title}</a><p>${feed.source || "Fonte externa"} / ${feed.date || ""}</p></article>`).join("")
    : `<article class="feed-item"><strong>Nenhuma novidade no radar local.</strong><p>Clique em buscar ou rode o script diario para atualizar.</p></article>`;
}

function renderTable() {
  pollTable.innerHTML = filteredPolls().slice().reverse().map((poll) => `
    <tr>
      <td>${fullDate(poll.endDate)}</td>
      <td>${raceLabels[poll.race]}</td>
      <td>${poll.pollster}</td>
      <td>${poll.scenario}</td>
      <td>${poll.candidate}</td>
      <td>${poll.value}%</td>
      <td>${poll.sample || "-"}</td>
      <td>${poll.source ? `<a href="${poll.source}" target="_blank" rel="noreferrer">Abrir</a>` : "-"}</td>
    </tr>
  `).join("");
}

function render() {
  drawTrend();
  drawBars("#latestChart", latestRows());
  renderSimulation();
  renderInterest();
  renderMetrics();
  renderFeeds();
  renderTable();
}

async function refreshFeeds(force = false) {
  const today = new Date().toISOString().slice(0, 10);
  if (!force && localStorage.getItem("brazilPollTracker.lastFeedCheck") === today) return;
  const query = encodeURIComponent('(pesquisa OR enquete OR Datafolha OR Quaest OR AtlasIntel OR "Parana Pesquisas" OR PoderData) (eleicao OR presidente OR governador) Brazil sourcecountry:BR');
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=ArtList&format=json&maxrecords=60&sort=DateDesc`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    feeds = (data.articles || []).map((article) => ({
      title: article.title,
      url: article.url,
      source: article.sourceCountry || article.domain || "GDELT",
      date: (article.seendate || "").slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
    }));
    localStorage.setItem("brazilPollTracker.lastFeedCheck", today);
    saveState();
  } catch {
    feeds = fallbackFeeds();
    localStorage.setItem("brazilPollTracker.lastFeedCheck", `${today} (falhou; use scripts/update-feeds.mjs)`);
    saveState();
  }
  render();
}

async function loadGeneratedData() {
  try {
    const response = await fetch("data/feeds.json", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.feeds) && data.feeds.length) {
        feeds = data.feeds;
        localStorage.setItem("brazilPollTracker.lastFeedCheck", (data.checkedAt || "").slice(0, 10) || "arquivo local");
        saveState();
      }
    }
  } catch {
    // Static file is optional; the browser radar can still try live refresh.
  }
  try {
    const response = await fetch("data/google-trends.json", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.trends) && data.trends.length) {
        trends = data.trends;
        trendsSource = data.source || "google-trends-json";
        trendsStatus = "";
        localStorage.removeItem("brazilPollTracker.trendsStatus");
        localStorage.setItem("brazilPollTracker.trendsSource", trendsSource);
        saveState();
      } else if (Array.isArray(data.errors) && data.errors.length) {
        trendsStatus = "Google bloqueou coleta direta; use SERPAPI_KEY ou CSV";
        localStorage.setItem("brazilPollTracker.trendsStatus", trendsStatus);
      }
    }
  } catch {
    // Trends JSON is optional; CSV import still works.
  }
}

function fallbackFeeds() {
  const searches = [
    ["Datafolha presidente 2026 pesquisa", "https://www.google.com/search?q=Datafolha+presidente+2026+pesquisa"],
    ["Lula presidente 2026 pesquisa Datafolha Quaest", "https://www.google.com/search?q=Lula+presidente+2026+pesquisa+Datafolha+Quaest"],
    ["Flavio Bolsonaro presidente 2026 pesquisa", "https://www.google.com/search?q=Flavio+Bolsonaro+presidente+2026+pesquisa"],
    ["Tarcisio de Freitas presidente 2026 pesquisa", "https://www.google.com/search?q=Tarcisio+de+Freitas+presidente+2026+pesquisa"],
    ["Quaest governador Sao Paulo 2026", "https://www.google.com/search?q=Quaest+governador+Sao+Paulo+2026"],
    ["Fernando Haddad governador Sao Paulo pesquisa 2026", "https://www.google.com/search?q=Fernando+Haddad+governador+Sao+Paulo+pesquisa+2026"],
    ["Guilherme Boulos governador Sao Paulo pesquisa 2026", "https://www.google.com/search?q=Guilherme+Boulos+governador+Sao+Paulo+pesquisa+2026"],
    ["Parana Pesquisas governo Sao Paulo 2026", "https://www.google.com/search?q=Parana+Pesquisas+governo+Sao+Paulo+2026"],
    ["Quaest governador Parana 2026", "https://www.google.com/search?q=Quaest+governador+Parana+2026"],
    ["Sergio Moro governador Parana pesquisa 2026", "https://www.google.com/search?q=Sergio+Moro+governador+Parana+pesquisa+2026"],
    ["Rafael Greca governador Parana pesquisa 2026", "https://www.google.com/search?q=Rafael+Greca+governador+Parana+pesquisa+2026"],
    ["Requiao Filho governador Parana pesquisa 2026", "https://www.google.com/search?q=Requiao+Filho+governador+Parana+pesquisa+2026"],
    ["PoderData presidente 2026 pesquisa", "https://www.google.com/search?q=PoderData+presidente+2026+pesquisa"],
  ];
  return searches.map(([title, url]) => ({ title: `Busca monitorada: ${title}`, url, source: "Busca manual", date: new Date().toISOString().slice(0, 10) }));
}

function toCsv(rows) {
  const headers = ["race", "endDate", "pollster", "scenario", "round", "candidate", "value", "sample", "margin", "source"];
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers.join(","), ...rows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n");
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().split(",").map((header) => header.replaceAll('"', "").trim());
  return lines.filter(Boolean).map((line, index) => {
    const values = line.match(/("([^"]|"")*"|[^,]*)/g).filter((part) => part !== ",").map((value) => value.replace(/,$/, "").replace(/^"|"$/g, "").replaceAll('""', '"'));
    const row = Object.fromEntries(headers.map((header, i) => [header, values[i] || ""]));
    return { ...row, id: `import-${Date.now()}-${index}`, value: Number(row.value), sample: Number(row.sample) || "", margin: Number(row.margin) || "" };
  });
}

function parseTrendsCsv(text) {
  const rows = parseCsv(text);
  return rows.map((row) => ({
    race: row.race || selectedRace,
    date: row.date || row.endDate,
    candidate: row.candidate,
    value: Number(row.value),
  })).filter((row) => row.date && row.candidate && !Number.isNaN(row.value));
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    selectedRace = tab.dataset.race;
    selectedPollsters = new Set();
    initControls();
    saveState();
    render();
  });
});

pollsterFilters.addEventListener("change", (event) => {
  if (event.target.type !== "checkbox") return;
  if (event.target.checked) selectedPollsters.add(event.target.value);
  else selectedPollsters.delete(event.target.value);
  render();
});

scenarioSelect.addEventListener("change", () => render());

rawMode.addEventListener("click", () => {
  averageMode = false;
  rawMode.classList.add("active");
  averageModeButton.classList.remove("active");
  render();
});

averageModeButton.addEventListener("click", () => {
  averageMode = true;
  averageModeButton.classList.add("active");
  rawMode.classList.remove("active");
  render();
});

["#swingSlider", "#undecidedSlider", "#boostCandidate", "#boostSlider"].forEach((selector) => {
  document.querySelector(selector).addEventListener("input", renderSimulation);
});

document.querySelector("#refreshFeeds").addEventListener("click", () => refreshFeeds(true));
document.querySelector("#addRow").addEventListener("click", () => dialog.showModal());

document.querySelector("#exportCsv").addEventListener("click", () => {
  const blob = new Blob([toCsv(polls)], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "radar-eleitoral-pesquisas.csv";
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#importCsv").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;
  polls = parseCsv(await file.text());
  selectedPollsters = new Set();
  saveState();
  initControls();
  render();
});

document.querySelector("#importTrends").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;
  trends = parseTrendsCsv(await file.text());
  saveState();
  render();
});

pollForm.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const data = Object.fromEntries(new FormData(pollForm));
  polls.push({ ...data, id: `manual-${Date.now()}`, value: Number(data.value), sample: Number(data.sample) || "", margin: Number(data.margin) || "" });
  pollForm.reset();
  dialog.close();
  saveState();
  initControls(true);
  render();
});

window.addEventListener("resize", render);

initControls();
render();
loadGeneratedData().then(() => {
  render();
  refreshFeeds(false);
});

