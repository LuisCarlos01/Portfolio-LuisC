import React, { createContext, useContext, useState, useEffect } from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Criando o contexto com valor padrão
const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

// Hook personalizado para usar o contexto
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode deve ser usado dentro de um DarkModeProvider");
  }
  return context;
};

// Props para o provedor
interface DarkModeProviderProps {
  children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  // Verificar se o tema escuro foi salvo no localStorage ou preferido pelo sistema
  const getInitialMode = (): boolean => {
    // Verificar se há uma preferência salva no localStorage
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      return savedMode === "true";
    }

    // Verificar preferência do sistema
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialMode);

  // Alternar entre os modos claro e escuro
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Aplicar as classes CSS quando o modo escuro mudar
  useEffect(() => {
    // Salvar preferência no localStorage
    localStorage.setItem("darkMode", isDarkMode.toString());

    // Aplicar a classe ao elemento html para ativar os estilos do tema
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Observe mudanças nas preferências do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Função para atualizar o tema quando a preferência do sistema mudar
    const handleChange = (e: MediaQueryListEvent) => {
      // Só atualizar automaticamente se o usuário não tiver definido uma preferência
      if (!localStorage.getItem("darkMode")) {
        setIsDarkMode(e.matches);
      }
    };

    // Adicionar listener para mudanças na preferência
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handleChange as any);
      return () => mediaQuery.removeListener(handleChange as any);
    }
  }, []);

  // Valores para o contexto
  const contextValue: DarkModeContextType = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
