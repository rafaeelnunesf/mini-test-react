import { TextField, Typography, Link, Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import { styles } from "../../styles/authStyles";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";

import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";
function SignUp() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { register, googleLogin, githubLogin } = useAuth();
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData?.name ||
      !formData?.email ||
      !formData?.password ||
      !formData?.passwordConfirmation
    ) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    const { name, email, password, passwordConfirmation } = formData;

    if (password !== passwordConfirmation) {
      setMessage({ type: "error", text: "Passwords must be the same!" });
      return;
    }

    try {
      await register({ name, email, password });
      setMessage({
        type: "success",
        text: "Registration successfully Complete!",
      });
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
      <Box sx={styles.container}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Create account
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
          name="name"
          sx={styles.input}
          label="Name"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
        />
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
        <PasswordInput
          name="passwordConfirmation"
          sx={styles.input}
          label="Confirm your password"
          onChange={handleInputChange}
          value={formData.passwordConfirmation}
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
          Sign Up
        </Button>
        <Link component={RouterLink} to="/sign-in">
          <Typography>Already have an account? Log in here!</Typography>
        </Link>
      </Box>
    </Form>
  );
}

export default SignUp;
