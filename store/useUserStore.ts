/**
 * Store de Usuario - useUserStore
 *
 * Este archivo define el estado global del usuario autenticado en la aplicación.
 * Gestiona la información del usuario y su sesión utilizando Zustand con persistencia.
 *
 * El estado se persiste en localStorage bajo la clave "user-storage",
 * permitiendo mantener la sesión del usuario entre recargas de página.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Interfaz User
 *
 * Define la estructura de los datos del usuario.
 *
 * @property {string} name - Nombre completo del usuario
 * @property {string} [email] - Correo electrónico del usuario (opcional)
 */
interface User {
  name: string;
  email?: string;
}

/**
 * Interfaz UserState
 *
 * Define la estructura del estado del usuario y las acciones disponibles.
 *
 * @property {User | null} user - Datos del usuario autenticado o null si no hay sesión
 * @property {Function} setUser - Función para establecer o limpiar los datos del usuario
 */
interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

/**
 * Hook useUserStore
 *
 * Store para gestionar el estado del usuario autenticado.
 * Proporciona acceso a los datos del usuario y funciones para actualizar la sesión.
 *
 * El estado se persiste automáticamente en localStorage.
 *
 * @example
 * const { user, setUser } = useUserStore();
 *
 * // Iniciar sesión
 * setUser({ name: "Juan Pérez", email: "juan@example.com" });
 *
 * // Cerrar sesión
 * setUser(null);
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null, // Estado inicial: sin usuario autenticado

      /**
       * Establece o limpia los datos del usuario
       *
       * @param {User | null} user - Datos del usuario a guardar, o null para cerrar sesión
       */
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage", // Nombre de la clave en localStorage
    },
  ),
);
