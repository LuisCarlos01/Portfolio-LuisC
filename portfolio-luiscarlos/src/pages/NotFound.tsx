import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <h1 className="text-primary text-9xl font-bold mb-4">404</h1>

        <h2 className="text-text-light text-3xl md:text-4xl font-bold mb-6">
          Página Não Encontrada
        </h2>

        <p className="text-text-light text-lg max-w-md mb-8">
          A página que você está procurando não existe ou foi removida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center"
          >
            <FaHome className="mr-2" /> Voltar para Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="btn-secondary inline-flex items-center justify-center"
          >
            <FaArrowLeft className="mr-2" /> Voltar
          </button>
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="w-64 h-64 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
              <div className="w-48 h-48 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-primary bg-opacity-30 rounded-full"></div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl">
              🔍
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
