import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactForm from "./ContactForm";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/i18n";

describe("ContactForm", () => {
  const renderComponent = () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <ContactForm />
        </I18nextProvider>
      </MemoryRouter>
    );
  };

  it("renders form fields", () => {
    renderComponent();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birthdate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it("updates state on input change", () => {
    renderComponent();
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Jose" } });
    expect(nameInput.value).toBe("Jose");
  });

  it("shows error message when form is invalid", async () => {
    renderComponent();
    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/formError/i)).toBeInTheDocument();
    });
  });

  it("shows success message when form is valid", async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jose" },
    });
    fireEvent.change(screen.getByLabelText(/birthdate/i), {
      target: { value: "05/07/2001" },
    });
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: "Valencia" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jose@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "123456789" },
    });
    const submitButton = screen.getByText(/submit/i);
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/formSuccess/i)).toBeInTheDocument();
    });
  });

  it("disables submit button when form is not valid", () => {
    renderComponent();
    const submitButton = screen.getByText(/submit/i);
    expect(submitButton).toBeDisabled();
  });

  it("navigates to home on 'backHome' button click", () => {
    renderComponent();
    const backHomeButton = screen.getByText(/back to Home/i);
    fireEvent.click(backHomeButton);
    expect(window.location.pathname).toBe("/home");
  });
});
