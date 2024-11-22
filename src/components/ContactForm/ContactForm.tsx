import React, { useState, useEffect } from "react";
import "./ContactForm.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ContactFormState {
  name: string;
  birthdate: string;
  city: string;
  email: string;
  phone: string;
  isFormValid: boolean;
  message: string | null;
}

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    birthdate: "",
    city: "",
    email: "",
    phone: "",
    isFormValid: false,
    message: null,
  });

  const navigate = useNavigate();
  const { t } = useTranslation();

  // Only check validation when individual fields change
  const isValid =
    formState.name &&
    formState.birthdate &&
    formState.city &&
    formState.email &&
    formState.phone &&
    /^[A-Za-z\s]+$/.test(formState.name) &&
    /^\d{9}$/.test(formState.phone) &&
    /^\S+@\S+\.\S+$/.test(formState.email);

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      isFormValid: !!isValid,
    }));
  }, [isValid]); // Only depend on the result of the validation check

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ContactFormState
  ) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.isFormValid) {
      setFormState({ ...formState, message: t("formSuccess") });
    } else {
      setFormState({ ...formState, message: t("formError") });
    }
  };

  return (
    <div className="contact-form">
      <h2>{t("contactFormHeader")}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">{t("name")}:</label>
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={(e) => handleChange(e, "name")}
            required
          />
        </div>
        <div>
          <label htmlFor="birthdate">{t("birthdate")}:</label>
          <input
            type="date"
            id="birthdate"
            value={formState.birthdate}
            onChange={(e) => handleChange(e, "birthdate")}
            required
          />
        </div>
        <div>
          <label htmlFor="city">{t("city")}:</label>
          <input
            type="text"
            id="city"
            value={formState.city}
            onChange={(e) => handleChange(e, "city")}
            required
          />
        </div>
        <div>
          <label htmlFor="email">{t("email")}:</label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) => handleChange(e, "email")}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">{t("phone")}:</label>
          <input
            type="text"
            id="phone"
            value={formState.phone}
            onChange={(e) => handleChange(e, "phone")}
            required
          />
        </div>
        <button type="submit" disabled={!formState.isFormValid}>
          {t("submit")}
        </button>
      </form>

      {formState.message && <p>{formState.message}</p>}

      <button className="back-home" onClick={() => navigate("/home")}>
        {t("backHome")}
      </button>
    </div>
  );
};

export default ContactForm;
