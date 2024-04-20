import "./App.css";
import Home from "./components/Home";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
