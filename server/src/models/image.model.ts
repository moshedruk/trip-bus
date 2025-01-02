import mongoose, { Schema, Document } from "mongoose";

// ממשק TypeScript לתמונות
interface ImageDocument extends Document {
  fileName: string; // שם התמונה
  filePath: Buffer; // מיקום הקובץ (URL או נתיב בשרת)
  fileSize: number; // גודל הקובץ (בבתים)
  uploadDate: Date; // תאריך העלאה
  uploadedBy?: string; // מזהה משתמש (אופציונלי)
}

// סכמת Mongoose לתמונות
const ImageSchema: Schema = new Schema({
  fileName: { type: String, required: true },
  filePath: { type: Buffer, required: true },
  fileSize: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
  uploadedBy: { type: String }, // ניתן לשמור את מזהה המשתמש שהעלה את התמונה
});

// יצירת מודל Mongoose
const ImageModel = mongoose.model<ImageDocument>("Image", ImageSchema);

export default ImageModel;
