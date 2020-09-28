import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Person from '@material-ui/icons/Person'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import {list} from './api-user.js';

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



export default function Users() {
    const [users, setUsers] = React.useState([]);
    const classes = useStyles()
    /* This is one way of declaringa state variable. Here we are declaring a 
        variable users which has a setter function setUsers(). The default state given to this variable is [].
        "useState" is a react Hook which adds the variable to the state of the component.
        Invoking "useState"  returns the current state and a  function  that updates the state value, 
        which is similar to  this.setState  in a class definition.*/

    /* The Effect Hook,  useEffect, serves the purpose of the  componentDidMount,  componentDidUpdate, and componentWillUnmount  
    React life cycle methods that we would otherwise use in React classes. 
    Using this hook in a function component allows us to perform side effects such as fetching data from a backend. 
    By default, React runs the effects defined with useEffect  after every render, including the first render.
    But we can also instruct the effect to only rerun if something changes in state. 
    Optionally, we can also define how to clean up after an effect, for example, 
    to perform an action such as aborting a fetch signal when the component unmounts to avoid memory leaks.*/


    React.useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error);
            }
            else {
                setUsers(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])
    /*The empty array added as the second parameter runs the effect only once upon mounting and umounting,
    not after every render. */

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
        </Typography>
            <List dense>
                {
                    users.map((item, i) => {
                        return <Link to={"/user" + item._id} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name}></ListItemText>
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    })
                }
            </List>

        </Paper>
    )
}