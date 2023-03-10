import { useContext, useState } from "react"
import { Button, Container, Form, ListGroup, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { EventContext } from "./EventContext"

function Search() {
    let { deleteEvent, searchEvents } = useContext(EventContext)

    let [eventsList, setEventsList] = useState()
    let [query, setQuery] = useState({
        search: ""
    })
    let { search } = query

    async function handleChange(event) {
        await setQuery((preValue) => {
            let i = { ...preValue, [event.target.name]: event.target.value }
            searchEvents(i.search)
            .then((events) => {
                setEventsList(events);
            });
            return i
        })
    }

    function list(events) {
        if (events === undefined) {
            return
        } else {
            return events.map((event) => {
                let today = new Date()
                let day = new Date(event.day)
                if (today > day) {
                    deleteEvent(event.eventId)
                    return
                } else if (today < day) {
                    return (
                        <ListGroup.Item className='eItem2' key={event.eventId}>
                            <Link to={`/events/${event.eventId}`} key={event.eventId} className="eLink">
                                <Button className='eventButton'>
                                    <Row>
                                        <div className='eventTitle col-12 col-md-6'>
                                            {event.title}
                                        </div>
                                        <div className="col-12 col-md-6 rr">
                                            {event.org}
                                        </div>
                                    </Row>
                                </Button>
                            </Link>
                        </ListGroup.Item>
                    )
                }
            })
        }
    }

    return (
        <Container>
            <div className="searchBar">
                <Row>
                    <Form>
                        <center>
                            <h1 className="SH">Find Events</h1>
                            <br/>
                        </center>
                        <Form.Control type="text" name="search" value={search} onChange={handleChange} autoComplete="off" />
                    </Form>
                </Row>
            </div>
            <Row>
                <div className="col-12 responces">
                    {list(eventsList)}
                </div>
            </Row>
        </Container>
    )
}
export default Search