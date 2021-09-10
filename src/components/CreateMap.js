import {useState} from 'react'
import { useForm } from "react-hook-form";
import { v4 as uuid_v4 } from "uuid";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import uploadPicture from '../utils/uploadPicture';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import CustomMap from './CustomMap'

const CreateMap = ({show, setShow, onSubmit}) => {
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
        setValue,
        setError,
        formState: { errors },
      } = useForm({ defaultValues });
    
      const watchImage = watch("image", "");
      const watchBoundsX = watch("boundsX", "");
      const watchBoundsY = watch("boundsY", "");
      console.log(watchImage)

  return (
    <Modal
      style={{
        backgroundColor: "#0000",
      }}
      size="xl"
      show={show}
      onHide={() => {
        setShow(false);
        reset();
      }}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Add map to current setting
        </Modal.Title>
      </Modal.Header>
      <Row className="justify-content-center">
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
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
                <Form.Group className='mb-3'>
                  <Form.Label>Upload picture</Form.Label>
                  <Form.Control type='file' onChange={e => uploadPicture(e, setValue, setError)} />
                  {errors.image && <Alert variant='danger'>{errors.image.message}</Alert>}
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
                  setShow(false);
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
  );
};

export default CreateMap