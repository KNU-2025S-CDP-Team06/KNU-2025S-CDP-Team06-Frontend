import { HTMLAttributes } from "react";
import MokiLogosvg from "../assets/image/MokiLogo.svg";

const MokiLogo = ({ ...props }: HTMLAttributes<HTMLImageElement>) => {
  return <img {...props} src={MokiLogosvg}></img>;
};

export default MokiLogo;
