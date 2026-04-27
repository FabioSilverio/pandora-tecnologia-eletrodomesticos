import { mkdir, writeFile } from "node:fs/promises";

const outDir = new URL("../data/", import.meta.url);
const query = encodeURIComponent('(pesquisa OR enquete OR Datafolha OR Quaest OR AtlasIntel OR "Parana Pesquisas" OR PoderData) (eleicao OR presidente OR governador) Brazil sourcecountry:BR');
const gdeltUrl = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=ArtList&format=json&maxrecords=100&sort=DateDesc`;

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

let feeds = [];
try {
  const gdelt = await getJson(gdeltUrl);
  feeds = (gdelt.articles || []).map((article) => ({
    title: article.title,
    url: article.url,
    source: article.domain || article.sourceCountry || "GDELT",
    date: (article.seendate || "").slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"),
  }));
} catch (error) {
  feeds = [
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
  ].map(([title, url]) => ({ title: `Busca monitorada: ${title}`, url, source: "Busca manual", date: new Date().toISOString().slice(0, 10) }));
  console.warn(`GDELT unavailable: ${error.message}`);
}

await mkdir(outDir, { recursive: true });
await writeFile(new URL("feeds.json", outDir), JSON.stringify({ checkedAt: new Date().toISOString(), feeds }, null, 2));

if (process.env.SERPAPI_KEY) {
  const terms = ["Lula", "Flavio Bolsonaro", "Tarcisio de Freitas", "Sergio Moro", "Fernando Haddad"];
  const trendsUrl = new URL("https://serpapi.com/search.json");
  trendsUrl.searchParams.set("engine", "google_trends");
  trendsUrl.searchParams.set("q", terms.join(","));
  trendsUrl.searchParams.set("geo", "BR");
  trendsUrl.searchParams.set("date", "today 3-m");
  trendsUrl.searchParams.set("api_key", process.env.SERPAPI_KEY);
  const trends = await getJson(trendsUrl);
  await writeFile(new URL("google-trends.json", outDir), JSON.stringify({ checkedAt: new Date().toISOString(), trends }, null, 2));
}

console.log(`Wrote ${feeds.length} feed items to data/feeds.json`);
