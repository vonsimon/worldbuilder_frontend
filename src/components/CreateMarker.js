import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { v4 as uuid_v4 } from "uuid";

const CreateMarker = ({
  onSubmit,
  markerType,
  setMarkerType,
  currentSelection,
  setCurrentSelection,
  showCanvas,
  setShowCanvas,
}) => {
  const map = useMapEvents({
    click: ({ latlng }) => {
      setCurrentSelection(latlng);
      setShowCanvas(true);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const renderForm = () => {
    if (markerType === "Map") {
      return (
        <Form
          onSubmit={handleSubmit((data, e) => {
            reset();
            onSubmit(data);
          })}
        >
          <Form.Group className="mb-3" controlId="Title">
            <Form.Label>
              <span className="text-dark">Title</span>
            </Form.Label>
            <Form.Control
              type="Map"
              placeholder="Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <Alert variant="danger">{errors.title.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>
              {" "}
              <span className="text-dark">Description</span>
            </Form.Label>
            <Form.Control
              type="Map"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <Alert variant="danger">{errors.description.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Image">
            <Form.Label>
              {" "}
              <span className="text-dark">Image</span>
            </Form.Label>
            <Form.Control
              type="Map"
              placeholder="Image"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <Alert variant="danger">{errors.image.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="plane">
            <Form.Label>Plane</Form.Label>
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
          <Button type="submit">Save</Button>
        </Form>
      );
    } else if (markerType === "Landmark") {
      return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="Title">
            <Form.Label>
              {" "}
              <span className="text-dark">Title</span>
            </Form.Label>
            <Form.Control
              type="Landmark"
              placeholder="Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <Alert variant="danger">{errors.title.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>
              {" "}
              <span className="text-dark">Description</span>
            </Form.Label>
            <Form.Control
              type="Landmark"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <Alert variant="danger">{errors.description.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Image">
            <Form.Label>
              {" "}
              <span className="text-dark">Image</span>
            </Form.Label>
            <Form.Control
              type="Landmark"
              placeholder="Image"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <Alert variant="danger">{errors.image.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Background">
            <Form.Label>
              {" "}
              <span className="text-dark">Background</span>
            </Form.Label>
            <Form.Control
              type="Landmark"
              placeholder="Background"
              {...register("Background")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Canvas">
            <Form.Label>
              {" "}
              <span className="text-dark">Additional Infos</span>
            </Form.Label>
            <Form.Control
              type="Landmark"
              placeholder="Additional Infos"
              {...register("canvas")}
            />
          </Form.Group>
          <Button type="submit">Save</Button>
        </Form>
      );
    } else if (markerType === "Character") {
      return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="Title">
            <Form.Label>
              {" "}
              <span className="text-dark">Title</span>
            </Form.Label>
            <Form.Control
              type="Character"
              placeholder="Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <Alert variant="danger">{errors.title.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Description">
            <Form.Label>
              {" "}
              <span className="text-dark">Description</span>
            </Form.Label>
            <Form.Control
              type="Character"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <Alert variant="danger">{errors.description.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Image">
            <Form.Label>
              {" "}
              <span className="text-dark">Image</span>
            </Form.Label>
            <Form.Control
              type="Character"
              placeholder="Image"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <Alert variant="danger">{errors.image.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Background">
            <Form.Label>
              {" "}
              <span className="text-dark">Background</span>
            </Form.Label>
            <Form.Control
              type="Character"
              placeholder="Background"
              {...register("Background")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Personality">
            <Form.Label>
              {" "}
              <span className="text-dark">Personality</span>
            </Form.Label>
            <Form.Control
              type="Character"
              placeholder="Personality"
              {...register("Personality")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Canvas">
            <Form.Label>
              {" "}
              <span className="text-dark">Additional Infos</span>
            </Form.Label>
            <Form.Control
              type="Character"
              placeholder="Additional Infos"
              {...register("canvas")}
            />
          </Form.Group>
          <Button type="submit">Save</Button>
        </Form>
      );
    }
  };

  return (
    currentSelection && (
      <>
        <Marker
          position={[currentSelection.lat, currentSelection.lng]}
        ></Marker>
        <Offcanvas
          show={showCanvas}
          onHide={() => {
            setShowCanvas(false);
            setCurrentSelection(null);
          }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Create a marker</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form.Group className="mb-3" controlId="plane">
              <Form.Label>Marker Type</Form.Label>
              <Form.Control
                as="select"
                value={markerType}
                onChange={(e) => setMarkerType(e.target.value)}
              >
                {["Map", "Landmark", "Character"].map((option, i) => (
                  <option value={option} key={i}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {renderForm()}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  );
};

export default CreateMarker;
