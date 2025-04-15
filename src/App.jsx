import { Route, Routes } from "react-router-dom"
import Home from "./routes/Home/Home.jsx"
import Header from "./routes/Header/Header.jsx"
import List from "./routes/List/List.jsx"
import IndividualCard from "./routes/IndividualCard/IndividualCard.jsx"
import './app.css';

function App() {
  return (
    <>
    <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/list" element={<List />}/>
          <Route path="/character/:id" element={<IndividualCard />} />

        </Routes>
      </div>
    </>
  )
}


export default App;
