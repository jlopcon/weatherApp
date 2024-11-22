import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { getWeather } from "../../services/openWeatherService";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../services/openWeatherService");

describe("Sidebar", () => {
  const mockOnCitySelect = jest.fn();
  const mockOnCityRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the sidebar with cities", () => {
    render(
      <Router>
        <Sidebar
          onCitySelect={mockOnCitySelect}
          onCityRemove={mockOnCityRemove}
        />
      </Router>
    );

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Toronto")).toBeInTheDocument();
    expect(screen.getByText("Singapore")).toBeInTheDocument();
  });

  it("should allow adding a new city", async () => {
    (getWeather as jest.Mock).mockResolvedValueOnce({});

    render(
      <Router>
        <Sidebar
          onCitySelect={mockOnCitySelect}
          onCityRemove={mockOnCityRemove}
        />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("City name"), {
      target: { value: "New York" },
    });
    fireEvent.click(screen.getByText("Add City"));

    await waitFor(() => expect(getWeather).toHaveBeenCalledWith("New York"));
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  it("should show an error when the city already exists", async () => {
    (getWeather as jest.Mock).mockResolvedValueOnce({});

    render(
      <Router>
        <Sidebar
          onCitySelect={mockOnCitySelect}
          onCityRemove={mockOnCityRemove}
        />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("City name"), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByText("Add City"));

    await waitFor(() =>
      expect(screen.getByText("City already exists")).toBeInTheDocument()
    );
  });

  it("should remove a city when the remove button is clicked", () => {
    render(
      <Router>
        <Sidebar
          onCitySelect={mockOnCitySelect}
          onCityRemove={mockOnCityRemove}
        />
      </Router>
    );

    fireEvent.click(screen.getByText("Remove", { selector: "button" }));

    expect(mockOnCityRemove).toHaveBeenCalledWith("London");
    expect(screen.queryByText("London")).not.toBeInTheDocument();
  });

  it("should handle pressing Enter to add a city", async () => {
    (getWeather as jest.Mock).mockResolvedValueOnce({});

    render(
      <Router>
        <Sidebar
          onCitySelect={mockOnCitySelect}
          onCityRemove={mockOnCityRemove}
        />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("City name"), {
      target: { value: "Paris" },
    });
    fireEvent.keyDown(screen.getByPlaceholderText("City name"), {
      key: "Enter",
    });

    await waitFor(() => expect(getWeather).toHaveBeenCalledWith("Paris"));
    expect(screen.getByText("Paris")).toBeInTheDocument();
  });
});
