const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = {
  _handleFile(req, file, callback) {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "passion_gallery",
        allowed_formats: ["jpg", "png", "jpeg", "pdf","avif","webm","webp"],
      },
      (error, result) => {
        if (error) return callback(error);

        callback(null, {
          path: result.secure_url,
          filename: result.public_id,
          size: result.bytes,
        });
      }
    );

    file.stream.pipe(uploadStream);
  },

  _removeFile(req, file, callback) {
    cloudinary.uploader.destroy(file.filename, { invalidate: true }, callback);
  },
};

module.exports = { cloudinary, storage };
