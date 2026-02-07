# TVA Archive: Variant 1995

Un portfolio interactivo inspirado en la estética de la TVA (Time Variance Authority) de la serie Loki, con una línea de tiempo dinámica y efectos visuales premium. Representa el registro temporal de Rafa Esparza.

## 🚀 Tecnologías Principales

- **Framework:** [React 18](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)

---

## 🛠️ Desarrollo (Levantar localmente)

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd portfolio-line
   ```

2. **Instalar dependencias:**
   Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El proyecto estará disponible en `http://localhost:5173`.

4. **Linting (Opcional):**
   Para verificar errores de código:
   ```bash
   npm run lint
   ```

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

## 🌐 Opciones de Despliegue

### 1. Vercel (Recomendado)
Es la forma más rápida para proyectos de React/Vite.
- Conecta tu repositorio de GitHub a [Vercel](https://vercel.com/).
- Vercel detectará automáticamente la configuración de Vite y desplegará cada commit.

### 2. GitHub Pages
Si deseas desplegarlo en GitHub Pages, puedes usar el paquete `gh-pages` o configurar una GitHub Action.
> **Nota:** Asegúrate de ajustar el `base` en `vite.config.ts` si el proyecto no está en la raíz del dominio.

### 3. Servidor Estático (Nginx/Apache)
Basta con subir el contenido de la carpeta `dist/` a tu servidor.

---

## 📄 Estructura del Proyecto

El proyecto ha sido refactorizado siguiendo una arquitectura modular para mejorar la mantenibilidad y el rendimiento:

```text
src/
├── components/          # Componentes de la interfaz reutilizables
│   ├── Header.tsx       # Cabecera con identidad visual y redes
│   ├── Timeline.tsx     # Lógica central de la línea de tiempo interactiva
│   ├── EventModal.tsx   # Modal detallado de eventos con Framer Motion
│   └── SummarySection.tsx # Sección de resumen y estadísticas finales
├── data/                # Datos estáticos y configuración
│   └── timeline.ts      # Listado de eventos y constantes de layout
├── types/               # Definiciones de TypeScript
│   └── timeline.ts      # Interfaces y tipos del dominio
├── utils/               # Funciones de utilidad
│   └── timeline.ts      # Cálculos matemáticos y generadores de paths SVG
├── App.tsx              # Componente raíz (Orquestador)
├── main.tsx             # Punto de entrada de la aplicación
└── index.css            # Estilos globales y tokens de diseño
```

## ✨ Buenas Prácticas Aplicadas

- **Tipado Estricto:** Uso de interfaces de TypeScript para todos los datos y props.
- **Modularidad:** Separación clara entre datos, lógica de visualización y componentes UI.
- **Optimización de Renderizado:** Animaciones suaves mediante `framer-motion` con transiciones optimizadas.
- **SEO & Accesibilidad:** Títulos semánticos, meta-descripciones y uso de SVGs para una escalabilidad perfecta.
- **Diseño Premium:** Uso de glassmorphism, gradientes avanzados y micro-interacciones (Loki/TVA Style).

---

Desarrollado con ❤️ inspirado por el multiverso.
