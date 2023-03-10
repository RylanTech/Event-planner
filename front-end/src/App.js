import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Schedule from "./Schedule";
import HomePage from "./HomePage"
import Events from "./Events";
import Details from "./Details";
import Login from "./Login";
import Search from "./Search";
import User from "./User";
// import Edit from "./Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/events" element={<Events/>}>
            <Route path=':eventId' element={<Details />}/>
          </Route>
          {/* <Route path="events/edit/:eventId" element={<Edit/>}/> */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/user/:id" element={<User/>}/>
          <Route path="*" element={<h1>Component Not Found</h1>}/>
          <Route path="/search" element={<Search/>}/>
        </Route>
        <Route path="*" element={<p>Page Not Found</p>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
