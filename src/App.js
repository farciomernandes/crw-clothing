import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component'; 
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selector';
import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {
  unsubscribeFrom = null;
  //This registers a user when he is logged in and removes the user when using logout
  componentDidMount(){
    const { setCurrentUser } = this.props;

    //This is called where component is reload
    this.unsubscribeFrom = auth.onAuthStateChanged(async(userAuth) => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapShot => {
          setCurrentUser ({
              id: snapShot.id,
              ...snapShot.data()
            })
          });


      }

      setCurrentUser(userAuth);
        
      }

    )

  }

  //Use this to reset variables or overwrite variables.
  componentWillUnmount(){
    //This is called where component is destruct or reset;
    this.unsubscribeFrom();
  }

  render(){
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
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
  
        </Switch>
  
      </div>
    );
  }
  
}

const mapStateProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispach =>({
  //This method call action to redux and get reducers (methods) from redux;
  setCurrentUser: user => dispach(setCurrentUser(user))
})

export default connect(mapStateProps, mapDispatchToProps)(App);
