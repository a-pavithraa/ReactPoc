import React from 'react';
import {Route,Switch} from 'react-router-dom';
import SearchForm from './components/SearchScreen/SearchForm'
import ArSearchForm from './components/AccountsReceivables/ARSearchScreen';
import Milestone from './components/Milestone/Milestone';
import TransactionDrilldown from './components/Milestone/TransactionDrilldown';
import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary'
import Layout from './components/UI/Layout/Layout';

import './App.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
function App() {

 

  
  return (
    <ErrorBoundary>
    
        <Layout>
       
    <Switch>
    <Route path="/milestone/:jobNo/:aeUnid" exact component={Milestone}/>
    <Route path="/transaction/:aeUnid" exact component={TransactionDrilldown}/>
    <Route path="/arReport/" exact component={ArSearchForm}/>
    <Route path="/"  component={SearchForm}/>
    
    </Switch>
    </Layout>
   
    </ErrorBoundary>
  );
}

export default App;

