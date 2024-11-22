import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";
import "./Login.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = login(email, password);
    if (isValid) {
      navigate("/home");
    } else {
      setError(t("invalidCredentials"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("email")}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("pass")}
        required
      />
      <button type="submit">{t("signIn")}</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Login;
