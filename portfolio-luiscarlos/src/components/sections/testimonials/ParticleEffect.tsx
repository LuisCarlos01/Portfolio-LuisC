import React, { useEffect, useRef } from "react";

interface ParticleEffectProps {
  /** Densidade de partículas - quanto maior, mais partículas */
  density?: number;
  /** Cor das partículas */
  color?: string;
  /** Opacidade das partículas */
  opacity?: number;
  /** Tamanho mínimo das partículas */
  minSize?: number;
  /** Tamanho máximo das partículas */
  maxSize?: number;
  /** Quantidade máxima de partículas */
  maxParticles?: number;
}

/**
 * Componente que cria um efeito de partículas flutuantes
 */
const ParticleEffect: React.FC<ParticleEffectProps> = ({
  density = 60000,
  color = "rgba(155, 89, 182, %o)",
  opacity = 0.2,
  minSize = 2,
  maxSize = 6,
  maxParticles = 15,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Efeito para criar as partículas
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !container.parentElement) return;

    // Obter dimensões do container pai
    const parentElement = container.parentElement;
    const containerWidth = parentElement.offsetWidth;
    const containerHeight = parentElement.offsetHeight;

    // Limpar partículas existentes
    container.innerHTML = "";

    // Calcular quantidade de partículas com base na densidade e dimensões
    const particleCount = Math.min(
      Math.floor((containerWidth * containerHeight) / density),
      maxParticles
    );

    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Tamanho aleatório
      const size = minSize + Math.random() * (maxSize - minSize);

      // Posição aleatória (com margem para evitar que fiquem cortadas)
      const posX = 20 + Math.random() * (containerWidth - 40);
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
      particle.style.opacity = (0.1 + Math.random() * 0.2).toString();
      particle.style.backgroundColor = particleColor;
      particle.style.filter = "blur(1px)";
      particle.style.setProperty("--random", randomVar.toString());

      // Adicionar delay aleatório para cada partícula
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animation = "pulse 5s ease-in-out infinite";

      // Adicionar partícula ao container
      container.appendChild(particle);
    }

    // Cleanup quando o componente for desmontado
    return () => {
      container.innerHTML = "";
    };
  }, [density, color, opacity, minSize, maxSize, maxParticles]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default ParticleEffect;
