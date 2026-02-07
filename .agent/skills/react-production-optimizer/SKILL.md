---
name: React Production Optimizer
description: Optimize a React project for production, applying best practices and performance enhancements.
---

# React Production Optimizer Skill

This skill is designed to transform a development React project into a high-performance, production-ready application.

## 🛠 Prerequisites
- Node.js and npm/pnpm/yarn installed.
- A Vite + React project.
- Basic understanding of TypeScript and Tailwind CSS.

## 📋 Optimization Checklist

### 1. Code Splitting & Lazy Loading
- Use `React.lazy()` and `Suspense` for route-based splitting.
- Split large components that are not immediately visible.

### 2. Rendering Performance
- Implement `React.memo` for components with expensive renders and stable props.
- Use `useMemo` for expensive calculations.
- Use `useCallback` for functions passed as props to memoized components.

### 3. Asset Management
- Convert images to WebP/Avif.
- Use `srcset` for responsive images.
- Optimize SVG files using SVGO.

### 4. Code Quality & Standards
- Refactor large files into a modular folder structure:
  - `src/components/layout`
  - `src/components/ui`
  - `src/features/[feature-name]`
  - `src/hooks`
  - `src/services`
- Ensure 100% TypeScript coverage without `any`.

### 5. SEO & Social 
- Set up dynamic titles and meta descriptions.
- Add OpenGraph tags for social sharing.
- Ensure semantic HTML structure (h1-h6).

### 6. Production Build
- Run `npm run build` and analyze the output.
- Check for "large chunks" and use Vite's `manualChunks` to optimize vendor splitting.
- Verify environment variables are correctly handled.

## 🚀 Workflows

### Analyze Bundle
1. Install `rollup-plugin-visualizer`: `npm install --save-dev rollup-plugin-visualizer`
2. Update `vite.config.ts`:
   ```typescript
   import { visualizer } from "rollup-plugin-visualizer";
   export default defineConfig({
     plugins: [react(), visualizer({ open: true })],
   });
   ```
3. Run `npm run build` to see the bundle map.

### Quality Audit
1. Run `npm run lint`.
2. Check Lighthouse scores in Chrome DevTools.
3. Verify accessibility with `axe-core`.
