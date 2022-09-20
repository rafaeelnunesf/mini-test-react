import { TextField, Typography, Link, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";
import Divider from "../../components/Divider";
import Container from "../../components/Container";

function SignIn() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, googleLogin, githubLogin } = useAuth();

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
      if (error.message) {
        setMessage({
          type: "error",
          text: error.message,
        });
        return;
      }
      setMessage({
        type: "error",
        text: "Error, try again in a few seconds!",
      });
    }
  }

  async function handleGithubLogin() {
    try {
      await githubLogin();
      navigate("/");
    } catch (error) {
      if (error.message) {
        setMessage({
          type: "error",
          text: error.message,
        });
        return;
      }
      setMessage({
        type: "error",
        text: "Error, try again in a few seconds!",
      });
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Typography sx={{ marginBottom: "30px" }} variant="h4" component="h1">
          Login
        </Typography>
        <Box sx={{ display: { md: "flex" } }}>
          <GoogleLoginButton onClick={handleGoogleLogin} />
          <GithubLoginButton onClick={handleGithubLogin} />
        </Box>
        <Divider />
        <TextField
          name="email"
          sx={{ marginBottom: "16px" }}
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.email}
        />
        <PasswordInput
          name="password"
          sx={{ marginBottom: "16px" }}
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
      </Container>
    </Form>
  );
}
export default SignIn;
