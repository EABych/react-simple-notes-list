import React, {useReducer} from 'react';
import './App.css';
import globalStateReducer, {initialGlobalState}  from './globalStore'
import Dashboard from './pages/containers/dashboard'
import Header from './reusableComponents/header'

export const StateContext = React.createContext(initialGlobalState);

function App() {

    const [globalStore, setGlobalStore] = useReducer(globalStateReducer, initialGlobalState);


  return (
      <StateContext.Provider value={{globalStore, setGlobalStore}}>
          <Header/>
          <Dashboard/>
      </StateContext.Provider>
  );
}

export default App;
