import "./App.css";
import AddUser from "./components/AddUser/AddUser";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="parent">
      <Header />
      <AddUser />
    </div>
  );
}

export default App;
