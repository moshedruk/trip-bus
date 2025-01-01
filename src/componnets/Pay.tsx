import React, { useState } from "react";
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
} from "@mui/material";

const initialExpenses = {
  Monday: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 },
  Tuesday: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 },
  Wednesday: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 },
  Thursday: { food: 0, lodging: 0, shopping: 0, travel: 0, other: 0 },
};

const initialBudget = 1000;

export default function ExpensesTable() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [budget, setBudget] = useState(initialBudget);

  const handleInputChange = (day:any, category:any, value:any) => {
    const newExpenses = { ...expenses };
    newExpenses[day][category] = Number(value);
    setExpenses(newExpenses);
  };

  const calculateDailyTotal = (day:any) =>
    Object.values(expenses[day]).reduce((total, value) => total + value, 0);

  const calculateTotalExpenses = () =>
    Object.keys(expenses).reduce((total, day) => total + calculateDailyTotal(day), 0);

  const remainingBudget = budget - calculateTotalExpenses();

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Weekly Expenses Tracker
      </Typography>
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
                      value={expenses[day][category]}
                      onChange={(e) => handleInputChange(day, category, e.target.value)}
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
