import Layout from "./components/Layout";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer autoClose={2000}/>
   <Layout/>
    </>
  );
}

export default App;
