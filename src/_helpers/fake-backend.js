// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
const uniqid = require('uniqid');

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.email === params.email && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token',
                            notes: user.notes,
                        };
                        resolve({ok: true, text: () => Promise.resolve(JSON.stringify(responseJson))});
                    } else {
                        // else return error
                        reject('email or password is incorrect');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\w+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        let matchedUsers = users.filter(user => {
                            return user.id === id;
                        });
                        let user = matchedUsers.length ? matchedUsers[0] : null;
                        // respond 200 OK with user
                        resolve({ok: true, text: () => JSON.stringify(user)});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);

                    // validation
                    let duplicateUser = users.filter(user => {
                        console.log()
                        return user.email === newUser.email;
                    }).length;
                    if (duplicateUser) {
                        reject('email "' + newUser.email + '" is already taken');
                        return;
                    }
                    // save new user
                    newUser.id = uniqid();
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    // respond 200 OK
                    resolve({ok: true, text: () => Promise.resolve()});
                    return;
                }



                // add note
                if (url.match(/\/users\/\w+$/) && opts.method === 'PUT') {
                    let newNote = JSON.parse(opts.body)
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        const userToken = opts.headers.Authorization.substr(7)
                        let activeUser

                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            console.log(user.id === id)
                            console.log(user.id ,id)
                            if (user.id === id) {

                                // add note
                                activeUser = user
                                user.notes = user.notes ? [...user.notes, {...newNote, id: uniqid()}] : [{
                                    ...newNote,
                                    id: uniqid()
                                }];
                                delete user.token
                                localStorage.setItem('users', JSON.stringify(users));
                                user.token = userToken;
                                console.log( activeUser )
                                localStorage.setItem('user', JSON.stringify(user));
                                break;
                            }
                        }
                        // respond 200 OK with user
                        resolve({ok: true, text: () => Promise.resolve(JSON.stringify(activeUser))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }

                // change note by id
                if (url.match(/\/users\/\w+$/) && opts.method === 'PATCH') {
                    let newNote = JSON.parse(opts.body)
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        const userToken = opts.headers.Authorization.substr(7)
                        let activeUser
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // edit note
                                activeUser = user
                                console.log(                                activeUser )
                                user.notes = user.notes.map(note => {
                                    return note.id === newNote.id ? newNote : note
                                });
                                delete user.token
                                localStorage.setItem('users', JSON.stringify(users));
                                user.token = userToken;
                                localStorage.setItem('user', JSON.stringify(user));
                                break;
                            }
                        }
                        // respond 200 OK with user
                        resolve({ok: true, text: () => Promise.resolve(JSON.stringify(activeUser))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }

                // delete note by id
                if (url.match(/\/users\/\w+$/) && opts.method === 'DELETE') {
                    let noteId = JSON.parse(opts.body)
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = urlParts[urlParts.length - 1];
                        const userToken = opts.headers.Authorization.substr(7)
                        let activeUser
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // edit note
                                user.notes = user.notes.filter(note => note.id !== noteId);
                                delete user.token
                                localStorage.setItem('users', JSON.stringify(users));
                                user.token = userToken;
                                activeUser = user
                                localStorage.setItem('user', JSON.stringify(user));
                                break;
                            }
                        }
                        // respond 200 OK with user
                        resolve({ok: true, text: () => Promise.resolve(JSON.stringify(activeUser))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}