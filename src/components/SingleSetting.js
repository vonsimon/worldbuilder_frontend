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
      <CreateMap show={showSettings}  setShow={setShowSettings} onSubmit={onSubmit}/>
      <Row>
        <span>
          <br />
        </span>
        <h1 className="text-dark">{currentSetting.title}</h1>
        <img
          className="text-dark"
          src={currentSetting.image}
          alt={currentSetting.title}
          height={"auto"}
        />
        <span>
          <br />
        </span>
      </Row>
      <Row>
      <p className="text-dark">{currentSetting.description}</p>
        {/*<p className="text-light">{currentSetting.plane}</p>*/}
        <span>
          <br />
        </span>
      </Row>
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
      <Row>
        <ul>
          {currentSetting.maps.map((m) => (
            <li key={m._id} className="text-light">
              <Link to={`/map/${m._id}`}>{m.title}</Link>
            </li>
          ))}
        </ul>
      </Row>
    </Row>
  ) : (
    <Row className='justify-content-center align-items-center vh-100'>
      <Spinner animation="border" variant="primary" />
    </Row>
  );
};

export default SingleSetting;
