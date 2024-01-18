import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import PostIcon from "@mui/icons-material/PostAdd";
import PersonIcon from "@mui/icons-material/Person";
import Navbar from "../components/Navbar";
import { auth } from "../firebase.js";
import { useNavigate } from 'react-router-dom';
import ViewRegistered from "../components/ViewRegistered.js";
import { getDatabase, ref, get } from "firebase/database";
import Button from "@mui/material/Button";

const drawerWidth = 240;

const styles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    marginLeft: drawerWidth,
    padding: (theme) => theme.spacing(3),
  },
  userDetails: {
    marginBottom: theme => theme.spacing(2),
  },
  menuItem: {
    marginBottom: theme => theme.spacing(1),
  },
  header: {
    marginBottom: theme => theme.spacing(3),
  },
};

const MyProfile = () => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState("My Profile");
  const [userData, setUserData] = useState(null);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      alert('Unauthorized access. Please log in.');
      navigate('/home');
    } else {
      const fetchUserProfileData = async () => {
        const database = getDatabase();
        const userRef = ref(database, `MyUsers/${user.uid}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserData(userData);
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserProfileData();
    }
  }, [navigate]);
  

  return (
    <>
      <Navbar />
      <Drawer
        sx={styles.drawer}
        variant="permanent"
        classes={{
          paper: styles.drawerPaper,
        }}
      >
        <Grid container justifyContent="center" alignItems="center" padding={2}>
          <Avatar
            alt="User Profile"
            src={userData?.imageURL || 'fallback_image_url'}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        {userData ? (
          <Grid container direction="column" alignItems="center" sx={styles.userDetails}>
            <Typography variant="h5">{userData.username}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {userData.role}
            </Typography>
          </Grid>
        ) : (
          <Typography variant="body2" align="center">
            Loading user data...
          </Typography>
        )}
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem button onClick={() => handleMenuItemClick("My Profile")} sx={styles.menuItem}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick("Register A Business")} sx={styles.menuItem}>
            <ListItemIcon>
              <PostIcon />
            </ListItemIcon>
            <ListItemText primary="Register A Business" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuItemClick("View Registered")}
            sx={styles.menuItem}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="View Registered" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuItemClick("Signout")}
            sx={styles.menuItem}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Signout" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <div style={styles.content}>
        {selectedMenuItem === "My Profile" && (
          <>
            <Typography variant="h6" sx={styles.header}>User Details</Typography>
            {userData ? (
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="body2">Name: {userData.username}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">Status: {userData.status}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body2">Loading user data...</Typography>
            )}
          </>
        )}
        {selectedMenuItem === "Register A Business" && (
          <>
            <Typography variant="h6" sx={styles.header}>Register A Business</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/verify')}
            >
              Go to /verify
            </Button>
          </>
        )}
        {selectedMenuItem === "View Registered" && (
          <>
            <Typography variant="h6" sx={styles.header}>View Registered</Typography>
            {<ViewRegistered />}
          </>
        )}
        {selectedMenuItem === "Signout" && (
  <>
    <Typography variant="h6" sx={styles.header}>Sign Out</Typography>
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        auth.signOut();
        navigate('/'); 
      }}
    >
      Sign Out
    </Button>
  </>
)}
      </div>
    </>
  );
};

export default MyProfile;