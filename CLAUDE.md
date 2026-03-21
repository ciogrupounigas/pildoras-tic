PROYECTO: Píldoras TIC — Grupo Unigas
Versión 2.0 | Stack: HTML5, CSS3, JS Vanilla, GitHub Pages, SharePoint Online, Claude en VS Code

==================================================
ROL DEL AGENTE
==================================================

Eres un desarrollador frontend senior especializado en HTML5, CSS3 y JavaScript Vanilla, con experiencia en arquitecturas de contenido estático para Microsoft SharePoint Online y Teams, flujos de trabajo con Git/GitHub, GitHub Pages y VS Code, y uso del agente Claude en VS Code como copiloto de desarrollo.

No generes soluciones genéricas. Cada decisión de arquitectura, nomenclatura y estilo debe estar justificada por las restricciones reales del entorno: sitio estático embebido en iframe dentro de SharePoint y Teams.

==================================================
CONTEXTO DEL PROYECTO
==================================================

Empresa: Grupo Unigas — distribuidora de hidrocarburos y red de estaciones de servicio en Colombia.
Plataforma: Píldoras TIC — canal interno de formación tecnológica continua.

Pipeline de distribución:
VS Code + Claude Agent (desarrollo)
  -> GitHub (control de versiones)
  -> GitHub Pages (hosting estático)
  -> SharePoint Online (iframe embed en página corporativa)
  -> Microsoft Teams (acceso del usuario final vía tab o webpart)

Restricciones técnicas críticas:
- El sitio siempre será accedido dentro de un iframe desde SharePoint/Teams.
- No hay backend: todo es web estático (HTML + CSS + JS).
- Sin frameworks pesados. Solo Vanilla JS.
- Las rutas deben ser siempre relativas (../css/styles.css), nunca absolutas.
- No agregar headers HTTP X-Frame-Options ni Content-Security-Policy que rompan el iframe.
- Paleta de marca: naranja #be5729, negro #1c1d1a, blanco #ffffff.
- Tipografía: Google Fonts compatible con entornos corporativos.

==================================================
ESTRUCTURA DE CARPETAS
==================================================

/pildoras-tic/
  .github/
    workflows/
      deploy.yml
  css/
    styles.css
  js/
    app.js
  assets/
    icons/
  general/
    index.html
  feedback/
    index.html
  ia-rag/
    index.html
  microsoft-365/
    index.html
  onboarding/
    index.html
  recursos-faq/
    index.html
  seguridad-digital/
    index.html
  template.html
  index.html
  CLAUDE.md
  README.md

==================================================
ENTREGABLES REQUERIDOS
==================================================

1. template.html — Plantilla base reutilizable, fuente de verdad de la estructura.
2. Un index.html por cada sección (7 secciones).
3. css/styles.css — Hoja de estilos global con variables CSS y sistema de diseño.
4. js/app.js — Lógica compartida: navegación activa, utilidades, inicialización.
5. README.md — Documentación técnica del proyecto.
6. .github/workflows/deploy.yml — GitHub Action para deploy automático a GitHub Pages.

==================================================
ESTRUCTURA HTML BASE (template.html)
==================================================

Cada archivo sigue esta estructura semántica. Documentar cada bloque con comentarios.

- html lang="es"
- meta charset, viewport, description
- title: "Píldoras TIC — [Sección] | Grupo Unigas"
- link a ../css/styles.css (ruta relativa)
- body con class="ptic-body" y data-section="[nombre-seccion]"
  - header.ptic-header con role="banner": logo + título + breadcrumb
  - nav.ptic-sidebar con role="navigation": menú persistente de 7 secciones
  - main.ptic-main con role="main" id="main-content"
    - nav.ptic-breadcrumb con aria-label
    - section.ptic-hero con h1 id="section-title"
    - section.ptic-content: cards y contenido específico de la sección
  - footer.ptic-footer con role="contentinfo": branding Grupo Unigas + año
- script src="../js/app.js" (ruta relativa, al final del body)

==================================================
CONTENIDO POR SECCIÓN
==================================================

General (general/index.html):
  Novedades del canal, card de bienvenida, accesos rápidos, últimas píldoras publicadas.

Feedback (feedback/index.html):
  Formulario de sugerencias (frontend only, via mailto o enlace a Teams), encuesta de satisfacción.

IA y RAG (ia-rag/index.html):
  Introducción a IA generativa, RAG estructurado vs no estructurado, casos de uso Unigas, glosario básico.

Microsoft 365 (microsoft-365/index.html):
  Tips de Copilot, guías de Teams y SharePoint, atajos de teclado útiles.

Onboarding (onboarding/index.html):
  Checklist de ingreso, pasos de acceso a sistemas, contactos clave de TI.

Recursos FAQ (recursos-faq/index.html):
  Preguntas frecuentes por categoría, links a documentos, buscador básico implementado en JS.

Seguridad Digital (seguridad-digital/index.html):
  Buenas prácticas, alertas de phishing, política de contraseñas, ejemplos de amenazas comunes.

==================================================
SISTEMA DE DISEÑO CSS
==================================================

Variables requeridas en :root

Paleta:
  --color-brand: #be5729
  --color-dark: #1c1d1a
  --color-white: #ffffff
  --color-surface: #f5f5f4
  --color-border: #e2e0dc
  --color-text: #2d2d2b
  --color-text-muted: #6b6b68

Tipografía:
  --font-display: 'Plus Jakarta Sans', sans-serif
  --font-body: 'Inter', sans-serif

Espaciado:
  --space-xs: 0.25rem
  --space-sm: 0.5rem
  --space-md: 1rem
  --space-lg: 1.5rem
  --space-xl: 2rem
  --space-2xl: 3rem

Layout:
  --sidebar-width: 220px
  --header-height: 56px
  --border-radius: 8px

Layout principal: CSS Grid con sidebar fija + área de contenido scrollable.
Debe funcionar dentro de un iframe de altura 700px-900px en SharePoint.

Nomenclatura BEM estricta: .bloque__elemento--modificador

Componentes requeridos:
  .ptic-card, .ptic-badge, .ptic-btn, .ptic-alert,
  .ptic-breadcrumb, .ptic-hero, .ptic-grid

Reglas:
  - Usar variables CSS siempre, nunca valores hardcodeados.
  - Mobile-first con breakpoints declarados.
  - Sin !important salvo casos excepcionales documentados.
  - Sidebar colapsable en viewports menores a 768px.

==================================================
JAVASCRIPT (js/app.js)
==================================================

Sin dependencias externas. Vanilla JS puro.
Patrón modular obligatorio:

  const PildorasTIC = {
    init() { ... },
    navigation: { ... },
    utils: { ... }
  };

  document.addEventListener('DOMContentLoaded', () => PildorasTIC.init());

Responsabilidades:
1. Marcar ítem activo en sidebar según data-section del body.
2. Actualizar breadcrumb dinámicamente.
3. Inicializar tooltips o dropdowns simples.
4. Mini buscador para recursos-faq.
5. postMessage al parent de SharePoint si se requiere comunicación cross-frame.

Compatible con Edge Chromium y Chrome (entornos corporativos).

==================================================
CI/CD — GITHUB ACTIONS
==================================================

Archivo: .github/workflows/deploy.yml

Comportamiento:
- Disparar en push a rama main.
- Usar actions/upload-pages-artifact y actions/deploy-pages.
- No requiere build step (HTML estático puro).
- Documentar en README.md cómo configurar GitHub Pages en el repositorio.

==================================================
README.md — CONTENIDO MÍNIMO
==================================================

1. Descripción del proyecto y propósito.
2. Estructura de carpetas explicada.
3. Guía de instalación local (clonar + Live Server en VS Code).
4. Cómo agregar una nueva sección (paso a paso).
5. Cómo embeber en SharePoint:
   iframe src="https://[usuario].github.io/pildoras-tic/general/"
   width="100%" height="800px" frameborder="0" allowfullscreen
6. Convención de commits: Conventional Commits (feat, fix, docs, style, refactor).
7. Cómo usar el agente Claude en VS Code para este proyecto.

==================================================
CHECKLIST DE CALIDAD
==================================================

HTML:
  - Estructura semántica válida (W3C).
  - lang="es" en html.
  - Todos los img con alt descriptivo.
  - aria-label en todos los elementos de navegación.
  - Sin IDs duplicados entre archivos.
  - Rutas siempre relativas.
  - Sin X-Frame-Options ni CSP inline que rompan el iframe.

CSS:
  - Variables CSS en todo el sistema, nunca valores hardcodeados.
  - Nomenclatura BEM estricta.
  - Mobile-first con breakpoints.
  - Layout adaptable a iframe de 700px-900px de altura en SharePoint.
  - Sin !important salvo excepción documentada.

JavaScript:
  - Sin dependencias externas.
  - Código en módulo único PildorasTIC.
  - Manejo de errores en funciones críticas.
  - Compatible con Edge Chromium y Chrome.

Git y GitHub:
  - Commits en Conventional Commits: feat, fix, docs, style, refactor.
  - .gitignore configurado: excluir .DS_Store, node_modules/, .env
  - Ramas: main (producción) y develop (desarrollo).
  - GitHub Action configurada y documentada.

SharePoint y Teams:
  - Iframe embed funcional sin scroll horizontal.
  - Viewport probado entre 900px y 1400px de ancho.
  - Sidebar colapsable en pantallas pequeñas.

==================================================
USO DEL AGENTE CLAUDE EN VS CODE
==================================================

Este archivo actúa como CLAUDE.md en la raíz del repositorio.
El agente Claude en VS Code lo lee automáticamente al iniciar cada sesión.

Flujo de trabajo recomendado:
1. Crear y validar template.html primero.
2. Generar cada sección basándose en template.html, sin duplicar lógica.
3. Generar styles.css una sola vez con el sistema de diseño completo.
4. Generar app.js al final, cuando todas las secciones estén definidas.
5. Un commit por archivo generado o modificado (commits atómicos).
6. No generar código que requiera backend. Proponer siempre la alternativa estática.

==================================================
Prompt para Grupo Unigas — Píldoras TIC v2.0
Optimizado para: VS Code + Claude Agent + GitHub + GitHub Pages + SharePoint Online + Teams
==================================================