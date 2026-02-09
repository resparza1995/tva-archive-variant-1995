# TVA Archive: Variant 1995

Portfolio interactivo inspirado en la estética de la TVA (Time Variance Authority) de la serie Loki, con una línea de tiempo dinámica.   
Desplegado con Github Actions. Puedes verlo aquí, [click](https://resparza1995.github.io/tva-archive-variant-1995/).

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
---

Desarrollado con ❤️ inspirado por el multiverso.
