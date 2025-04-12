import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
          <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
          <h1 className="text-3xl font-bold text-primary mb-4">
            Ops! Algo deu errado
          </h1>
          <div className="bg-card-bg rounded-lg p-6 max-w-md mb-6">
            <p className="text-text-light mb-4">
              Desculpe, ocorreu um erro inesperado ao carregar esta página.
            </p>
            {this.state.error && (
              <div className="text-left mb-4 overflow-auto max-h-40 bg-bg-dark p-3 rounded-md">
                <p className="text-red-400 font-mono text-sm">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center"
              onClick={() => (window.location.href = "/")}
            >
              <FaHome className="mr-2" /> Voltar para Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary inline-flex items-center justify-center"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
