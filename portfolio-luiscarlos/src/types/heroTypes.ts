import { RefObject } from "react";

/**
 * Interface para referências dos elementos da seção Hero
 */
export interface HeroRefs {
  sectionRef: RefObject<HTMLElement>;
  titleRef: RefObject<HTMLHeadingElement>;
  subtitleRef: RefObject<HTMLDivElement>;
  contentRef: RefObject<HTMLParagraphElement>;
  socialRef: RefObject<HTMLDivElement>;
  scrollIconRef: RefObject<HTMLDivElement>;
  typedRef: RefObject<HTMLSpanElement>;
}

/**
 * Interface para os links sociais
 */
export interface SocialLink {
  platform: string;
  url: string;
  icon: JSX.Element;
  ariaLabel: string;
}

/**
 * Interface para o componente HeroTitle
 */
export interface HeroTitleProps {
  titleRef: RefObject<HTMLHeadingElement>;
}

/**
 * Interface para o componente HeroSubtitle
 */
export interface HeroSubtitleProps {
  subtitleRef: RefObject<HTMLDivElement>;
  typedRef: RefObject<HTMLSpanElement>;
  typedStrings: string[];
}

/**
 * Interface para o componente HeroContent
 */
export interface HeroContentProps {
  contentRef: RefObject<HTMLParagraphElement>;
  content: string;
}

/**
 * Interface para o componente SocialLinks
 */
export interface SocialLinksProps {
  socialRef: RefObject<HTMLDivElement>;
  links: SocialLink[];
}

/**
 * Interface para o componente HeroImage
 */
export interface HeroImageProps {
  imageSrc: string;
  fallbackSrc: string;
  alt: string;
}

/**
 * Interface para o componente ScrollIcon
 */
export interface ScrollIconProps {
  scrollIconRef: RefObject<HTMLDivElement>;
  onClick: () => void;
}
