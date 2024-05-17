import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import List from "./components/list/List";
import "./index.css";

const App = () => {
  return (
    <div className='container'>
      <Detail/>
      <Form/>
      <List/>
    </div>
  )
}
  
export default App