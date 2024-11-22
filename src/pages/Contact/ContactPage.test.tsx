import { render, screen } from "@testing-library/react";
import ContactPage from "./ContactPage";
import { useTranslation } from "react-i18next";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("../../components/ContactForm/ContactForm", () => {
  return jest.fn(() => <div>Contact Form</div>);
});

describe("ContactPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });
  });

  it("should render the contact page with the contact form", () => {
    render(<ContactPage />);

    expect(screen.getByText("contactFormTitle")).toBeInTheDocument();
    expect(screen.getByText("Contact Form")).toBeInTheDocument();
  });

  it("should call translation function with correct key", () => {
    render(<ContactPage />);

    expect(useTranslation).toHaveBeenCalled();
    expect(useTranslation().t).toHaveBeenCalledWith("contactFormTitle");
  });
});
