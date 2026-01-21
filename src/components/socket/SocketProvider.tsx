"use client";

import { useEffect } from "react";
import socket from ".";

export default function SocketProvider() {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return null; // UI kuch render nahi karta
}
