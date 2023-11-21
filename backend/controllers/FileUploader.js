const cloudinary = require('cloudinary').v2

exports.uploadMediaToCloudinary = async (file, folder, mediaType) => {
    const options = { folder };
  
    if (mediaType.startsWith('image/')) {
      options.resource_type = 'image';
    } else if (mediaType.startsWith('video/')) {
      options.resource_type = 'video';
      options.chunk_size = 6000000; // 6MB chunk size for videos
    } else if (mediaType.startsWith('audio/')) {
      options.resource_type = 'audio';
    }
  
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  };