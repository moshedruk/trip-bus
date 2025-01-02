import mongoose, { Schema, Document } from "mongoose";

// ממשק TypeScript המתאר את קטגוריות ההוצאות
interface ExpenseCategories {
  food: number;
  lodging: number;
  shopping: number;
  travel: number;
  other: number;
}

// ממשק TypeScript המתאר את המסמך המלא
interface ExpensesByDayDocument extends Document {
  day: string;
  expenses: ExpenseCategories;
}

// סכמת Mongoose לקטגוריות ההוצאות
const ExpenseCategoriesSchema: Schema = new Schema({
  food: { type: Number, required: true, default: 0 },
  lodging: { type: Number, required: true, default: 0 },
  shopping: { type: Number, required: true, default: 0 },
  travel: { type: Number, required: true, default: 0 },
  other: { type: Number, required: true, default: 0 },
});

// סכמת Mongoose עבור הוצאות לפי ימים
const ExpensesByDaySchema: Schema = new Schema({
  day: { type: String, required: true },
  expenses: { type: ExpenseCategoriesSchema, required: true },
});

// יצירת מודל Mongoose
const ExpensesByDay = mongoose.model<ExpensesByDayDocument>("ExpensesByDay", ExpensesByDaySchema);

export default ExpensesByDay;
