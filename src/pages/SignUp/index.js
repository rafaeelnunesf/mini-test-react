import { TextField, Typography, Link, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import { styles } from "../../styles/authStyles";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
function SignUp() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { register } = useAuth();
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
  return (
    <Form onSubmit={handleSubmit}>
      <Box sx={styles.container}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Create account
        </Typography>
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
        <Button variant="contained" type="submit" sx={{ marginBottom: "16px" }}>
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
