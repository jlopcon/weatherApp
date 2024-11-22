import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      signIn: "Sign in",
      logout: "Logout",
      selectLanguage: "Select Language",
      loginAnimationTitle: "Welcome to WeatherApp",
      loginDescription: "Please, input yor email and password",
      email: "Email",
      pass: "Password",
      invalidCredentials: "Invalid credentials. Please try again.",
      homepageTitle: "Weather App Dashboard",
      homepageSuggestion:
        "Please select or add a city from the sidebar to view the weather.",
      loading: "Loading...",
      errorLoadingData: "Error loading weather data. Please try again.",
      enterCity: "Enter the name of the city you want to know the weather of:",
      cityName: "City Name",
      addCity: "Add City",
      remove: "Remove",
      contact: "Contact",
      cityNotFound: "City not found.",
      contactFormHeader: "Contact Form",
      name: "Name",
      birthdate: "Birthdate",
      city: "City",
      phone: "Phone",
      submit: "Submit",
      backHome: "Back to Home",
      formSuccess: "Form submitted successfully",
      formError: "Please fill out all fields correctly.",
      contactFormTitle: "Contact us",
      cityError: "Try other city",
      cityLondon: "London",
      cityToronto: "Toronto",
      citySingapore: "Singapore",
      weatherIconAlt: "Weather Icon",
      currentTemp: "Current temperature",
      minTemp: "Minimum temperature",
      maxTemp: "Maximum temperature",
    },
  },
  es: {
    translation: {
      signIn: "Iniciar Sesión",
      logout: "Cerrar sesión",
      selectLanguage: "Seleccionar idioma",
      email: "Correo electrónico",
      loginAnimationTitle: "Bienvenido a WeatherApp",
      loginDescription: "Por favor, introduce tu correo y tu contraseña",
      pass: "Contraseña",
      invalidCredentials: "Credenciales inválidas. Intente nuevamente.",
      homepageTitle: "Panel de WeatherApp",
      homepageSuggestion:
        "Por favos, selecciona o añade una ciudad en la barra lateral para ver su clima",
      loading: "Cargando...",
      errorLoadingData:
        "Error cargando el clima. Por favor intentalo de nuevo.",
      enterCity:
        "Introduce el nombre de la ciudad de la que quieres saber su clima:",
      cityName: "Ciudad",
      addCity: "Añadir ciudad",
      remove: "Eliminar",
      contact: "Contacto",
      cityNotFound: "Ciudad no encontrada.",
      contactFormHeader: "Formulario de contacto",
      name: "Nombre",
      birthdate: "Fecha de nacimiento",
      city: "Ciudad",
      phone: "Teléfono",
      backHome: "Volver a Home",
      formSuccess: "Formulario enviado correctamente",
      formError: "Por favor, completa todos los campos correctamente.",
      contactFormTitle: "Contactanos",
      cityError: "Prueba con otra ciudad",
      cityLondon: "Londres",
      cityToronto: "Toronto",
      citySingapore: "Singapur",
      weatherIconAlt: "Ícono del clima",
      currentTemp: "Temperatura actual",
      minTemp: "Temperatura mínima",
      maxTemp: "Temperatura máxima",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Idioma por defecto
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
