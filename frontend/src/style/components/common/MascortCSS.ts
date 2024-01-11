import styled from "styled-components";
import { MascortProps } from "../../../components/common/Mascort";

export const MascortCSS = styled.div<MascortProps>`
  width: ${(props) => props.size || "5em"};
  height: 8em;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
