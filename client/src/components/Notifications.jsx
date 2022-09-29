import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";
import { Box, Button } from "@mui/material";
import useMatches from "../hooks/useMatches";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function Notifications() {
  const user = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const { pathname } = useLocation();
  //false = mobile  ---  true = desktop
  const matches = useMatches();

  let typography;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/user/notifications/${user?._id}`)
      .then((res) => {
        setNotifications(res.data);
      });
  }, [pathname]);

  if (matches) {
    typography = "h3";
  } else {
    typography = "h4";
  }

  const buttonStyle = {
    bgcolor: "#FFD640",
    mb: 4,
    mt: 4,
    borderRadius: 10,
    color: "black",
    ":hover": { bgcolor: "#FFD640" },
  };

  const handlerDelete = () => {
    axios.put(
      `http://localhost:3001/api/user/notifications/remove/${user?._id}`
    );
  };

  return (
    <>
      <Box sx={{ p: 3, height: "100%", bgcolor: "#F1F2F1" }}>
        <Typography
          variant={typography}
          sx={{ display: "flex", justifyContent: "center", m: 3 }}
        >
          Notificaciones
        </Typography>
        {notifications?.map((notifications, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <NotificationsActiveIcon color="action" sx={{ mr: 2 }}/>
                <Typography>Se ha agregado una nueva mascota</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{notifications}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
        {notifications.length ? (
          <Button
            variant="contained"
            component="label"
            onClick={handlerDelete}
            sx={buttonStyle}
          >
            Eliminar notificaciones
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
