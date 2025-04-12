import { motion } from "framer-motion";

interface ResumeNoResultsProps {
  clearSearch: () => void;
}

const ResumeNoResults = ({ clearSearch }: ResumeNoResultsProps) => {
  return (
    <motion.div
      className="text-center py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg text-text-light/70">
        Nenhum resultado encontrado para sua busca.
      </p>
      <motion.button
        className="mt-4 text-primary hover:underline"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={clearSearch}
      >
        Limpar busca
      </motion.button>
    </motion.div>
  );
};

export default ResumeNoResults;
