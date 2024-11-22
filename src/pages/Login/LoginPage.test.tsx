import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { useAuthContext } from "../../context/AuthProvider";

import { useTranslation } from "react-i18next";

jest.mock("../../components/Login/Login", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Login</div>),
}));

jest.mock("../../context/AuthProvider", () => ({
  useAuthContext: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
  });

  it("should render login page when user is not logged in", () => {
    (useAuthContext as jest.Mock).mockReturnValue({ loggedIn: false });

    render(<LoginPage />);

    expect(screen.getByText("loginAnimationTitle")).toBeInTheDocument();
    expect(screen.getByText("signIn")).toBeInTheDocument();
    expect(screen.getByText("loginDescription")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should redirect to /home when user is logged in", () => {
    (useAuthContext as jest.Mock).mockReturnValue({ loggedIn: true });

    render(<LoginPage />);

    expect(screen.queryByText("loginAnimationTitle")).not.toBeInTheDocument();
    expect(screen.queryByText("signIn")).not.toBeInTheDocument();
    expect(screen.queryByText("loginDescription")).not.toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.getByText("home")).toBeInTheDocument();
  });
});
