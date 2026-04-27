import { mkdir, writeFile } from "node:fs/promises";

const groups = {
  president: ["Lula", "Flavio Bolsonaro", "Tarcisio de Freitas", "Jair Bolsonaro", "Ronaldo Caiado"],
  "governor-sp": ["Tarcisio de Freitas", "Fernando Haddad", "Guilherme Boulos", "Kim Kataguiri", "Paulo Serra"],
  "governor-pr": ["Sergio Moro", "Requiao Filho", "Rafael Greca", "Alexandre Curi", "Guto Silva"],
};

const outDir = new URL("../data/", import.meta.url);
let cookieJar = "";

async function getText(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: cookieJar,
      referer: "https://trends.google.com/trends/explore?geo=BR&q=Lula,Flavio%20Bolsonaro",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  });
  rememberCookies(response);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} ${new URL(url).pathname} cookie=${cookieJar ? "yes" : "no"}`);
  return response.text();
}

function rememberCookies(response) {
  const getSetCookie = response.headers.getSetCookie?.() || [];
  const rawCookie = response.headers.get("set-cookie");
  const parts = rawCookie ? [rawCookie] : getSetCookie;
  if (!parts.length) return;
  const current = new Map(cookieJar.split("; ").filter(Boolean).map((item) => {
    const [name, ...rest] = item.split("=");
    return [name, rest.join("=")];
  }));
  parts.forEach((item) => {
    const cookie = item.split(";")[0];
    const [name, ...rest] = cookie.split("=");
    if (name && rest.length) current.set(name, rest.join("="));
  });
  cookieJar = [...current.entries()].map(([name, value]) => `${name}=${value}`).join("; ");
}

function parseTrendsPayload(text) {
  return JSON.parse(text.replace(/^\)\]\}',?\n?/, ""));
}

async function fetchGroup(race, terms) {
  if (process.env.SERPAPI_KEY) return fetchGroupWithSerpApi(race, terms);

  if (terms.length <= 2) return fetchTermsDirect(race, terms);

  const anchor = terms[0];
  const anchorByDate = new Map();
  const output = [];
  for (const challenger of terms.slice(1)) {
    const pairRows = await fetchTermsDirect(race, [anchor, challenger]);
    pairRows.forEach((row) => {
      if (row.candidate === anchor) {
        if (!anchorByDate.has(row.date)) anchorByDate.set(row.date, []);
        anchorByDate.get(row.date).push(row.value);
      } else {
        output.push(row);
      }
    });
  }
  anchorByDate.forEach((values, date) => {
    output.push({
      race,
      date,
      candidate: anchor,
      value: Math.round(values.reduce((sum, value) => sum + value, 0) / values.length),
    });
  });
  return output.sort((a, b) => a.date.localeCompare(b.date) || a.candidate.localeCompare(b.candidate));
}

async function fetchTermsDirect(race, terms) {
  await warmGoogleSession(terms).catch(() => {});

  const comparisonItem = terms.map((keyword) => ({ keyword, geo: "BR", time: "today 3-m" }));
  const exploreReq = encodeURIComponent(JSON.stringify({ comparisonItem, category: 0, property: "" }));
  const exploreUrl = `https://trends.google.com/trends/api/explore?hl=pt-BR&tz=180&req=${exploreReq}`;
  const explore = parseTrendsPayload(await getText(exploreUrl));
  const widget = explore.widgets.find((item) => item.id === "TIMESERIES");
  if (!widget) throw new Error(`No TIMESERIES widget for ${race}`);

  const req = encodeURIComponent(JSON.stringify(widget.request));
  const token = encodeURIComponent(widget.token);
  const dataUrl = `https://trends.google.com/trends/api/widgetdata/multiline?hl=pt-BR&tz=180&req=${req}&token=${token}`;
  const series = parseTrendsPayload(await getText(dataUrl));
  const timeline = series.default?.timelineData || [];

  return timeline.flatMap((point) => {
    const date = new Date(Number(point.time) * 1000).toISOString().slice(0, 10);
    return terms.map((candidate, index) => ({
      race,
      date,
      candidate,
      value: Number(point.value?.[index] || 0),
    }));
  });
}

async function warmGoogleSession(terms) {
  const url = `https://trends.google.com/trends/explore?geo=BR&hl=pt-BR&q=${encodeURIComponent(terms.join(","))}`;
  await getText(url);
}

async function fetchGroupWithSerpApi(race, terms) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_trends");
  url.searchParams.set("q", terms.join(","));
  url.searchParams.set("geo", "BR");
  url.searchParams.set("date", "today 3-m");
  url.searchParams.set("api_key", process.env.SERPAPI_KEY);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`SerpAPI ${response.status} ${response.statusText}`);
  const data = await response.json();
  const timeline = data.interest_over_time?.timeline_data || [];
  return timeline.flatMap((point) => {
    const date = normalizeSerpApiDate(point.date);
    const values = point.values || [];
    return values.map((item, index) => ({
      race,
      date,
      candidate: item.query || terms[index],
      value: Number(String(item.value || "0").replace(/[<>,]/g, "")) || 0,
    }));
  }).filter((row) => row.date && row.candidate);
}

function normalizeSerpApiDate(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  const match = String(value).match(/([A-Z][a-z]{2})\\s+(\\d{1,2}),\\s+(\\d{4})/);
  if (!match) return new Date().toISOString().slice(0, 10);
  return new Date(`${match[1]} ${match[2]}, ${match[3]}`).toISOString().slice(0, 10);
}

const trends = [];
const errors = [];
let source = process.env.SERPAPI_KEY ? "serpapi-google-trends" : "google-trends-direct";
for (const [race, terms] of Object.entries(groups)) {
  try {
    trends.push(...await fetchGroup(race, terms));
  } catch (error) {
    errors.push({ race, message: error.message });
    console.warn(`Google Trends failed for ${race}: ${error.message}`);
  }
}

if (!trends.length) {
  source = "google-news-rss-fallback";
  for (const [race, terms] of Object.entries(groups)) {
    trends.push(...await fetchGoogleNewsFallback(race, terms));
  }
}

await mkdir(outDir, { recursive: true });
await writeFile(new URL("google-trends.json", outDir), JSON.stringify({ checkedAt: new Date().toISOString(), source, trends, errors }, null, 2));
console.log(`Wrote ${trends.length} trend rows to data/google-trends.json (${source})`);

async function fetchGoogleNewsFallback(race, terms) {
  const rows = [];
  for (const candidate of terms) {
    const query = encodeURIComponent(`"${candidate}" eleicao OR pesquisa`);
    const url = `https://news.google.com/rss/search?q=${query}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
    try {
      const xml = await getText(url);
      const counts = countRssItemsByDate(xml);
      counts.forEach((value, date) => rows.push({ race, date, candidate, value }));
    } catch (error) {
      errors.push({ race, message: `Google News ${candidate}: ${error.message}` });
    }
  }
  return rows;
}

function countRssItemsByDate(xml) {
  const counts = new Map();
  const pubDates = [...xml.matchAll(/<pubDate>(.*?)<\/pubDate>/g)].map((match) => match[1]);
  pubDates.forEach((value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return;
    const key = date.toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  if (!counts.size) counts.set(new Date().toISOString().slice(0, 10), 0);
  return counts;
}
