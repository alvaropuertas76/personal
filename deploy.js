// Simple script to deploy to GitHub Pages using child_process
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('Starting deployment to GitHub Pages...');

// Verify dist directory exists
const distPath = join(process.cwd(), 'dist');
if (!existsSync(distPath)) {
  console.error('Error: dist directory does not exist. Build project first with npm run build');
  process.exit(1);
}

try {
  // Change to the dist directory
  process.chdir(distPath);
  // Initialize git repo
  execSync('git init', { stdio: 'inherit' });
  
  // Configure git (if not already configured)
  try {
    execSync('git config user.name "GitHub Actions"', { stdio: 'inherit' });
    execSync('git config user.email "actions@github.com"', { stdio: 'inherit' });
  } catch (error) {
    console.log('Warning: Could not configure git user. If deployment fails, configure git manually.');
  }
    // Create .nojekyll file to bypass Jekyll processing (Windows compatible)
  try {
    execSync('type nul > .nojekyll', { stdio: 'inherit' });
  } catch (error) {
    // Fallback for PowerShell
    try {
      execSync('echo $null >> .nojekyll', { stdio: 'inherit' });
    } catch (innerError) {
      console.log('Warning: Could not create .nojekyll file. Continuing anyway...');
    }
  }
  
  // Add all files
  execSync('git add -A', { stdio: 'inherit' });
  
  // Commit
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
  
  // Push to gh-pages branch forcing update
  execSync('git push -f https://github.com/alvaropuertas76/personal.git master:gh-pages', { stdio: 'inherit' });
  
  console.log('Deployment complete!');
} catch (error) {
  console.error('Deployment error:', error.message);
}
