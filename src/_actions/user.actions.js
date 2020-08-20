import { userConstants } from '../constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    addNote,
    editNote,
    deleteNote,

    // delete: _delete,
    // update,
};

function login({email, password}) {
    return dispatch => {
        dispatch(request({ email }));
        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) {return { type: userConstants.LOGIN_SUCCESS, user }    }
    function failure(error) {return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        console.log(user)
        dispatch(request(user));
        userService.register(user)
            .then(
                user => {
                    console.log(user)

                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    console.log(error)

                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function addNote(data) {
    return dispatch => {
        dispatch(request());
        userService.addNote(data)
            .then(
                (activeUser) => dispatch(success(activeUser)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.ADD_NODE_REQUEST } }
    function success(activeUser) { return { type: userConstants.ADD_NODE_SUCCESS, payload: activeUser }}
    function failure(error) { return { type: userConstants.ADD_NODE_FAILURE, error } }
}

function editNote(data) {
    return dispatch => {
        dispatch(request());
        userService.editNote(data)
            .then(
                (activeUser) => dispatch(success(activeUser)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.EDIT_NODE_REQUEST } }
    function success(activeUser) { return { type: userConstants.EDIT_NODE_SUCCESS, payload: activeUser }}
    function failure(error) { return { type: userConstants.EDIT_NODE_FAILURE, error } }
}

function deleteNote(data) {
    return dispatch => {
        dispatch(request());
        userService.deleteNote(data)
            .then(
                (activeUser) => dispatch(success(activeUser)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.DELETE_NODE_REQUEST } }
    function success(activeUser) { return { type: userConstants.DELETE_NODE_SUCCESS, payload: activeUser }}
    function failure(error) { return { type: userConstants.DELETE_NODE_FAILURE, error } }
}
