import React from "react";
import { SocialLinksProps } from "../../../types/heroTypes";

/**
 * Componente para exibir os links sociais na seção Hero
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ socialRef, links }) => {
  return (
    <div ref={socialRef} className="flex space-x-6 pt-4">
      {links.map((link, index) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors"
          aria-label={link.ariaLabel}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default React.memo(SocialLinks);
