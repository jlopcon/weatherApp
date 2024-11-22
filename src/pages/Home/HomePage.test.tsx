import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import { getWeather } from "../../services/openWeatherService";
import { useTranslation } from "react-i18next";

jest.mock("../../components/Sidebar/Sidebar", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Sidebar</div>),
}));

jest.mock("../../components/WeatherCard/WeatherCard", () => ({
  __esModule: true,
  default: jest.fn(() => <div>WeatherCard</div>),
}));

jest.mock("../../services/openWeatherService", () => ({
  getWeather: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
  });

  it("should render the homepage with a sidebar and loading state", () => {
    render(<HomePage />);

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("homepageTitle")).toBeInTheDocument();
    expect(screen.getByText("homepageSuggestion")).toBeInTheDocument();
  });

  it("should handle city selection and display weather data", async () => {
    const mockWeatherData = {
      list: [
        {
          weather: [{ icon: "01d", description: "Clear sky" }],
          main: { temp: 25, temp_min: 20, temp_max: 30 },
        },
      ],
    };
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<HomePage />);

    const selectCityButton = screen.getByText("Sidebar");
    fireEvent.click(selectCityButton);

    await waitFor(() => expect(getWeather).toHaveBeenCalledTimes(1));
    expect(screen.getByText("WeatherCard")).toBeInTheDocument();
  });

  it("should show error message if weather data fails to load", async () => {
    (getWeather as jest.Mock).mockRejectedValue(new Error("Network error"));

    render(<HomePage />);

    const selectCityButton = screen.getByText("Sidebar");
    fireEvent.click(selectCityButton);

    await waitFor(() => expect(getWeather).toHaveBeenCalledTimes(1));
    expect(screen.getByText("errorLoadingData")).toBeInTheDocument();
  });

  it("should handle city removal and reset weather data", () => {
    const mockWeatherData = {
      list: [
        {
          weather: [{ icon: "01d", description: "Clear sky" }],
          main: { temp: 25, temp_min: 20, temp_max: 30 },
        },
      ],
    };
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    render(<HomePage />);

    const selectCityButton = screen.getByText("Sidebar");
    fireEvent.click(selectCityButton);

    const removeCityButton = screen.getByText("remove");
    fireEvent.click(removeCityButton);

    expect(screen.queryByText("WeatherCard")).not.toBeInTheDocument();
  });
});
