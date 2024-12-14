import { useMemo, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  //problem with no useEffect or useMemo is that every time i click on counter the whole thing runs again, so this loop is computed again too
  //method 1:
  //make a final value state and use useEffect. Usme ek dikkat h ki ek extra render hoga, jb input value changes ek re render hoga
  //useMemo se it will only calculate the sum when the input value changes, as input value is placed in the dependancy array 
  //but mostly useEffect is used only
  let count = useMemo(() => {
    let count = 0;
    for (let i = 1; i <= inputValue; i++) {
      count = count + i;
    }
    return count;
  }, [inputValue]);
  
  //useCallback ke liye uska wo vid dekh lena
  //basically two functions that do the same thing, are not considered equal by react, but variables are
  //so we make a function a variable by wrapping it in useCallback 
  //this helps in preventing unecessary re rendering 
  return <div>
    <input onChange={function(e) {
      setInputValue(e.target.value);
    }} placeholder={"Find sum from 1 to n"}></input>
    <br />
    Sum from 1 to {inputValue} is {count}
    <br />
    <button onClick={() => {
      setCounter(counter + 1);
    }}>Counter ({counter})</button>
  </div>
}

export default App;