import { render, screen, fireEvent } from "@testing-library/react";
import Topbar from "./Topbar";
import { useTranslation } from "react-i18next";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("Topbar", () => {
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      i18n: { changeLanguage: jest.fn() },
    });
  });

  it("should render language select and logout button", () => {
    render(<Topbar showLogoutButton={true} onLogout={mockOnLogout} />);

    expect(screen.getByLabelText("selectLanguage")).toBeInTheDocument();
    expect(screen.getByText("logout")).toBeInTheDocument();
  });

  it("should not render logout button when showLogoutButton is false", () => {
    render(<Topbar showLogoutButton={false} />);

    expect(screen.queryByText("logout")).not.toBeInTheDocument();
  });

  it("should change language when a new option is selected", () => {
    render(<Topbar showLogoutButton={true} onLogout={mockOnLogout} />);

    fireEvent.change(screen.getByLabelText("selectLanguage"), {
      target: { value: "es" },
    });

    expect(useTranslation().i18n.changeLanguage).toHaveBeenCalledWith("es");
  });

  it("should call onLogout when logout button is clicked", () => {
    render(<Topbar showLogoutButton={true} onLogout={mockOnLogout} />);

    fireEvent.click(screen.getByText("logout"));

    expect(mockOnLogout).toHaveBeenCalled();
  });
});
