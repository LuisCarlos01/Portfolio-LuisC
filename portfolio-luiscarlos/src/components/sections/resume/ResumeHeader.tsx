import { motion } from "framer-motion";
import { FaClock, FaDownload, FaArrowRight } from "react-icons/fa";

interface ResumeHeaderProps {
  titleRef: React.RefObject<HTMLHeadingElement>;
  descriptionRef: React.RefObject<HTMLParagraphElement>;
  downloadButtonRef: React.RefObject<HTMLButtonElement>;
  handleDownload: () => void;
}

const ResumeHeader = ({
  titleRef,
  descriptionRef,
  downloadButtonRef,
  handleDownload,
}: ResumeHeaderProps) => {
  return (
    <>
      <motion.h2
        className="text-4xl font-bold text-center mb-16 text-white relative reveal-clip"
        ref={titleRef}
        style={{ display: "block", visibility: "visible", opacity: 1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Minha <span className="text-primary">Linha do Tempo</span>
        <motion.div
          className="absolute w-20 h-1 bg-primary left-1/2 -translate-x-1/2 bottom-0 mt-4"
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </motion.h2>

      <motion.p
        ref={descriptionRef}
        className="text-center text-text-light mb-12 max-w-2xl mx-auto section-description"
        style={{ display: "block", visibility: "visible", opacity: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Minha jornada educacional e profissional, mostrando minha evolução e
        experiência através do tempo na área de desenvolvimento web.
      </motion.p>

      {/* Ícone decorativo de relógio */}
      <motion.div
        className="flex justify-center mb-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex justify-center items-center text-primary">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaClock size={28} />
          </motion.div>
        </div>
      </motion.div>

      {/* Botão de Download CV */}
      <div className="flex justify-center mb-12">
        <motion.button
          ref={downloadButtonRef}
          onClick={handleDownload}
          className="btn-primary inline-flex items-center mb-8 group relative overflow-hidden"
          style={{ display: "flex", visibility: "visible", opacity: 1 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(var(--color-primary-rgb), 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center">
            <FaDownload className="mr-2 group-hover:animate-bounce" /> Download
            CV
            <FaArrowRight className="ml-2 opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </span>
          <span className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
        </motion.button>
      </div>
    </>
  );
};

export default ResumeHeader;
