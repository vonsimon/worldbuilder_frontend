import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Redirect } from "react-router-dom";
import uploadPicture from '../utils/uploadPicture';
import { SettingContext } from "../context/SettingContext";

const CreateSetting = () => {
  const { postSetting, currentSetting } = useContext(SettingContext);
  const defaultValues = {
    title: "",
    description: "",
    image: "",
  };
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch, 
    formState: { errors },
  } = useForm({ defaultValues });

  const watchImage = watch('image')

  const onSubmit = (data) => {
    postSetting(data);
  };

  if (currentSetting) return <Redirect to={`/setting/${currentSetting._id}`} />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row> */}
      <Row className="justify-content-center">
        <Col md={3}>
          <span className="text-dark">
            <br />
            <h4 className="text-center">Create a new Setting!</h4>
          </span>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col style={{
            backgroundColor: "#9da5a8",
          }} className="border border-dark">
         
        <Form.Group className="mb-3">
          <Form.Label>
            {" "}
            <span className="text-dark">Title</span>
          </Form.Label>
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
          <Form.Label>
            {" "}
            <span className="text-dark">Description</span>
          </Form.Label>
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
          {watchImage && <img src={watchImage} alt='preview' className='img-fluid' />}
        <Button style={{display: 'flex', justifyContent: 'center'}} variant="primary" type="submit">
          Submit
        </Button>
         <br />
        </Col>
        <Col></Col>
      </Row>

    </Form>
  );
};

export default CreateSetting;
