import { Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Home from "./components/Home";
import Register from "./components/Register.js";
import Navigation from "./components/Navigation.js";
import LogIn from "./components/LogIn.js";
import AuthState from "./context/AuthContext.js";

const App = () => {
  return (
    <AuthState>
      <Navigation />
      <Container>
        <Row>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LogIn} />
          </Switch>
        </Row>
      </Container>
    </AuthState>
  );
};

export default App;
