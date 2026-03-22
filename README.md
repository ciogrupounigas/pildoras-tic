# Píldoras TIC — Grupo Unigas

Canal interno de formación tecnológica continua para los colaboradores de Grupo Unigas, distribuidora de hidrocarburos y red de estaciones de servicio en Colombia.

El sitio se despliega como HTML estático en **GitHub Pages** y se consume embebido en un **iframe** dentro de SharePoint Online y Microsoft Teams.

## Stack

- HTML5 semántico
- CSS3 con variables y BEM
- JavaScript Vanilla (sin frameworks)
- GitHub Actions para deploy automático
- GitHub Pages como hosting

## Estructura de carpetas

```
/pildoras-tic/
  .github/workflows/deploy.yml   ← GitHub Action para deploy
  css/styles.css                  ← Hoja de estilos global
  js/app.js                       ← Lógica compartida
  assets/icons/                   ← Iconos y recursos estáticos
  general/index.html              ← Novedades y accesos rápidos
  feedback/index.html             ← Formulario de sugerencias
  ia-rag/index.html               ← IA generativa y RAG
  microsoft-365/index.html        ← Tips de M365 y Copilot
  onboarding/index.html           ← Checklist de ingreso
  recursos-faq/index.html         ← FAQ y buscador
  seguridad-digital/index.html    ← Ciberseguridad
  template.html                   ← Plantilla base reutilizable
  index.html                      ← Landing page principal
  CLAUDE.md                       ← Instrucciones para el agente Claude
```

## Instalación local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/grupounigas/pildoras-tic.git
   cd pildoras-tic
   ```

2. Abrir en VS Code:
   ```bash
   code .
   ```

3. Instalar la extensión **Live Server** en VS Code.

4. Clic derecho en `index.html` > **Open with Live Server**.

5. Navegar a `http://localhost:5500` en el navegador.

## Cómo agregar una nueva sección

1. Duplicar `template.html` en una nueva carpeta:
   ```
   nueva-seccion/index.html
   ```

2. Actualizar los atributos en el HTML:
   - `<body data-section="nueva-seccion">`
   - `<title>Píldoras TIC — Nueva Sección | Grupo Unigas</title>`
   - Contenido dentro de `.ptic-content`

3. Agregar el color de acento en `css/styles.css`:
   ```css
   /* Sección: Nueva Sección */
   --accent-nueva: #hexcolor;
   --accent-nueva-light: #hexcolor;

   [data-section="nueva-seccion"] {
     --accent: var(--accent-nueva);
     --accent-light: var(--accent-nueva-light);
     --accent-glow: rgba(r, g, b, 0.4);
   }
   ```

4. Agregar el enlace en la sidebar de todos los `index.html`:
   ```html
   <li><a href="../nueva-seccion/" class="ptic-sidebar__link" data-nav="nueva-seccion">
     <span class="ptic-sidebar__icon" aria-hidden="true">EMOJI</span> Nueva Sección
   </a></li>
   ```

5. Agregar una card en `index.html` (landing page).

## Embeber en SharePoint

Insertar un webpart de tipo **Embed** con el siguiente código:

```html
<iframe
  src="https://grupounigas.github.io/pildoras-tic/general/"
  width="100%"
  height="800"
  frameborder="0"
  allowfullscreen
  style="border: none;">
</iframe>
```

Para embeber una sección específica, cambiar la ruta:
- `/general/` — Novedades
- `/seguridad-digital/` — Ciberseguridad
- `/ia-rag/` — IA y RAG
- `/microsoft-365/` — Microsoft 365
- `/onboarding/` — Onboarding
- `/recursos-faq/` — Recursos FAQ
- `/feedback/` — Feedback

## Convención de commits

Se usa [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo    | Uso                                    |
|------------|----------------------------------------|
| `feat:`    | Nueva funcionalidad                    |
| `fix:`     | Corrección de errores                  |
| `docs:`    | Cambios en documentación               |
| `style:`   | Formato, espaciado (sin cambio lógico) |
| `refactor:`| Reestructuración sin cambio funcional  |

Ejemplo:
```
feat: agregar sección de onboarding con checklist interactivo
```

## GitHub Pages y CI/CD

El deploy se ejecuta automáticamente al hacer push a la rama `main` mediante GitHub Actions (`.github/workflows/deploy.yml`).

Para configurar GitHub Pages en el repositorio:
1. Ir a **Settings > Pages**.
2. En **Source**, seleccionar **GitHub Actions**.
3. El workflow se encarga del deploy sin necesidad de build step.

## Uso del agente Claude en VS Code

Este proyecto incluye un archivo `CLAUDE.md` en la raíz que el agente Claude lee automáticamente al iniciar cada sesión. Contiene:

- Rol y contexto del proyecto
- Estructura esperada de archivos
- Sistema de diseño CSS con variables
- Patrón modular de JavaScript
- Checklist de calidad

Para usar Claude como copiloto:
1. Abrir el proyecto en VS Code con la extensión Claude.
2. Claude leerá `CLAUDE.md` automáticamente.
3. Pedir tareas específicas: "Crea la sección de onboarding basándote en template.html".
4. Hacer un commit por archivo generado o modificado.

## Licencia

Uso interno de Grupo Unigas. Todos los derechos reservados.
