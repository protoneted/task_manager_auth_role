import { I18n } from 'i18n-js';
import { Platform, NativeModules } from 'react-native'; // Import NativeModules for locale
// 7. Localization: Support for at least two languages using i18n-js
const translations = {
  en: {
    tasks: 'Tasks',
    errors: 'Errors',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    required: 'This field is required.',
    welcomeBack: 'Welcome back!',
    username: 'Username',
    password: 'Password',
    loginError: 'Invalid credentials. Try "admin" or "member".',
    addTask: 'Add Task',
    taskTitle: 'Task Title',
    taskDesc: 'Description',
    save: 'Save',
    serverErrorTitle: 'Server Error',
    serverErrorMsg: 'An unexpected server error occurred (5xx). Please try again later.',
  },
  es: {
    tasks: 'Tareas',
    errors: 'Errores',
    signIn: 'Iniciar Sesión',
    signOut: 'Cerrar Sesión',
    required: 'Este campo es obligatorio.',
    welcomeBack: '¡Bienvenido de nuevo!',
    username: 'Nombre de usuario',
    password: 'Contraseña',
    loginError: 'Credenciales inválidas. Intente "admin" o "member".',
    addTask: 'Agregar Tarea',
    taskTitle: 'Título de la Tarea',
    taskDesc: 'Descripción',
    save: 'Guardar',
    serverErrorTitle: 'Error del Servidor',
    serverErrorMsg: 'Ocurrió un error inesperado del servidor (5xx). Por favor intente más tarde.',
  },
};

const i18n = new I18n(translations);
let locale = 'en'; // Default fallback

// Use NativeModules (core React Native functionality) to get the locale
// This method is generally stable even in incompatible environments
if (Platform.OS === 'ios' && NativeModules.SettingsManager) {
  // iOS path
  locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] || 'en';
} else if (Platform.OS === 'android' && NativeModules.I18nManager) {
  // Android path
  locale = NativeModules.I18nManager.localeIdentifier || 'en';
} else if (Platform.OS === 'web' && typeof window !== 'undefined') {
  // Web path
  locale = window.navigator.language || 'en';
}

// Extract the language code (e.g., 'en-US' -> 'en')
const languageCode = locale.split('-')[0];
// Set the locale once at startup
i18n.locale = languageCode;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;