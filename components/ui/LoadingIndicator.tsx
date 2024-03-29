import * as React from "react";
import { Stack, CircularProgress } from "@mui/material";
import { ReactElement } from "react";
import { useIsFetching, useIsMutating } from "react-query";

export function LoadingIndicator(): ReactElement {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const visibility = isFetching || isMutating ? "visible" : "hidden";

  return (
    <>
      <Stack
        visibility={visibility}
        sx={{
          color: "#ff2058",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress color="secondary" />
      </Stack>
    </>
  );
}
