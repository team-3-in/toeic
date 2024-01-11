import React from "react";
import { LogoCSS } from "../../style/components/common/LogoCSS";
import { useNavigate } from "react-router";

export type LogoProps = {
  size?: string;
};

function Logo({ size }: LogoProps) {
  const navigate = useNavigate();

  return (
    <LogoCSS size={size} onClick={() => navigate("/")}>
      <img src={`${process.env.PUBLIC_URL}/img/logo.webp`} alt="logo" />
    </LogoCSS>
  );
}

export default Logo;
