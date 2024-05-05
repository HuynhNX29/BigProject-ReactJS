import logo from './logo.svg';
import './App.css';
import AppHeader from './Components/Header';
import PageContent from './Components/PageContent';
import AppFooter from './Components/Footer';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import StoreContext from './Context/context';


function App() {

  const [store, setStore] = useState({ cart: [] });

  return (


    <div className='App'>

      <StoreContext.Provider value={{ store, setStore }}>
        <BrowserRouter>
          <AppHeader />
          <PageContent />
          <AppFooter />
        </BrowserRouter>
      </StoreContext.Provider>





    </div>
  );
}







export default App;
