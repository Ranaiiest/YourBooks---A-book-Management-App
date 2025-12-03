import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import logo from '../assets/logo.png';

const Navbar = () => {   
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/profile', name: 'Profile' },
    { path: '/contact', name: 'Contact' },
  ];

  const drawer = (
    <List sx={{ width: 220 }}>
      {navLinks.map(link => (
        <ListItemButton key={link.name} component={Link} to={link.path} onClick={() => setMobileOpen(false)}>
          {link.name}
        </ListItemButton>
      ))}
      {isLoggedIn ? (
        <ListItemButton onClick={() => { handleLogout(); setMobileOpen(false); }}>
          Log Out
        </ListItemButton>
      ) : (
        <ListItemButton component={Link} to="/login" onClick={() => setMobileOpen(false)}>
          Log In
        </ListItemButton>
      )}
      <ListItemButton onClick={toggleTheme}>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </ListItemButton>
    </List>
  );

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="YourBooks Logo" style={{ height: 44, marginRight: 12, cursor: 'pointer', borderRadius: "50%" }} onClick={() => navigate('/')} />
        <div className="nav-links">
          {navLinks.map(link => (
            <Link to={link.path} key={link.name}>{link.name}</Link>
          ))}
        </div>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} style={{ backgroundColor: '#f44336', marginLeft: 14 }}>
              Log Out
            </button>
          ) : (
            <button onClick={() => navigate('/login')} style={{ marginLeft: 14 }}>
              Log In
            </button>
          )}
          <button onClick={toggleTheme} style={{ marginLeft: 14 }}>
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { xs: 'block', sm: 'none' }, ml: "auto" }}>
          <MenuIcon />
        </IconButton>
      </nav>
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
