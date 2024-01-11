import styled from "styled-components";

export const RegisterFormCSS = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    color: #a10909;
    font-size: 0.8em;
    transform: translateY(-3px);
  }

  > fieldset:not(.radio-filed) {
    width: 25em;
    height: 4em;
    border-radius: 1.8em;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    border: none;
    margin: 10px auto;

    > input {
      font-size: 1em;
      width: 90%;
      height: 4rem;
      border: none;
      background-color: transparent;
      outline: none;
    }
  }

  > .radio-filed {
    font-size: 0.5em;
    display: flex;
    flex-direction: row;
    gap: 15px;
    border: none;
    margin-bottom: 15px;

    > label {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-contetnt: center;
    }
  }
`;
