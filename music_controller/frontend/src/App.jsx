import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Joinpage from './components/JoinPage/Joinpage';
import CreateRoomPage from './components/CreateRoomPage/CreateRoomPage';
import Room from './components/Room/Room';

function App() {

  return (
    <Router>
      <Routes>
        {/* Define the routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/joinroom" element={<Joinpage />} />
        <Route path="/Createroom" element={<CreateRoomPage />} />
        <Route path="/room/:code" element={<Room />} />
      </Routes>
    </Router>
  )
}

export default App
