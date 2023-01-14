import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Autocomplete,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  MainContainer: {
    width: "100vw",
    maxHeight: "100vh",
    overflowX: "hidden",
    backgroundColor: "#fff",
  },
  InnerContainer: {
    width: "80.15%",
    backgroundColor: "white",
    margin: "auto",
  },
  FirstContainer: {
    minHeight: "8.2vh !important",
    width: "100%",
  },
  AppTitle: {
    fontSize: "35px !important",
    fontWeight: "700 !important",
    marginBottom: "10px",
  },
  SecondContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    minHeight: "10.2vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  InlineBox: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "30%",
    },
    marginTop: "2vh",
    minHeight: "10vh",
    backgroundColor: "skyblue",
    borderRadius: "4.5px",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "center",
  },
  ThirdContainer: {
    minHeight: "auto",
  },
  Input: {
    width: "100%",
    borderRadius: 4,
    marginBottom: "2vh !important",
  },
  Table: {
    border: "1px solid #b0b0b0",
    borderRadius: 4,
  },
  Expenses: {
    fontSize: "24px !important",
    fontWeight: "700 !important",
    paddingTop: "28px",
    paddingBottom: "3px",
  },
  CostStyle: {
    backgroundColor: "dodgerblue",
    paddingInline: "9px",
    paddingBlock: "1.5px",
    borderRadius: 25,
    color: "white",
    fontWeight: "800",
  },
  LastInputsContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      height: "22vh !important",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    justifyContent: "space-between",
  },
  LastInput: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "34vw",
    },
    height: "30px",
    borderRadius: 4,
    border: "1px solid #b0b0b0",
    marginBottom: "15px",
    "& .MuiOutlinedInput-input": {
      // height: "0.275rem",
    },
  },
}));

export default function App() {
  const localData = localStorage.getItem("jsonn")
    ? JSON.parse(localStorage.getItem("jsonn"))
    : [];
  const [expenses, setExpenses] = useState(localData);
  const [tempName, setTempName] = useState("");
  const [filter, setFilter] = useState("");
  const [tempCost, setTempCost] = useState();
  const [remaining, setRemaining] = useState(0);
  const [budget, setBudget] = useState();
  const [arr, setArr] = useState([]);
  const [spent, setSpent] = useState(0);
  const [edit, setEdit] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("Edit");

  let sum = 0;

  useEffect(() => {
    setExpenses(JSON.parse(localStorage.getItem("jsonn")));
    for (let i = 0; i < expenses?.length; i++) {
      sum += parseInt(expenses[i].cost);
    }
    setSpent(sum);
    let remain = budget - spent;
    if (remain > -1) {
      setRemaining(remain);
    }
  }, [expenses?.length]);

  useEffect(() => {
    let duplicateObject = [];
    for (let i = 0; i < expenses?.length; i++) {
      duplicateObject.push(expenses[i].name);
      console.log(duplicateObject[i], "duplicateObject");
    }
    setArr(duplicateObject);
    console.log(arr, "arr");
  }, [expenses, length]);

  const handleRemove = (i) => {
    let newArray = JSON.parse(localStorage.getItem("jsonn"));
    const result = newArray.filter((item, index) => index !== i);
    localStorage.setItem("jsonn", JSON.stringify(result));
    setExpenses(result);
  };

  const handleEditBudget = () => {
    setEdit(!edit);
    if (edit === false) {
      setButtonTitle("Submit");
    } else {
      setButtonTitle("Edit");
    }
    let remain = budget - spent;
    setRemaining(remain);
  };

  const handleSave = () => {
    if (tempName === "") {
      alert("Enter Name");
    }
    if (budget === 0) {
      alert("You have zero budget!");
    } else if (tempCost === 0) {
      alert("Enter Cost");
    } else {
      let tempData = [...expenses, { name: tempName, cost: tempCost }];
      localStorage.setItem("jsonn", JSON.stringify(tempData));
      setTempName("");
      setTempCost(0);
      setExpenses(JSON.parse(localStorage.getItem("jsonn")));
    }
  };

  const classes = useStyles();
  return (
    <Box className={classes.MainContainer}>
      <Box className={classes.InnerContainer}>
        <Box className={classes.FirstContainer}>
          <Typography className={classes.AppTitle}>
            My Budget Planner
          </Typography>
        </Box>
        <Box className={classes.SecondContainer}>
          <Box
            className={classes.InlineBox}
            style={{
              backgroundColor: "#e8e9ee",
              border: "0.5px solid #d8d9dd",
            }}
          >
            {edit === false ? (
              <Typography style={{ color: "#404040" }}>
                Budget: £{budget}
              </Typography>
            ) : (
              <input
                type="number"
                placeholder="Enter Budget"
                value={budget}
                style={{
                  height: "25px",
                  width: "40%",
                  borderRadius: 4,
                }}
                onChange={(e) => setBudget(e.target.value)}
              />
            )}
            <Button
              variant="contained"
              onClick={handleEditBudget}
              style={{ margin: 17 }}
            >
              {buttonTitle}
            </Button>
          </Box>
          <Box
            className={classes.InlineBox}
            style={{
              backgroundColor: "#dce7f3",
              border: "0.5px solid #ccd7e3",
            }}
          >
            <Typography style={{ color: "green" }}>
              Remaining: £{remaining}
            </Typography>
          </Box>
          <Box
            className={classes.InlineBox}
            style={{
              backgroundColor: "#daeff8",
              border: "0.5px solid #cadfe8",
            }}
          >
            <Typography style={{ color: "navy" }}>
              Spent so far: £{spent}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.ThirdContainer}>
          <Typography className={classes.Expenses}>Expenses</Typography>
          <TextField
            placeholder="Type to search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={classes.Input}
          />
          <TableContainer className={classes.Table}>
            <Table>
              <TableBody>
                {expenses?.length === 0 ? (
                  <TableCell style={{ height: "20px" }}>
                    Nothing to show
                  </TableCell>
                ) : (
                  expenses
                    .filter((filtered) => filtered.name.includes(filter))
                    .map((data, index) => (
                      <TableRow
                        key={data.name}
                        sx={{ height: "2px", width: "100%", padding: "0px" }}
                      >
                        <TableCell style={{ height: "20px" }}>
                          {data.name}{" "}
                        </TableCell>
                        <TableCell style={{ padding: "5px", textAlign: "end" }}>
                          <span className={classes.CostStyle}>
                            £{data.cost}
                          </span>
                          <Button onClick={() => handleRemove(index)}>
                            {
                              <CancelIcon
                                sx={{ color: "black", height: "19px" }}
                              />
                            }
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Typography className={classes.Expenses}>Add Expense</Typography>
        <Box className={classes.LastInputsContainer}>
          <Box>
            <Typography>Name</Typography>
            <TextField
              value={tempName}
              type="text"
              placeholder="Enter Name"
              className={classes.LastInput}
              onChange={(e) => setTempName(e.target.value)}
            />
          </Box>
          <Box>
            <Typography>Cost</Typography>
            <TextField
              value={tempCost}
              type="number"
              placeholder="Enter Cost"
              className={classes.LastInput}
              onChange={(e) => setTempCost(e.target.value)}
            />
          </Box>
        </Box>
        <br />
        <br />
        <Button
          variant="contained"
          sx={{ marginBottom: "5vh" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
