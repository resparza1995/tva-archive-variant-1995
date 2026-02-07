# 📋 Tareas Pendientes - Portfolio Loki

Este documento detalla los próximos pasos y mejoras para el proyecto de la línea de tiempo interactiva.

## Calidad de codigo
- [ ] Mejorar la organizacion del codigo, para que no este todo en un solo archivo.
- [ ] Actualizar el readme con informacion sobre versiones del proyecto.
- [ ] Revisar si se pueden optimizar las dependencias del proyecto.o

## 🛠️ Mejoras de UI/UX
- [ ] **Ajustar las tarjetas de cada punto**:
    - [ ] Refinar los márgenes y paddings internos.
    - [ ] Asegurar que el contraste de texto sea óptimo sobre el fondo glassmorphic.
    - [ ] Corregir la visualización de markdown (ej. negritas `**`) en las descripciones.
    - [ ] Optimizar la respuesta responsiva en pantallas pequeñas.

## 🚀 Despliegue y Git
- [ ] **Subir a GitHub**:
    - [ ] Inicializar el repositorio local: `git init`.
    - [ ] Crear el repositorio en GitHub.
    - [ ] Vincular y hacer el primer push: `git push -u origin main`.
- [ ] **Dominio y Hosting**:
    - [ ] Investigar disponibilidad de dominios personalizados.
    - [ ] Configurar el despliegue automático.
    - [ ] **Opción A (GitHub Pages)**: Configurar `vite.config.ts` y usar `gh-pages`.
    - [ ] **Opción B (Vercel/Netlify)**: Conectar el repositorio para despliegue continuo (recomendado por facilidad de manejo de rutas).

## 📝 Notas Adicionales
- Revisar que el PDF del CV esté actualizado antes del despliegue final.
- Verificar que los iconos de `lucide-react` carguen correctamente en la build de producción.
