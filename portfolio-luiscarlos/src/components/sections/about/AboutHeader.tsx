import React from "react";
import { AboutHeaderProps } from "../../../types/aboutTypes";

const AboutHeader: React.FC<AboutHeaderProps> = ({ titleRef }) => {
  return (
    <h2
      ref={titleRef}
      className="text-4xl font-bold text-center mb-16 text-text-light relative"
    >
      Sobre <span className="text-primary">Mim</span>
      <div className="absolute w-20 h-1 bg-primary left-1/2 -translate-x-1/2 bottom-0 mt-4"></div>
    </h2>
  );
};

export default AboutHeader;
