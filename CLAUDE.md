# CLAUDE.md

Contexto para asistentes de IA que trabajen en este repo. El procedimiento de mantenimiento (build, versiones, rebase, despliegue) está en `FORK.md`. **Léelo primero**; aquí no se repite.

## Al empezar una sesión: pide el contexto del sitio

El contexto del sitio de producción (servidor, ajustes de PHP, plugins instalados, child theme, avisos esperables en el log) **no está en este repo**, porque el repo es público. Está en la wiki privada de opusdei.org, y está previsto pasarlo a un fichero `/CLAUDE-stories.opusdei.org.md` del repo de opusdei.org.

**Antes de hacer nada que dependa del servidor o del sitio, pregunta al usuario:**

> ¿Está ya disponible `/CLAUDE-stories.opusdei.org.md` en el repo de opusdei.org, o me pegas el contenido de la página de stories.opusdei.org de la wiki de opusdei.org?

Si el fichero ya existe, sugiere sustituir esta sección por un import (`@<ruta>`) o por una referencia a él.

## Qué es esto

- Fork de [GoogleForCreators/web-stories-wp](https://github.com/GoogleForCreators/web-stories-wp) para el sitio **stories.opusdei.org**.
- El único cambio funcional son **20 formas propias, `Youth-00` … `Youth-19`**, en `packages/masks/src/constants.ts`.
- Los iconos no van en el plugin: se copian desde el **SVG Explorer**, en https://svgs.opusdei.org/svg-explorer.html. El porqué está en `FORK.md` y en el issue de documentación de formas y SVG.
- Rama de trabajo: `youth-1.42`, que es la rama por defecto. Versión desplegada: `1.42.0-youth.1`.
- En el servidor, el plugin está en la carpeta `web-stories_modificado`. Ver `BUILD_DIR` en `FORK.md`.

## Lecciones de la actualización de octubre de 2026 (1.34 → 1.42)

- **Antes de rebasar, comprueba qué hay realmente en producción.** No te fíes de los nombres de las ramas. Se rebasó primero `new-svgs`, una prueba antigua que nunca se desplegó, y se instaló un build sin las formas `Youth-XX`. Compara con el zip del servidor o con la cabecera de `web-stories.php` instalada.
- **Para saber en qué versión upstream se basa un fork**, mira:
  - la cabecera `Version:` y los `WEBSTORIES_*_VERSION`;
  - `git merge-base` frente a los tags de upstream (`git ls-remote --tags`).
- **Migraciones de base de datos:** las determina `WEBSTORIES_DB_VERSION`. Entre la 1.34 y la 1.42 no cambió (3.0.16), así que volver atrás es solo cambiar el plugin. Compruébalo en cada actualización.
- **`composer install` sin `--no-dev`:** `php-scoper` es una dependencia de desarrollo y se ejecuta en el post-install para generar `third-party/`.
- **Empaquetado:** el de upstream usa Bun, pero funciona con `npx tsx`.
- **`.distignore` decide qué entra en el zip.** Cualquier documentación interna nueva (`FORK.md`, `CLAUDE.md`…) debe añadirse ahí; si no, se publica en `wp-content/plugins/.../`.
- **Zips descargados del servidor:** algunos gestores de archivos de hosting comprimen el contenido de la carpeta, no la carpeta en sí. Para que WordPress acepte el zip, hay que volver a meter el contenido dentro de `web-stories_modificado/`.
- **Fallos de `gh`:**
  - `gh issue view` falla con un error de "Projects (classic)". Usa `gh api repos/mpachas/web-stories-wp/issues/...`.
  - `gh repo edit` también puede fallar. La rama por defecto se cambió desde la web.
- **Compatibilidad con una versión nueva de PHP:** usa PHPCompatibility en la rama `develop`, clonada de GitHub. La 9.3.5 que instala Composer no conoce PHP 8.1 o posterior. Ejemplo:
  ```
  phpcs --standard=PHPCompatibility --runtime-set testVersion 8.5 --extensions=php includes web-stories.php
  ```
  Los avisos de `str_starts_with` y `str_contains` son falsos positivos, porque WordPress trae polyfills.
- **No ejecutes `npm audit fix`:** cambia el lock y puede romper el build. Las vulnerabilidades que reporta son del toolchain de desarrollo.

## Histórico de versiones

| Tag / release | Base upstream | Contenido | Estado |
|---|---|---|---|
| `archive/new-svgs` | 1.33.0 | 8 formas `FormaXX` y 2 stickers de prueba | Nunca desplegada |
| `v1.34.0-youth-legacy` | 1.34.0 | `Youth-XX`, versión falsa 1034 | En producción de 2023 a 2026; zip adjunto a la release |
| `v1.42.0-youth.1` | 1.42.0 | `Youth-XX`, `Update URI: false` | En producción desde octubre de 2026 |

## Cómo trabajar en este repo

- Antes de un cambio grande o irreversible (push, borrar ramas o releases, desplegar), **pregunta primero**.
- **No subas a git nada generado:** `assets/`, `third-party/`, `vendor/` y `build/` están en `.gitignore`.
- **No añadas a este repo detalles del servidor ni del sitio**, porque es público. Esos detalles van en la wiki o el repo de opusdei.org.
- **Tags y releases:** cada versión desplegada lleva su tag `vX.Y.Z-youth.N` y una release con el zip adjunto.
- **Documentación:** cuando cambies algo propio del fork, actualiza `FORK.md` y este fichero.
- **Antes de desplegar, comprueba:**
  - que el build incluye las formas: `grep -l "Youth-19" assets/js/*.js`;
  - que el zip tiene la carpeta correcta: `unzip -l build/*.zip | head`;
  - que el zip no incluye documentación interna: `unzip -l build/*.zip | grep -E "FORK|CLAUDE"` no debe devolver nada.
