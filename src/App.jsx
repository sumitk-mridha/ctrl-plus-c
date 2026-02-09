import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './pages/Home/Home';
import Clipboards from './pages/Clipboards/Clipboards';
import './App.css';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router basename='/ctrl-plus-c'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clipboards" element={<Clipboards />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
