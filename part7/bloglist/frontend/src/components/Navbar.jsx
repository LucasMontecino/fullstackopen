import { useSelector } from 'react-redux';
import Logout from './Logout';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Chip,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(location.pathname);
  const user = useSelector((state) => state.user);

  const [name, lastname] = user.name.split(' ');

  const initialName = `${name[0]}${lastname[0]}`;

  const open = Boolean(anchorEl);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: '#ccc',
        padding: '24px 0',
        marginBottom: '18px',
      }}
      position="static"
    >
      <Container
        sx={{ display: 'flex', columnGap: '8px', alignItems: 'center' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="primary tabs example"
        >
          <Tab value="/" label="blogs" component={Link} to={'/'} />
          <Tab value="/users" label="users" component={Link} to={'/users'} />
        </Tabs>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 42, height: 42 }}>{initialName}</Avatar>
          </IconButton>
        </Tooltip>
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ cursor: 'default' }}>
          <Chip label={user.name + ' logged in'}></Chip>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ cursor: 'default' }}>
          <Logout />
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
