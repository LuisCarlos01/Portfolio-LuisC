import React from "react";
import { ServicesListProps } from "../../../types/aboutTypes";
import ServiceCard from "./ServiceCard";

const ServicesList: React.FC<ServicesListProps> = ({
  servicesRef,
  services,
  hoveredService,
  onServiceHover,
  onServiceClick,
}) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-8 text-primary">
        Meus <span className="text-text-light">Serviços</span>
      </h3>

      <div
        ref={servicesRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            index={index}
            isHovered={hoveredService === index}
            onHover={onServiceHover}
            onClick={onServiceClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
