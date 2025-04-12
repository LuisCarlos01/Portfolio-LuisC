import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FieldActivity {
  [key: string]: "active" | "filled" | "error" | "";
}

interface SubmitStatus {
  type: "success" | "error" | "";
  message: string;
}

/**
 * Hook personalizado para gerenciar o estado e a validação do formulário de contato
 */
const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: "",
    message: "",
  });

  // Estado para rastrear campos focados e preenchidos
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldActivity, setFieldActivity] = useState<FieldActivity>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Função para atualizar dados do formulário
  const updateFormData = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro ao digitar
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Atualizar status do campo
    if (value) {
      setFieldActivity((prev) => ({
        ...prev,
        [name]: focusedField === name ? "active" : "filled",
      }));
    } else {
      setFieldActivity((prev) => ({
        ...prev,
        [name]: focusedField === name ? "active" : "",
      }));
    }
  };

  // Função para lidar com foco nos campos
  const handleFocus = (name: string) => {
    setFocusedField(name);
    setFieldActivity((prev) => ({
      ...prev,
      [name]: "active",
    }));
  };

  // Função para lidar com blur nos campos
  const handleBlur = (name: string, value: string) => {
    setFocusedField(null);
    setFieldActivity((prev) => ({
      ...prev,
      [name]: value ? "filled" : "",
    }));
  };

  // Função para validar o formulário
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validação do nome
    if (!formData.name.trim()) {
      errors.name = "Por favor, informe seu nome";
      isValid = false;
      setFieldActivity((prev) => ({ ...prev, name: "error" }));
    } else if (formData.name.trim().length < 3) {
      errors.name = "Nome deve ter pelo menos 3 caracteres";
      isValid = false;
      setFieldActivity((prev) => ({ ...prev, name: "error" }));
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Por favor, informe seu email";
      isValid = false;
      setFieldActivity((prev) => ({ ...prev, email: "error" }));
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Por favor, informe um email válido";
      isValid = false;
      setFieldActivity((prev) => ({ ...prev, email: "error" }));
    }

    // Validação do assunto
    if (!formData.subject.trim()) {
      errors.subject = "Por favor, informe o assunto";
      isValid = false;
      setFieldActivity((prev) => ({ ...prev, subject: "error" }));
    }

    // Validação da mensagem
    if (!formData.message.trim()) {
      errors.message = "Por favor, escreva uma mensagem";
      isValid = false;
      setFieldActivity((prev) => ({ ...prev, message: "error" }));
    } else if (formData.message.trim().length < 20) {
      errors.message = "Mensagem deve ter pelo menos 20 caracteres";
      isValid = false;
      setFieldActivity((prev) => ({ ...prev, message: "error" }));
    }

    setFormErrors(errors);
    return isValid;
  };

  // Função para processar o envio do formulário
  const submitForm = async (): Promise<boolean> => {
    // Validar formulário
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      // Simulação de envio de formulário (substitua por sua própria lógica)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Sucesso (em um caso real, isso seria após confirmação da API)
      setSubmitStatus({
        type: "success",
        message: "Mensagem enviada com sucesso! Responderei em breve.",
      });

      // Resetar formulário
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setFieldActivity({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      return true;
    } catch (error) {
      // Erro
      setSubmitStatus({
        type: "error",
        message:
          "Desculpe, ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    submitStatus,
    focusedField,
    fieldActivity,
    updateFormData,
    handleFocus,
    handleBlur,
    validateForm,
    submitForm,
    setFieldActivity,
  };
};

export default useContactForm;
