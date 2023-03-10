import React, { useContext, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let { signInUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInUser(username, password).then((response) => {;
            navigate("/")
            window.location.reload()
        }).catch(error => {
            console.log(error);
            window.alert('Failed login');
        });
    }

    return (
        <div className='loginPage'>
            <form onSubmit={handleSubmit}>
            <Container>
                <Row className='loginRow'>
                    <div className='col-1 col-md-3'></div>
                    <div className='col-10 col-md-6 loginPanel'>
                        <div className='lih'>
                            <center>
                                <h1>LOGIN</h1>
                            </center>
                        </div>
                        <span>USERNAME  </span>
                        <input autoComplete="off" className='loginInput col-12' placeholder="Enter username" type="text" name="username" onChange={e => setUsername(e.target.value)} />
                        <br></br><br></br>
                        <span>PASSWORD  </span>
                        <input autoComplete="off" className='loginInput col-12' placeholder="Enter password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
                        <br /><br></br>
                        <button className='signInBtn hover-effect'>
                            Sign In
                        </button>
                    </div>
                    <div className='col-1 col-md-3'></div>
                </Row>
            </Container>
        </form>
        </div>
    );
}
export default Login