# Radar Eleitoral Brasil

Dashboard local para acompanhar pesquisas eleitorais brasileiras, cenarios de simulacao, disputas de governador em SP/PR, radar diario de novas publicacoes e um popularity tracker baseado em Google Trends importado ou mencoes em noticias.

## Rodar

```powershell
python -m http.server 4173
```

Abra `http://localhost:4173`.

## Atualizacao diaria

O site tenta atualizar o radar quando abre. Para gerar um arquivo local antes de abrir:

```powershell
node scripts/update-feeds.mjs
```

Isso escreve `data/feeds.json`. Se a API de noticias estiver indisponivel, o script salva buscas monitoradas para revisao manual.

Para Google Trends automatico:

```powershell
node scripts/update-trends.mjs
```

O script tenta primeiro o endpoint publico do Google Trends. Se o Google responder `429`, defina `SERPAPI_KEY` antes de rodar:

```powershell
$env:SERPAPI_KEY="sua-chave"
node scripts/update-trends.mjs
```

Sem chave, use o botao `CSV Trends` e importe uma planilha no formato:

Se o Google Trends bloquear coleta direta e nao houver `SERPAPI_KEY`, o script cai para Google News RSS por candidato para manter o popularity tracker funcionando. Nesse caso o grafico indica `Google News RSS fallback`.

```csv
race,date,candidate,value
president,2026-04-20,Lula,73
```

## Ledger de pesquisas

CSV de pesquisas:

```csv
race,endDate,pollster,scenario,round,candidate,value,sample,margin,source
```

Valores vindos de noticias ou paginas agregadoras devem ser conferidos na fonte original antes de virar dado oficial do grafico.
