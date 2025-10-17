const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process...');

try {
    // Check if .env.production exists
    const envProdPath = path.join(__dirname, '.env.production');
    if (fs.existsSync(envProdPath)) {
        console.log('✅ Found .env.production file');
        const envContent = fs.readFileSync(envProdPath, 'utf8');
        console.log('📋 Environment variables:');
        console.log(envContent);
    } else {
        console.log('⚠️  No .env.production file found');
    }

    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Build for production
    console.log('🔨 Building for production...');
    execSync('npm run build', { stdio: 'inherit' });

    // Check if dist folder exists
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
        console.log('✅ Build completed successfully!');
        console.log('📁 Build files are in the dist/ folder');
        
        // List build files
        const files = fs.readdirSync(distPath);
        console.log('📋 Build files:');
        files.forEach(file => {
            console.log(`   - ${file}`);
        });
    } else {
        console.log('❌ Build failed - dist folder not found');
    }

} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
}