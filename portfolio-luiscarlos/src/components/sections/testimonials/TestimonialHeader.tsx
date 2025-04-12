import React from "react";
import SectionTitle from "../../common/SectionTitle";

/**
 * Componente para o cabeçalho da seção de depoimentos
 */
const TestimonialHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <SectionTitle
        title="O que dizem sobre mim"
        subtitle="Feedback de clientes e parceiros com quem colaborei em projetos de desenvolvimento e design."
      />
    </div>
  );
};

export default TestimonialHeader;
