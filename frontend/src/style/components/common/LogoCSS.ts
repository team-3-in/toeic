import styled from "styled-components";
import { LogoProps } from "../../../components/common/Logo";

export const LogoCSS = styled.div<LogoProps>`
  cursor: pointer;
  width: ${(props) => props.size || "8em"};
  z-index: 2;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
