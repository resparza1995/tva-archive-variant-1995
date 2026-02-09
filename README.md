# TVA Archive: Variant 1995

Portfolio interactivo inspirado en la estética de la TVA (Time Variance Authority) de la serie Loki, con una línea de tiempo dinámica.   
Desplegado con Github Actions. Puedes verlo aquí, [click](https://resparza1995.github.io/tva-archive-variant-1995/).

## 🚀 Tecnologías Principales

- **Framework:** [React 18](https://reactjs.org/)
- **Visualización 3D:** [Three.js](https://threejs.org/) con [@react-three/fiber](https://r3f.docs.pmnd.rs/)
- **Efectos Visuales:** Post-procesamiento (Bloom, Glamour) para estética cinematográfica
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)

---

## 🏗️ Arquitectura de Visualización

La aplicación implementa un sistema híbrido de visualización que permite al usuario alternar entre dos modos:

1.  **Modo 2D (Precision View):** Una interfaz SVG interactiva optimizada para lectura y navegación clásica, utilizando Framer Motion para transiciones fluidas.
2.  **Modo 3D (Loom View):** Una representación esférica inmersiva construida con Three.js donde los eventos fluyen como nodos brillantes en el tejido temporal, con efectos de post-procesado para lograr el brillo de neón característico.

---

## 🛠️ Desarrollo (Levantar localmente)

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    El proyecto estará disponible en `http://localhost:5173`.

---

## 📦 Producción (Build y Despliegue)

### Generar la Build
Para crear una versión optimizada para producción:

```bash
npm run build
```

Este comando generará una carpeta `dist/` con los archivos estáticos listos para ser servidos.

### Previsualizar la Build
Si quieres probar la versión de producción localmente antes de desplegar:

```bash
npm run preview
```
---

## 📄 Estructura del Proyecto

El proyecto sigue una estructura modular diseñada para separar la lógica de negocio, la visualización y la gestión de estados:

```text
src/
├── components/           # Componentes de la interfaz
│   ├── Header.tsx        # Identidad visual y navegación
│   ├── Timeline.tsx      # Motor de visualización 2D (SVG)
│   ├── TimelineSphere.tsx # Motor de visualización 3D (Three.js)
│   ├── EventModal.tsx    # Detalle de eventos mediante Framer Motion
│   ├── SummarySection.tsx # Panel de estadísticas y hoja de servicio
│   └── OrientationOverlay.tsx # Gestión de experiencia en dispositivos móviles
├── hooks/                # Hooks personalizados
│   └── useTimelineDimensions.ts # Gestión reactiva de dimensiones y responsividad
├── data/                 # Capa de datos
│   └── timeline.ts       # Cronología de eventos y configuración del "Temporal Loom"
├── types/                # Definiciones de tipos robustas
│   └── timeline.ts       # Interfaces del dominio de la línea de tiempo
├── utils/                # Utilidades y cálculos
│   └── timeline.ts       # Algoritmos de posicionamiento y trazado de rutas
├── App.tsx               # Orquestador principal y gestor de estado global
├── main.tsx              # Punto de entrada
├── index.css             # Estilos globales y fuentes
└── tailwind.config.js     # Configuración del Design System y tokens (Loki Theme)
```
---

Desarrollado con ❤️ inspirado por el multiverso.
