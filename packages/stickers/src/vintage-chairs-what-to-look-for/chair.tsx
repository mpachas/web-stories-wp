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
import { _x } from '@googleforcreators/i18n';

/**
 * Internal dependencies
 */
import type { StickerProps, Sticker } from '../types';

const title = _x('Chair', 'sticker name', 'web-stories');

function ChairIcon({ style }: StickerProps) {
  return (
    <svg
      style={style}
      viewBox="0 0 36 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.9143 43.0641H25.1581L22.0724 33.0725C22.5213 33.0508 22.9617 33.0237 23.3943 32.9889L25.9143 43.0641ZM19.6404 32.3591C19.1079 32.3591 18.5646 32.3513 17.9888 32.3343C17.4347 32.3513 16.8929 32.3591 16.3596 32.3591C8.29283 32.3591 3.45181 30.5736 2.23207 28.802C1.8838 28.2958 1.81182 27.792 2.01382 27.265C2.03704 27.203 2.068 27.121 2.10128 27.0243C5.62737 26.4059 11.5372 26.0375 17.9996 26.0375C24.4621 26.0375 30.3719 26.4059 33.898 27.0243C33.932 27.121 33.9622 27.203 33.9862 27.265C34.1874 27.792 34.1162 28.2958 33.7672 28.8036C32.5482 30.5736 27.7072 32.3591 19.6404 32.3591ZM10.8412 43.0645H10.0851L12.6058 32.9908C13.0377 33.0241 13.4788 33.0512 13.9262 33.0729L10.8412 43.0645ZM1.74812 53.1259H0.991976L6.29736 31.919C6.87705 32.0885 7.49698 32.2425 8.15483 32.3787L1.74812 53.1259ZM8.55312 7.41483C8.63129 7.14317 8.70636 6.87074 8.77989 6.60141C9.55847 3.76723 10.231 1.32002 14.4691 0.840947C14.8213 0.799928 16.0008 0.774388 17.4736 0.774388C19.66 0.774388 21.5283 0.828564 22.0166 0.907506C25.8214 1.51196 26.4699 3.87016 27.2206 6.60064C27.2942 6.87074 27.3692 7.14162 27.4513 7.42721C27.6641 8.08429 32.1592 21.9518 33.608 26.1907C30.0007 25.6087 24.2503 25.2643 17.9999 25.2643C11.7503 25.2643 5.9991 25.6087 2.39253 26.1907C3.84057 21.951 8.33719 8.08351 8.55312 7.41483ZM35.0096 53.1259H34.2535L27.8476 32.3787C28.5046 32.2425 29.1246 32.0885 29.7042 31.919L35.0096 53.1259ZM33.6805 53.8998H36L30.4423 31.6884C32.3462 31.0452 33.7339 30.2155 34.4049 29.2419C34.8948 28.5299 35.0001 27.7521 34.7091 26.9882C34.0257 25.1973 28.2451 7.36795 28.1909 7.2C28.1135 6.93067 28.04 6.66211 27.9665 6.39587C27.2134 3.65843 26.4348 0.827346 22.1387 0.142406C21.4816 0.0379232 19.2147 0 17.4733 0C16.2799 0 14.8419 0.0185747 14.3822 0.0712028C9.62322 0.610642 8.81522 3.55085 8.03354 6.39587C7.96079 6.66211 7.88726 6.93067 7.81296 7.18762C7.75492 7.36795 1.97433 25.1973 1.29094 26.9882C0.999936 27.7505 1.10519 28.5299 1.5951 29.2419C2.26611 30.2155 3.65379 31.0452 5.55692 31.6884L0 53.8998H2.31951L8.91738 32.5296C9.82677 32.6929 10.8035 32.8214 11.8259 32.9197L9.09384 43.8385H11.4134L14.7266 33.1047C15.2622 33.1225 15.8055 33.1333 16.3596 33.1333C16.8998 33.1333 17.4501 33.1256 17.9888 33.1085C18.5499 33.1256 19.1002 33.1333 19.6404 33.1333C20.1953 33.1333 20.7371 33.1225 21.2734 33.1047L24.5866 43.8385H26.9062L24.1749 32.9197C25.1973 32.8214 26.174 32.6929 27.0834 32.5296L33.6805 53.8998Z"
        fill="#313831"
      />
    </svg>
  );
}

export default {
  aspectRatio: 36 / 54,
  svg: ChairIcon,
  title,
} as Sticker;