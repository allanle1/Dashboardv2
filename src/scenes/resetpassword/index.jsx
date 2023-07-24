import { Box, Grid, Button, Checkbox, colors, Typography,InputBase,Paper} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from 'state/AuthContext';
import TitleBox from "components/TitleBox";
import CustomInput from 'components/CustomInput';


const Resetpasswordpromt = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { resetPassword } = UserAuth();
  const bgImage = require("assets/bg.png");


  const triggerResetEmail = async (e) => {
    setError('Password reset email sent')
    console.log(email);
    await resetPassword(email);         
    console.log("Password reset email sent");}  

  // const triggerResetEmail = async (e) => {
  //   e.preventDefault();
  //   setError('')
  //   try {
  //     await resetPassword(email)
  //   } catch (e) {
  //     setError(e.message)
  //     console.log(e.message)
  //   }
  // };

  return (
    <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
        sx={{
          width: {
            sm: "90vw",
            xs: "90vw",
            md: "60vw",
            lg: "60vw",
            xl: "60vw",
          },
        }}
      >
        {/* GRID SYSTEM */}
        <Grid container height="90vh">
        <Grid
      xs={12}
      sm={12}
      md={6}
      lg={6}
      xl={6}
      minHeight={550}
      sx={{
        boxShadow: {
          xs: "",
          sm: "",
          md: "15px 2px 5px -5px",
          lg: "15px 2px 5px -5px",
          xl: "15px 2px 5px -5px",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 24, 57, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          borderRadius: {
            xs: "30px",
            sm: "30px",
            md: "30px 0 0 30px",
            lg: "30px 0 0 30px",
            xl: "30px 0 0 30px",
          },
        }}
      >
        <Box width="80%">
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* LOGO */}
            <Box
              sx={{
                mt: "60px",
                width: "50px",
                height: "50px",
                bgcolor: "primary.main",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${colors.green[500]}`,
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="white">
                AA
              </Typography>
            </Box>
            {/* LOGO END */}

            <Typography color="white" fontWeight="bold" mt={7} mb={3}>
              Reset Password
            </Typography>
          </Box>

          {/* INPUTS */}
          <form>
          <CustomInput
            label="Enter registered email"
            placeholder="Enter your email..."
            onchange={(e) => setEmail(e.target.value)}
            type={'email'}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green}` }}
            onClick={triggerResetEmail}
          >
            Reset Password
          </Button>
          {error && <div className="message"> {error} </div>}
          </form>
          
        
          {/* INPUT END */}
        </Box>
      </Box>
    </Grid>

          <TitleBox />
        </Grid>
        {/* GRID SYSTEM END */}
      </Box>
      </Box>

    
  );
}; 

export default Resetpasswordpromt;

