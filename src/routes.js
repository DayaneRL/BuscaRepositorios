import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/Main';
import Repositorio from './pages/Repositorio';
import User from './pages/User';
import UserRepositorio from './pages/UserRepositorio';
import Org from './pages/Org';
import OrgRepositorio from './pages/OrgRepositorio';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/repositorio/:repositorio' component={Repositorio}/>
                <Route exact path='/user' component={User}/>
                <Route exact path='/user/:user' component={UserRepositorio}/>
                <Route exact path='/organizacao' component={Org}/>
                <Route exact path='/organizacao/:organizacao' component={OrgRepositorio}/>
            </Switch>
        </BrowserRouter>
    )
}