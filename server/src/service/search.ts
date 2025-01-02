// import AttackModel from "../models/Attack.Model";


// export const searchInTextfromDB = async (str: string) => {
//     try {
//         console.log(str)
//       const regex = new RegExp(str, "i");
//       const result = await AttackModel.find({ summary: regex }).limit(30);
//       return result;
//     } catch (error) {
//       return error;
//     }
//   };