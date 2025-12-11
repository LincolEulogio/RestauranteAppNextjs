#!/bin/bash

# Script de automatización para el proyecto Restaurant App

echo "🚀 Automatización Restaurant App"
echo "================================="

# Función para mostrar menú
show_menu() {
    echo ""
    echo "Selecciona una opción:"
    echo "1) Desarrollo - Iniciar servidor dev"
    echo "2) Build - Compilar proyecto"
    echo "3) Lint - Verificar código"
    echo "4) Type Check - Verificar tipos TypeScript"
    echo "5) Clean - Limpiar cache y node_modules"
    echo "6) Install - Instalar dependencias"
    echo "7) Update - Actualizar dependencias"
    echo "8) Test - Ejecutar tests (cuando estén disponibles)"
    echo "9) Salir"
    echo ""
}

# Función principal
main() {
    while true; do
        show_menu
        read -p "Opción: " option
        
        case $option in
            1)
                echo "🔥 Iniciando servidor de desarrollo..."
                npm run dev
                ;;
            2)
                echo "📦 Compilando proyecto..."
                npm run build
                ;;
            3)
                echo "🔍 Verificando código..."
                npm run lint
                ;;
            4)
                echo "📝 Verificando tipos TypeScript..."
                npm run type-check
                ;;
            5)
                echo "🧹 Limpiando cache..."
                rm -rf .next
                rm -rf node_modules
                echo "✅ Cache limpiado"
                ;;
            6)
                echo "📥 Instalando dependencias..."
                npm install
                ;;
            7)
                echo "⬆️ Actualizando dependencias..."
                npm update
                ;;
            8)
                echo "🧪 Tests aún no implementados"
                ;;
            9)
                echo "👋 ¡Hasta luego!"
                exit 0
                ;;
            *)
                echo "❌ Opción inválida"
                ;;
        esac
    done
}

# Ejecutar
main
