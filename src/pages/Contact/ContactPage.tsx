import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useTranslation } from "react-i18next";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("contactFormTitle")}</h1>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
