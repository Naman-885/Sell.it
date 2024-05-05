import UserReg from "./components/users/UserReg";
import UserLogin from "./components/users/UserLogin";
import Home from "./components/Home";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/userSignUp" element={<UserReg />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
