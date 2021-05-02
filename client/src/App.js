import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import MenuBar from './components/MenuBar'

//css
import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Container> 
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
