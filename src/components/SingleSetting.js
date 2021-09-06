import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { SettingContext } from "../context/SettingContext";

const SingleSetting = () => {
  const {
    loading,
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
  }, [id]);

  const onSubmit = (e)=>{
    e.preventDefault();
    createMap()
    setShowSettings(false)
  }

  return !loading && currentSetting ? (
    <Row>
      <Modal
        show={showSettings}
        onHide={() => setShowSettings(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add map to current setting
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>{/* Here goes the form */}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <h2>{currentSetting.title}</h2>
      <p>{currentSetting.title}</p>
      <img
        src={currentSetting.image}
        alt={currentSetting.title}
        height="200px"
      />
      <Button onClick={() => setShowSettings(true)}>Add map to setting</Button>
      <ul>
        {currentSetting.maps.map((m) => (
          <li>{m.title}</li>
        ))}
      </ul>
    </Row>
  ) : (
    "Loading"
  );
};

export default SingleSetting;
