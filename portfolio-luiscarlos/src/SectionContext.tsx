// Função para animar a seção Resume
const animateResumeSection = () => {
  // Primeiro, verificar se a seção existe
  const resumeSection = document.getElementById("resume");
  if (!resumeSection) {
    return;
  }

  // Forçar visibilidade da seção Resume - usando apenas as propriedades essenciais
  resumeSection.style.display = "block";
  resumeSection.style.visibility = "visible";
  resumeSection.style.opacity = "1";
  resumeSection.classList.add("force-section-visibility");

  // Identificar e forçar visibilidade apenas dos elementos críticos
  const criticalSelectors = [
    "#resume h2",
    "#resume .tab-button",
    "#resume .resume-item",
    "#resume .tabs",
  ];

  criticalSelectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      const el = element as HTMLElement;

      // Usar classList.add em vez de manipular diretamente o style
      if (
        el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        el.classList.contains("tab-button")
      ) {
        el.style.display = "flex";
      } else {
        el.style.display = "block";
      }
      el.style.visibility = "visible";
      el.style.opacity = "1";
    });
  });

  // Animar elementos específicos com GSAP - usando uma única timeline otimizada
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.6,
    },
  });

  // Animar cabeçalho
  const header = resumeSection.querySelector("h2");
  if (header) {
    tl.fromTo(header, { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
  }

  // Animar botões de tab - reduzindo a quantidade de animações
  const tabButtons = resumeSection.querySelectorAll(".tab-button");
  if (tabButtons.length > 0) {
    tl.fromTo(
      tabButtons,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.08 },
      "-=0.3"
    );
  }

  // Animar itens do currículo - limitando a quantidade de itens animados para melhorar o desempenho
  const resumeItems = Array.from(
    resumeSection.querySelectorAll(".resume-item")
  ).slice(0, 6);
  if (resumeItems.length > 0) {
    tl.fromTo(
      resumeItems,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.08 },
      "-=0.2"
    );
  }
};
