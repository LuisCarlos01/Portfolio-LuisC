import { useRef } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaAward } from "react-icons/fa";
import TabButton from "./TabButton";

interface ResumeTabsProps {
  activeTab: "education" | "experience" | "certifications";
  changeTab: (tab: "education" | "experience" | "certifications") => void;
  tabsRef: React.RefObject<HTMLDivElement>;
}

const ResumeTabs = ({ activeTab, changeTab, tabsRef }: ResumeTabsProps) => {
  return (
    <div
      className="tabs flex flex-wrap justify-center gap-4 mb-12"
      ref={tabsRef}
      style={{ display: "flex", visibility: "visible", opacity: 1 }}
    >
      <TabButton
        active={activeTab === "experience"}
        onClick={() => changeTab("experience")}
        icon={<FaBriefcase />}
        label="Experiência"
      />

      <TabButton
        active={activeTab === "education"}
        onClick={() => changeTab("education")}
        icon={<FaGraduationCap />}
        label="Educação"
      />

      <TabButton
        active={activeTab === "certifications"}
        onClick={() => changeTab("certifications")}
        icon={<FaAward />}
        label="Certificações"
      />
    </div>
  );
};

export default ResumeTabs;
