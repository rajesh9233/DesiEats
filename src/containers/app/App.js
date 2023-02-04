import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Routers from "../../routes/Routers.js";
import Footer from "../../components/Footer/Footer.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <Routers />
        </div>

        <div>
          <Footer />
        </div>
        <div className="App"></div>
      </Provider>
    </>
  );
}

export default App;
