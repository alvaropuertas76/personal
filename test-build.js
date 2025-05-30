// test-build.js - Script para probar la construcción y configuración de rutas
import { execSync } from 'child_process';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

// Colores para la salida en consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

console.log(`${colors.blue}=== Iniciando prueba de construcción para GitHub Pages ===${colors.reset}`);

try {
  // 1. Ejecutar la construcción
  console.log(`${colors.yellow}Paso 1: Ejecutando build...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  
  // 2. Verificar que el archivo 404.html exista en la carpeta dist
  const file404Path = join(process.cwd(), 'dist', '404.html');
  if (existsSync(file404Path)) {
    console.log(`${colors.green}✓ El archivo 404.html existe en la carpeta dist${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ El archivo 404.html NO existe en la carpeta dist${colors.reset}`);
    throw new Error('404.html no encontrado');
  }
  
  // 3. Verificar que el archivo .nojekyll exista en la carpeta dist
  const nojekyllPath = join(process.cwd(), 'dist', '.nojekyll');
  if (existsSync(nojekyllPath)) {
    console.log(`${colors.green}✓ El archivo .nojekyll existe en la carpeta dist${colors.reset}`);
  } else {
    console.log(`${colors.yellow}! El archivo .nojekyll NO existe en la carpeta dist. Creándolo...${colors.reset}`);
    writeFileSync(nojekyllPath, '');
    console.log(`${colors.green}✓ Archivo .nojekyll creado${colors.reset}`);
  }
  
  // 4. Verificar la configuración de base en index.html
  const indexPath = join(process.cwd(), 'dist', 'index.html');
  const indexContent = readFileSync(indexPath, 'utf8');
  
  if (indexContent.includes('="/personal/')) {
    console.log(`${colors.green}✓ Las rutas en index.html tienen la base "/personal/" correcta${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Las rutas en index.html NO tienen la base "/personal/" correcta${colors.reset}`);
    throw new Error('Configuración de base incorrecta en index.html');
  }
  
  // 5. Verificar que los assets tengan rutas relativas
  if (indexContent.includes('"/assets/')) {
    console.log(`${colors.red}✗ Hay rutas absolutas en index.html ("/assets/")${colors.reset}`);
    throw new Error('Se encontraron rutas absolutas de assets en index.html');
  } else {
    console.log(`${colors.green}✓ No se encontraron rutas absolutas de assets en index.html${colors.reset}`);
  }
  
  console.log(`${colors.green}=== Prueba de construcción completada con éxito ===${colors.reset}`);
  console.log(`${colors.blue}Ahora puedes desplegar en GitHub Pages con:${colors.reset} npm run deploy`);
  
} catch (error) {
  console.log(`${colors.red}=== Error en la prueba de construcción ===${colors.reset}`);
  console.error(error);
  process.exit(1);
}
