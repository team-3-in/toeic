import styled from "styled-components";

export const RegisterCSS = styled.div`
  width: 100%;
  min-height: 100vh;
  text-align: center;
  background-image: url("./img/bg-img.webp");
  position: relative;
  padding: 0px 0px 30px 0px;

  & > :first-child::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      #2e66dd 0%,
      #639fc8 72.5%,
      #7ac3ce 100%
    );

    z-index: -1;
  }
`;
