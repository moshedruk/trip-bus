import { Server } from "socket.io";
import ImageModel from "../models/image.model";
import ExpensesByDay from "../models/expenses.model";
// import { createAttack2, deleteAttackById, updateAttackById } from "../controller/crud";
// import { DTOnewLocattion } from "../DTOs/newLocation";
// import { updateForceLocationService } from "../services/forceService";
// import { createMission, updateMission } from "../services/missionService";

export const setupSocketIO = (io: Server): void => {
  io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);

    socket.on("fileUploaded", async (formData) => {
      
      const imageDoc = new ImageModel({
        fileName:"image",
        filePath: formData,
        fileSize: formData.length,
        uploadDate: new Date(),
      });
    
      await imageDoc.save();  // שמירה במונגו
      console.log("Image uploaded and saved successfully");
      
      console.log(formData); // כאן תוכל לטפל בקובץ, לשמור אותו וכו'
    });


    socket.on("getAllImages", async () => {
      try {
        const images = await ImageModel.find(); // משיג את כל התמונות מהדאטה בייס
  
        // המרת Buffer ל-Base64 והחזרת המידע
        const imageResponses = images.map((image) => ({
          fileName: image.fileName,
          filePath: image.filePath.toString('base64'), // המרת ה-Buffer ל-Base64
        }));
  
        // שליחה ללקוח
        io.emit("allImage", imageResponses);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    });
    socket.on("update-expenses", async (data) => {
      const { day, category, value } = data;
      const document = await ExpensesByDay.findOneAndUpdate(
        { day },
        { $set: { [`expenses.${category}`]: value } },
        { upsert: true, new: true }
      );
      io.emit("expenses-updated", document); // שידור לכל הלקוחות
    });
  
    socket.on("add-day", async (newDay) => {
      const newDocument = new ExpensesByDay({
        day: newDay,
        expenses: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 },
      });
      await newDocument.save();
      io.emit("day-added", newDocument);
    });
  
  
    
    // ניתוק
    socket.on("disconnect", () => {
      console.log(`user disconnected ${socket.id}`);
    });
  })}

