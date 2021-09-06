import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  const defaultValues = {
    setting: "",
    marker: "",
    type: "",
    title: "",
    description: "",
    image: "",
    bounds: [[Number]],
    plane: {
      type: String,
      enum: [
        "Galaxy",
        "Solar System",
        "Planet",
        "Continent",
        "Country",
        "City",
        "Building",
      ],
      required: true,
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    getSingleSetting(id);
    return () => setCurrentSetting(null);
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    createMap();
    setShowSettings(false);
  };

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
          <Modal.Body>
            {/*<----------------------------Adapt Form Start----------------------------->*/}
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row> */}
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <Alert variant="danger">{errors.title.message}</Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <Alert variant="danger">{errors.description.message}</Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="image URL"
                    {...register("image", {
                      required: "Image URL is required",
                    })}
                  />
                  {errors.image && (
                    <Alert variant="danger">{errors.image.message}</Alert>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Plane</Form.Label>
                 {/* <Form.Control
                    as="select"
                    custom
                    {...register("plane", {
                        required: "Plane is required",
                      })}
                    onChange={this.handleSubmit.bind(this)}
                   
                  >
                    <option value="Galaxy">Galaxy</option>
                    <option value="Solar System">Solar System</option>
                    <option value="Planet">Planet</option>
                    <option value="Continent">Continent</option>
                    <option value="Country">Country</option>
                    <option value="City">City</option>
                    <option value="Building">Building</option>
                    </Form.Control> */}
                  {errors.plane && (
                    <Alert variant="danger">{errors.plane.message}</Alert>
                  )}
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

            {/*<----------------------------Adapt Form End----------------------------->*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <h1 className="text-light">{currentSetting.title}</h1>
      <br />
      <br />
      <br />
      <p className="text-light">{currentSetting.description}</p>
      {/*<p className="text-light">{currentSetting.plane}</p>*/}
      <img
        className="text-light"
        src={currentSetting.image}
        alt={currentSetting.title}
        height={'auto'}
      />
      <Row><Col style={{height:'2rem'}}></Col></Row>
      <Row>
          <Col></Col>
          <Col>
      <Button style={{width:'100%'}} onClick={() => setShowSettings(true)}>Add map to setting</Button>
      </Col>
      <Col></Col>
      </Row>
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
