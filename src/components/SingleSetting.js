import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { v4 as uuid_v4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { SettingContext } from '../context/SettingContext';

const SingleSetting = () => {
  const { loading, getSingleSetting, currentSetting, setCurrentSetting, createMap } = useContext(SettingContext);

  const [showSettings, setShowSettings] = useState(false);
  const { id } = useParams();
  const defaultValues = {
    title: '',
    description: '',
    image: '',
    bounds: [
      [0, 0],
      [100, 100]
    ],
    plane: ''
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  useEffect(() => {
    getSingleSetting(id);
    return () => setCurrentSetting(null);
  }, [id]);

  const onSubmit = data => {
    createMap(data);
    setShowSettings(false);
  };

  return !loading && currentSetting ? (
    <Row>
      <Modal
        show={showSettings}
        onHide={() => setShowSettings(false)}
        dialogClassName='modal-90w'
        aria-labelledby='example-custom-modal-styling-title'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>Add map to current setting</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            {/*<----------------------------Adapt Form Start----------------------------->*/}
            {/* <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row> */}
            <Row>
              <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Title'
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <Alert variant='danger'>{errors.title.message}</Alert>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Description'
                  {...register('description', {
                    required: 'Description is required'
                  })}
                />
                {errors.description && <Alert variant='danger'>{errors.description.message}</Alert>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='image URL'
                  {...register('image', {
                    required: 'Image URL is required'
                  })}
                />
                {errors.image && <Alert variant='danger'>{errors.image.message}</Alert>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='plane'>
                <Form.Label>Plane:</Form.Label>
                <Form.Control
                  as='select'
                  {...register('plane', {
                    required: 'Plane is required'
                  })}
                >
                  {['Galaxy', 'Solar System', 'Planet', 'Continent', 'Country', 'City', 'Building'].map(option => (
                    <option key={uuid_v4()} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
                {errors.image && <Alert variant='danger'>{errors.image.message}</Alert>}
              </Form.Group>
            </Row>

            {/*<----------------------------Adapt Form End----------------------------->*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button type='submit'>Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <h1 className='text-light'>{currentSetting.title}</h1>
      <br />
      <br />
      <br />
      <p className='text-light'>{currentSetting.description}</p>
      {/*<p className="text-light">{currentSetting.plane}</p>*/}
      <img className='text-light' src={currentSetting.image} alt={currentSetting.title} height={'auto'} />
      <Row>
        <Col style={{ height: '2rem' }}></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Button style={{ width: '100%' }} onClick={() => setShowSettings(true)}>
            Add map to setting
          </Button>
        </Col>
        <Col></Col>
      </Row>
      <ul>
        {currentSetting.maps.map(m => (
          <li>{m.title}</li>
        ))}
      </ul>
    </Row>
  ) : (
    'Loading'
  );
};

export default SingleSetting;
