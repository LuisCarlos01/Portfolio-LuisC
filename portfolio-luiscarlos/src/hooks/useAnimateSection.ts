import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationOptions {
  /** ID do elemento a ser animado */
  sectionId: string;
  /** Offset para o trigger do ScrollTrigger (ex: "top 80%") */
  triggerOffset?: string;
  /** Atraso para iniciar a animação */
  delay?: number;
  /** Se as animações devem rodar apenas uma vez */
  once?: boolean;
  /** Callbacks para executar após a animação */
  onAnimationComplete?: () => void;
}

interface AnimationTargets {
  /** Seletor para o título principal */
  title?: string;
  /** Seletor para a descrição ou subtítulo */
  description?: string;
  /** Seletor para itens que devem ser animados em sequência */
  items?: string;
  /** Seletor para elementos de controle (botões, abas, etc) */
  controls?: string;
}

/**
 * Hook para animar seções com efeitos de entrada padrão
 * @param options Opções de animação
 * @param targets Alvos para a animação
 * @returns Objeto com referência ao container e função para forçar animação
 */
export const useAnimateSection = (
  options: AnimationOptions,
  targets: AnimationTargets = {}
) => {
  const {
    sectionId,
    triggerOffset = "top 80%",
    delay = 0,
    once = true,
    onAnimationComplete,
  } = options;

  const {
    title = "h2",
    description = "p.text-lg",
    items = ".animate-item",
    controls = ".control-item",
  } = targets;

  const sectionRef = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const isAnimated = useRef(false);

  // Função para executar a animação manualmente
  const animateSection = () => {
    if (!sectionRef.current || isAnimated.current) return;

    // Garantir visibilidade da seção
    const section = sectionRef.current;
    section.style.opacity = "1";
    section.style.visibility = "visible";

    // Criar timeline para animações
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power2.out" },
      onComplete: () => {
        isAnimated.current = true;
        if (onAnimationComplete) onAnimationComplete();
      },
    });

    timeline.current = tl;

    // Animar título se existir
    const titleElement = section.querySelector(title);
    if (titleElement) {
      tl.fromTo(
        titleElement,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        delay
      );
    }

    // Animar descrição se existir
    const descElement = section.querySelector(description);
    if (descElement) {
      tl.fromTo(
        descElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.6"
      );
    }

    // Animar itens em sequência se existirem
    const itemElements = section.querySelectorAll(items);
    if (itemElements.length > 0) {
      tl.fromTo(
        itemElements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
        },
        "-=0.4"
      );
    }

    // Animar controles se existirem
    const controlElements = section.querySelectorAll(controls);
    if (controlElements.length > 0) {
      tl.fromTo(
        controlElements,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.5,
        },
        "-=0.3"
      );
    }

    return tl;
  };

  // Configurar ScrollTrigger para animação automática
  useEffect(() => {
    if (!sectionRef.current) return;

    // Criar ScrollTrigger para animação
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: triggerOffset,
      once: once,
      onEnter: animateSection,
    });

    // Cleanup
    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
      trigger.kill();
    };
  }, [triggerOffset, once]);

  // Força a visibilidade da seção e seus elementos
  const forceVisibility = () => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    // Garantir que a seção esteja visível
    section.style.display = "block";
    section.style.visibility = "visible";
    section.style.opacity = "1";
    section.style.zIndex = "1";

    // Garantir que elementos importantes estejam visíveis
    const selectors = [title, description, items, controls].filter(Boolean);

    selectors.forEach((selector) => {
      const elements = section.querySelectorAll(selector);
      elements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.visibility = "visible";
        element.style.opacity = "1";
      });
    });
  };

  return {
    sectionRef,
    animateSection,
    forceVisibility,
  };
};

export default useAnimateSection;
