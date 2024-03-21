import { ReactFlowProvider } from "reactflow";
import AllRoute from "./Routes/AllRoute";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <ReactFlowProvider>
        <AllRoute />
      </ReactFlowProvider>
    </BrowserRouter>
  );
};
export default App;
