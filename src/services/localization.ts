import { I18n } from 'i18n-js';
import { Platform, NativeModules } from 'react-native';

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
    title: 'Title',
    description: 'Description',
    taskList: 'Task List',
    noTasksFound: 'No tasks found',
    adminScreen: 'Admin Dashboard',
    markCompleted: 'Mark as Completed',
    deleteTask: 'Delete Task',
    confirmDeleteTitle: 'Delete Task',
    confirmDeleteMsg: 'Are you sure you want to delete this task?',
    cancel: 'Cancel',
    yesDelete: 'Delete',
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
    title: 'Título',
    description: 'Descripción',
    taskList: 'Lista de Tareas',
    noTasksFound: 'No se encontraron tareas',
    adminScreen: 'Panel de Administrador',
    markCompleted: 'Marcar como Completada',
    deleteTask: 'Eliminar Tarea',
    confirmDeleteTitle: 'Eliminar Tarea',
    confirmDeleteMsg: '¿Estás seguro de que deseas eliminar esta tarea?',
    cancel: 'Cancelar',
    yesDelete: 'Eliminar',
  },
};

const i18n = new I18n(translations);
let locale = 'en';

if (Platform.OS === 'ios' && NativeModules.SettingsManager) {
  locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] || 'en';
} else if (Platform.OS === 'android' && NativeModules.I18nManager) {
  locale = NativeModules.I18nManager.localeIdentifier || 'en';
} else if (Platform.OS === 'web' && typeof window !== 'undefined') {
  locale = window.navigator.language || 'en';
}

const languageCode = locale.split('-')[0];
i18n.locale = languageCode;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;