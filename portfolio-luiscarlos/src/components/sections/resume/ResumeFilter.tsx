import { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

interface ResumeFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  sortDirection: "asc" | "desc";
  toggleSortDirection: () => void;
  clearSearch: () => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

const ResumeFilter = ({
  searchTerm,
  setSearchTerm,
  isFilterOpen,
  setIsFilterOpen,
  sortDirection,
  toggleSortDirection,
  clearSearch,
  searchInputRef,
}: ResumeFilterProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* Barra de ferramentas de filtro */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {/* Barra de busca */}
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-text-light/50" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-card-bg border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none text-text-light"
            placeholder="Buscar experiências, educação ou certificações..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={clearSearch}
            >
              <FaTimes className="text-text-light/50 hover:text-primary" />
            </button>
          )}
        </div>

        {/* Botões de ordenação e filtro */}
        <div className="flex gap-2">
          <motion.button
            onClick={toggleSortDirection}
            className="p-2 rounded-lg bg-card-bg hover:bg-primary/10 transition-colors duration-300 text-text-light"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={
              sortDirection === "desc"
                ? "Mais recentes primeiro"
                : "Mais antigos primeiro"
            }
          >
            {sortDirection === "desc" ? (
              <FaSortAmountDown />
            ) : (
              <FaSortAmountUp />
            )}
          </motion.button>

          <motion.button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isFilterOpen
                ? "bg-primary text-white"
                : "bg-card-bg hover:bg-primary/10 text-text-light"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Filtros adicionais"
          >
            <FaFilter />
          </motion.button>
        </div>
      </motion.div>

      {/* Painel de filtros avançados */}
      {isFilterOpen && (
        <motion.div
          className="mb-8 p-4 bg-card-bg rounded-lg shadow-md"
          initial={{ opacity: 0, height: 0, overflow: "hidden" }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-text-light mb-1">
                Ordenar por
              </label>
              <select className="p-2 rounded-lg bg-bg-dark border border-primary/20 text-text-light">
                <option value="date">Data</option>
                <option value="name">Nome</option>
                <option value="organization">Organização</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-text-light mb-1">
                Status
              </label>
              <select className="p-2 rounded-lg bg-bg-dark border border-primary/20 text-text-light">
                <option value="">Todos</option>
                <option value="current">Atual</option>
                <option value="completed">Concluído</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ResumeFilter;
