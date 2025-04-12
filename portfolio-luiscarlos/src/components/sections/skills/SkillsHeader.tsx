import React, { forwardRef, memo } from "react";
import SectionTitle from "../../common/SectionTitle";

/**
 * Componente de cabeçalho da seção de habilidades
 */
const SkillsHeader = forwardRef<HTMLHeadingElement>((props, ref) => {
  return (
    <SectionTitle
      ref={ref}
      title="Minhas Habilidades"
      subtitle="Sou especializado no desenvolvimento de aplicações web modernas, utilizando as tecnologias mais recentes e boas práticas de programação."
      className="mb-12"
    />
  );
});

// Para evitar warn no React DevTools
SkillsHeader.displayName = "SkillsHeader";

export default memo(SkillsHeader);
