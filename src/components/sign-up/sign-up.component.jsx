import React, { useState } from 'react'
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-bottom.component';

import './sign-up.styles.scss';

import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setCredentials ] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: ''
    })

    const {
        email,
        password,
        confirmPassword,
        displayName
    } = userCredentials;

    const handleSubmit = async(event) =>{
        event.preventDefault();
        const { email, password } = userCredentials;

        if(password !== confirmPassword){
            alert("password dont's match")
            return;
        }

        signUpStart({ displayName, email, password })
    }

    const handleChange = (event) =>{
        event.preventDefault();

        const { name, value } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }
        return(
            <div className="sign-up">
                <h2 className="title">I do not have a account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={handleSubmit} className="sign-up-form">
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={handleChange}
                        label='Display Name'
                        required
                    />

                      <FormInput
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        required
                    />
                      <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        label='Password'
                        required
                    />
                      <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        label='Confirm Password'
                        required
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>

                </form>
            </div>
        )
    }

const mapDispatchToProps = dispatch =>({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);