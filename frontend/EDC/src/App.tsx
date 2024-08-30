import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpotifyAuth from './components/SpotifyAuth';
import SpotifyCallback from './components/SpotifyCallback';
import CardGrid from './components/CardGrid';
import './App.css';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/spotify/auth" element={<SpotifyAuth />} />
                <Route path="/spotify/callback" element={<SpotifyCallback />} />
                <Route path="/" element={
                  <div className='lg:mt-[25vh] mt-[10vh]'>
                    <h1 className='md:text-6xl text-5xl font-bold text-center tracking-wide mb-10'>REAGAN'S DIGITAL EDC</h1>
                    <CardGrid />
                  </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;