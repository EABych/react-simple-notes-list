import React from 'react';
import {userActions} from "../../../_actions";
import { connect } from 'react-redux';
import Register from '../../components/register'

function RegisterPage(props) {

    const signUp = (e) => {
        e.preventDefault();
        const { email, password, firstName, lastName } = e.currentTarget.elements
        props.register({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            notes: []
        });
    }

    return (
        <Register
            signUp={signUp}
        />
    );
}

function mapStateToProps() {return{}}

const mapDispatchToProps = {
    register: userActions.register
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);