import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpotifyAuth from './components/SpotifyAuth';
import SpotifyCallback from './components/SpotifyCallback';
import CardGrid from './components/CardGrid';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/spotify/auth" element={<SpotifyAuth />} />
                <Route path="/spotify/callback" element={<SpotifyCallback />} />
                <Route path="/" element={
                  <div className='mt-[25vh]'>
                  <CardGrid />
                  </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;