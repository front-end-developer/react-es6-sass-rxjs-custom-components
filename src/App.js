import React, { useEffect, useState } from 'react';
import EnvironmentContext from './context/EnvironmentContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { envConfigService } from './services/EnvConfigService';
import Home from './pages/home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from "./pages/product-list/ProductList";
import './App.scss';

function App() {
    const [env, setEnv] = useState('');
    const getEnv = async () => {
        const envResponse = await envConfigService();
        setEnv(envResponse);
    };

    useEffect(() => {
        getEnv();
    }, []);

  return (
      <div className="app-container">
          <Router>
              <Switch>
                  <EnvironmentContext.Provider value={env}>
                      <Route exact path="/product/:id" component={ProductDetail} />
                      <Route exact path="/product-list" component={ProductList} />
                      <Route exact path="/" component={Home} />
                  </EnvironmentContext.Provider>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
