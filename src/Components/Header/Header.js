import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from '../Login/Login';
import Home from '../Home/Home';
import Campaigns from '../Campaigns/Campaigns';
import './Header.css';
import Registration from '../Registration/Registration';
import Items from '../Items/Items';
import ItemDetails from '../Items/ItemDetails';
import Users from '../Users/Users';
import BiddedItems from '../Items/BiddedItems';
import ExpiredCampaigns from '../Campaigns/ExpiredCampaigns';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
    <Router>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Link to="/registration">
          <p className="header-signup">Sign Up</p>
          </Link> 
        <p className="header-padding"> or </p>
        <Link to="/login">
            <Button variant="outlined" size="small">
            Sign in
            </Button>
        </Link>
      </Toolbar>
     
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary} >
        {sections.map((section) => (
          <Link 
            to={`${section.url}`}
            color="inherit"
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
       
            {section.title}
          </Link>
        ))}
      </Toolbar>
      <Switch>
        <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/campaigns">
            <Campaigns />
          </Route>
          <Route exact path="/expired">
            <ExpiredCampaigns />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/campaigns/:campaignId">
            <Items />
          </Route>
          <Route path="/item/:itemId">
            <ItemDetails />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/user-items">
            <BiddedItems />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};