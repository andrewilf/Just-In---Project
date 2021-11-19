import logo from './logo.svg';
import './App.css';
//import Post from './components/post';
import ProfileSelector from './components/profileSelector';
import Footer from './components/footer';
import Sidebar from './components/sidebar';
import data from './sampleData';
//import twitterPayload from './APIs/twitterPayloadCall';
import React, { useState, useEffect } from 'react';
import { createStore } from "redux"
import { Provider, useDispatch } from "react-redux"
import justinDataReducer from './reducers/justInDataReducer';
import Feed from './components/feed';
import ModalPrompt from './components/modalPrompt';
import apikeys from './keys';
import { HashRouter as Redirect, Link, Switch, Route } from "react-router-dom"
import NewPerson from './components/newPerson';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
} from 'mdb-react-ui-kit';
function App() {
  localStorage.clear()
  //const [apiKey, setApiKey] = useState(false)

  if (localStorage.getItem('justinkeys') === null) {
    //let keys = prompt("Please enter your key object", "")
    //console.log(keys)
    localStorage.setItem('justinkeys', JSON.stringify(apikeys))
  }

  if (localStorage.getItem('justindata') === null) {
    localStorage.setItem('justindata', JSON.stringify(data))
    console.log("setting sample data")
  }

  const Storage = JSON.parse(localStorage.getItem('justindata'))
  console.log(Storage)


  const store = createStore(justinDataReducer, {
    data: Storage, currentProfile: Object.keys(Storage)[0], basicModal: false, payload: []
  })
  console.log(store.getState().payload)

  return (
    <>
      {/* <Router>
    <div>
      <Link to="/">Home</Link>{' '}
      <Link to={{pathname: '/about'}}>About</Link>{' '}
      <Link to="/contact">Contact</Link>
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route
          path="/contact"
          render={() => <h1>Contact Us</h1>} />
        <Route path="/blog" children={({match}) => (
          <li className={match ? 'active' : ''}>
            <Link to="/blog">Blog</Link>
          </li>)} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
    </Router> */}
     
        <Provider store={store}>
          <ModalPrompt />
          <header className="fixed-top">
            <MDBNavbar expand='lg' light bgColor='white' >
              <MDBContainer fluid>
                <MDBNavbarToggler
                  aria-controls='navbarExample01'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <MDBIcon fas icon='bars' />
                </MDBNavbarToggler>
                <div className='collapse navbar-collapse' id='navbarExample01' style={{ paddingLeft: "200px" }}>
                  <MDBNavbarNav right className='mb-2 mb-lg-0'>
                    <MDBNavbarItem active>
                      <MDBNavbarLink aria-current='page' href='#'>
                        Home
                      </MDBNavbarLink>
                      {/* <Link to="/#">Home</Link> */}
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <div style={{ paddingLeft: "800px", paddingRight: "0px" }}>
                        <ProfileSelector />

                      </div>
                    </MDBNavbarItem>


                  </MDBNavbarNav>
                </div>
              </MDBContainer>
            </MDBNavbar>
          </header>

          <div className="mainColumns">
            <Sidebar />
            <div className="mainContent">
           <Switch>
              <Route exact path="/">
              <Feed /> 
              </Route>
              {/* <Feed /> */}
              <Route exact path="/newperson">
                <NewPerson />
              </Route>
              <Route path="/">
             <h2>bad path</h2>
              </Route>
              </Switch>
            </div>

          </div>

          <Switch>
              <Route exact path="/">
              <Footer />
              </Route>
              {/* <Feed /> */}
              <Route exact path="/newperson">
                 
              </Route>
              <Route path="/">
              
              </Route>
              </Switch>

         
        </Provider>
        
    </>

  );
}

export default App;
