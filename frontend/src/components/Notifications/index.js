import openSocket from "../../services/socket-io";
import { AuthContext } from "../../context/Auth/AuthContext";
import React, {useContext, useEffect} from "react";


const Notification = () => {
    const { user } = useContext(AuthContext);
    const socket = openSocket();

    socket.on("connect", () => {
        console.log("Conectado ao servidor Socket.IO");
    });

    useEffect(() => {
        const handleReceiveMessage = (data) => {
        if(data.para === user.id ){        
            const notification = new Notification(data.de , {
            body: data.inputValue,
            icon: '%PUBLIC_URL%/favicon.ico',
            });

        }
        };
        socket.on("receive_msg", handleReceiveMessage);
        return () => {
        socket.off("receive_msg", handleReceiveMessage);
        };
    }, [socket]);

};

export default Notification;
