import React from "react";
import { SubmitBtnCSS } from "../../style/components/common/SubmitBtnCSS";
import { SubmitBtnProps } from "../../types/SubmitBtnProps";

function SubmitBtn({ children, fontSize, bgColor, color }: SubmitBtnProps) {
  return (
    <SubmitBtnCSS
      children={children}
      bgColor={bgColor}
      fontSize={fontSize}
      color={color}
    />
  );
}

export default SubmitBtn;
