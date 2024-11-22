import { render, screen } from "@testing-library/react";
import WeatherCard from "./WeatherCard";
import { useTranslation } from "react-i18next";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("WeatherCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
  });

  it("should render weather information correctly", () => {
    render(
      <WeatherCard
        city="London"
        icon="01d"
        description="Clear Sky"
        temp={25}
        tempMin={18}
        tempMax={30}
      />
    );

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByAltText("weatherIconAlt")).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d.png"
    );
    expect(screen.getByText("Clear Sky")).toBeInTheDocument();
    expect(screen.getByText("currentTemp: 25°C")).toBeInTheDocument();
    expect(screen.getByText("minTemp: 18°C")).toBeInTheDocument();
    expect(screen.getByText("maxTemp: 30°C")).toBeInTheDocument();
  });

  it("should render correct icon and temperature values", () => {
    render(
      <WeatherCard
        city="Toronto"
        icon="02d"
        description="Few Clouds"
        temp={22}
        tempMin={15}
        tempMax={28}
      />
    );

    expect(screen.getByAltText("weatherIconAlt")).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/02d.png"
    );
    expect(screen.getByText("currentTemp: 22°C")).toBeInTheDocument();
    expect(screen.getByText("minTemp: 15°C")).toBeInTheDocument();
    expect(screen.getByText("maxTemp: 28°C")).toBeInTheDocument();
  });
});
