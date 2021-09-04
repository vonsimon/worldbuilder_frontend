import { Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Home from "./components/Home";
import Register from "./components/Register.js";
import Navigation from "./components/Navigation.js";
import LogIn from "./components/LogIn.js";
import UserArea from "./components/UserArea.js";
import Setting from "./components/Setting.js"
import SingleSetting from "./components/SingleSetting";
import Library from "./components/Library.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import AuthState from "./context/AuthContext.js";
import SettingState from './context/SettingContext';
import './App.css'

const App = () => {
  return (
    <>
      <AuthState>
          <Navigation />
          <Container>
            <Row>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={LogIn} />
                <SettingState>
                  <ProtectedRoute exact path='/user-area' component={UserArea} />
                  <ProtectedRoute exact path='/singlesetting' component={SingleSetting} />
                  <ProtectedRoute exact path='/setting' component={Setting} />
                  <ProtectedRoute exact path='/library' component={Library} />
                </SettingState>
              </Switch>
            </Row>
          </Container>
      </AuthState>
    </>
  );
};

export default App;
