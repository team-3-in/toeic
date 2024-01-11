import styled from "styled-components";

export const HomeCSS = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 30px 0 0 0;
  background: linear-gradient(180deg, #2e66dd 0%, #639fc8 72.5%, #7ac3ce 100%);

  > .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15em;

    > .rotate_box {
      border-radius: 6em;
      background: #fff;
      filter: blur(30px);
      width: 17em;
      height: 17em;
      position: absolute;
      z-index: 1;
    }
  }

  > .btn_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: 40px 0;

    > .line {
      width: 18em;
      height: 0px;
      border: 1px dashed #fff;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      margin: 20px 0px;
    }
  }

  .footer {
    font-size: 1.5em;
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
    transition: 0.2s;
    color: #609098;
    border-radius: 10px;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
