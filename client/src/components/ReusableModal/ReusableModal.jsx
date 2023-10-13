import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import theme from "../../../theme";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

function ReusableModal(props) {
  const { open, onClose, children } = props;
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(false);

  const modalStyle = {
    position: "absolute",
    left: "50%",
    transform: `translate(-50%, ${closing ? "-100%" : opening ? "5%" : "-100%"})`,
    minWidth: "90%",
    boxShadow: "none",
    transition: "transform 0.5s",
    zIndex: 9999,
  };

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro semitransparente
    zIndex: 9998, // Por debajo del modal
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
        onClose={handleClose} // Usamos la función de cierre personalizada
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
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
