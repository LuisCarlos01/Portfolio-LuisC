import React, { useEffect, useRef } from "react";

interface ParticleEffectProps {
  /** Densidade de partículas - quanto maior o valor, menos partículas */
  density?: number;
  /** Cor das partículas (use %o para substituir pela opacidade) */
  color?: string;
  /** Opacidade base das partículas */
  opacity?: number;
  /** Tamanho mínimo das partículas */
  minSize?: number;
  /** Tamanho máximo das partículas */
  maxSize?: number;
  /** Quantidade máxima de partículas */
  maxParticles?: number;
  /** Referência ao container (opcional) */
  containerRef?: React.RefObject<HTMLElement>;
  /** Nome da animação a ser aplicada */
  animation?: string;
  /** Filtro CSS a ser aplicado nas partículas */
  filter?: string;
  /** Duração da animação em segundos */
  animationDuration?: number;
}

/**
 * Componente reutilizável para criar efeitos de partículas
 * Pode ser usado em diferentes seções com configurações personalizadas
 */
const ParticleEffect: React.FC<ParticleEffectProps> = ({
  density = 60000,
  color = "rgba(155, 89, 182, %o)",
  opacity = 0.2,
  minSize = 2,
  maxSize = 6,
  maxParticles = 15,
  containerRef,
  animation = "pulse",
  filter = "blur(1px)",
  animationDuration = 5,
}) => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    // Determinar o elemento pai para dimensões - pode ser um ref passado ou o próprio pai do container
    const parentElement =
      containerRef?.current || particlesContainer.parentElement;
    if (!parentElement) return;

    const containerWidth = parentElement.offsetWidth;
    const containerHeight = parentElement.offsetHeight;

    // Limpar partículas existentes
    particlesContainer.innerHTML = "";

    // Calcular quantidade de partículas com base na densidade e dimensões
    const particleCount = Math.min(
      Math.floor((containerWidth * containerHeight) / density),
      maxParticles
    );

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Tamanho aleatório
      const size = minSize + Math.random() * (maxSize - minSize);

      // Posição aleatória (com margem para evitar que fiquem cortadas)
      const posX = 10 + Math.random() * (containerWidth - 20);
      const posY = 100 + Math.random() * (containerHeight - 200);

      // Variável aleatória para animação
      const randomVar = Math.random();

      // Calcular opacidade com variação
      const particleOpacity = opacity + Math.random() * 0.15;

      // Cor com opacidade dinâmica
      const particleColor = color.replace("%o", particleOpacity.toString());

      // Definir estilo da partícula
      particle.className = "particle absolute rounded-full";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = particleOpacity.toString();
      particle.style.backgroundColor = particleColor;
      particle.style.filter = filter;
      particle.style.setProperty("--random", randomVar.toString());

      // Adicionar delay aleatório para cada partícula
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animation = `${animation} ${animationDuration}s ease-in-out infinite`;

      // Adicionar partícula ao container
      particlesContainer.appendChild(particle);
    }

    // Cleanup quando o componente for desmontado
    return () => {
      if (particlesContainer) {
        particlesContainer.innerHTML = "";
      }
    };
  }, [
    density,
    color,
    opacity,
    minSize,
    maxSize,
    maxParticles,
    containerRef,
    animation,
    filter,
    animationDuration,
  ]);

  return (
    <div
      ref={particlesRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleEffect;
