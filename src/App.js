import React, {useState} from 'react';
import './App.css';
import Dashboard from './pages/containers/dashboard'
import LoginPage from './pages/containers/login'
import RegisterPage from './pages/containers/register'
import Header from './reusableComponents/header'
import {configureFakeBackend, history} from './_helpers';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {PrivateRoute} from "./_helpers/PrivateRoute";
import {Provider} from 'react-redux';
import {store} from './_helpers';
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});
// setup fake backend
configureFakeBackend();

function App() {


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Provider store={store}>
                    <Header/>
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard}/>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/register" component={RegisterPage}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </Router>
                </Provider>
            </Page>
        </Document>
    );
}

export default App

