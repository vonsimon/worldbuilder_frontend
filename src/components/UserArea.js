import { useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Map from './Maps';
import { SettingContext } from "../context/SettingContext";


const UserArea = () => {
  const [map1, setMap1] = useState({
    url:'https://i.ytimg.com/vi/plF8mdhANMM/maxresdefault.jpg',
    bounds: [[0,0],[100,250]]
  })
  const [map2, setMap2] = useState({
    url:'https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_DE/g9a9m-227350-Full-Image_GalleryBackground-en-US-1480454218097._SX1080_.jpg',
    bounds: [[0,0],[150,250]]
  })
  const [showSettings, setShowSettings] = useState(false)
  const { postSetting } = useContext(SettingContext);

  const defaultValues = {
    title: '',
    description: '',
    image: ''
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = data => { 
    postSetting(data);
    setShowSettings(false);
  }

  return (
    <>
      <Modal
        show={showSettings}
        onHide={() => setShowSettings(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row> */}
            <Row>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Title'
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <Alert variant='danger'>{errors.title.message}</Alert>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Description'
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && <Alert variant='danger'>{errors.description.message}</Alert>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='image URL'
                  {...register('image', { required: 'Image URL is required' })}
                />
                {errors.description && <Alert variant='danger'>{errors.description.message}</Alert>}
              </Form.Group>
            </Row>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Row className="justify-content-center">
        <Col md={3}>
          <h1>User area Hi</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={5} className="btn btn-primary btn-block">
          <Button onClick={() => setShowSettings(true)} variant="primary" type="submit" className="btn btn-primary btn-block">
            Create Setting
          </Button>
        </Col>
        <Col md={2}>
        </Col>
        <Col md={5} className="btn btn-primary btn-block">

          <Button variant="primary" type="submit" >
            Library
          </Button>

        </Col>
      </Row>
      <Row>
          <Map url={map1.url} bounds={map1.bounds}/>
          <Map url={map2.url} bounds={map2.bounds}/>
      </Row>
    </>
  );
};

export default UserArea;
