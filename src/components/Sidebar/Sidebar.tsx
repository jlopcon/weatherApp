import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWeather } from "../../services/openWeatherService";
import { useTranslation } from "react-i18next";
import "./Sidebar.scss";

interface SidebarProps {
  onCitySelect: (city: string) => void;
  onCityRemove: (city: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCitySelect, onCityRemove }) => {
  const { t } = useTranslation();
  const defaultCities = [t("cityLondon"), t("cityToronto"), t("citySingapore")];
  const [cities, setCities] = useState<string[]>(defaultCities);
  const [newCity, setNewCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCities = localStorage.getItem("cities");
    if (storedCities) {
      setCities(JSON.parse(storedCities));
    } else {
      setCities(defaultCities);
      localStorage.setItem("cities", JSON.stringify(defaultCities));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const handleAddCity = async () => {
    if (!newCity.trim()) return;

    try {
      await getWeather(newCity);
      if (!cities.includes(newCity.trim())) {
        setCities([...cities, newCity.trim()]);
        setNewCity("");
        setError(null);
      } else {
        setError(t("cityError"));
      }
    } catch {
      setError(t("cityError"));
    }
  };

  const handleRemoveCity = (city: string) => {
    setCities(cities.filter((c) => c !== city));
    onCityRemove(city);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddCity();
    }
  };

  return (
    <div className="sidebar">
      <div className="add-city">
        <h4>{t("enterCity")}</h4>
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder={t("cityName")}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddCity}>{t("addCity")}</button>
        {error && <p className="error">{error}</p>}
      </div>
      <ul>
        {cities.map((city) => (
          <li key={city}>
            <span onClick={() => onCitySelect(city)}>{city}</span>
            <button
              onClick={() => handleRemoveCity(city)}
              className="remove-city"
            >
              {t("remove")}
            </button>
          </li>
        ))}
        <Link to="/contact">{t("contact")}</Link>
      </ul>
    </div>
  );
};

export default Sidebar;
