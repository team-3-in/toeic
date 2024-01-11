import styled from "styled-components";

export const LoginFormCSS = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.5em;
  margin-top: 60px;

  > fieldset {
    background-color: #fff;
    border: none;
    border-radius: 1.8em;
    width: 25em;
    height: 4em;
    display: flex;
    font-size: 1.5em;
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.35));

    > label {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #7ac3ce;
      width: 20%;
      height: 4em;
      border-radius: 1.8em;
      color: #fff;
      font-weight: bold;
    }

    > input {
      border: none;
      width: 80%;
      outline: none;
      font-size: 1.5em;
      border-radius: 1.8em;
    }
  }

  > button {
    margin: 20px 0px;
  }
`;
