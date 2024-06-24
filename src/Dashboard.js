
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Head from "./common/header/Head";
import DashboardMain from './DashboardMain'; 
import Sidebar from './Sidebar'; 
import Footer from './Footer'; 

const Dashboard = () => {
  return (
    <Router>
      <Head />
      <Switch>
        <Route path="/admin" exact>
          <DashboardMain />
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
};

export default Dashboard;
