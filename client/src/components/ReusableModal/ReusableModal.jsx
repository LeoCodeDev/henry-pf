import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import theme from "../../../theme";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { isDesktop } from "react-device-detect";

function ReusableModal(props) {
  const { open, onClose, children } = props;
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(false);

  const modalStyle = {
    position: "absolute",
    left: "50%",
    transform: `translate(-50%, ${closing ? "-100%" : opening ? (isDesktop ? "5%" : "1%") : "-100%"})`,
    minWidth: "90%",
    height:"100%",
    boxShadow: "none",
    transition: "transform 0.5s",
  };

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",  
  };

  const modalContentStyle = {
    maxHeight: "100vh",
    overflowY: "auto", 
  };
  

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 500); 
  };

  useEffect(() => {
    if (open) {
      setOpening(true);
    } else {
      setOpening(false);
    }
  }, [open]);

  return (
    <>
      {open && (
        <div style={backdropStyle}></div>
      )}
      <Modal
        open={open}
        onClose={handleClose} 
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center", ...modalContentStyle,
    
          }}
          style={modalStyle} 
        >
          {children}
          <KeyboardDoubleArrowUpIcon
            onClick={handleClose}
            sx={{
              fontSize: 40,
              color: theme.palette.primary.main,
              cursor: "pointer",
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ReusableModal;
