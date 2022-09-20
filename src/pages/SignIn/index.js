import { TextField, Typography, Link, Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import useAuth from "../../hooks/useAuth";
import { styles } from "../../styles/authStyles";
import useAlert from "../../hooks/useAlert";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

function SignIn() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, googleLogin } = useAuth();

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!formData?.email || !formData?.password) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    const { email, password } = formData;

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        return;
      }

      setMessage({
        type: "error",
        text: "Erro, tente novamente em alguns segundos!",
      });
    }
  }

  async function handleGoogleLogin() {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        return;
      }

      setMessage({
        type: "error",
        text: "Erro, tente novamente em alguns segundos!",
      });
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Box sx={styles.container}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Login
        </Typography>
        <Box sx={{ display: { md: "flex" } }}>
          <GoogleLoginButton onClick={handleGoogleLogin} />
          <GithubLoginButton onClick={handleGithubLogin} />
        </Box>
        <Box sx={styles.dividerContainer}>
          <Divider sx={{ flex: "1" }} />
          <Typography variant="caption" component="span">
            OR
          </Typography>
          <Divider sx={{ flex: "1" }} />
        </Box>
        <TextField
          name="email"
          sx={styles.input}
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.email}
        />
        <PasswordInput
          name="password"
          sx={styles.input}
          label="Password"
          onChange={handleInputChange}
          value={formData.password}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            marginBottom: "16px",
            backgroundColor: "#000",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Log In
        </Button>
        <Link component={RouterLink} to="/sign-up">
          <Typography>I don't have an account!</Typography>
        </Link>
      </Box>
    </Form>
  );
}
export default SignIn;
