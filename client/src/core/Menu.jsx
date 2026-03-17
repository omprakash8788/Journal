import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import HomeIcon from "@mui/icons-material/Home"
import Button from "@mui/material/Button"
import { Link, useNavigate, useLocation } from "react-router-dom"
import auth from "../auth/auth-helper"

const Menu = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
      ? { color: "#ff4081" }
      : { color: "#ffffff" }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Journel
        </Typography>
        <Link to="/">
          <IconButton style={isActive("/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive("/users")}>Users</Button>
        </Link>
        {!auth.isAuthenticated() && (
          <>
            <Link to="/signup">
              <Button style={isActive("/signup")}>Sign Up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive("/signin")}>Sign In</Button>
            </Link>
          </>
        )}
        {auth.isAuthenticated() && (
          <>
            <Link to={`/user/${auth.isAuthenticated().user._id}`}>
              <Button>
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                auth.clearJWT(() => navigate("/"))
              }}
            >
              Sign Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Menu