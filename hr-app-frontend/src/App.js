import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import SuccessSnackBar from './components/SuccessSnackBar'
import { connect } from 'react-redux';

class App extends Component {
  render(){

    return (
       <BrowserRouter>
            <div className="App">
              <SuccessSnackBar />
                <Switch>
                    <Route exact path="/" component={Dashboard}/>

                  </Switch>


             </div>
       </BrowserRouter>

    );
  }
}

const mapStateToProps = (state)=>{
    return{

    }
}

export default connect(mapStateToProps)(App)
