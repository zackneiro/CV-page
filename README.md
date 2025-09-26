
# CV-sivusto — Vercel-starter

Tämä on valmis staattinen aloituspohja CV-sivustolle. Se on suunniteltu julkaistavaksi **Vercelissä**.

## Rakenne
- `/` Etusivu
- `/cv/` CV
- `/projektit/` Projektit
- `/yhteystiedot/` Yhteys
- `/kokemus/` Case-tarinat (valinnainen)
- `assets/` tyylit, skriptit, kuvat
- `sitemap.xml`, `robots.txt`

## Nopein käyttöönotto Vercelissä
1. Vie tämä kansio GitHubiin (uusi repo).
2. Vercel → Add New → Project → Import 2025-09-26.
3. Build settings: **Framework: Other** (tai auto), Output: **Root**.
4. Deploy → saat `*.vercel.app`-osoitteen.
5. (Val.) Domains → lisää oma domain (CNAME → `cname.vercel-dns.com`).

## Muokkaa nämä
- Sivujen otsikot ja tekstit (H1, ingressi, bulletit)
- Linkit GitHub/LinkedIn
- Kuvat `assets/images/` (korvaa placeholderit)
- Lisää oma `cv.pdf` juureen (tai poista linkki CV-sivulta)
