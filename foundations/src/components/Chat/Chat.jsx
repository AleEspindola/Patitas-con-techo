import { Fragment } from "react";
import {
  Container,
  Paper,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import "./Chat.css";
import axios from "axios";

const connectionOptions = {
  "force new connection": true,
  reconnection: true,
  reconnectionDelay: 2000, //starts with 2 secs delay, then 4, 6, 8, until 60 where it stays forever until it reconnects
  reconnectionDelayMax: 60000, //1 minute maximum delay between connections
  reconnectionAttempts: "Infinity", //to prevent dead clients, having the user to having to manually reconnect after a server restart.
  timeout: 10000, //before connect_error and connect_timeout are emitted.
  transports: ["websocket"], //forces the transport to be only websocket. Server needs to be setup as well/
};
const socket = require("socket.io-client")(
  "http://localhost:3001",
  connectionOptions
);

export default function Chat() {
  socket.on("connect", () => {
    //console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    //console.log(socket.id); // undefined
  });

  const { pathname } = useLocation();
  const { user } = useSelector((state) => state);

  const fId = user._id;
  const uId = pathname.split("/")[2];
  const username = user.name;
  const profile_picture = user.profile_picture;

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  let own;

  const handlerMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (user && message) {
      socket.emit("send-message", {
        message,
        uId,
        fId,
        username,
        profile_picture,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/messages/${fId}/${uId}`)
      .then((res) => {
        setChatMessages(res.data);
      });
    }, []);
    console.log(chatMessages)

  useEffect(() => {
    const receiveMessage = (message) => {
      setChatMessages([...chatMessages, message]);
      //console.log("receive message", message);
    };

    socket.on("new-message", receiveMessage);

    return () => {
      socket.off("new-message", receiveMessage);
    };
  }, [chatMessages]);

  return (
    <>
      <Fragment>
        <br />
        <Container className="superContainer">
          <Paper elevation={5}>
            <Box p={3} className="boxContainer">
              <Typography variant="h5" gutterBottom>
                Chat con {<strong>{chatMessages[0]?.user}</strong>}
              </Typography>
              <Divider />
              <Grid container>
                <Grid
                  id="chat-window"
                  xs={12}
                  item
                  className="messageContainer"
                >
                  <List id="chat-window-messages">
                    {chatMessages?.map((chat, index) => {
                      own = chat.user === user.name ? true : false;
                      return (
                        <div
                          className={own ? "message own" : "message"}
                          key={index}
                        >
                          <div className="messageTop">
                            <img
                              className="messageImg"
                              src={chat?.profile_picture}
                              alt=""
                            />
                            <p className="messageText">{chat.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </List>
                </Grid>
                <div className="newMessage">
                  <Grid item className="input">
                    <FormControl fullWidth>
                      <TextField
                        onChange={handlerMessageChange}
                        value={message}
                        label="Escribe tu mensaje"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <button className="sendButton">
                      <IconButton aria-label="Enviar" onClick={handlerSubmit}>
                        <SendIcon />
                      </IconButton>
                    </button>
                  </Grid>
                </div>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Fragment>
    </>
  );
}
