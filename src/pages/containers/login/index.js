import React from 'react';
import {userActions} from "../../../_actions";
import { connect } from 'react-redux';
import Login from '../../components/login'


 function SignIn(props) {

    const login = (e) => {
        e.preventDefault();
        const { email, password } = e.currentTarget.elements
        props.login({
                email: email.value,
                password: password.value
        });
    }

    return (
        <Login
            login={login}
        />
    );
}

function mapStateToProps() {return{}}

const mapDispatchToProps = {
    login: userActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
