import React from "react";
import SideBar from "./SideBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import UserList from "./UserList";
import { Box, Typography, TextField } from "@mui/material";
import UserImg from "../../public/user.png";

const User = () => {
  return (
    <Box display="flex">
      <SideBar />

      <Box
        component="main"
        style={{
          flex: 1,

          backgroundColor: "#fff",
          overflowY: "auto",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          marginBottom="16px"
          padding="24px"
        >
          <img src={UserImg} alt="image" />
          <Typography
            variant="h4"
            style={{ marginLeft: "20px", fontWeight: "bold", fontSize: "25px" }}
          >
            Users
          </Typography>
        </Box>

        <Typography
          variant="body1"
          style={{ marginBottom: "16px", paddingLeft: "24px" }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard.
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="26px"
          marginTop="50px"
          paddingLeft="24px"
        >
          <Box display="flex" gap="72px">
            <Typography
              variant="h6"
              style={{
                color: "#0D1D4E",
                fontSize: "16px",
                borderBottom: "2px solid #0D1D4E",
                paddingBottom: "4px",
              }}
            >
              USERS
            </Typography>
            <Typography
              variant="h6"
              style={{ color: "#555", fontSize: "16px" }}
            >
              ROLES
            </Typography>
            <Typography
              variant="h6"
              style={{ color: "#555", fontSize: "16px" }}
            >
              WORKFLOWS
            </Typography>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box display="flex" gap="42px" paddingLeft="24px">
          <Box>
            <AddCircleIcon
              sx={{
                fontSize: "40px",
                color: "#0D1D4E",
              }}
            />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap="8px"
            marginBottom="16px"
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              padding: "4px 8px",
              width: "250px",
            }}
          >
            <SearchIcon sx={{ color: "#555" }} />
            <TextField
              variant="outlined"
              placeholder="Search users..."
              size="small"
              sx={{
                width: "200px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "0.5rem",
                },
              }}
            />
          </Box>
        </Box>

        
        <UserList />
      </Box>
    </Box>
  );
};

export default User;
