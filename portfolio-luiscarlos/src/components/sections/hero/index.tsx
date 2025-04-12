import React, { useEffect, useRef } from "react";
import { useSection } from "../../../contexts/SectionContext";
import gsap from "gsap";
import { HeroRefs } from "../../../types/heroTypes";
import HeroTitle from "./HeroTitle";
import HeroSubtitle from "./HeroSubtitle";
import HeroContent from "./HeroContent";
import SocialLinks from "./SocialLinks";
import HeroImage from "./HeroImage";
import ScrollIcon from "./ScrollIcon";
import {
  typedStrings,
  heroContent,
  heroImage,
  socialLinks,
} from "../../../data/heroData";

/**
 * Componente principal da seção Hero que integra todos os componentes menores
 */
const HeroSection: React.FC = () => {
  // Refs para animações
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);

  const { navigateToSection } = useSection();

  // Efeito para garantir visibilidade da seção hero
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.display = "flex";
      sectionRef.current.style.opacity = "1";
      sectionRef.current.style.zIndex = "1";
      sectionRef.current.style.visibility = "visible";
    }
  }, []);

  // Animações GSAP
  useEffect(() => {
    const tl = gsap.timeline();

    // Definir estado inicial
    gsap.set(
      [
        titleRef.current,
        subtitleRef.current,
        contentRef.current,
        socialRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    // Sequência de animação
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        },
        "-=0.5"
      )
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        socialRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

    // Animação do ícone de scroll
    gsap.to(scrollIconRef.current, {
      y: 15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Função para rolar para a seção "sobre"
  const handleScrollToNext = () => {
    console.log("Clique no ícone de scroll para navegar para 'about'");

    // Usar diretamente a função do contexto para navegação
    navigateToSection("about");
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-container bg-gradient-to-b from-bg-dark to-background min-h-screen flex items-center justify-center py-24 px-4 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-3/5 space-y-6">
            <HeroTitle titleRef={titleRef} />
            <HeroSubtitle
              subtitleRef={subtitleRef}
              typedRef={typedRef}
              typedStrings={typedStrings}
            />
            <HeroContent contentRef={contentRef} content={heroContent} />
            <SocialLinks socialRef={socialRef} links={socialLinks} />
          </div>

          <div className="w-full md:w-2/5">
            <HeroImage
              imageSrc={heroImage.src}
              fallbackSrc={heroImage.fallbackSrc}
              alt={heroImage.alt}
            />
          </div>
        </div>

        <ScrollIcon
          scrollIconRef={scrollIconRef}
          onClick={handleScrollToNext}
        />
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
