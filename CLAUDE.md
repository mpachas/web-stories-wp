# CLAUDE.md

Contexto para asistentes de IA que trabajen en este repo. El procedimiento de mantenimiento (build, versiones, rebase, despliegue) está en `FORK.md`. **Léelo primero**; este fichero no lo repite. Aquí va el contexto del proyecto y lo aprendido en la última actualización.

## Qué es esto

- Fork de [GoogleForCreators/web-stories-wp](https://github.com/GoogleForCreators/web-stories-wp) para el sitio **stories.opusdei.org**: un WordPress dedicado solo a crear y publicar Web Stories.
- El único cambio funcional son **20 formas propias, de `Youth-00` a `Youth-19`**, en `packages/masks/src/constants.ts`.
- Los iconos no van en el plugin: se copian desde el **SVG Explorer**, en https://svgs.opusdei.org/svg-explorer.html. El porqué está en `FORK.md` y en el issue de documentación de formas y SVG.
- Rama de trabajo: `youth-1.42`, que es la rama por defecto. Versión desplegada: `1.42.0-youth.1`.

## El sitio en producción

- WordPress 7.x con PHP **8.5**, servido por LiteSpeed.
- El plugin está en `wp-content/plugins/web-stories_modificado/`. **El nombre de la carpeta importa**: ver `BUILD_DIR` en `FORK.md`.
- Otros plugins: Wordfence, Cloudflare, Custom Fonts (fuentes propias) y FileBird Pro (carpetas de medios).
- Tema: un child theme de Twenty Twenty-One (`twentytwentyone-child`). No está en este repo. Su `functions.php`:
  - añade Plausible a las stories con el hook `web_stories_story_head`;
  - redirige a los usuarios que no son administradores al dashboard de stories tras el login, y les bloquea `profile.php`;
  - limpia la barra y el menú de administración;
  - redirige la home a opusdei.org.

  Su `404.php` redirige a `https://opusdei.org/404.html`. Se revisó para PHP 8.5 y no necesitaba cambios.
- Ajustes de PHP 8.5 en el panel del hosting:
  - `memory_limit` 1024M;
  - `upload_max_filesize` y `post_max_size` 1024M;
  - `max_input_vars` 5000;
  - `opcache.interned_strings_buffer` 16.

  **Cada versión de PHP tiene sus propios ajustes en el panel.** Al cambiar de versión, hay que comprobarlos de nuevo en WordPress, en Site Health → Info → Server.

## Ruido conocido en `debug.log` (inofensivo)

- `Deprecated` por parámetros implícitamente nullables en `third-party/.../sabberworm/php-css-parser` y `amp-toolbox`.
- `Deprecated` de `curl_close()`.
- `Notice` de `WP_Scripts::add` sobre `web-stories-editor` que depende de `web-stories-tracking`, que todavía no está registrado. Es un problema de orden del plugin oficial: `Tracking` registra el script en `admin_head`. Desde WordPress 6.9.1 sale como aviso. El editor funciona igual. No se parchea.

## Lecciones de la actualización de octubre de 2026 (1.34 → 1.42, PHP 8.0 → 8.5)

- **Antes de rebasar, comprueba qué hay realmente en producción.** No te fíes de los nombres de las ramas. Se rebasó primero `new-svgs`, que era una prueba antigua que nunca se desplegó, y se instaló un build sin las formas `Youth-XX`. Lo fiable es comparar con el zip del servidor o con la cabecera de `web-stories.php` instalada.
- **Para saber en qué versión upstream se basa un fork**, mira:
  - la cabecera `Version:` del fichero principal y los `WEBSTORIES_*_VERSION`;
  - `git merge-base` y los tags de upstream (`git ls-remote --tags`).
- **`WEBSTORIES_DB_VERSION`** determina si hay migraciones de base de datos. Entre la 1.34 y la 1.42 no cambió (3.0.16), así que volver atrás es solo cambiar el plugin. Compruébalo en cada actualización.
- **`composer install` sin `--no-dev`.** `php-scoper` es una dependencia de desarrollo y se ejecuta en el post-install para generar `third-party/`.
- El empaquetado de upstream usa Bun, pero **funciona con `npx tsx`**.
- `.distignore` controla lo que entra en el zip. **Cualquier fichero nuevo de documentación interna** (`FORK.md`, `CLAUDE.md`…) **debe añadirse ahí.** Si no, acaba publicado en `wp-content/plugins/.../`.
- El gestor de archivos del hosting comprime el **contenido** de una carpeta, no la carpeta en sí. Para que WordPress acepte un zip descargado así, hay que meterlo de nuevo dentro de `web-stories_modificado/`.
- **`gh` tiene un fallo con los issues**: `gh issue view` falla con "Projects (classic)". Usa `gh api repos/mpachas/web-stories-wp/issues/...`. Algunas operaciones de `gh repo edit` también fallan; la rama por defecto se cambió desde la web.
- Para revisar la compatibilidad con una PHP nueva, usa PHPCompatibility en su rama `develop`, clonada de GitHub. La 9.3.5 que instala Composer no conoce PHP 8.1 en adelante. Ejemplo:
  ```
  phpcs --standard=PHPCompatibility --runtime-set testVersion 8.5 --extensions=php includes web-stories.php
  ```
  Los avisos de `str_starts_with` y `str_contains` son falsos positivos, porque WordPress trae polyfills para ellas.
- **No ejecutes `npm audit fix`**: cambia el lock y puede romper el build. Las vulnerabilidades que señala `npm audit` son del toolchain de desarrollo.

## Histórico de versiones

| Tag / release | Base upstream | Contenido | Estado |
|---|---|---|---|
| `archive/new-svgs` | 1.33.0 | 8 formas `FormaXX` y 2 stickers de prueba | Nunca desplegada |
| `v1.34.0-youth-legacy` | 1.34.0 | `Youth-XX`, versión falsa 1034 | En producción de 2023 a 2026; el zip está adjunto a la release |
| `v1.42.0-youth.1` | 1.42.0 | `Youth-XX`, `Update URI: false` | En producción desde octubre de 2026 |

## Cómo trabajar en este repo

- Antes de un cambio grande o de algo irreversible (push, borrar ramas o releases, desplegar), **pregunta primero**. Mike prefiere aclarar antes de implementar.
- **No subas a git nada generado**: `assets/`, `third-party/`, `vendor/` y `build/` están en `.gitignore`.
- Cada versión desplegada lleva su tag `vX.Y.Z-youth.N` y una release en GitHub con el zip adjunto.
- Cuando cambies algo propio del fork, actualiza `FORK.md` y este fichero.
- **Antes de desplegar, comprueba:**
  - que existen las formas `Youth-XX`: `grep -l "Youth-19" assets/js/*.js`;
  - que la carpeta del zip es la correcta: `unzip -l build/*.zip | head`;
  - que la documentación interna no va dentro del zip: `unzip -l build/*.zip | grep -E "FORK|CLAUDE"` no debe devolver nada.
