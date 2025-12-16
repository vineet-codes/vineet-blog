/**
 * Image Optimization Script
 * 
 * This script processes all images in the public folder:
 * 1. Converts PNG/JPG images to WebP format (smaller file size)
 * 2. Resizes images larger than MAX_WIDTH to optimize for web
 * 3. Preserves original files and creates optimized WebP versions
 * 
 * Usage: npm run optimize:images
 */

import sharp from 'sharp';
import { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const PUBLIC_DIR = './public';
const MAX_WIDTH = 1400; // Max image width for blog posts
const WEBP_QUALITY = 82; // WebP quality (0-100)

interface OptimizationResult {
  file: string;
  originalSize: number;
  optimizedSize: number;
  savings: number;
  skipped?: boolean;
}

function findImages(dir: string): string[] {
  const images: string[] = [];
  
  if (!existsSync(dir)) {
    return images;
  }

  const files = readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    
    if (statSync(fullPath).isDirectory()) {
      images.push(...findImages(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(file) && !file.includes('.optimized.')) {
      images.push(fullPath);
    }
  }
  
  return images;
}

async function optimizeImage(imagePath: string): Promise<OptimizationResult> {
  const ext = path.extname(imagePath);
  const baseName = path.basename(imagePath, ext);
  const dir = path.dirname(imagePath);
  const webpPath = path.join(dir, `${baseName}.webp`);
  
  const originalStats = statSync(imagePath);
  const originalSize = originalStats.size;

  // Check if WebP already exists and is newer than source
  if (existsSync(webpPath)) {
    const webpStats = statSync(webpPath);
    if (webpStats.mtimeMs >= originalStats.mtimeMs) {
      return {
        file: imagePath,
        originalSize,
        optimizedSize: webpStats.size,
        savings: Math.round((1 - webpStats.size / originalSize) * 100),
        skipped: true
      };
    }
  }

  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    let pipeline = image;
    
    // Resize if larger than MAX_WIDTH
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Convert to WebP
    await pipeline
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);
    
    const optimizedStats = statSync(webpPath);
    const optimizedSize = optimizedStats.size;
    const savings = Math.round((1 - optimizedSize / originalSize) * 100);
    
    return {
      file: imagePath,
      originalSize,
      optimizedSize,
      savings
    };
  } catch (error) {
    console.error(`❌ Error processing ${imagePath}:`, error);
    throw error;
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');
  
  const images = findImages(PUBLIC_DIR);
  
  if (images.length === 0) {
    console.log('No images found to optimize.');
    return;
  }
  
  console.log(`Found ${images.length} image(s) to process...\n`);
  
  const results: OptimizationResult[] = [];
  let totalOriginal = 0;
  let totalOptimized = 0;
  let skippedCount = 0;
  
  for (const imagePath of images) {
    process.stdout.write(`Processing ${path.basename(imagePath)}... `);
    
    try {
      const result = await optimizeImage(imagePath);
      results.push(result);
      totalOriginal += result.originalSize;
      totalOptimized += result.optimizedSize;
      
      if (result.skipped) {
        skippedCount++;
        console.log('⏭️  skipped (up to date)');
      } else {
        console.log(`✅ ${formatBytes(result.originalSize)} → ${formatBytes(result.optimizedSize)} (${result.savings}% saved)`);
      }
    } catch (error) {
      console.log('❌ failed');
    }
  }
  
  console.log('\n================================');
  console.log('📊 Summary:');
  console.log(`   Images processed: ${results.length - skippedCount}`);
  console.log(`   Images skipped: ${skippedCount}`);
  console.log(`   Original total: ${formatBytes(totalOriginal)}`);
  console.log(`   Optimized total: ${formatBytes(totalOptimized)}`);
  console.log(`   Total savings: ${formatBytes(totalOriginal - totalOptimized)} (${Math.round((1 - totalOptimized / totalOriginal) * 100)}%)`);
  console.log('\n💡 Tip: Update your markdown to use .webp extension for optimized images');
}

main().catch(console.error);

