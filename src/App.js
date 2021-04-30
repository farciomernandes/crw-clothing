import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component'; 
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';


const App = ({ checkUserSession, currentUser })=> {

  useEffect(()=>{
    checkUserSession()
  },[checkUserSession])

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />

          <Route
            exact
            path='/signin'
            render={() =>
              currentUser ? ( <Redirect to='/' /> ) : ( <SignInAndSignUpPage /> )
            }
          />
  
        </Switch>
  
      </div>
    );
  }
const mapStateProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch =>({
  checkUserSession: ()=> dispatch(checkUserSession())
})


export default connect(mapStateProps, mapDispatchToProps)(App);
