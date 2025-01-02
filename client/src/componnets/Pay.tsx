import { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  TableFooter,
  Button,
} from "@mui/material";
import { socket } from "../main";




interface ExpenseCategories {
  food: number;
  lodging: number;
  shopping: number;
  travel: number;
  other: number;
}

interface ExpensesByDay {
  [day: string]: ExpenseCategories;
}

const initialExpenses: ExpensesByDay = {
  Monday: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 },
  Tuesday: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 },
  Wednesday: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 },
  Thursday: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 },
};

const initialBudget: number = 1000;

export default function ExpensesTable(): JSX.Element {
  const [expenses, setExpenses] = useState<ExpensesByDay>(initialExpenses);
  const [budget, setBudget] = useState<number>(initialBudget);

  useEffect(() => {
    // התחברות לשרת ועדכון ההוצאות הראשוניות
    socket.on("expenses-updated", (updatedExpenses: ExpensesByDay) => {
      setExpenses(updatedExpenses);
    });

    socket.on("day-added", (newDay: { day: string; categories: ExpenseCategories }) => {
      setExpenses((prev) => ({ ...prev, [newDay.day]: newDay.categories }));
    });

    return () => {
      socket.off("expenses-updated");
      socket.off("day-added");
    };
  }, []);

  const handleInputChange = (
    day: string,
    category: keyof ExpenseCategories,
    value: string
  ): void => {
    const newExpenses: ExpensesByDay = { ...expenses };
    newExpenses[day][category] = Number(value);
    setExpenses(newExpenses);
    socket.emit("update-expenses", { day, category, value: Number(value) });
  };

  const addNewDay = (): void => {
    const newDayName = prompt("Enter the name of the new day:");
    if (newDayName) {
      const newDay = { day: newDayName, categories: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 } };
      socket.emit("add-day", newDay);
    }
  };

  const calculateDailyTotal = (day: string): number =>
    Object.values(expenses[day]).reduce((total, value) => total + value, 0);

  const calculateTotalExpenses = (): number =>
    Object.keys(expenses).reduce((total, day) => total + calculateDailyTotal(day), 0);

  const remainingBudget: number = budget - calculateTotalExpenses();

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Weekly Expenses Tracker
      </Typography>
      <Button variant="contained" color="primary" onClick={addNewDay} sx={{ marginBottom: "20px" }}>
        Add New Day
      </Button>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "0 auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Food</TableCell>
              <TableCell>Lodging</TableCell>
              <TableCell>Shopping</TableCell>
              <TableCell>Travel</TableCell>
              <TableCell>Other</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(expenses).map((day) => (
              <TableRow key={day}>
                <TableCell>{day}</TableCell>
                {Object.keys(expenses[day]).map((category) => (
                  <TableCell key={category}>
                    <TextField
                      type="number"
                      size="small"
                      value={expenses[day][category as keyof ExpenseCategories]}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(
                          day,
                          category as keyof ExpenseCategories,
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                ))}
                <TableCell>{calculateDailyTotal(day)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} align="right">
                <strong>Total Expenses</strong>
              </TableCell>
              <TableCell>{calculateTotalExpenses()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} align="right">
                <strong>Starting Budget</strong>
              </TableCell>
              <TableCell>{budget}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} align="right">
                <strong>Remaining Budget</strong>
              </TableCell>
              <TableCell>{remainingBudget}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
