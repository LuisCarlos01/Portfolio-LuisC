/**
 * Utilitários para detecção de dispositivos e tamanhos de tela
 */

// Verifica se o dispositivo é móvel
export const isMobile = (): boolean => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
};

// Verifica se o dispositivo é tablet
export const isTablet = (): boolean => {
  return (
    (/iPad|Android/.test(navigator.userAgent) &&
      !/Mobile/.test(navigator.userAgent)) ||
    (window.innerWidth >= 768 && window.innerWidth < 1024)
  );
};

// Verifica se o dispositivo é desktop
export const isDesktop = (): boolean => {
  return !isMobile() && !isTablet();
};

// Verifica se o dispositivo está em modo retrato
export const isPortrait = (): boolean => {
  return window.matchMedia("(orientation: portrait)").matches;
};

// Verifica se o dispositivo está em modo paisagem
export const isLandscape = (): boolean => {
  return window.matchMedia("(orientation: landscape)").matches;
};

// Obtém o tamanho atual da tela
export const getScreenSize = (): { width: number; height: number } => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// Retorna o breakpoint atual (sm, md, lg, xl)
export const getCurrentBreakpoint = (): string => {
  const width = window.innerWidth;

  if (width < 480) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  return "xl";
};
