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
 * External dependencies
 */
import { __ } from '@googleforcreators/i18n';
import { useCallback } from '@googleforcreators/react';
import { trackEvent } from '@googleforcreators/tracking';
import {
  hasGradient,
  createSolid,
  DEFAULT_GRADIENT,
} from '@googleforcreators/patterns';

/**
 * Internal dependencies
 */
import useRichTextFormatting from '../../panels/design/textStyle/useRichTextFormatting';
import updateProperties from '../../style/updateProperties';
import { useStory } from '../../../app';
import { MULTIPLE_VALUE } from '../../../constants';
import { Color, useProperties } from './shared';

function TextColor() {
  const { content } = useProperties(['content']);
  const { selectedElementIds, updateElementsById } = useStory(
    ({ state, actions }) => ({
      selectedElementIds: state.selectedElementIds,
      updateElementsById: actions.updateElementsById,
    })
  );

  const pushUpdate = useCallback(
    (update) => {
      trackEvent('floating_menu', {
        name: 'set_text_color',
        element: 'text',
      });
      updateElementsById({
        elementIds: selectedElementIds,
        properties: (element) => updateProperties(element, update, true),
      });
    },
    [updateElementsById, selectedElementIds]
  );

  const onColorChange = (color) => {
    if (hasGradient(color)) {
      handleSetColor(createSolid(0, 0, 0));
      handleSetGradientColor(color);
    } else {
      handleSetGradientColor(DEFAULT_GRADIENT);
      handleSetColor(color);
    }
  };

  const {
    textInfo: { color, gradientColor },
    handlers: { handleSetColor, handleSetGradientColor },
  } = useRichTextFormatting([{ content, type: 'text' }], pushUpdate);

  const colorInputValue =
    gradientColor === MULTIPLE_VALUE
      ? MULTIPLE_VALUE
      : hasGradient(gradientColor)
        ? gradientColor
        : color;

  return (
    <Color
      tabIndex={-1}
      label={__('Text color', 'web-stories')}
      allowsSavedColors
      value={colorInputValue}
      onChange={onColorChange}
      hasInputs={false}
      hasEyedropper
      allowsOpacity
      allowsGradient
    />
  );
}

export default TextColor;
