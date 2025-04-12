import React, { useRef, memo } from "react";
import SkillCard from "./SkillCard";
import { Skill } from "../../../types/skillsTypes";

interface SkillsListProps {
  skills: Skill[];
  onSkillClick: (skill: Skill) => void;
  selectedSkill: Skill | null;
}

/**
 * Componente que renderiza a grade de cards de habilidades
 */
const SkillsList: React.FC<SkillsListProps> = ({
  skills,
  onSkillClick,
  selectedSkill,
}) => {
  const skillsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={skillsRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {skills.map((skill, index) => (
        <SkillCard
          key={`skill-${index}`}
          skill={skill}
          onClick={onSkillClick}
          isActive={selectedSkill === skill}
        />
      ))}
    </div>
  );
};

export default memo(SkillsList);
