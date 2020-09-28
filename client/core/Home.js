import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import unicornbikeImg from './../assets/images/unicornbike.jpg'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles(theme => ({ //makeStyles is a custom hook provided by the material UI library.
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  }
}))
//Material UI makes the use of JSS which is CSS in JS styling solution for adding style to the components. 

export default function Home(){
  const classes = useStyles()
    return (
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Home Page
          </Typography>
          <CardMedia className={classes.media} image={unicornbikeImg} title="Unicorn Bicycle"/>
          <Typography variant="body2" component="p" className={classes.credit} color="textSecondary">Photo by <a href="https://unsplash.com/@boudewijn_huysmans" target="_blank" rel="noopener noreferrer">Boudewijn Huysmans</a> on Unsplash</Typography>
          <CardContent>
            <Typography variant="body1" component="p">
              Welcome to the MERN Skeleton home page.
              <Link to="/users">Users</Link>
            </Typography>
          </CardContent>
        </Card>
    )
}

