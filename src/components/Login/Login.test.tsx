import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuthContext } from "../../context/AuthProvider";
import Login from "./Login";

jest.mock("../../context/AuthProvider", () => ({
  useAuthContext: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Login Component", () => {
  it("renderiza el formulario con los campos e instrucciones correctas", () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("pass")).toBeInTheDocument();
    expect(screen.getByText("signIn")).toBeInTheDocument();
  });

  it("muestra un mensaje de error cuando las credenciales son inválidas", async () => {
    const mockLogin = jest.fn().mockReturnValue(false);

    (useAuthContext as jest.Mock).mockReturnValue({
      login: mockLogin,
    });

    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("pass"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("signIn"));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith(
        "test@example.com",
        "wrongpassword"
      )
    );
    expect(screen.getByText("invalidCredentials")).toBeInTheDocument();
  });

  it("redirecciona a /home cuando el login es exitoso", async () => {
    const mockLogin = jest.fn().mockReturnValue(true);
    const mockNavigate = jest.fn();

    (useAuthContext as jest.Mock).mockReturnValue({
      login: mockLogin,
    });

    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("pass"), {
      target: { value: "correctpassword" },
    });

    fireEvent.click(screen.getByText("signIn"));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith(
        "test@example.com",
        "correctpassword"
      )
    );
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
});
