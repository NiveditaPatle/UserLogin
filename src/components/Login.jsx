import React, { useState } from "react";
import Logo from "../../public/logo.png";

import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiHandler from "../api/apiService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    general: "",
  });
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false, general: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {
      email: !formData.email,
      password: !formData.password,
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      setLoading(false);
      return;
    }

    try {
      const data = await apiHandler("login", "POST", formData);
      localStorage.setItem("authkey", data.token);
      toast.success("Login successful!", { autoClose: 2000 });
      navigate("/user");
    } catch (error) {
      console.log("error", error);
      toast.error(`Login failed! ${error.error}`, { autoClose: 2000 });
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Login failed. Please check your credentials and try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={Logo}
          alt="Login Illustration"
          style={{ width: "30%", borderRadius: "5px", marginBottom: "20px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: `0 4px 20px ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Login
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Enter your serwiz account details
        </Typography>
        {errors.general && (
          <Typography color="error" gutterBottom>
            {errors.general}
          </Typography>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", textAlign: "center" }}
        >
          <TextField
            required
            id="outlined-required-email"
            label="Email"
            type="email"
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email && "Please enter your email"}
            sx={{
              borderRadius: "5px",
              width: "80%",
              mx: "auto",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#0D1D4E",
                },
                "&:hover fieldset": {
                  borderColor: "#0D1D4E",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0D1D4E",
                },
              },
              "& label": {
                color: "#0D1D4E",
                "&.Mui-focused": {
                  color: "#0D1D4E",
                },
              },
            }}
          />
          <TextField
            required
            id="outlined-required-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password && "Please enter your password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: "5px",
              width: "80%",
              mx: "auto",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#0D1D4E",
                },
                "&:hover fieldset": {
                  borderColor: "#0D1D4E",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0D1D4E",
                },
              },
              "& label": {
                color: "#0D1D4E",
                "&.Mui-focused": {
                  color: "#0D1D4E",
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#0D1D4E",
              "&:hover": {
                backgroundColor: "#0B1637",
              },
              borderRadius: "3px",
              width: "30%",
              mx: "auto",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Typography
            variant="body2"
            component="p"
            sx={{
              color: "#0D1D4E",
              fontWeight: "bold",
            }}
          >
            Forgot password?
          </Typography>
        </form>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: `0 1px 2px ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography variant="body2" sx={{ color: "#9AA1A9" }}>
          Don't have an account?
          <Link
            to="/register"
            style={{
              color: "#0D1D4E",
              fontWeight: "bold",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
