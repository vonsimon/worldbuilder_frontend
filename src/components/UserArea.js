import { useState } from "react";
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Map from './Maps';


const UserArea = () => {
  const [map1, setMap1] = useState({
    url:'https://i.ytimg.com/vi/plF8mdhANMM/maxresdefault.jpg',
    bounds: [[0,0],[100,250]]
  })
  const [map2, setMap2] = useState({
    url:'https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_DE/g9a9m-227350-Full-Image_GalleryBackground-en-US-1480454218097._SX1080_.jpg',
    bounds: [[0,0],[150,250]]
  })

  return (
    <>
      <Row className="justify-content-center">
        <Col md={3}>
          <h1>User area Hi</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={5} className="btn btn-primary btn-block">
          <Button  variant="primary" className="btn btn-primary btn-block" as={Link} to='/create-setting'>
            Create Setting
          </Button>
        </Col>
        <Col md={2}>
        </Col>
        <Col md={5} className="btn btn-primary btn-block">
          <Button variant="primary"  >
            Library
          </Button>
        </Col>
      </Row>
    {/*   <Row>
          <Map url={map1.url} bounds={map1.bounds}/>
          <Map url={map2.url} bounds={map2.bounds}/>
      </Row> */}
    </>
  );
};

export default UserArea;
