import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuid_v4 } from "uuid";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { SettingContext } from "../context/SettingContext";
import CustomMap from "./CustomMap";
import CreateMap from "./CreateMap";
import Card from "react-bootstrap/Card";

const SingleSetting = () => {
  const {
    loading,
    error,
    getSingleSetting,
    currentSetting,
    setCurrentSetting,
    createMap,
  } = useContext(SettingContext);

  const [showSettings, setShowSettings] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getSingleSetting(id);
    return () => setCurrentSetting(null);
    // eslint-disable-next-line
  }, [id]);

  const onSubmit = (data) => {
    createMap(data);
    setShowSettings(false);
  };

  return !loading && currentSetting ? (
    <Row>
      <CreateMap
        show={showSettings}
        setShow={setShowSettings}
        onSubmit={onSubmit}
      />
      <Row>
        <span>
          <br />
        </span>
        <Col></Col>
        <Col className="col-8">
          <br />
          <h1 className="text-dark">{currentSetting.title}</h1>
          <img
            className="border rounded"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            src={currentSetting.image}
            alt={currentSetting.title}
            height={"auto"}
          />
        </Col>
        <Col></Col>
      </Row>
      <span>
        <br />
      </span>
      <Row>
        <Col className="col-3"></Col>
        
        <Col
          className="rounded"
          style={{ background: "#FFFFFF"}}
        >
          <p className="text-dark">
            <br />{currentSetting.description}</p><br />
        {/*<p className="text-light">{currentSetting.plane}</p>*/}
      </Col>
        
        <Col className="col-3"></Col>
      </Row>
      <span>
        <br />
      </span>
      <Row> 
      <Col className="col-2"></Col>
            {currentSetting.maps.map((m) => (
              
              <Col>
              <Card key={m._id}
              style={{
                backgroundColor: "#9da5a8"
              }}
              className="border border-dark">
                 <Card.Body>
          <Card.Title>
            <h2>{m.title}</h2>
          </Card.Title>
         <Card.Img variant="top" className="border border-dark" style={{justifyContent: 'auto'}} src={m.image} alt={m.title} /> 
          <Card.Text style={{overflow: "auto"}}>
            {m.description}
          </Card.Text>
          <Button style={{display: 'flex', justifyContent: 'center'}} variant="primary" as={Link} to={`/map/${m._id}`} fluid>
            More
          </Button>
          </Card.Body>
              </Card>
              </Col>
             
            ))}
          
          <Col className="col-2"></Col>
        
      </Row>
      <span>
        <br />
      </span>
      <Row>
        <Col></Col>
        <Col>
          <Button
            style={{ width: "100%" }}
            onClick={() => setShowSettings(true)}
          >
            Add map to setting
          </Button>
        </Col>
        <Col></Col>
      </Row>
      <span>
        <br />
      </span>
    </Row>
  ) : (
    <Row className="justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="primary" />
    </Row>
  );
};

export default SingleSetting;
