import { ReactNode } from "react";

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface Statistic {
  icon: ReactNode;
  title: string;
  value: number;
  suffix: string;
}

export interface AboutRefs {
  sectionRef: React.RefObject<HTMLElement>;
  titleRef: React.RefObject<HTMLHeadingElement>;
  imageRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  statsRef: React.RefObject<HTMLDivElement>;
  servicesRef: React.RefObject<HTMLDivElement>;
}

export interface AboutHeaderProps {
  titleRef: React.RefObject<HTMLHeadingElement>;
}

export interface AboutImageProps {
  imageRef: React.RefObject<HTMLDivElement>;
}

export interface AboutContentProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

export interface AboutStatsProps {
  statsRef: React.RefObject<HTMLDivElement>;
  statistics: Statistic[];
}

export interface ServiceCardProps {
  service: Service;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  onClick: (service: Service) => void;
}

export interface ServicesListProps {
  servicesRef: React.RefObject<HTMLDivElement>;
  services: Service[];
  hoveredService: number | null;
  onServiceHover: (index: number | null) => void;
  onServiceClick: (service: Service) => void;
}

export interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}
