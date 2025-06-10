# Personal Website - Álvaro Puertas

Una aplicación web personal que muestra mi trayectoria deportiva, profesional y próximos retos.

## Características Principales

- 🏃‍♂️ Calendario de carreras y entrenamientos
- 💼 Sección de vida profesional
- 🌟 Zona de patrocinadores
- 📱 Integración con redes sociales
- 🌍 Soporte multiidioma (ES/EN)
- 📊 Estadísticas deportivas
- 🗺️ Mapas interactivos
- 🌤️ Integración con pronóstico del tiempo
- 📸 Galería de Instagram
- ⚡ Integración con Strava

## Estructura del Proyecto

```
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/          # Páginas principales y categorías
│   │   └── categories/ # Subcategorías de carreras
│   ├── translations/   # Archivos de idiomas
│   ├── utils/         # Servicios y utilidades
│   └── styles/        # Estilos globales
├── public/
│   ├── assets/        # Imágenes y recursos estáticos
│   └── data/         # Archivos JSON de datos
```

## Tecnologías Utilizadas

- ⚛️ React 18
- 🛠️ Vite
- 🎨 TailwindCSS
- 📱 Material UI
- 🌐 React Router
- 🌍 i18n (Internacionalización)
- 🗺️ Google Maps API
- 🌤️ OpenWeather API
- 📸 Instagram Embed
- ⚡ Strava API

## Comandos Disponibles

- `pnpm install` - Instalar dependencias
- `pnpm run dev` - Iniciar servidor de desarrollo
- `pnpm run build` - Construir para producción
- `pnpm run preview` - Previsualizar build
- `pnpm run lint` - Ejecutar linter
- `pnpm run deploy` - Desplegar en GitHub Pages

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno en un archivo `.env`:

```
VITE_OPENWEATHERMAP_API_KEY=tu_api_key
VITE_INSTAGRAM_ACCESS_TOKEN=tu_token
VITE_INSTAGRAM_USER_ID=tu_user_id
```

## Integración con APIs

- **OpenWeather**: Para pronóstico del tiempo en eventos
- **Instagram**: Para mostrar feed de fotos
- **Strava**: Para actividades deportivas
- **Google Maps**: Para visualización de mapas

## Despliegue

La aplicación está configurada para desplegarse automáticamente en GitHub Pages usando el script `deploy.js`.
