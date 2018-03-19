import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import React from 'react';

import Home from './pages/Home'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'
import AddTask from './pages/AddTask'
import UserTasks from './pages/UserTasks'

const App = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/add" component={AddUser} />
                <Route path="/edit" component={EditUser} />
                <Route path="/task" component={AddTask} />
                <Route path="/user" component={UserTasks} />

                <Route render={() => <h1>  404 Page not found</h1>} />
            </Switch>
        </div>
    </Router>
);

export default App;