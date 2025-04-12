import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Hook personalizado para gerenciar animações GSAP com limpeza adequada
 * e garantia de que os elementos sejam visíveis antes da animação.
 */
export const useGSAPAnimation = () => {
  // Referência para armazenar todas as animações e gatilhos criados
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  const triggersRef = useRef<gsap.core.Timeline[]>([]);

  /**
   * Garante que um elemento seja visível para animações
   * @param element Elemento HTML a ser tornado visível
   */
  const ensureVisible = useCallback((element: HTMLElement | null) => {
    if (element) {
      gsap.set(element, {
        visibility: "visible",
        display:
          element.tagName.toLowerCase() === "span" ? "inline-block" : "block",
        opacity: 1,
      });
    }
  }, []);

  /**
   * Cria uma animação de entrada com fade e movimento
   * @param element Elemento a ser animado
   * @param options Opções da animação
   */
  const createFadeInAnimation = useCallback(
    (
      element: HTMLElement | null,
      options: {
        delay?: number;
        y?: number;
        x?: number;
        duration?: number;
        ease?: string;
        scrollTrigger?: boolean;
        start?: string;
        onComplete?: () => void;
      } = {}
    ) => {
      if (!element) return;

      // Configurações padrão
      const {
        delay = 0,
        y = 30,
        x = 0,
        duration = 0.8,
        ease = "power2.out",
        scrollTrigger = true,
        start = "top 80%",
        onComplete,
      } = options;

      // Garantir que o elemento seja visível
      ensureVisible(element);

      // Configuração básica da animação
      const animationConfig: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        ease,
        onComplete,
      };

      // Adicionar scrollTrigger se necessário
      if (scrollTrigger) {
        animationConfig.scrollTrigger = {
          trigger: element,
          start,
          once: true,
        };
      }

      // Configurar o estado inicial e iniciar a animação
      gsap.set(element, { opacity: 0, y, x });
      const animation = gsap.to(element, animationConfig);

      // Armazenar a animação para limpeza posterior
      animationsRef.current.push(animation);

      return animation;
    },
    [ensureVisible]
  );

  /**
   * Cria uma sequência de animações para vários elementos
   * @param elements Array de elementos a serem animados em sequência
   * @param options Opções da animação
   */
  const createStaggerAnimation = useCallback(
    (
      elements: HTMLElement[] | NodeListOf<Element> | null,
      options: {
        stagger?: number;
        from?: string;
        y?: number;
        x?: number;
        duration?: number;
        delay?: number;
        scrollTrigger?: boolean;
        start?: string;
      } = {}
    ) => {
      if (!elements || elements.length === 0) return;

      const {
        stagger = 0.1,
        from = "start",
        y = 30,
        x = 0,
        duration = 0.5,
        delay = 0,
        scrollTrigger = true,
        start = "top 80%",
      } = options;

      // Garantir que todos os elementos sejam visíveis
      Array.from(elements).forEach((el) => ensureVisible(el as HTMLElement));

      // Configuração da animação
      const animationConfig: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        x: 0,
        stagger: {
          amount: elements.length * stagger,
          from,
        },
        duration,
        delay,
        ease: "power2.out",
      };

      // Adicionar scrollTrigger se necessário
      if (scrollTrigger) {
        const firstElement = Array.from(elements)[0];
        animationConfig.scrollTrigger = {
          trigger: firstElement,
          start,
          once: true,
        };
      }

      // Configurar o estado inicial e iniciar a animação
      gsap.set(elements, { opacity: 0, y, x });
      const animation = gsap.to(elements, animationConfig);

      // Armazenar a animação para limpeza posterior
      animationsRef.current.push(animation);

      return animation;
    },
    [ensureVisible]
  );

  // Limpar todas as animações e gatilhos quando o componente for desmontado
  useEffect(() => {
    return () => {
      // Matar todas as animações
      animationsRef.current.forEach((animation) => {
        if (animation && animation.kill) {
          animation.kill();
        }
      });

      // Matar todos os gatilhos
      triggersRef.current.forEach((trigger) => {
        if (trigger && trigger.kill) {
          trigger.kill();
        }
      });

      // Limpar ScrollTriggers específicos deste componente
      if (gsap.ScrollTrigger) {
        gsap.ScrollTrigger.getAll().forEach((trigger) => {
          trigger.kill();
        });
      }
    };
  }, []);

  return {
    ensureVisible,
    createFadeInAnimation,
    createStaggerAnimation,
  };
};
