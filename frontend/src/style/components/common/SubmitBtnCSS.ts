import styled from "styled-components";
import { SubmitBtnProps } from "../../../types/SubmitBtnProps";

//prors로 배경 색깔, 글자 색깔, 사이즈
export const SubmitBtnCSS = styled.button<SubmitBtnProps>`
  font-size: ${(props) => props.fontSize || "2em"};
  background: ${(props) => props.bgColor || "#fff"};
  color: ${(props) => props.color || "#7AC3CE"};
  height: 4rem;
  width: 7em;
  padding: 10px;
  border-radius: 0.6em;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.35);

  &:hover {
    background-color: ${(props) => props.color || "#7AC3CE"};
    color: ${(props) => props.bgColor || "#fff"};
  }
`;
