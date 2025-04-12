import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
  FaCircle,
  FaHistory,
  FaCode,
  FaLink,
} from "react-icons/fa";
import {
  Education,
  Experience,
  Certification,
} from "../../../types/resumeTypes";

interface ResumeItemProps {
  item: Education | Experience | Certification;
  index: number;
  activeTab: "education" | "experience" | "certifications";
  isAnimated: boolean;
}

const ResumeItem: React.FC<ResumeItemProps> = ({
  item,
  index,
  activeTab,
  isAnimated,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Determinar se o item aparece à esquerda ou à direita da timeline
  const isLeft = index % 2 === 0;

  // Determinar o ícone com base no tipo de item
  const getIcon = () => {
    switch (activeTab) {
      case "education":
        return <FaGraduationCap className="text-primary" />;
      case "experience":
        return <FaBriefcase className="text-primary" />;
      case "certifications":
        return <FaAward className="text-primary" />;
      default:
        return <FaBuilding className="text-primary" />;
    }
  };

  // Verificar se o item é uma experiência ou educação (ambos têm achievements)
  const hasAchievements =
    "achievements" in item &&
    Array.isArray(item.achievements) &&
    item.achievements.length > 0;

  // Verificar se o item tem localização
  const hasLocation = "location" in item && item.location;

  // Verificar se o item tem tecnologias
  const hasTechnologies =
    "technologies" in item &&
    Array.isArray(item.technologies) &&
    item.technologies.length > 0;

  // Função para expandir/colapsar o item
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Função para navegação até a seção do portfólio com a tecnologia específica
  const navigateToPortfolioProject = (tech: string, link: string) => {
    // Rolar para a seção do portfólio
    document.querySelector(link)?.scrollIntoView({
      behavior: "smooth",
    });

    // Adicionar parâmetro de busca (poderia ser implementado para filtrar projetos)
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("tech", tech);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`
    );
  };

  return (
    <div
      className={`timeline-item relative mb-20 w-full ${
        isLeft ? "timeline-left" : "timeline-right"
      }`}
      data-id={`${activeTab}-${item.id}`}
    >
      {/* Linha central vertical da timeline */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2 z-0"></div>

      {/* Conector horizontal */}
      <div
        className={`absolute top-8 h-0.5 bg-primary/30 z-0 ${
          isLeft
            ? "left-1/2 right-[calc(50%-2rem)]"
            : "right-1/2 left-[calc(50%-2rem)]"
        }`}
      ></div>

      {/* Bolinha do marco temporal com efeito de pulso */}
      <motion.div
        className="absolute left-1/2 top-8 w-4 h-4 bg-primary rounded-full shadow-lg z-10 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          boxShadow: isHovered
            ? "0 0 0 8px rgba(var(--color-primary-rgb), 0.2)"
            : "0 0 0 0px rgba(var(--color-primary-rgb), 0)",
        }}
        transition={{
          scale: {
            duration: 0.5,
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse",
          },
          boxShadow: { duration: 0.3 },
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-primary"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Ano/Marco temporal */}
      <div
        className={`absolute top-0 ${
          isLeft ? "right-[52%]" : "left-[52%]"
        } text-sm font-semibold text-primary mb-2 flex items-center`}
      >
        <FaHistory className="mr-1" />
        <span>{item.period.split(" ")[0]}</span>
      </div>

      {/* Card do item */}
      <motion.div
        className={`${isLeft ? "mr-[50%] pr-10" : "ml-[50%] pl-10"} pt-12`}
        initial={{ opacity: 1, y: 0, x: 0 }}
        animate={isAnimated ? { opacity: 1, y: 0, x: 0 } : { opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.8,
          delay: index * 0.1,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ visibility: "visible", display: "block", opacity: 1 }}
      >
        <motion.div
          className="bg-card-bg rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          whileHover={{
            y: -5,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.3 }}
          onClick={toggleExpand}
          style={{ cursor: "pointer" }}
        >
          {/* Indicador de borda colorida baseado no tipo */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-1.5 ${
              activeTab === "education"
                ? "bg-blue-500"
                : activeTab === "experience"
                ? "bg-primary"
                : "bg-yellow-500"
            }`}
          ></div>

          {/* Efeito de luz quando hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="pl-3">
            {/* Cabeçalho com título e ícones */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-white mb-1 flex items-center">
                  <span className="mr-2">{getIcon()}</span>
                  {item.title}
                </h3>
                <p className="text-text-light flex items-center">
                  <FaBuilding className="mr-1 text-primary/70" />
                  {item.organization}
                </p>
              </div>
              <div className="flex items-center">
                {isExpanded ? (
                  <FaChevronUp className="text-text-light/70" />
                ) : (
                  <FaChevronDown className="text-text-light/70" />
                )}
              </div>
            </div>

            {/* Detalhes como período e localização */}
            <div className="mt-3 mb-4 flex flex-wrap gap-3 text-sm text-text-light/80">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1 text-primary/70" />
                {item.period}
              </div>

              {hasLocation && (
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-primary/70" />
                  {"location" in item && item.location}
                </div>
              )}
            </div>

            {/* Exibir a descrição básica sempre */}
            <p className="text-text-light mt-2 text-sm">{item.description}</p>

            {/* Conteúdo expandido */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  {/* Lista de conquistas/responsabilidades */}
                  {hasAchievements && (
                    <div className="mt-3">
                      <h4 className="font-medium text-white mb-2">
                        {activeTab === "experience"
                          ? "Responsabilidades:"
                          : "Conquistas:"}
                      </h4>
                      <ul className="space-y-2">
                        {"achievements" in item &&
                          item.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start text-sm text-text-light"
                            >
                              <FaCheckCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {/* Lista de tecnologias usadas */}
                  {hasTechnologies && (
                    <div className="mt-4">
                      <h4 className="font-medium text-white mb-2">
                        Tecnologias:
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {"technologies" in item &&
                          item.technologies.map((tech, i) => (
                            <button
                              key={i}
                              className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full hover:bg-primary/20 transition-colors flex items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateToPortfolioProject(tech, "#portfolio");
                              }}
                            >
                              <FaCode className="mr-1" />
                              {tech}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Link para certificado ou site relacionado */}
                  {"certificateUrl" in item && item.certificateUrl && (
                    <div className="mt-4">
                      <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline mt-2 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <FaExternalLinkAlt className="mr-1" /> Ver certificado
                      </a>
                    </div>
                  )}

                  {"url" in item && item.url && (
                    <div className="mt-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline mt-2 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <FaLink className="mr-1" /> Visitar site
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResumeItem;
