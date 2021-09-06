import { useContext } from "react";
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {Redirect} from "react-router-dom"
import { SettingContext } from "../context/SettingContext";

const CreateSetting = () => {
  const { postSetting , currentSetting} = useContext(SettingContext);
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
  }

  if (currentSetting)
  return (
    <Redirect
      to={`/setting/${currentSetting._id}`}
    />
  );

    return (   <Form onSubmit={handleSubmit(onSubmit)}>
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
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <Alert variant='danger'>{errors.description.message}</Alert>}
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type='text'
          placeholder='image URL'
          {...register('image', { required: 'Image URL is required' })}
        />
        {errors.image && <Alert variant='danger'>{errors.image.message}</Alert>}
      </Form.Group>
    </Row>
    <Button variant='primary' type='submit'>
      Submit
    </Button>
  </Form>
    )
}

export default CreateSetting
