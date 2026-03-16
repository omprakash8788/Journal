import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import unicornbikeImg from "../assets/bike.avif";
import Newsfeed from "../post/Newsfeed";

const Home = () => {
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h6" sx={{ p: 3 }}>
        Home Page
      </Typography>

      <CardMedia
        component="img"
        height="400"
        image={unicornbikeImg}
        alt="Unicorn Bicycle"
      />

      <CardContent>
        <Typography variant="body2">
          Welcome to the MERN Skeleton home page.
        </Typography>
      </CardContent>

      <Grid item xs={8} sm={7}>
        <Newsfeed />
      </Grid>
    </Card>
  );
};

export default Home;
