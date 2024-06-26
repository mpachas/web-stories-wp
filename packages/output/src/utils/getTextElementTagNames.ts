/*
 * Copyright 2022 Google LLC
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
 * External dependencies
 */
import { elementIs, type Element } from '@googleforcreators/elements';

const MINIMUM_CONTENT_LENGTH = 3;

/**
 * Returns a map of tag names for text elements.
 *
 * Uses a very simple algorithm to set tag name (h1, h2, h3, p)
 * based on font size.
 *
 * @param elements List of text elements
 * @return Map of element IDs to tag name.
 */
function getTextElementTagNames(elements: Element[]) {
  return elements
    .filter(elementIs.text)
    .sort((a, b) => a.y - b.y)
    .reduce(
      /**
       * Reducer.
       *
       * @param tagNamesMap Tag names map.
       * @param element Text element.
       * @param element.id Element ID
       * @param element.fontSize Font size.
       * @param element.content Text content.
       * @param element.tagName Existing tagName
       * @return Tag names map.
       */
      (tagNamesMap, { id, fontSize, content, tagName }) => {
        // if a tag already exists,
        // utilize the one already part of the element
        if (tagName && tagName !== 'auto') {
          tagNamesMap.set(id, tagName);
          return tagNamesMap;
        }

        if (content.length <= MINIMUM_CONTENT_LENGTH) {
          tagNamesMap.set(id, 'p');
          return tagNamesMap;
        }

        const hasH1 = Array.from(tagNamesMap.values()).includes('h1');

        if (fontSize >= 36 && !hasH1) {
          tagNamesMap.set(id, 'h1');
          return tagNamesMap;
        }

        if (fontSize >= 27) {
          tagNamesMap.set(id, 'h2');
        } else if (fontSize >= 21) {
          tagNamesMap.set(id, 'h3');
        } else {
          tagNamesMap.set(id, 'p');
        }

        return tagNamesMap;
      },
      new Map<string, 'h1' | 'h2' | 'h3' | 'p'>()
    );
}

export default getTextElementTagNames;
