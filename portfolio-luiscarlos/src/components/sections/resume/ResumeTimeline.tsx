import React from "react";
import { motion } from "framer-motion";
import ResumeItem from "./ResumeItem";
import {
  Education,
  Experience,
  Certification,
} from "../../../types/resumeTypes";

interface ResumeTimelineProps {
  data: (Education | Experience | Certification)[];
  timelineRef: React.RefObject<HTMLDivElement>;
  activeTab: "education" | "experience" | "certifications";
}

const ResumeTimeline: React.FC<ResumeTimelineProps> = ({
  data,
  timelineRef,
  activeTab,
}) => {
  return (
    <div ref={timelineRef} className="relative">
      {/* Linha decorativa animada no topo da timeline */}
      <motion.div
        className="h-[5px] w-[80%] mx-auto mb-12 rounded-full bg-primary/10 relative overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="absolute h-full bg-primary/20 left-0 top-0 bottom-0"
          animate={{ x: ["0%", "100%"] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "30%" }}
        />
        <div className="absolute left-0 top-1/2 w-2 h-2 bg-primary rounded-full -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute right-0 top-1/2 w-2 h-2 bg-primary rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </motion.div>

      {/* Itens da timeline */}
      <div className="timeline-items">
        {data.map((item, index) => (
          <ResumeItem
            key={`${activeTab}-${item.id}`}
            item={item}
            index={index}
            activeTab={activeTab}
            isAnimated={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeTimeline;
