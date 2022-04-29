import {
  Alert,
  Button,
  Container,
  IconButton,
  Snackbar,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React, { createContext, useState } from "react";

export type MessageType = "success" | "error" | "warning" | "info";

export interface ISnack {
  message: string;
  messageType: MessageType;
  open: boolean;
}
export type SnackContextType = {
  snack: ISnack;
  showMessage: (todo: ISnack) => void;
};

export const SnackbarContext = createContext<SnackContextType | null>(null);

const SnackBarProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [snack, setSnack] = React.useState<ISnack>({
    message: "",
    messageType: "info",
    open: false,
  });

  const showMessage = (todo: ISnack) => {
    const newSnack: ISnack = {
      message: todo.message,
      messageType: todo.messageType,
      open: true,
    };
    setSnack(newSnack);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack({
      ...snack,
      open: false,
    });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <SnackbarContext.Provider value={{ snack, showMessage }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity={snack.messageType}>
          {snack.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  if (!context) {
    throw new Error("SnackbarContext must be used within a HttpStateContext");
  }
  return context;
};

export default SnackBarProvider;
