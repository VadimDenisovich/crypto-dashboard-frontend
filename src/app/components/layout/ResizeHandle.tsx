import { Box } from "@mui/material";

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

export function ResizeHandle({ onMouseDown }: ResizeHandleProps) {
  return (
    <Box
      onMouseDown={onMouseDown}
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "5px",
        height: "100%",
        cursor: "col-resize",
        zIndex: 10,
        // Optional: uncomment below if you want a subtle hover effect
        // "&:hover": {
        //   backgroundColor: "rgba(0,0,0,0.05)"
        // }
      }}
    />
  );
}
