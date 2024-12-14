import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function App() {
  const [id, setId] = useState(1);

  return (
    <div>
      <button onClick={() => setId(1)}>1</button>
      <button onClick={() => setId(2)}>2</button>
      <button onClick={() => setId(3)}>3</button>
      <Todo id={id} />
    </div>
  );
}

function Todo({id}){
  const [todo, setTodo] = useState({});

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos?id=${id}`)
     .then(res => setTodo(res.data[0]))
  }, [id]);
  //an empty dependancy means it is the code in useEffect is done only on first render
  //so say we had buttons to select the id, with this code the title and id displayed won't have changed, as first render wala hi counted hai
  //if i make teh dep array as [id] then use effect ka code runs every time id changes 
  //without it, wo id 1 wala hi render krega hamesha 
  

  return <div>
    <h1>
      {todo.title}
    </h1>
    <h4>
      {todo.userId}
    </h4>
  </div>
}

export default App;