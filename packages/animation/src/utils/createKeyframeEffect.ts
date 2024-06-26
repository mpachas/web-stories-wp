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

/**
 * Internal dependencies
 */
import type { Keyframes, AMPEffectTiming } from '../types';

function createKeyframeEffect(
  target: Element,
  keyframes: Keyframes,
  timings: AMPEffectTiming
) {
  // Translate AMP timings to Web API timings
  const convertedTimings: EffectTiming = {
    ...timings,
    iterations:
      timings.iterations === 'infinity'
        ? Number.POSITIVE_INFINITY
        : timings.iterations,
  };

  return new KeyframeEffect(target, keyframes, convertedTimings);
}

export default createKeyframeEffect;
