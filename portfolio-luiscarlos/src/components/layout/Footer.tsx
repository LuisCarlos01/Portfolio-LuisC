import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card-bg py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold font-dancing text-primary mb-3">
              Luis Carlos
            </h3>
            <p className="text-text-light text-sm max-w-md">
              Desenvolvedor apaixonado por criar experiências web impactantes e
              soluções escaláveis.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/LuisCarlos01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/luis-carlos-vitoriano-neto-56a58321b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://twitter.com/luiscarlos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={22} />
              </a>
              <a
                href="mailto:luizvitorianoneto@gmail.com"
                className="text-text-light hover:text-primary transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-text-light text-sm flex items-center justify-center">
            © {currentYear} Luis Carlos. Todos os direitos reservados.
            Desenvolvido com
            <FaHeart className="text-red-500 mx-1" size={14} />
            usando React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
