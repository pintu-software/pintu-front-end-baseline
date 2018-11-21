import { injectGlobal } from 'styled-components';
import ProximaNovaAltBlack from './assets/fonts/proxima-nova-alt-black-58e45abc83d1c.otf';
import ProximaNovaAltBold from './assets/fonts/proxima-nova-alt-bold-58e45a093ebf8.otf';
import ProximaNovaAltExtraBold from './assets/fonts/proxima-nova-alt-extrabold-58e45a8f64ba5.otf';
import ProximaNovaAltLight from './assets/fonts/proxima-nova-alt-light-58e45a389bffa.otf';
import ProximaNovaAltRegular from './assets/fonts/proxima-nova-alt-regular-58e45aafb7a19.otf';
import ProximaNovaAltThin from './assets/fonts/proxima-nova-alt-thin-58e45a6e6c60d.otf';
import ProximaNovaBlack from './assets/fonts/proxima-nova-black-58e45a7b49336.otf';
import ProximaNovaBold from './assets/fonts/proxima-nova-bold-58e45aa05cd72.otf';
import ProximaNovaExtraBold from './assets/fonts/proxima-nova-extrabold-58e45a547dd9b.otf';
import ProximaNovaRegular from './assets/fonts/proxima-nova-regular-58e45a47763ca.otf';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @font-face {
    font-family: ProximaNovaAltBlack;
    src: url('${ProximaNovaAltBlack}') format('opentype');
  }

  @font-face {
    font-family: ProximaNovaAltBold;
    src: url('${ProximaNovaAltBold}') format('opentype');
  }

  @font-face {
    font-family: ProximaNovaAltExtraBold;
    src: url('${ProximaNovaAltExtraBold}') format('opentype');
  }

  @font-face {
    font-family: ProximaNovaAltLight;
    src: url('${ProximaNovaAltLight}') format('opentype');
  }

  @font-face {
    font-family: ProximaNovaAltRegular;
    src: url('${ProximaNovaAltRegular}') format('opentype');
  }

  @font-face {
    font-family: ProximaNovaAltThin;
    src: url('${ProximaNovaAltThin}') format('opentype');
  }

  @font-face {
    font-family: ProximaNovaBlack;
    src: url('${ProximaNovaBlack}') format('opentype');
  }

  @font-face {
    font-family: ProximaNovaBold;
    src: url('${ProximaNovaBold}') format('opentype');
  }

  @font-face {
    font-family: ProximaNovaExtraBold;
    src: url('${ProximaNovaExtraBold}') format('opentype');
  }

  @font-face {
    font-family: ProximaNovaRegular;
    src: url('${ProximaNovaRegular}') format('opentype');
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'ProximaNovaRegular', sans-serif;
  }

  body.fontLoaded {
    font-family: 'ProximaNovaRegular', sans-serif;
  }

  #app {
    background-color: #353540;
    min-height: 100%;
    min-width: 100%;
    overflow: hidden;
  }

  p,
  label {
    font-family: 'ProximaNovaRegular', sans-serif;
    line-height: 1.5em;
    color: #ffffff;
    font-size: 16px;
  }

  h1 {
    font-family: 'ProximaNovaExtraBold', sans-serif;
    font-size: 32px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 44px;
    letter-spacing: normal;
    color: #dddddd;
    text-transform: uppercase;
  }

  h2 {
    font-family: 'ProximaNovaExtraBold', sans-serif;
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 34px;
    letter-spacing: normal;
    color: #dddddd;
    text-transform: uppercase;
  }

  input {
    font-family: 'ProximaNovaRegular', sans-serif !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    font-style: normal !important;
    font-stretch: normal !important;
    line-height: 1.5;
    letter-spacing: normal;
    color: #dddddd;
  }

  button {
    font-family: 'ProximaNovaRegular', sans-serif !important;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.38;
    letter-spacing: normal;
  }

  .tooltip-wrapper {
    background-color: #26272c !important;
    color: #fff !important;
    border-radius: 2px !important;
    padding: 8px 12px !important;
    border: 0 !important;
    font-family: 'ProximaNovaRegular', sans-serif !important;
    font-size: 14px !important;
  }
`;
