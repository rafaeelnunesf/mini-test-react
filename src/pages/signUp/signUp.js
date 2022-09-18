import { TextField, Typography, Link, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import api from "../../services/api";
import { styles } from "./styles";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData?.email ||
      !formData?.password ||
      !formData?.passwordConfirmation
    ) {
      console.log({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    const { email, password, passwordConfirmation } = formData;

    if (password !== passwordConfirmation) {
      console.log({ type: "error", text: "Passwords must be the same!" });
      return;
    }

    try {
      const user = await api.register({ email, password });
      console.log(user);
      console.log({
        type: "success",
        text: "Registration successfully Complete!",
      });
      navigate("/home");
    } catch (error) {
      if (error.response) {
        console.log({
          type: "error",
          text: error.response.data,
        });
        return;
      }
      console.log(error);
      console.log({
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
        <Link component={RouterLink} to="/login">
          <Typography>Already have an account? Log in here!</Typography>
        </Link>
      </Box>
    </Form>
  );
}

export default SignUp;
