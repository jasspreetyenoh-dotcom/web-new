const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_KEY === 'your_api_key_here') {
  console.error("❌ CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET is missing or invalid in .env.local!");
  process.exit(1);
}

const sourceDirectory = path.join(__dirname, 'public', 'projects');

async function uploadFiles(dir, parentFolder = 'projects') {
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const newParent = `${parentFolder}/${item}`;
        console.log(`📁 Processing folder: ${newParent}`);
        await uploadFiles(fullPath, newParent);
      } else {
        const publicId = path.parse(item).name;
        console.log(`⬆️ Uploading file: ${item} to folder: ${parentFolder}...`);
        
        const ext = path.parse(item).ext.toLowerCase();
        // Skip hidden files like .DS_Store
        if (item.startsWith('.')) continue;

        const isVideo = ['.mp4', '.mov', '.avi', '.webm'].includes(ext);
        
        try {
            await cloudinary.uploader.upload(fullPath, {
              folder: parentFolder,
              public_id: publicId,
              resource_type: isVideo ? 'video' : 'image',
              use_filename: true,
              unique_filename: false,
              overwrite: true
            });
            console.log(`✅ Successfully uploaded: ${item}`);
        } catch (uploadError) {
            console.error(`❌ Failed to upload ${item}:`, uploadError.message);
        }
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

console.log("🚀 Starting Cloudinary Bulk Upload...");
uploadFiles(sourceDirectory).then(() => {
  console.log("🎉 Upload process finished!");
});
