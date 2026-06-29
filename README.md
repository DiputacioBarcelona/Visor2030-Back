# Visor 2030 — Backoffice

Aplicació de **backoffice** per administrar el contingut i la configuració del projecte Visor 2030.

Copyright (C) Diputació de Barcelona

- **Visor públic**: [https://visor2030.diba.cat/](https://visor2030.diba.cat/)
- **Documentació tècnica**: [https://visor2030-documentacio.diba.cat/](https://visor2030-documentacio.diba.cat/)

> El projecte sencer està format per:
> - [`Visor2030-API`](https://github.com/DiputacioBarcelona/Visor2030-API) — backend (API REST)
> - [`Visor2030-Front`](https://github.com/DiputacioBarcelona/Visor2030-Front) — visualització pública (SPA)
> - **aquest repo** — backoffice

## Tecnologia

- **Node 20+**
- **Vue 3** (Composition API)
- **Vite 5**
- **Tailwind CSS 3**

## Instal·lació ràpida

```bash
# 1. Clonar
git clone https://github.com/DiputacioBarcelona/Visor2030-Back.git
cd Visor2030-Back

# 2. Instal·lar dependències
npm install

# 3. Configurar la URL del backend i del frontend públic
cat > .env.local <<EOF
VITE_API_URL=http://localhost:8000/
VITE_FRONTEND_URL=http://localhost:5173/
EOF

# 4. Servidor de desenvolupament
npm run dev
```

L'autenticació es fa contra el backend amb JWT. Cal tenir l'API en marxa i un usuari amb permisos d'administració.

## Scripts disponibles

```bash
npm run dev      # Dev server
npm run build    # Build de producció
npm run serve    # Previsualitza el build
```

## Documentació tècnica

La documentació tècnica completa del projecte està publicada a **[https://visor2030-documentacio.diba.cat/](https://visor2030-documentacio.diba.cat/)**.

## Llicència

[AGPLv3](LICENSE)

## Crèdits

Desenvolupat per [OneTandem](https://onetandem.com) per a la [Diputació de Barcelona](https://www.diba.cat).
