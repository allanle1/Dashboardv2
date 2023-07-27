import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  IconButton,
  useTheme,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { SettingsOutlined } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import CancelIcon from "@mui/icons-material/Cancel";

function MachineSettings({data, onSubmit}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(data?.nextservicehours);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: theme.palette.background.alt,
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(value, data?.id);
    setOpen(false)
  };
  return (
    <div>
      <IconButton>
        <SettingsOutlined
          onClick={handleOpen}
          sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
        />
      </IconButton>

      <Modal
        open={open}
        // onClose={handleClose}
      >
        <Box sx={style}>
          <FlexBetween>
            <Typography
              sx={{ fontSize: 20 }}
              color={theme.palette.secondary[400]}
            >
              machineid: {data?.machineid}
            </Typography>
            <IconButton>
              <CancelIcon
                onClick={handleClose}
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </IconButton>
          </FlexBetween>
          <form>
            <FlexBetween>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                label="Next Service Hours"
                variant="outlined"
                value={value}
                onChange={(e)=> setValue(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                save
              </Button>
            </FlexBetween>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default MachineSettings;
