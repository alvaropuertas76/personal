# Documentación del Proyecto React + Vite

## Descripción Funcional

Este proyecto es una plantilla moderna para aplicaciones web y juegos basada en React. Proporciona una estructura base optimizada con las siguientes características:

- **Desarrollo rápido**: Configuración lista para empezar a desarrollar inmediatamente
- **Interfaz moderna**: Utiliza React 18 junto con TailwindCSS y Material UI para crear interfaces atractivas
- **Alta performance**: Vite como bundler ofrece tiempos de compilación extremadamente rápidos
- **Responsive design**: Fácil adaptación a diferentes tamaños de pantalla con TailwindCSS
- **Estructura limpia**: Organización de archivos clara y mantenible

## Descripción Técnica

### Tecnologías Principales

- **React 18**: Biblioteca de JavaScript para construir interfaces de usuario con el nuevo modelo de concurrencia
- **Vite**: Herramienta de compilación que proporciona un entorno de desarrollo extremadamente rápido
- **TailwindCSS**: Framework CSS utility-first para diseño rápido y responsivo
- **Material UI**: Biblioteca de componentes React que implementa Material Design
- **ESLint**: Herramienta de análisis estático para identificar patrones problemáticos en código JavaScript
- **JavaScript**: Lenguaje de programación principal del proyecto

### Estructura del Proyecto

```
├── src/
│   ├── App.jsx          # Componente principal de la aplicación
│   ├── main.jsx         # Punto de entrada de la aplicación
│   ├── index.css        # Estilos globales (Tailwind)
│   ├── components/      # Componentes reutilizables
│   ├── pages/           # Componentes de página
│   ├── styles/          # Estilos adicionales
│   └── utils/           # Utilidades y funciones auxiliares
├── public/              # Archivos estáticos
│   ├── assets/          # Recursos como imágenes
│   └── data/            # Archivos de datos
├── index.html           # Plantilla HTML
├── vite.config.js       # Configuración de Vite
├── tailwind.config.js   # Configuración de Tailwind
├── postcss.config.js    # Configuración de PostCSS
└── eslint.config.js     # Configuración de ESLint
```

### Flujo de Trabajo

1. `main.jsx` inicializa la aplicación React
2. `App.jsx` contiene la estructura principal de la aplicación
3. Los estilos se manejan principalmente a través de clases utilitarias de TailwindCSS
4. La configuración de Vite optimiza el proceso de desarrollo y construcción

## Instrucciones de Instalación y Ejecución

### Requisitos Previos

- Node.js (versión recomendada: 16.x o superior)
- pnpm (gestor de paquetes)

### Pasos para Ejecutar el Proyecto

1. **Clonar el repositorio** (si aplica)
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd [NOMBRE_DEL_DIRECTORIO]
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   pnpm run dev
   ```
   Esto iniciará el servidor de desarrollo de Vite, generalmente en `http://localhost:5173`

4. **Abrir en el navegador**
   Navega a `http://localhost:5173` para ver la aplicación en funcionamiento

### Comandos Disponibles

- `pnpm install` - Instalar dependencias
- `pnpm run dev` - Iniciar servidor de desarrollo
- `pnpm run lint` - Ejecutar análisis de código con ESLint
- `pnpm run build` - Compilar la aplicación para producción (los archivos se generarán en la carpeta `dist`)
- `pnpm run preview` - Previsualizar la versión de producción localmente

## Pautas de Desarrollo

- Modificar `index.html` y `src/App.jsx` según sea necesario
- Crear nuevas carpetas o archivos en el directorio `src/` según la necesidad
- Estilizar componentes utilizando las clases utilitarias de TailwindCSS
- Evitar modificar `src/main.jsx` y `src/index.css` a menos que sea absolutamente necesario
- Solo modificar `vite.config.js` si es imprescindible

## Estructura de la Aplicación

El proyecto está organizado en varias secciones:
- **Navegación**: Implementada en `Navigation.jsx`
- **Diseño general**: Manejado por `Layout.jsx`
- **Páginas principales**: 
  - Inicio (`Home.jsx`)
  - Calendario (`Calendar.jsx`)
  - Vida Profesional (`ProfessionalLife.jsx`)
  - Categorías de carreras en `pages/categories/`

## Solución de Problemas Comunes

- Si hay problemas con las dependencias, intentar `pnpm install --force`
- Para errores de compilación, verificar la consola del navegador y los logs de Vite
- En caso de problemas con HMR (Hot Module Replacement), reiniciar el servidor de desarrollo
