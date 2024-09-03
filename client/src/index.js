import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './styles/main.css'
import ReactDOM from 'react-dom/client';
import NavBar from './components/Navbar';
import Header from './components/Header';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import PlanePage from './pages/PlanePage'
import TrainPage from './pages/TrainPage';
import HotelPage from './pages/HotelPage';
import CreateTravelPage from './pages/CreateTravel';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className="">
                <NavBar />
                <Header />
                <Routes>
                    <Route path="/login" element={ <LoginPage />} />
                    <Route path="/plane" element={ <PlanePage/> } />
                    <Route path="/train" element={ <TrainPage/>} />
                    <Route path="/hotel" element={ <HotelPage/> } />
                    <Route path='/create-travel' element={ <CreateTravelPage/> }/>
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            </div>
            <br/><br/><br/>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
