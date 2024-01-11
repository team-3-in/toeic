import styled from "styled-components";

export const AgreementCSS = styled.div`
  width: 28em;
  height: 8em;
  overflow-y: scroll;
  text-align: start;
  background: #fff;
  padding: 10px;
  font-size: 14px;
  margin: 20px 0px 5px 0px;
  border-radius: 5px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #747474;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: #7ac3ce;
  }
`;
