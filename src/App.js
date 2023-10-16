import { Suspense, memo } from "react";
import "./App.css";

import { Map, Loading } from "./components";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="App">
        <Map></Map>

      </div>
    </Suspense>
  );
}

export default App;
