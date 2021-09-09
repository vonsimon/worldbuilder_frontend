import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <Row>
      <Col>
        <Row>
          <Col></Col>
          <Col>
            <br />
            <span className="text-dark">
              <h4 className="text-center">Welcome to the</h4>
              <h1 className="text-center">World Builder</h1>
            </span>
            <br />
            <p className="text-dark, text-center">
              <h4>"Worlds directly from your Mind into Reality!"</h4>
            </p>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <br />
            <img className="border rounded"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
              src="https://blog.shabda.co/wp-content/uploads/2021/05/creation-of-the-world-2048x1170.jpg"
            />
            <br />
          </Col>
          <Col></Col>
        </Row>
        <Row></Row>
      </Col>
    </Row>
  );
};

export default Home;
