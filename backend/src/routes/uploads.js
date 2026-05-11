import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { uploadImageBuffer, uploadPdfBuffer } from "../lib/cloudinary.js";

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

router.post("/pdf", requireAdmin, upload.single("pdf"), async (request, response) => {
  const file = request.file;

  if (!file) {
    return response.status(400).json({ message: "PDF file is required" });
  }

  if (!file.mimetype.includes("pdf")) {
    return response.status(400).json({ message: "Only PDF files are allowed" });
  }

  try {
    const uploaded = await uploadPdfBuffer(file.buffer, file.originalname, {
      folder: process.env.CLOUDINARY_FOLDER || "portfolio",
    });

    return response.status(201).json({
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    });
  } catch {
    return response.status(500).json({ message: "Failed to upload PDF" });
  }
});

export default router;
