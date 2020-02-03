import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {NavBar, Footer} from '../components'
import { ImageSlider, EmployeesList, EmployeesInsert, EmployeesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={ImageSlider} />
                <Route path="/employees/list" exact component={EmployeesList} />
                <Route path="/employees/create" exact component={EmployeesInsert} />
                <Route path="/employees/update/:id" exact component={EmployeesUpdate} />
            </Switch>
            <Footer/>
        </Router>
    )
}

export default App