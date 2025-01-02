import { Server } from "socket.io";
import ImageModel from "../models/image.model";
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
    // // עדכון מיקום
    // socket.on("newTeror", async (data: any, callback) => {
    //     try {
    //       const newTerror = await createAttack2(data);
    //       console.log(newTerror);
    //       callback({
    //         success: true,
    //         message: "Event created successfully",
    //         result: newTerror,
    //       });
    //       io.emit("newatack", newTerror)
    //     } catch (error) {
    //       callback({ success: false, error: (error as Error).message });
    //     }
    //   });
    
    // socket.on("delete", async (id:any ,callback)  => {
    //   try {
    //     const updatedMission = await deleteAttackById(id)    
    //     callback({ success: true, message: "Attack deleted successfully"})       
    //     io.emit("mission_updated", updatedMission);
    //     console.log("updated",updatedMission,"updated")
    //   } catch (err) {
    //     console.error(err);
    //     callback({ success: false, error: (err as Error).message });        
    //   }
    // });

    // socket.on("update", async ( id, data,callback ) => {
    //   try {
    //     const updatedMission = await updateAttackById(id,data);
    //     callback({ success: true, message: "Attack updated successfully" });
    //     io.emit("mission_updated", updatedMission);
    //   } catch (err) {
    //     console.error(err);
    //     callback({ success: false, error: (err as Error).message });
    //   }
    // });

    // ניתוק
    socket.on("disconnect", () => {
      console.log(`user disconnected ${socket.id}`);
    });
  });
};
