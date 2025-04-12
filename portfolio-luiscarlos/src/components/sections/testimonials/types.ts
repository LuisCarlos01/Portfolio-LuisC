/**
 * Interface para um depoimento
 */
export interface Testimonial {
  /** ID único do depoimento */
  id: number;
  /** Nome da pessoa que deu o depoimento */
  name: string;
  /** Cargo da pessoa */
  role: string;
  /** Empresa da pessoa */
  company: string;
  /** URL da imagem de perfil */
  image: string;
  /** Texto do depoimento */
  text: string;
  /** Avaliação de 1 a 5 */
  rating?: number;
}
