import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    role: "CEO",
    company: "Tech Solutions",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    text: "Trabalhar com Luis Carlos foi uma experiência excepcional. Sua atenção aos detalhes e capacidade de entregar projetos de alta qualidade dentro do prazo impressionou toda a nossa equipe.",
  },
  {
    id: 2,
    name: "João Oliveira",
    role: "CTO",
    company: "Inovação Digital",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    text: "Luis possui um conhecimento técnico impressionante e uma habilidade única de transformar conceitos complexos em soluções elegantes. Recomendo fortemente seus serviços.",
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Gerente de Produto",
    company: "Startup Connect",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    text: "A capacidade do Luis de entender nossos requisitos e transformá-los em uma interface intuitiva e responsiva foi fundamental para o sucesso do nosso produto.",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !titleRef.current ||
      !descRef.current ||
      !testimonialsRef.current
    )
      return;

    try {
      // Animação do título e descrição
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Animação dos testemunhos
      gsap.fromTo(
        testimonialsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    } catch (error) {
      console.error("Erro na animação dos testemunhos:", error);
    }

    return () => {
      // Limpeza das animações
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-20 bg-card-bg section-container"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center mb-4 text-white"
        >
          O que dizem sobre mim
        </h2>
        <p
          ref={descRef}
          className="text-lg text-center mb-12 text-text-light max-w-3xl mx-auto"
        >
          Feedback de clientes e colegas com quem tive o prazer de trabalhar em
          diversos projetos.
        </p>

        <div ref={testimonialsRef} className="max-w-4xl mx-auto">
          <div className="bg-bg-dark p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-6">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary"
              />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="text-primary">
                  {testimonials[activeIndex].role},{" "}
                  {testimonials[activeIndex].company}
                </p>
              </div>
            </div>
            <p className="text-text-light text-lg italic">
              "{testimonials[activeIndex].text}"
            </p>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? "bg-primary" : "bg-gray-600"
                  }`}
                  aria-label={`Testemunho ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
