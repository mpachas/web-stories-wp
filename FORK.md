# Fork de Web Stories (youth)

Este repo es un fork de [GoogleForCreators/web-stories-wp](https://github.com/GoogleForCreators/web-stories-wp) con formas propias para el editor. La rama de trabajo es `youth-1.42`, basada en el tag upstream `v1.42.0`.

## Qué cambia respecto a upstream

1. **Formas `Youth-00` … `Youth-19`.** Se añaden al final de `MASKS` en `packages/masks/src/constants.ts`.
2. **Carpeta del plugin.** En `packages/commander/src/index.ts` está `BUILD_DIR = 'build/web-stories_modificado'`. En el servidor el plugin vive en `wp-content/plugins/web-stories_modificado/`, y WordPress identifica cada plugin por su carpeta. Si el zip trajera `web-stories/`, WordPress lo instalaría como un plugin aparte; con los dos activos se produce un error fatal. **No cambiar este nombre** salvo que se migre también el servidor.
3. **`Update URI: false`** en la cabecera de `web-stories.php`. Con esto WordPress no busca actualizaciones en wordpress.org y nadie puede sobrescribir el plugin sin querer. Sustituye al truco antiguo de poner una versión falsa ("1034").
4. **Versión `X.Y.Z-youth.N`** en la cabecera y en `WEBSTORIES_VERSION`.
5. `README.md` incluye notas antiguas de instalación del entorno. Están desfasadas; la referencia buena es este documento.

## Formas y stickers: por qué así

- Web Stories no tiene hooks ni filtros para añadir formas o stickers. Tampoco funcionó subir SVG con el experimento de SVG del plugin. La única vía es este fork.
- **Formas.** Son máscaras rellenas: el editor permite cambiarles el color o usarlas para recortar imágenes. Sirven para manchas y siluetas, pero no para iconos de contorno, que saldrían como una silueta maciza.
- **Stickers.** Son SVG con los colores fijados en el código. Para ofrecer varios colores habría que duplicar cada icono por color.
- **Decisión.** En el plugin van solo las formas. Los iconos de contorno se copian desde el selector [SVG Explorer](https://svgs.opusdei.org/svg-explorer.html), que permite elegir el color.
- **La rama `new-svgs`** (julio de 2023) fue una primera prueba que nunca llegó a producción. Tenía 8 formas `FormaXX`, varias de ellas idénticas a `Youth-XX`, y dos stickers. Se conserva archivada con el tag `archive/new-svgs`.

## Regla de versiones

Formato: `<versión upstream>-youth.<N>`. Por ejemplo, `1.42.0-youth.1`.

- Si se rebasa sobre una nueva versión de upstream, la base cambia y `N` vuelve a 1.
- Si se cambia algo propio sin rebasar, se incrementa `N`.

Para fijar la versión (actualiza la cabecera `Version:` y la constante `WEBSTORIES_VERSION`):

```
npx tsx packages/commander/src/index.ts version 1.42.0-youth.1
```

Cada versión desplegada lleva su tag `vX.Y.Z-youth.N` y una release en GitHub con el zip adjunto.

## Requisitos locales

- PHP 7.4 o superior con la extensión DOM. En Debian/Ubuntu: `sudo apt install php8.3-xml`, ajustando el número de versión.
- Composer.
- Node 22 o superior y npm 10 o superior. Ver `.nvmrc`; `nvm use` sirve.
- `gh`, para las releases. Si da error de "Projects (classic)", usar `gh api`.

## Build y empaquetado

```
composer install          # SIN --no-dev: php-scoper es dev y genera third-party/
npm ci
npm run build             # compila el JS del editor (aquí entran las formas)
npx tsx packages/commander/src/index.ts build-plugin --zip --clean
```

El zip queda en `build/web-stories-<versión>.zip` y contiene la carpeta `web-stories_modificado/`. Para comprobarlo:

- Estructura del zip: `unzip -l build/*.zip | head`
- Formas incluidas en el build: `grep -l "Youth-19" assets/js/*.js`

Notas:

- El empaquetado de upstream (`npm run workflow:build-plugin`) usa `#!/usr/bin/env bun`. No usa APIs de Bun, así que lo ejecutamos con `npx tsx`. La alternativa es instalar Bun.
- Las dependencias de desarrollo no acaban en el zip.
- No se sube a git nada generado: `assets/`, `third-party/`, `vendor/` y `build/` están en `.gitignore`.
- Se pueden ignorar estos avisos:
  - Browserslist desactualizado.
  - Tamaño de assets.
  - `npm audit`, que solo afecta al toolchain de desarrollo. **No** ejecutar `npm audit fix`.

## Actualizar a una nueva versión de upstream

```
git fetch https://github.com/GoogleForCreators/web-stories-wp tag vX.Y.Z
git checkout -b youth-X.Y vX.Y.Z
git cherry-pick <commit "Shapes, new folder..."> <commit "Update URI...">
```

El único conflicto esperable está en las líneas de versión de `web-stories.php`: quédate con la de upstream y después fija `X.Y.Z-youth.1`.

Después de rebasar:

1. Comprueba que el formato de `MASKS` no ha cambiado (`packages/masks/src/types.ts`).
2. Compara `WEBSTORIES_DB_VERSION` con la versión desplegada. Si cambia, hay migraciones de base de datos y volver atrás exige restaurar la base de datos.
3. Haz el build y el empaquetado.
4. Antes de desplegar, abre en el editor una story que use formas `Youth-XX`.

## Despliegue

1. Haz copia de seguridad de la base de datos y de `wp-content`.
2. Plugins → Añadir nuevo → Subir y elige "Reemplazar la actual con la subida".
   - Si WordPress no ofrece reemplazar, el zip trae otra carpeta: no continúes.
   - Si avisa de que la instalada es "más nueva", da igual.
3. **Nunca borres el plugin con el botón "Borrar" de WordPress.** Ejecuta `uninstall.php`, que puede eliminar stories y ajustes.
4. Comprueba:
   - En el editor, Insert → Shapes muestra las 20 `Youth-XX`.
   - Las stories que usan esas formas se abren y se guardan bien.
   - El front se ve correctamente.
   - `wp-content/debug.log` no muestra errores nuevos.

## Historial

- **Septiembre de 2023.** En producción se instala `release/1034.0`: upstream 1.34.0 más las formas `Youth-XX`, con la versión falsa 1034. Está archivada en la release `v1.34.0-youth-legacy`, con el zip tal como estaba en el servidor.
- **Octubre de 2026.** Se rebasa sobre v1.42.0 para la migración a PHP 8.5 y se publica `1.42.0-youth.1`. `WEBSTORIES_DB_VERSION` es la misma (3.0.16), así que no hay migraciones de base de datos entre ambas.
- Con PHP 8.5 solo quedan avisos `E_DEPRECATED` en dependencias empaquetadas, inofensivos:
  - `curl_close()`.
  - Parámetros implícitamente nullables en `amp-toolbox` y `php-css-parser`.
