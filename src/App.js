
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Home from './components/Home.js';

const App = () => {
  return (
    <>
    <Container>
    {/*  <Navigation />  */}
      <Row>
        <Switch>
          <Route exact path="/" component={Home} />
          
        </Switch>
      </Row>
    </Container>
    </>
  );
}

export default App;
