import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';


const sections = [

  { title: 'Active Campaigns', url: '/campaigns' },
  { title: 'Expired Campaigns', url: '/expired' },
  { title: 'My Bidded Items', url: '/user-items' },
  { title: 'Users', url: '/users' },
  { title: 'Contacts', url: '/contacts' },
];


function App() {
   return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Header title="Online Auction" sections={sections} />
        </Container>
        <Footer title="Auction" description="online auction" />
    </React.Fragment>
  );
}

export default App;