import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getWeather } from "../../services/openWeatherService";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import "./HomePage.scss";
import { useTranslation } from "react-i18next";

interface WeatherData {
  list: {
    weather: { icon: string; description: string }[];
    main: { temp: number; temp_min: number; temp_max: number };
  }[];
}

const HomePage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleCitySelect = async (city: string) => {
    setSelectedCity(city);
    setLoading(true);
    setError(null);

    try {
      const data = await getWeather(city);
      setWeatherData(data);
    } catch {
      setError(t("errorLoadingData"));
    } finally {
      setLoading(false);
    }
  };

  const handleCityRemove = (city: string) => {
    if (city === selectedCity) {
      setSelectedCity("");
      setWeatherData(null);
    }
  };

  return (
    <div className="homepage">
      <Sidebar
        onCitySelect={handleCitySelect}
        onCityRemove={handleCityRemove}
      />
      <div className="main-content">
        <h1 className="typing-animation">{t("homepageTitle")}</h1>
        {!selectedCity && (
          <p className="suggestion">{t("homepageSuggestion")}</p>
        )}
        {loading && <h2>{t("loading")}</h2>}
        {error && <h2>{error}</h2>}
        {weatherData && selectedCity && !loading && (
          <WeatherCard
            city={selectedCity}
            icon={weatherData.list[0].weather[0].icon}
            description={weatherData.list[0].weather[0].description}
            temp={weatherData.list[0].main.temp}
            tempMin={weatherData.list[0].main.temp_min}
            tempMax={weatherData.list[0].main.temp_max}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
