/*
 * Copyright 2021 Google LLC
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

/**
 * Seek video element to a given offset.
 *
 * @param {HTMLVideoElement} video Video element.
 * @param {number} [offset=0.99] Optional. Desired offset. Defaults to roughly the first frame.
 * @return {Promise<void>}
 */
function seekVideo(video, offset = 0.99) {
  if (video.currentTime === offset) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    video.addEventListener('suspend', reject);
    video.addEventListener('error', reject);
    video.addEventListener('canplay', () => resolve(video), { once: true });

    video.currentTime = offset;
  });
}

export default seekVideo;