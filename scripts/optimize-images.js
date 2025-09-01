#!/usr/bin/env node

/**
 * Image optimization script
 * This script helps identify and suggest optimizations for project images
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const PROJECTS_DIR = path.join(PUBLIC_DIR, 'projects');

function getImageInfo(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    return {
      path: filePath,
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024),
      extension: ext,
      isImage: ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)
    };
  } catch (error) {
    return null;
  }
}

function scanDirectory(dir) {
  const images = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        images.push(...scanDirectory(fullPath));
      } else {
        const info = getImageInfo(fullPath);
        if (info && info.isImage) {
          images.push(info);
        }
      }
    }
  } catch (error) {
    console.warn(`Could not scan directory: ${dir}`);
  }
  
  return images;
}

function analyzeImages() {
  console.log('🔍 Analyzing project images...\n');
  
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.log('📁 No projects directory found. Creating structure...');
    console.log('You should organize your images like this:');
    console.log('public/');
    console.log('  projects/');
    console.log('    project-name/');
    console.log('      banner.png');
    console.log('      screenshot-01.png');
    console.log('      screenshot-02.png');
    return;
  }
  
  const images = scanDirectory(PROJECTS_DIR);
  
  if (images.length === 0) {
    console.log('📷 No images found in projects directory.');
    return;
  }
  
  console.log(`📊 Found ${images.length} images:\n`);
  
  let totalSize = 0;
  const largeImages = [];
  
  images.forEach(img => {
    const relativePath = path.relative(PUBLIC_DIR, img.path);
    console.log(`  ${relativePath} - ${img.sizeKB}KB`);
    
    totalSize += img.size;
    
    // Flag images larger than 500KB
    if (img.sizeKB > 500) {
      largeImages.push(img);
    }
  });
  
  console.log(`\n📈 Total size: ${Math.round(totalSize / 1024)}KB`);
  
  if (largeImages.length > 0) {
    console.log('\n⚠️  Large images detected (>500KB):');
    largeImages.forEach(img => {
      const relativePath = path.relative(PUBLIC_DIR, img.path);
      console.log(`  ${relativePath} - ${img.sizeKB}KB`);
    });
    
    console.log('\n💡 Optimization suggestions:');
    console.log('  1. Convert large PNG files to WebP format');
    console.log('  2. Compress JPEG images to 80-85% quality');
    console.log('  3. Resize images to appropriate dimensions');
    console.log('  4. Use tools like ImageOptim, TinyPNG, or Squoosh');
  } else {
    console.log('\n✅ All images are reasonably sized!');
  }
  
  console.log('\n🚀 Next.js will automatically optimize these images when using the Image component.');
}

// Run the analysis
analyzeImages();