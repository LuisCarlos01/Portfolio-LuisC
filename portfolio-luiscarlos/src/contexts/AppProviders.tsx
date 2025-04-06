import React, { ReactNode } from "react";
import { SectionProvider } from "./SectionContext";
import { DarkModeProvider } from "./DarkModeContext";
import ErrorBoundary from "../components/ErrorBoundary";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <DarkModeProvider>
        <SectionProvider>{children}</SectionProvider>
      </DarkModeProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
