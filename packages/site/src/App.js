import {useEffect} from 'react'
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Footer from './components/Footer';

const App = (props) => {
  const navigate = useNavigate()
  const params = useParams()

  useEffect(()=>{
    if(params['*'] !== '') navigate('/')
  }, [navigate, params])

  return (
    <div className="App">
      <div className='app-container'>
        {/* nav */}
        <div className='app-content'>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
