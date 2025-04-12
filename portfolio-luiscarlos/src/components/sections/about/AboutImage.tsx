import React from "react";
import { AboutImageProps } from "../../../types/aboutTypes";

const AboutImage: React.FC<AboutImageProps> = ({ imageRef }) => {
  return (
    <div ref={imageRef} className="relative group">
      <div className="w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden border-4 border-primary shadow-xl transition-all duration-500 transform group-hover:scale-105">
        <img
          src="/assets/perfil02.JPEG"
          alt="Luis Carlos"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 border-2 border-primary rounded-lg transform rotate-3 -z-10 transition-all duration-500 group-hover:rotate-6"></div>
      <div className="absolute inset-0 border-2 border-primary/50 rounded-lg transform -rotate-3 -z-10 transition-all duration-500 group-hover:-rotate-6"></div>
    </div>
  );
};

export default AboutImage;
