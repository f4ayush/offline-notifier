import React from "react";
import { useEffect, useState } from "react";
import useConnectivityStatus from "./useConnectivityStatus";

interface OfflineNotifierProps {
  mode?: "toast" | "watermark"; // Select toast or watermark
  text?: string; // Custom text
  color?: string; // Custom color
  backgroundColor?: string; // Background color
  icon?: React.ReactNode; // Custom icon
}

const OfflineNotifier: React.FC<OfflineNotifierProps> = ({
  mode = "toast",
  text = "You are offline!",
  color = "white",
  backgroundColor = "red",
  icon,
}) => {
  const {isOffline, connectionType} = useConnectivityStatus()

  if (!isOffline) return null;

  return mode === "toast" ? (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor,
        color,
        padding: "10px 20px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        zIndex: 1000,
      }}
    >
      {icon} {text}
    </div>
  ) : (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        opacity: 0.5,
        color,
        backgroundColor,
        padding: "5px 10px",
        borderRadius: "3px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        zIndex:"9999",
        flexDirection:"column"
      }}
    >
      <span>{icon}</span> 
      <span>{text}</span>
    </div>
  );
};

export default OfflineNotifier;
