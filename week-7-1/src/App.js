//RECOIL 
import { useMemo } from "react";
import { countAtom, evenSelector } from "./store/atoms/count";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

function App() {
  //just like usecontext, recoil root ke andar wo sb kuch wrap krna padta hai 
  return (
    <div>
      <RecoilRoot>
        <Count  /> 
      </RecoilRoot>
    </div>
  )
}

function Count() { 
  console.log("re render");//you can check count does not re render!!!
  //but if i display or use count here it does re render, that is the power of recoil
  return <div>
    <CountRenderer />
    <Buttons />
    <EvenCountRenderer />
  </div>
}

function CountRenderer() {
  // //method 1
  // const[count, setCount] = useRecoilState(countAtom);//same as useState, andar is which atom i need it for, means which state
  //                                                    //remember countAtom has default value, with other properties so same shit 
  const count = useRecoilValue(countAtom); //gives only the final value, no updation in our function so we dont need setCount

  return <div>
    {count}
  </div>
}

function EvenCountRenderer(){
  const isEven = useRecoilValue(evenSelector);

  // same as selector, same optimization
  // basically won't do this operation of checking if even unless count has changed, it will keep in mind the previous return value 
  // const isEven = useMemo(() => {
  //   return count%2===0; 
  // }, [count])

  return <div>
  {isEven ? "It is even" : null}
  </div>
}

function Buttons() {
  //does not really need count, hence no need to re render as well
  const setCount = useSetRecoilState(countAtom);
  console.log("button re render");
  return <div>
    <button onClick={() => {
      setCount(count => count + 1)
    }}>Increase</button>

    <button onClick={() => {
      setCount(count => count - 1)
    }}>Decrease</button>
  </div>

  // const [count, setCount] = useRecoilState(countAtom);
  // return <div>
  //   <button onClick={() => {
  //     setCount(count + 1)
  //   }}>Increase</button>

  //   <button onClick={() => {
  //     setCount(count - 1)
  //   }}>Decrease</button>
  // </div>
}

export default App





// //USECONTEXT 
// //if there is a component tree, say mujhe c1 ki cheeze c4 mai use krni hai, i will again and again have to pass it to c2 then c3 to get to c4
// //yehi porblem(prop drilling) ham useContext or context api se solve karenge 
// import { useState } from "react"
// import { CountContext } from "./context";
// import { useContext } from "react";

// function App() {
//   //wrap anyone that wants to use the context value inside a provider
//   const [count, setCount] = useState(0);
  
//   return (
//     //the value is count, does not need to passed to count now to be used by count renderer and buttons
//     <div>
//       <CountContext.Provider value={count}>
//         <Count setCount={setCount} /> 
//       </CountContext.Provider>
//     </div>
//   )
// }

// function Count({setCount}) {
//   //does not use count but it does re render everytime count changes, this is the drawback of context api, makes code cleaner not optimized 
//   return <div>
//     <CountRenderer />
//     <Buttons setCount={setCount} />
//   </div>
// }

// function CountRenderer() {
//   const count = useContext(CountContext);//no need to have count as a prop now, just use the context 
//   return <div>
//     {count}
//   </div>
// }

// function Buttons({ setCount}) {
//   const count = useContext(CountContext);
//   return <div>
//     <button onClick={() => {
//       setCount(count + 1)
//     }}>Increase</button>

//     <button onClick={() => {
//       setCount(count - 1)
//     }}>Decrease</button>
//   </div>
// }

// export default App







//USENAVIGATE SHIT 
// import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
// import './App.css'
// import Dashboard from './components/Dashboard'
// import Landing from './components/Landing'

// // function App() {
// //   const navigate = useNavigate();
// //   return (
// //     <div>
// //       <div>
// //         <button onClick={() => {
// //           navigate("/");
// //         }}>Landing page</button>

// //         <button onClick={() => {
// //           navigate("/dashboard");
// //         }}>Dashboard</button>

// //       </div>
// //       <BrowserRouter>
// //         <Routes>
// //             <Route path="/dashboard" element={<Dashboard />} />
// //             <Route path="/" element={<Landing />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </div>
// //   )
// // }


// //use navigate can only be used inside a browser router, not outside it, even the const navigate needs tobe defined inside the browser router only
// function App() {
  
//   return (
//     <div>
//       <BrowserRouter>
//         <Appbar />
//         <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/" element={<Landing />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

// function Appbar() {
//   const navigate = useNavigate();

//   return <div>
//       <div>
//         <button onClick={() => {
//           navigate("/");
//         }}>Landing page</button>

//         <button onClick={() => {
//           navigate("/dashboard");
//         }}>Dashboard</button>

//       </div>
//   </div>
// }

// export default App