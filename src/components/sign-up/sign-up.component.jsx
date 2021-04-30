import React from 'react'
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-bottom.component';

import './sign-up.styles.scss';

import { signUpStart } from '../../redux/user/user.actions';

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async(event) =>{
        event.preventDefault();

        const { signUpStart } = this.props;
        const { displayName, confirmPassword, email, password } = this.state;

        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        signUpStart({ displayName, email, password })
    }

    handleChange = (event) =>{
        event.preventDefault();

        const { name, value } = event.target;
        this.setState({[name]: value});
    }
    

    render(){
        const { displayName, confirmPassword, email, password } = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have a account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handleSubmit} className="sign-up-form">
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />

                      <FormInput
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                      <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                      <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>

                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);