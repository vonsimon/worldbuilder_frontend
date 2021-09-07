import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuid_v4 } from "uuid";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { SettingContext } from "../context/SettingContext";
import CustomMap from "./CustomMap";

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
  const defaultValues = {
    title: "",
    description: "",
    image: "",
    boundsX: 100,
    boundsY: 100,
    plane: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const watchImage = watch("image", "");
  const watchBoundsX = watch("boundsX", "");
  const watchBoundsY = watch("boundsY", "");

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
      <Modal style={{
            backgroundColor: "#0000",
          }}
        
        size="xl"
        show={showSettings}
        onHide={() => {
          setShowSettings(false);
          reset();
        }}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton
        >
          <Modal.Title id="example-custom-modal-styling-title" >
            Add map to current setting
          </Modal.Title>
        </Modal.Header>
        <Row className="justify-content-center">
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <Row>{error && <Alert variant="danger">{error}</Alert>}</Row>
                <Row>
                  <Form.Group className="mb-3" >
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
                      <Alert variant="danger">
                        {errors.description.message}
                      </Alert>
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
                  <Form.Group className="mb-3" controlId="plane">
                    <Form.Label>Plane:</Form.Label>
                    <Form.Control
                      as="select"
                      {...register("plane", {
                        required: "Plane is required",
                      })}
                    >
                      {[
                        "Galaxy",
                        "Solar System",
                        "Planet",
                        "Continent",
                        "Country",
                        "City",
                        "Building",
                      ].map((option) => (
                        <option key={uuid_v4()} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                    {errors.image && (
                      <Alert variant="danger">{errors.image.message}</Alert>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bounds X</Form.Label>
                    <Form.Control
                      type="range"
                      min={100}
                      max={1000}
                      {...register("boundsX", {
                        required: "Horizontal bounds are required",
                      })}
                    />
                    {errors.image && (
                      <Alert variant="danger">{errors.image.message}</Alert>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bounds Y</Form.Label>
                    <Form.Control
                      type="range"
                      min={100}
                      max={1000}
                      {...register("boundsY", {
                        required: "Horizontal bounds are required",
                      })}
                    />
                    {errors.image && (
                      <Alert variant="danger">{errors.image.message}</Alert>
                    )}
                  </Form.Group>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowSettings(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </Modal.Footer>
            </Form>
          </Col>
          <Col>
            {watchImage ? (
              <CustomMap
                url={watchImage}
                bounds={[
                  [0, 0],
                  [parseInt(watchBoundsY), parseInt(watchBoundsX)],
                ]}
              />
            ) : (
              "No preview"
            )}
          </Col>
        </Row>
      </Modal>
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
    "Loading"
  );
};

export default SingleSetting;
