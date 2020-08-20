## Nodes App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## About the project

### `the project used:`

   - @material-ui - used to quickly fill the interface with ready-made components
   - redux - used to store the global state of the application, + conveniently control changes in the global state
   - redux-thunk - used to send requests to the fake-backend
   - uniqid - used to generate unique IDs
   
### `implemented in the project:`

1. Sign up, login and logout 
2. Ability to create / edit / delete notes
3. Ability to view a list of all notes (if the title is 16 characters long, it is partially hidden and becomes visible when you hover over it)

####The note:
the note includes:
- creation date (set automatically)
- title (editable, required)
- picture (variable, optional)

The picture can be rotated and enlarged / reduced (analogous to uncontrolled cropping *).

(* Cropping can be added, but libraries must be included. If the current functionality is not enough, it will be fixed)
 
 ####The data:
 data is stored in the browser (local storage)
 
 
 
#####The app works like a spa