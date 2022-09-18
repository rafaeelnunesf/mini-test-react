import { Box } from "@mui/system";
import background from "../../assets/background.jpg";
import "./index.css";
export default function Container({ children }) {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    gap: "40px",
  };

  return (
    <Box sx={styles}>
      <img src={background} className="background" alt="background" />
      {children}
    </Box>
  );
}
