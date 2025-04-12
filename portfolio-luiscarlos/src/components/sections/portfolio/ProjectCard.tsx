import React from "react";
import { FaSearch, FaGithub, FaLink, FaArrowRight } from "react-icons/fa";
import { useRef, useState } from "react";
import ImageWithFallback from "../../common/ImageWithFallback";
import { Project } from "../../../types/portfolioTypes";

interface ProjectCardProps {
  project: Project;
  onOpenModal: () => void;
}

/**
 * Componente para exibir um card de projeto
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  return (
    <div
      className="project-card group bg-card-bg rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
      data-project-id={project.id}
      onClick={onOpenModal}
    >
      <div className="relative overflow-hidden h-56">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white text-xl font-bold mb-1">
              {project.title}
            </h3>
            <p className="text-white/80 text-sm">
              {project.category.charAt(0).toUpperCase() +
                project.category.slice(1)}
            </p>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-90 transform scale-0 group-hover:scale-100 transition-all duration-500">
          <FaSearch className="text-white text-xl" />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-text-light mb-3 line-clamp-2 text-sm">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary/80">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button className="text-primary text-sm font-medium flex items-center group/btn">
            <span>Ver detalhes</span>
            <FaArrowRight className="ml-1 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>

          <div className="flex space-x-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 flex items-center justify-center rounded-full text-text-light hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Link para o repositório GitHub"
              >
                <FaGithub />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 flex items-center justify-center rounded-full text-text-light hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Link para a demonstração"
              >
                <FaLink />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
