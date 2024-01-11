import styled from "styled-components";
import { ButtonProps } from "../../../types/ButtonPtops";

export const ButtonCSS = styled.button<ButtonProps>`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  height: 4rem;
  width: 7em;
  font-weight: 500;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.35));
  font-size: ${(props) => props.textsize || "1.7em"};
  background-color: ${(props) => props.bgcolor || "#7AC3CE"};
  color: ${(props) => props.color || "#fff"};  
  
  &:hover {
    background-color: ${(props) => props.color || "#fff"};
    color: ${(props) => props.bgcolor || "#7AC3CE"};
`;
