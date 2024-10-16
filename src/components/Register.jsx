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
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import apiHandler from "../api/apiService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      password: !formData.password,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      return;
    }

    try {
      const data = await apiHandler("register", "POST", formData);
      localStorage.setItem("authkey", data.token);
      toast.success("Registration successful!", { autoClose: 2000 });
      navigate("/");
    } catch (error) {
      toast.error(`Registeration failed! ${error.error}`, { autoClose: 2000 });
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          SignUp
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
           Fill the details to create new account
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ width: "100%", textAlign: "center" }}>
          <TextField
            id="outlined-name"
            label="Name *"
            name="name"
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name && "Please enter your name"}
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
            id="outlined-email"
            label="Email *"
            name="email"
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
            id="outlined-password"
            label="Password *"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
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
            fullWidth
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
            {loading ? "Registering..." : "SIGNUP"}
          </Button>
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
        Already have an account?
          <Link
            to="/"
            style={{
              color: "#0D1D4E",
              fontWeight: "bold",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
           Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
