import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      setLoggedIn(true)
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    setLoggedIn(false)

  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Data App
        </Typography>
        {isLoggedIn ? <>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          <Button color="inherit" component={RouterLink} to="/">
            Calculate
          </Button>
        </>
          : <><Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button></>}


      </Toolbar>
    </AppBar>
  );
}

export default Header;
