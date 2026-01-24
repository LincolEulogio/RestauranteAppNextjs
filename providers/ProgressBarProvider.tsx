/**
 * Proveedor de Barra de Progreso - ProgressBarProvider
 * 
 * Este componente proporciona una barra de progreso visual en la parte superior de la página
 * que se muestra durante las transiciones de navegación en Next.js.
 * 
 * Utiliza next-nprogress-bar para mostrar un indicador de carga cuando el usuario
 * navega entre páginas, mejorando la experiencia de usuario al dar feedback visual.
 */

'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

/**
 * Componente ProgressBarProvider
 * 
 * Envuelve la aplicación y agrega una barra de progreso que se muestra automáticamente
 * durante las navegaciones entre rutas.
 * 
 * Configuración:
 * - Altura: 4px
 * - Color: Azul (#3b82f6 - blue-500 de Tailwind)
 * - Sin spinner de carga
 * - Shallow routing habilitado para navegación más rápida
 * 
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos de la aplicación
 * @returns {JSX.Element} Proveedor con barra de progreso
 * 
 * @example
 * <ProgressBarProvider>
 *   <App />
 * </ProgressBarProvider>
 */
const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <ProgressBar
                height="4px"              // Altura de la barra de progreso
                color="#3b82f6"           // Color azul de Tailwind (blue-500)
                options={{ showSpinner: false }}  // Oculta el spinner circular
                shallowRouting            // Habilita navegación shallow para mejor rendimiento
            />
        </>
    );
};

export default ProgressBarProvider;
