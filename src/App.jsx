import Detail from "./components/detail/Detail";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import "./index.css";

const App = () => {
  return (
    <div className="container">
      <Detail/>
      <Chat/>
      <List/>
    </div>
  )
}
  
export default App