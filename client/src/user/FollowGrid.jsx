import { makeStyles } from "@mui/styles"
import PropTypes from "prop-types"
// import { Avatar, Typography, GridList, GridListTile } from "@mui/material"
import { Avatar, Typography, ImageList, ImageListItem } from "@mui/material"
import { Link } from "react-router-dom"

const API = import.meta.env.VITE_API_URL;

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 16,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: "#fff",
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto"
  },
  gridList: {
    width: 500,
    height: 220
  },
  tileText: {
    textAlign: "center",
    marginTop: 10
  }
}))

export default function FollowGrid(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ImageList className={classes.gridList} cols={4} rowHeight={160}>
        {props?.people?.map((person) => {
          return (
           <ImageListItem style={{ height: 120 }} key={person._id}>
              <Link to={"/user/" + person._id}>
                <Avatar
                  src={`${API}/api/users/photo/${person._id}`}
                  className={classes.bigAvatar}
                />
                <Typography className={classes.tileText}>
                  {person?.name}
                </Typography>
              </Link>
            </ImageListItem>
          )
        })}
      </ImageList>
    </div>
  )
}

FollowGrid.propTypes = {
  people: PropTypes.array.isRequired
}