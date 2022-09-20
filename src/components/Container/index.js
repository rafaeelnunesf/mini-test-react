import { Box } from "@mui/material";

export const styles = {
  marginTop: "180px",
  width: "460px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
};

export default function Container({ children }) {
  return <Box sx={styles}>{children}</Box>;
}
