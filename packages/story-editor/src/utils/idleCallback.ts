/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* Source: https://github.com/behnammodi/polyfill/blob/master/window.polyfill.js */
const requestIdleCallback =
  window.requestIdleCallback ||
  ((callback: IdleRequestCallback, options: IdleRequestOptions = {}) => {
    const relaxation = 1;
    const timeout = options.timeout || relaxation;
    const start = performance.now();
    return setTimeout(() => {
      callback({
        get didTimeout() {
          return typeof options.timeout !== 'undefined'
            ? false
            : performance.now() - start - relaxation > timeout;
        },
        timeRemaining: () =>
          Math.max(0, relaxation + (performance.now() - start)),
      });
    }, relaxation);
  });

const cancelIdleCallback =
  window.cancelIdleCallback ||
  ((id: number) => {
    clearTimeout(id);
  });

export { requestIdleCallback, cancelIdleCallback };
