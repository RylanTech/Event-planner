import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { useParams, useNavigate, Link } from "react-router-dom";
import { EventContext } from './EventContext'
import { useContext, useState, useEffect } from 'react'
import { Alert, Container, Row } from "react-bootstrap";
import { UserContext } from "./UserContext";

function Details(props) {

  let params = useParams()
  let navigate = useNavigate()
  let { refreshEvents} = useContext(EventContext)
  let { isLoggedIn } = useContext(UserContext)

  let { getEvents, deleteEvent } = useContext(EventContext)
  let [event, setEvent] = useState()
  let [error, setError] = useState()
  let [userLog, setUserLog] = useState()

  useEffect(() => {
    setError(null)
    async function fetch() {
      setUserLog(await isLoggedIn())
      await getEvents(params.eventId)
        .then((event) => setEvent(event))
        .catch((message) => setError(message))
    }
    fetch()

  }, [params.eventId, getEvents])

  function errorMessage() {
    return <Alert variant="danger">There was an error attempting to load this contact: {error}</Alert>
  }

  function handleDeleteEvent() {
    let id = params.eventId
    deleteEvent(id)
    refreshEvents()
    navigate('/events')
  }

  function loading() {
    return <div className="w-25 text-center"><Spinner animation="border" /></div>
  }

  function loggedIn() {
    let { title, description, time, day, address, org } = event
    return (
      <div className="align-self-start col-12 col-lg-8">
        <Card className='eItem details'>
          <Card.Body>
            <Card.Title className="title"><h3>{title}</h3></Card.Title>
            <Card.Subtitle className="mb-2">{day} at {time}</Card.Subtitle>
            <Card.Text>
              <Container>
                <Row>
                  <div className="col-12 col-md-10">
                    {description}
                    <br />
                    <br />
                    <h4>Location</h4>
                    {address}
                    <br />
                    <br />
                    <h4>Organization</h4>
                    {org}
                  </div>
                  <div className="col-1">  
                  {/* <Button variant="outline-primary" className="butn">
                      <Link to={"/events/edit/" + params.eventId}>
                        <span className="material-symbols-outlined">
                        edit
                      </span>
                      </Link>
                    </Button>  */}
                    <Button variant="outline-danger" onClick={handleDeleteEvent} className="butn">
                      <span className="material-symbols-outlined dbtn">
                        delete
                      </span>
                    </Button>
                  </div>
                </Row>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }

  function notLoggedIn() {
    let { title, description, time, day, address, org } = event

    return (
      <div className="align-self-start col-12 col-lg-8">
        <Card className='eItem details'>
          <Card.Body>
            <Card.Title className="title"><h3>{title}</h3></Card.Title>
            <Card.Subtitle className="mb-2">{day} at {time}</Card.Subtitle>
            <Card.Text>
              <Container>
                <Row>
                  <div className="col-12 col-md-12">
                    {description}
                    <br />
                    <br />
                    <h4>Location</h4>
                    {address}
                    <br />
                    <br />
                    <h4>Organization</h4>
                    {org}
                  </div>
                </Row>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
  if (error) return errorMessage()
  if (event === undefined) return loading()
  if (event.eventId !== parseInt(params.eventId)) {
    return loading()
  } else {
    if (userLog) {
      return loggedIn()
    } else {
      return notLoggedIn()
    }
  }
}

export default Details