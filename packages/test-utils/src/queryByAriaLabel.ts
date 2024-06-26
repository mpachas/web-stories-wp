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
 * External dependencies
 */
import {
  queryAllByAttribute,
  buildQueries,
  type GetErrorFunction,
  type Matcher,
} from '@testing-library/react';

const queryAllByAriaLabel = (container: HTMLElement, id: Matcher) =>
  queryAllByAttribute('aria-label', container, id);

const getMultipleError: GetErrorFunction = (_c: Element | null, value) =>
  `Found multiple elements with the aria-label attribute of: ${value}`;
const getMissingError: GetErrorFunction = (_c: Element | null, value) =>
  `Unable to find an element with the aria-label attribute of: ${value}`;

const [
  queryByAriaLabel,
  getAllByAriaLabel,
  getByAriaLabel,
  findAllByAriaLabel,
  findByAriaLabel,
] = buildQueries(queryAllByAriaLabel, getMultipleError, getMissingError);

export {
  queryByAriaLabel,
  queryAllByAriaLabel,
  getByAriaLabel,
  getAllByAriaLabel,
  findAllByAriaLabel,
  findByAriaLabel,
};
