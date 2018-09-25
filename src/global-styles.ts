import reset from "styled-reset";
import { injectGlobal } from "./typed-components";

// tslint:disable-next-line
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN, Arial, "メイリオ", Meiryo, sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,
  button {
    &:focus,
    &:active { 
      outline: none
    }
  }
`;
