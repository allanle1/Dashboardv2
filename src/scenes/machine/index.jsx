import React from 'react'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import MachineSettings from "components/MachineSettings";

const Machine = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <FlexBetween>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          location
        </Typography>
        <MachineSettings/>

        </FlexBetween>
        
        <Typography variant="h3" component="div">
        machineid
        </Typography>
        <Typography sx={{ mt: "1rem", mb:"1rem", fontSize: 20}} color={theme.palette.secondary[400]}>
          Current Machine Hours: currentmachinehours
        </Typography>
        <Typography sx={{ mt: "1rem", mb:"1rem", fontSize: 20}} color={theme.palette.secondary[400]}>
          Next Service Hours: nextservicehours
        </Typography>
      </CardContent>
      </Card>
  )
};



export default Machine;