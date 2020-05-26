import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import SuccessSnackBar from './components/alerts/SuccessSnackBar'
import ErrorSnackBar from './components/alerts/ErrorSnackBar'
import WarningSnackBar from './components/alerts/WarningSnackBar'
import LoadingProgress from './components/alerts/LoadingProgress'
import DetailDialog from './components/DetailDialog'
import { baseUrl } from './components/Constants'
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {
/*
  componentDidMount(){
    axios.get(baseUrl + '/language')
      .then(res=>{
        if(res.data != 'en'){
          console.log(res.data)
          alert("We've detected that your language preferences are set to "
           +  res.data.toUpperCase() +
           " Unfortunately, we have no support for that language.")
        }
      })
  }
*/
  render(){
    return (
       <BrowserRouter>
            <div className="App">
              <SuccessSnackBar />
              <ErrorSnackBar />
              <WarningSnackBar />
              <LoadingProgress />
              <DetailDialog />
                <Switch>
                  <Route exact path="/" component={Dashboard}/>
                </Switch>
             </div>
       </BrowserRouter>
    );
  }
}
export default App
