import { useState, useContext } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import CreateMap from './CreateMap'
import { v4 as uuid_v4 } from "uuid";
import {SettingContext} from '../context/SettingContext'

const CreateMarker = ({
  mapId,
  onSubmit,
  markerType,
  setMarkerType,
  currentSelection,
  setCurrentSelection,
  showCanvas,
  setShowCanvas,
  setting
}) => {

  const{createMap} = useContext(SettingContext)
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
    if (markerType === "Landmark") {
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



  const createMapAsMarker = async (data) => {
    const map = await createMap({...data, setting})
    const newMarker = {title: map.title, description:map.description, image: map.image, map: mapId, nestedMap: map._id, type: 'Map', coords: [currentSelection.lat, currentSelection.lng] }
    onSubmit(newMarker)
  }

  return (
    currentSelection && (
      <>
        <Marker
          position={[currentSelection.lat, currentSelection.lng]}
        ></Marker>
        <CreateMap show={ markerType === 'Map'? true : false} setShow={setMarkerType} onSubmit={createMapAsMarker}/>}
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
