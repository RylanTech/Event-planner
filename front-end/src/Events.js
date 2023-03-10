import React, { useContext } from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, Outlet, useParams } from 'react-router-dom'
import { EventContext } from "./EventContext"

function Events() {

    let { deleteEvent } = useContext(EventContext)
    let params = useParams()

    function list(events) {
        if (events === undefined) {
            return (
                <ListGroup.Item className='eItem' key={"error2"}>
                    <h3>Something went wrong with the Database</h3>
                </ListGroup.Item>
            )
        } else {
            return events.map((event) => {
                let today = new Date()
                let day = new Date(event.day)
                if (today > day) {
                    deleteEvent(event.eventId)
                    return
                } else if (today < day) {
                    return (
                        <ListGroup.Item className='eItem col-12' key={event.eventId}>
                            <Link to={`/events/${event.eventId}`} key={event.eventId} className="eLink">
                                <Button className='eventButton'>
                                    <div className='eventTitle'>{event.title}</div>
                                    {event.org}
                                </Button>
                            </Link>
                        </ListGroup.Item>
                    )
                }
            })
        }
    }

    function welcomeCard() {
        return (
            <div className="align-self-start col-12 col-lg-8">
                <Card className='eItem details'>
                    <Card.Body>
                        <Card.Text>
                            <Container>
                                <Row>
                                    <div className="col-12 col-md-10">
                                        <br />
                                        <br />
                                        <h4>Location</h4>
                                        <br />
                                        <br />
                                        <h4>Organization</h4>
                                    </div>
                                </Row>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    if (params.eventId) {
        return (
            <>
                <Container>
                    <Row>
                        <ListGroup className="align-self-start col-12 col-lg-4 selector">
                            <div className='vertical-menu'>
                                <EventContext.Consumer>
                                    {({ events }) => (
                                        list(events)
                                    )}
                                </EventContext.Consumer>
                            </div>
                        </ListGroup>
                        <Outlet />
                    </Row>
                </Container>
            </>
        )
    } else {
        return (
            <>
                <Container>
                    <Row>
                        <ListGroup className="align-self-start col-12 col-lg-4 selector">
                            <div className='vertical-menu'>
                                <EventContext.Consumer>
                                    {({ events }) => (
                                        list(events)
                                    )}
                                </EventContext.Consumer>
                            </div>
                        </ListGroup>
                        <div className="align-self-start col-12 col-lg-8">
                            <Card className='eItem details'>
                                <Card.Body>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <div className="col-12 col-md-8">
                                                    <h1>Hello there!</h1>
                                                    Click on a event on the left of the screen to look at the details of each event! Or you can
                                                    search for a specific event under the search tab above!
                                                    <br />
                                                </div>
                                            </Row>
                                        </Container>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Events