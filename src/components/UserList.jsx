import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TableSortLabel,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";
import apiHandler from "../api/apiService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await apiHandler(`users?page=${page + 1}`);
      setUsers(response.data);
      setTotalUsers(response.total);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page, rowsPerPage]);

  const handleSelect = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.first_name.localeCompare(b.first_name);
      }
      return b.first_name.localeCompare(a.first_name);
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", color: "#333", fontSize:'16px' }}
                >
                  Avatar
                </Typography>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortOrder}
                  onClick={handleSortByName}
                >
                  <Typography
                    variant="h6"
                    style={{ fontWeight: "bold", color: "#333", fontSize:'16px' }}
                  >
                    Name
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", color: "#333", fontSize:'16px' }}
                >
                  Email
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1">Loading...</Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelect(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {user.first_name} {user.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{user.email}</Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
};

export default UserList;
