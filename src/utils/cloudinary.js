export function getCloudinaryUrl(localPath) {
  if (!localPath || !localPath.startsWith('/projects/')) return localPath;
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "yrmhv4p7";
  
  const isVideo = localPath.match(/\.(mp4|webm|mov|avi|mkv)$/i);
  const resourceType = isVideo ? 'video' : 'image';
  
  // Remove the leading slash and encode spaces
  const pathWithoutSlash = encodeURI(localPath.substring(1));
  
  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/v1/${pathWithoutSlash}`;
}
