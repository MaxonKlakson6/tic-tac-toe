import { useContext } from "react";
import { AppContext } from "./index";

const App = () => {
  const wsServer = useContext(AppContext);

  return (
    <div>
      <button>Send message</button>
    </div>
  );
};

export default App;
