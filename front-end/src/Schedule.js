//I used openAI to assist with making the template of this code, it should be noted that it has since been heavly modified
import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Alert, ListGroup, Modal } from 'react-bootstrap';
import { EventContext } from './EventContext';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  // const [thisEvent, setThisEvent] = useState({
  //   day: null,
  //   title: "",
  //   time: "",
  //   description: "",
  //   address: "",
  //   org: ""
  // })
  const [day, setDate] = useState(null);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showForm, setShowForm] = useState(false);
  let navigate = useNavigate()
  let { addEvent } = useContext(EventContext)

  const handleCalendarChange = (selectedDate) => {
    const inputString = selectedDate;
    const date = new Date(inputString);
    const dateString = date.toDateString();
    const today = new Date();
    if (selectedDate >= today) {
      setDate(dateString);
      setShowForm(true);
    }
  }

  const handleFormChange = (event) => {
    switch (event.target.name) {
      case 'title':
        setTitle(event.target.value);
        break;
      case 'time':
        setTime(event.target.value);
        break;
      case 'description':
        setDescription(event.target.value);
        break;
      case 'address':
        setAddress(event.target.value);
        break;
      default:
        break;
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //Doesn't actually add to the database, click Yes button to do that
  }

  const handleBackClick = () => {
    setShowForm(false);
    setDate(null)
  }

  function addingEvent() {
    let everything = {
      title: title,
      time: time,
      day: day,
      description: description,
      address: address
    }

    function returnAlert() {
      document.getElementById("hiddenAlert").classList.remove("hiddenAlert")
    }

    if (!everything.title) {
      setShow(false)
      return returnAlert()
    } else if (!everything.time) {
      setShow(false)
      return returnAlert()
    } else if (!everything.day) {
      setShow(false)
      return returnAlert()
    } else if (!everything.description) {
      setShow(false)
      return returnAlert()
    } else if (!everything.address) {
      setShow(false)
      return returnAlert()
    } else {
      addEvent(everything)
    }
    setShow(false)
    navigate("/events")
  }

  return (
    <div>
      {showForm ? (
        <div className='fillOut'>
          <Container>
            <Row>
              <Alert key={1} variant={'danger'} id="hiddenAlert" className={"hiddenAlert"}>
                Something is missing, please check all of the inputs.
              </Alert>
            </Row>
            <Row>
              <div className='col-md-1 col-lg-2'></div>
              <Card className='form col-12 col-md-10 col-lg-8'>
                <Card.Body>
                  <Form onSubmit={handleFormSubmit}>
                    <Form.Group>
                      <Form.Label>Selected Date</Form.Label>
                      <Form.Control className='input' autoComplete="off" type="text" value={day} readOnly />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control className='input' autoComplete="off" type="text" name="title" value={title} onChange={handleFormChange} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Time</Form.Label>
                      <Form.Control className='input' autoComplete="off" type="text" name="time" value={time} onChange={handleFormChange} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control className='input' autoComplete="off" type="text" name="description" value={description} onChange={handleFormChange} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control className='input' autoComplete="off" type="text" name="address" value={address} onChange={handleFormChange} />
                    </Form.Group>
                    <div className='formButton'>
                      <Row>
                        <Button onClick={handleBackClick} variant='outline-secondary' className='col-4 formBtn'>Back to Calendar</Button>
                        <div className='col-4'></div>
                        <Button type="submit" variant='outline-success' className='col-4 formBtn' onClick={handleShow}>Schedule Appointment</Button>
                      </Row>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              <div className='col-md-1 col-lg-2'></div>
            </Row>
          </Container>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Is this correct?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup>
                <ListGroup.Item className='confirmedSch'>
                  Title: {title}
                </ListGroup.Item>
                <ListGroup.Item className='confirmedSch'>
                  Time: {time}
                </ListGroup.Item>
                <ListGroup.Item className='confirmedSch'>
                  Description: {description}
                </ListGroup.Item>
                <ListGroup.Item className='confirmedSch'>
                  Address: {address}
                </ListGroup.Item>
              </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={addingEvent} variant="success">Yes</Button>
            </Modal.Footer>
          </Modal>
        </div>

      ) : (
        <Container>
          <Calendar
            tileClassName="tile"
            value={day}
            onChange={handleCalendarChange}
            next2Label={null}
            prev2Label={null}
            minDate={new Date()}
            className="cal"
          />
        </Container>
      )}
    </div>
  );
};

export default Schedule;