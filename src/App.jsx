import Header from "./components/Header";
import Main from "./components/Main";
import { Fragment } from "react";

function App() {
  return (
    <div className="box-border ">
      <Fragment>
        <Header />
        <Main />
      </Fragment>
    </div>
  );
}

export default App;
