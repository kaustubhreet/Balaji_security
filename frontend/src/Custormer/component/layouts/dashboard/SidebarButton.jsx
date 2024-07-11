import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

export const SidebarButton = ({ url, icon, title, styling }) => {
  const currLocation = useLocation();
  const active = currLocation.pathname === url;

  return (
    <ListItem
      sx={{
        backgroundColor: active && 'rgba(255,255,255, 0.15)',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255, 0.15)'
        },
        borderRadius: '10px',
        width: '100%',
        maxWidth: '200px',
        ...styling
      }}
    >
      <Link
        to={url}
        style={{
          textDecoration: 'none',
          color: active ? '#FCD906' : 'white',
          width: '100%'
        }}
      >
        <ListItemButton sx={{ borderRadius: '10px' }}>
          <ListItemIcon
            sx={{
              minWidth: '35px',
              color: active ? '#FCF805' : 'white'
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};