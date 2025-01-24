// @mui
import { alpha, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

export const StyledRootScrollbar = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
}));

export const StyledScrollbar = styled("div")(({ theme }) => ({
  maxHeight: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarWidth: "thin", // For Firefox
  scrollbarColor: `${alpha(theme.palette.grey[600], 0.48)} transparent`, // For Firefox

  "&::-webkit-scrollbar": {
    width: 10, // Vertical scrollbar width
    height: 6, // Horizontal scrollbar height
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: alpha(theme.palette.grey[600], 0.48),
    borderRadius: 8,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: alpha(theme.palette.grey[600], 0.7),
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
  zIndex: "inherit", // Ensures that the scrollbar respects context z-index
}));
