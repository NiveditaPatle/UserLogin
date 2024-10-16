import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import CompanyIcon from '@mui/icons-material/Business';
import GeneralIcon from '@mui/icons-material/Info';
import PreferencesIcon from '@mui/icons-material/Star';
import LayoutIcon from '@mui/icons-material/ViewQuilt';
import FieldIcon from '@mui/icons-material/FormatListBulleted';
import LocationIcon from '@mui/icons-material/LocationOn';
import UserIcon from '@mui/icons-material/People';

const menuItems = [
  { text: 'Setup Payments', icon: <PaymentIcon /> },
  { text: 'Pricing', icon: <PriceChangeIcon /> },
  { text: 'Company', icon: <CompanyIcon /> },
  { text: 'General', icon: <GeneralIcon /> },
  { text: 'Preferences', icon: <PreferencesIcon /> },
  { text: 'Layout', icon: <LayoutIcon /> },
  { text: 'Fields', icon: <FieldIcon /> },
  { text: 'Locations', icon: <LocationIcon /> },
  { text: 'Users', icon: <UserIcon /> },
];

const SideBar = () => {
  return (
    <Box
      sx={{
        width: '250px',
        padding: '16px',
        borderRight: '1px solid #ccc',
      }}
    >
      <Typography variant="h6" component="h2" sx={{ marginBottom: '15px', textAlign: 'center' }}>
        Profile
      </Typography>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{
              '&:hover': { backgroundColor: '#e0e0e0' },
              marginBottom: '24px', 
            }}
          >
            <ListItemIcon sx={{ color: '#212121', fontSize: '62px' }}>
              {item.icon}
            </ListItemIcon>
            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '17px' }}>
              {item.text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
