import React from 'react'
import { VisibilityOff } from "@mui/icons-material";
import {
    Box,
    IconButton,
    InputAdornment,
    InputBase,
    Paper,
    Typography,
  } from "@mui/material";

const CustomInput = ({placeholder,label,onchange,type,isIconActive}) => {
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography color="white" pb={1}>
          {label}
        </Typography>
        <Paper
          sx={{
            background: "#1f1d2c",
            width: "100%"
          }}
        >
          <InputBase
            type={type}
            placeholder={placeholder}
            fullWidth
            onChange={onchange}
            sx={{
              bgcolor: "#1f1d2c",
              p: 1,
              borderRadius: "5px",
            }}

          />
        </Paper>
      </Box>
    </Box>
  )
}

export default CustomInput