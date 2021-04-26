import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdow from '../cart-dropdow/cart-dropdow.component';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';


import {ReactComponent as Logo} from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden }) =>(
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop" >
                SHOP
            </OptionLink>
            <OptionLink to="/shop" replace>
                CONTACT
            </OptionLink>

            {
                currentUser ?
                 <OptionLink as='div' onClick={()=> auth.signOut()}> SIGN OUT </OptionLink> 
                 : 
                 <OptionLink to="/signin">SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>

            {hidden? null : <CartDropdow />}
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    //This function, get a state from redux
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
//This function calls the STATE redux with the created values and methods.
