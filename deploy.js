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
  
  // Configure git
  execSync('git config user.name "alvaropuertas76"', { stdio: 'inherit' });
  execSync('git config user.email "alvaropuertas76@gmail.com"', { stdio: 'inherit' });
  execSync('git config credential.username "alvaropuertas76"', { stdio: 'inherit' });
  
  // Create .nojekyll file to bypass Jekyll processing
  try {
    execSync('type nul > .nojekyll', { stdio: 'inherit' });
  } catch (error) {
    console.log('Warning: Could not create .nojekyll file. Continuing anyway...');
  }
  
  // Add all files
  execSync('git add -A', { stdio: 'inherit' });
  
  // Force commit even if no changes
  try {
    execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
  } catch (error) {
    console.log('No changes to commit, continuing with deployment...');
  }
  
  // Push to gh-pages branch 
  try {
    // First try with HTTPS
    execSync('git remote add origin https://github.com/alvaropuertas76/personal.git', { stdio: 'inherit' });
    execSync('git push -f origin master:gh-pages', { stdio: 'inherit' });
  } catch (error) {
    console.error('Push error with HTTPS:', error.message);
    
    // Try removing remote if it exists
    try {
      execSync('git remote rm origin', { stdio: 'inherit' });
    } catch (remoteError) {
      // Ignore errors here
    }
    
    // Try with SSH as fallback
    console.log('Trying SSH authentication...');
    execSync('git remote add origin git@github.com:alvaropuertas76/personal.git', { stdio: 'inherit' });
    execSync('git push -f origin master:gh-pages', { stdio: 'inherit' });
  }
  
  console.log('Deployment complete!');
} catch (error) {
  console.error('Deployment error:', error.message);
}
