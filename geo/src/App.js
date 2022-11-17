import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Mapa from './vistas/mapa'

import Nombre from './vistas/nombre'


function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Nombre} />
        <Route exact path="/mapa" component={Mapa} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
