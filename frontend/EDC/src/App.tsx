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
                  <div className='absolute justify-center items-center lg:mt-[25vh] mt-[10vh] w-full h-full'>
                  <CardGrid />
                  </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;