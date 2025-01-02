import Joi from 'joi';
import { Terror } from '../DTOs/Terror';

// הגדרת הסכמה לוולידציה
const terrorSchema = Joi.object({
  iyear: Joi.required(), // וולידציה לשנה בצורה של מיתר (4 תו)
  imonth: Joi.required(), // וולידציה לחודש בצורה של מיתר (2 תו)
  region_txt: Joi.required(), // וולידציה לאזורים (מינימום 3 תווים)
  attacktype1_txt: Joi.required(), // וולידציה לסוג התקיפה
  gname: Joi.required(), // וולידציה לשם הקבוצה
  nkill: Joi.required(), // וולידציה למספר ההרוגים (מספר חיובי)
  nwound: Joi.required(), // וולידציה למספר הפצועים (מספר חיובי)
  city: Joi.required(), // וולידציה לעיר
  country_txt: Joi.required(), // וולידציה למדינה

  latitube: Joi.required(), // וולידציה לקואורדינטה של latitude
  longitude: Joi.required(), // וולידציה לקואורדינטה של longitude
});

// פונקציה שתבצע את הוולידציה
export const validateTerror = (terror: Terror) => {
  const { error } = terrorSchema.validate(terror);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
export const sanitizeInput = (input: any) => {
  const numericFields = [
    "eventid",
    "iyear",
    "imonth",
    "iday",
    "latitude",
    "longitude",
    "nkill",
    "nwound",
    "ransomamt",
  ];
  const sanitizedInput = { ...input };
  numericFields.forEach((field) => {
    if (field in sanitizedInput && sanitizedInput[field] !== null && sanitizedInput[field] !== "") {
      const parsedValue = parseInt(sanitizedInput[field]);
      sanitizedInput[field] = isNaN(parsedValue) ? sanitizedInput[field] : parsedValue; // שמירה על ערך המקורי אם לא מספר
    }
  });

  return sanitizedInput;
};