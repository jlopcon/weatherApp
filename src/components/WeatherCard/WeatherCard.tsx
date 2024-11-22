import React from "react";
import { useTranslation } from "react-i18next";
import "./WeatherCard.scss";

interface WeatherCardProps {
  city: string;
  icon: string;
  description: string;
  temp: number;
  tempMin: number;
  tempMax: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  icon,
  description,
  temp,
  tempMin,
  tempMax,
}) => {
  const { t } = useTranslation();

  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={t("weatherIconAlt")}
      />
      <p>{description}</p>
      <p>{`${t("currentTemp")}: ${temp}°C`}</p>
      <p>{`${t("minTemp")}: ${tempMin}°C`}</p>
      <p>{`${t("maxTemp")}: ${tempMax}°C`}</p>
    </div>
  );
};

export default WeatherCard;
