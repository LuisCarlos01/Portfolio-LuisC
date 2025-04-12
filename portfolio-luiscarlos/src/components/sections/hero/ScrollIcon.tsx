import React from "react";
import { BsArrowDown } from "react-icons/bs";
import { ScrollIconProps } from "../../../types/heroTypes";

/**
 * Componente para o ícone de scroll na parte inferior da seção Hero
 */
const ScrollIcon: React.FC<ScrollIconProps> = ({ scrollIconRef, onClick }) => {
  return (
    <div
      ref={scrollIconRef}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
      onClick={onClick}
    >
      <BsArrowDown className="text-primary text-3xl" />
    </div>
  );
};

export default React.memo(ScrollIcon);
