import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../../components/Login/Login";
import { useAuthContext } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";
import "./LoginPage.scss";

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuthContext();
  const { t } = useTranslation();

  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="login-page">
      <h1 className="typing-animation">{t("loginAnimationTitle")}</h1>
      <div className="login-page__content">
        <img src="/icon.jpg" alt="Logo" className="login-page__logo" />
        <h2>{t("signIn")}</h2>
        <p className="login-page__description">{t("loginDescription")}</p>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
