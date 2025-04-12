import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ParticleEffectProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ParticleEffect = ({ containerRef }: ParticleEffectProps) => {
  const particlesRef = useRef<HTMLDivElement>(null);

  // Criar efeito de partículas interativas decorativas
  useEffect(() => {
    if (!particlesRef.current || !containerRef.current) return;

    const particlesContainer = particlesRef.current;
    const sectionHeight = containerRef.current.offsetHeight;
    const sectionWidth = containerRef.current.offsetWidth;

    // Limpar partículas existentes
    particlesContainer.innerHTML = "";

    // Número de partículas baseado no tamanho da seção
    const particleCount = Math.min(
      Math.floor((sectionWidth * sectionHeight) / 40000),
      20
    );

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Tamanho aleatório
      const size = Math.random() * 6 + 3;

      // Posição aleatória (evitando bordas)
      const posX = 10 + Math.random() * (sectionWidth - 20);
      const posY = 100 + Math.random() * (sectionHeight - 200);

      // Variável aleatória para animação
      const randomVar = Math.random();

      // Opacidade variável para efeito de profundidade
      const opacity = 0.1 + Math.random() * 0.3;

      // Cor aleatória entre roxo e rosa suave
      const hue = 280 + Math.random() * 40; // Variação entre roxo (280) e rosa (320)
      const saturation = 70 + Math.random() * 30;
      const lightness = 70 + Math.random() * 20;

      // Definir estilo da partícula
      particle.className = "particle absolute rounded-full";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.opacity = opacity.toString();
      particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
      particle.style.boxShadow = `0 0 ${
        size * 2
      }px hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity * 0.5})`;
      particle.style.filter = "blur(1px)";
      particle.style.setProperty("--random", randomVar.toString());

      // Adicionar delay aleatório para cada partícula
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animation = `floatParticle ${
        5 + Math.random() * 5
      }s ease-in-out infinite`;

      // Adicionar a partícula ao container
      particlesContainer.appendChild(particle);
    }

    // Adicionar interatividade às partículas
    const handleMouseMove = (e: MouseEvent) => {
      const particles = particlesContainer.querySelectorAll(".particle");
      const mouseX = e.clientX;
      const mouseY = e.clientY + window.scrollY;

      particles.forEach((particle) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2 + window.scrollY;

        const deltaX = mouseX - particleX;
        const deltaY = mouseY - particleY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Quanto mais perto do mouse, mais forte a repulsão
        const maxDistance = 150;
        if (distance < maxDistance) {
          const power = (1 - distance / maxDistance) * 20;
          const angle = Math.atan2(deltaY, deltaX);
          const translateX = -Math.cos(angle) * power;
          const translateY = -Math.sin(angle) * power;

          gsap.to(particle, {
            x: translateX,
            y: translateY,
            duration: 0.6,
            ease: "power1.out",
          });
        } else {
          // Retornar gradualmente à posição original
          gsap.to(particle, {
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
          });
        }
      });
    };

    // Adicionar efeito parallax ao movimento do mouse
    const parallaxEffect = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) / 50;
      const moveY = (e.clientY - window.innerHeight / 2) / 50;

      // Mover todas as partículas com efeito sutilmente oposto ao cursor
      gsap.to(particlesContainer, {
        x: -moveX,
        y: -moveY,
        duration: 1,
        ease: "power1.out",
      });
    };

    // Adicionar event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", parallaxEffect);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", parallaxEffect);
    };
  }, [containerRef]);

  return (
    <div
      ref={particlesRef}
      className="particles-container absolute inset-0 z-0"
    />
  );
};

export default ParticleEffect;
