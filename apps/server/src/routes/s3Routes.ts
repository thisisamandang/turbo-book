import express from "express";
import { retrieveFromS3, uploadToS3 } from "../controllers/s3Controlller";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/upload", upload.single("image"), uploadToS3);
router.get("/get", retrieveFromS3);
export default router;
