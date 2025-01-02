import { Server } from "socket.io";
// import { createAttack2, deleteAttackById, updateAttackById } from "../controller/crud";
// import { DTOnewLocattion } from "../DTOs/newLocation";
// import { updateForceLocationService } from "../services/forceService";
// import { createMission, updateMission } from "../services/missionService";

export const setupSocketIO = (io: Server): void => {
  io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);

    
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
