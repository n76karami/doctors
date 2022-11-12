import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about/:params/:id" element={<About />} />
        <Route exact path="/*" element={<h1>error 404</h1>} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
