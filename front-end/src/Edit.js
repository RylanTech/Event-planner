// import { useContext, useEffect, useState } from "react"
// import { Alert, Button, Card, Container, Row, Spinner } from "react-bootstrap"
// import { Form, Link, useParams } from "react-router-dom"
// import { EventContext } from "./EventContext"

// function Edit() {

//     let params = useParams()
//     let { getEvents, editEvent } = useContext(EventContext)
//     let [event, setEvent] = useState()
//     let [error, setError] = useState()

//     useEffect(() => {
//         setError(null)
//         async function fetch() {
//             await getEvents(params.eventId)
//                 .then((event) => setEvent(event))
//                 .catch((message) => setError(message))
//         }
//         fetch()

//     }, [params.eventId, getEvents])

//     let { title, description, time, day, address, org } = event

//     function errorMessage() {
//         return <Alert variant="danger">There was an error attempting to load this contact: {error}</Alert>
//     }

//     function loading() {
//         return <div className="w-25 text-center"><Spinner animation="border" /></div>
//     }

//     function handleChange(event) {
//         return ((prevValue) => {
//             return { ...prevValue, [event.target.name]: event.target.value }
//         });
//     }

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         console.log(`Day: ${day}, Title: ${title}, Time: ${time}, Description: ${description}, Address: ${address}, Org: ${org}`)
//         //Doesn't actually add to the database, click Yes button to do that
//       }

//     function EventCard() {
//         return (
//             <div className="align-self-start col-12">
//                 <Container>
//                     <Row>
//                         <div className='col-md-1 col-lg-2'></div>
//                         <Card className='form col-12 col-md-10 col-lg-8'>
//                             <Card.Body>
//                                 <Form onSubmit={handleFormSubmit}>
//                                     <Form.Group>
//                                         <Form.Label>Selected Date</Form.Label>
//                                         <Form.Control className='input' type="text" value={day} readOnly />
//                                     </Form.Group>
//                                     <Form.Group>
//                                         <Form.Label>Title</Form.Label>
//                                         <Form.Control className='input' type="text" name="title" value={title} onChange={handleChange} />
//                                     </Form.Group>
//                                     <Form.Group>
//                                         <Form.Label>Time</Form.Label>
//                                         <Form.Control className='input' type="text" name="time" value={time} onChange={handleChange} />
//                                     </Form.Group>
//                                     <Form.Group>
//                                         <Form.Label>Description</Form.Label>
//                                         <Form.Control className='input' type="text" name="description" value={description} onChange={handleChange} />
//                                     </Form.Group>
//                                     <Form.Group>
//                                         <Form.Label>Address</Form.Label>
//                                         <Form.Control className='input' type="text" name="address" value={address} onChange={handleChange} />
//                                     </Form.Group>
//                                     <Form.Group>
//                                         <Form.Label>Organization</Form.Label>
//                                         <Form.Control className='input' type="text" name="org" value={org} onChange={handleChange} />
//                                     </Form.Group>
//                                 </Form>
//                             </Card.Body>
//                         </Card>
//                         <div className='col-md-1 col-lg-2'></div>
//                     </Row>
//                 </Container>
//             </div>
//         )
//     }


//     if (error) return errorMessage()
//     if (event === undefined) return loading()
//     return event.eventId !== parseInt(params.eventId) ? loading() : EventCard()
// }
// export default Edit