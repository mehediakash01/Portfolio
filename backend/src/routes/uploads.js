import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { uploadImageBuffer } from "../lib/cloudinary.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/image", requireAdmin, upload.single("image"), async (request, response) => {
  const file = request.file;

  if (!file) {
    return response.status(400).json({ message: "Image file is required" });
  }

  if (!file.mimetype.startsWith("image/")) {
    return response.status(400).json({ message: "Only image files are allowed" });
  }

  try {
    const uploaded = await uploadImageBuffer(file.buffer, {
      folder: process.env.CLOUDINARY_FOLDER || "portfolio-projects",
    });

    return response.status(201).json({
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    });
  } catch {
    return response.status(500).json({ message: "Failed to upload image" });
  }
});

export default router;
