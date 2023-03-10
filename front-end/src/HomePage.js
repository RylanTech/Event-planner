import Carousel from 'react-bootstrap/Carousel';
import Cointainer from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

function HomePage() {
    let { isLoggedIn } = useContext(UserContext)
    let [userLog, setUserLog] = useState()

    useEffect(() => {
        async function checking() {
            setUserLog(await isLoggedIn())
        }
        checking()
    }, [])

    function loggedIn() {
        return (
            <div>
                <Container>
                    <center>
                    </center>
                    <Row>
                        <center>
                            <Link to="/events"><Button className='SE hover-effect'>View Events</Button></Link>
                            <br />
                            <Link to="/schedule"><Button className='SE hover-effect'>Schedule an Event</Button></Link>
                        </center>
                    </Row>
                </Container>
            </div>
        )
    }
    
    function notLoggedIn() {
        return (
            <div>
                <Container>
                    <Row>
                        <center>
                            <Link to="/events"><Button className='SE hover-effect'>View Events</Button></Link>
                            <br />
                            <Link to="/login"><Button className='SE hover-effect'>Organizer Login</Button></Link>
                        </center>
                    </Row>
                </Container>
            </div>
        )
    }

    if (userLog) {
        return loggedIn()
      } else {
        return notLoggedIn()
      }
}
export default HomePage