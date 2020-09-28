import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users';


const MainRouter = () => {
    return (<div>
        <Switch> {/*Here, the switch component renders only one route exclusively.
                     So, an exact match on the route handler is made. If the routes are not
                     nested in the switch then the match would be partial too so a route for / would match
                     /contacts too. */}
            <Route exact path="/" component={Home} />
            <Route path="/users" component={Users}/>
        </Switch>
    </div>)
}

export default MainRouter