// build-utils.js - Script para copiar archivos después del build
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

// Rutas
const distDir = join(process.cwd(), 'dist');
const srcFile = join(distDir, 'index.html');
const destFile = join(distDir, '200.html');
const nojekyllFile = join(distDir, '.nojekyll');

// Verificar que el directorio de destino exista
if (!existsSync(dirname(destFile))) {
  mkdirSync(dirname(destFile), { recursive: true });
}

// Copiar index.html a 200.html para Netlify/Surge
try {
  copyFileSync(srcFile, destFile);
  console.log('✅ Successfully copied index.html to 200.html');
} catch (error) {
  console.error('❌ Error copying index.html to 200.html:', error);
}

// Crear archivo .nojekyll para GitHub Pages
try {
  writeFileSync(nojekyllFile, '');
  console.log('✅ Successfully created .nojekyll file');
} catch (error) {
  console.error('❌ Error creating .nojekyll file:', error);
}

console.log('🚀 Build post-processing completed successfully!');
