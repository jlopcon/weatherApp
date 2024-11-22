import React from "react";
import { useTranslation } from "react-i18next";
import "./Topbar.scss";

interface TopbarProps {
  showLogoutButton: boolean;
  onLogout?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ showLogoutButton, onLogout }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <label>{t("selectLanguage")}:</label>
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          defaultValue="en"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
      <div className="topbar-right">
        {showLogoutButton && <button onClick={onLogout}>{t("logout")}</button>}
      </div>
    </div>
  );
};

export default Topbar;
