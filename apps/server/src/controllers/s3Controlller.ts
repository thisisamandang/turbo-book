import { Response } from "express";
import s3db from "../models/s3db";
import { getObjectSignedUrl, uploadFile } from "../services/s3";

const generateFileName = () => "userImage" + Date.now().toString();

export const uploadToS3 = async (req: any, res: Response) => {
  try {
    const file = req.file;
    const email = req.body.email;
    const name = req.body.name;
    const imageName = generateFileName();
    console.log(file.buffer, email, name, imageName);
    const fileBuffer = file.buffer;
    await uploadFile(fileBuffer, imageName, file.mimetype);
    await s3db.create({
      imageName,
      email,
      name,
    });

    res.json({ message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const retrieveFromS3 = async (req: any, res: Response) => {
  try {
    const data = await s3db.findAll({ order: [["createdAt", "DESC"]] });
    const dataWithSignedUrls = await Promise.all(
      data.map(async (item: any) => {
        const signedUrl = await getObjectSignedUrl(item.imageName);
        return { item, signedUrl };
      })
    );
    res.json({ data: dataWithSignedUrls });
  } catch (error) {
    console.error("Error retrieving data from S3:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
