// import React, { useReducer } from 'react';

// const initialState = { count: 0 }
//  // The reducer function
// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 }
//     case 'decrement':
//       return { count: state.count - 1 }
//     case 'reset':
//       return {count: state.count = 0}
//     default:
//      return { count: state.count  }
//   }
// }
// const App = () => {
//   const [state, dispatch] = useReducer(reducer, initialState)

//   return (
//     <div>
//       Count: {state.count}
//        <br />
//        <br/>
//        <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
//        <button onClick={() => dispatch({ type: 'decrement'})}>Decrement</button>
//        <button onClick={() => dispatch({ type: 'reset'})}>Reset</button>
//     </div>

//   );
// };

// export default App;

// import { useState } from "react"

// function App() {
//   const [fruits, setFruits] = useState([
//     { id: 1, name: "🍎 Apple" },
//     { id: 2, name: "🍊 Orange" },
//     { id: 3, name: "🍌 Banana" },
//     { id: 4, name: "🍇 Grapes" },
//   ])
//   const deleteById = id => {
//     setFruits(oldValues => {
//       return oldValues.filter(fruit => fruit.id !== id)
//     })
//   }
//   return (
//     <div className="App">
//       <ul>
//         {fruits.map(fruit => {
//           return (
//             <li key={fruit.id}>
//               <span>{fruit.name}</span>
//               <button onClick={() => deleteById(fruit.id)}>Delete</button>
//             </li>
//           )
//         })}
//       </ul>
//     </div>
//   )
// }

// export default App













/*

import useForm from './useForm';

function App() {

  //Final submit function
  const formLogin = () => {

    console.log("Callback function when form is submitted!");
    console.log("Form Values ", values);
  }

  //Custom hook call
  const {handleChange, values,errors,handleSubmit} = useForm(formLogin);


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="E-mail"  onChange={handleChange}   />
      {
        errors.email && <h3>{errors.email}</h3>
      }
      <input minLength='8' type="password" name="password" placeholder="password"  onChange={handleChange}   />
      {
        errors.password && <h3>{errors.password}</h3>

      }
      <input type="text" minLength='5' required name="username" placeholder="username"  onChange={handleChange}   />
      {
        errors.username && <h3>{errors.username}</h3>

      }
      <input type="submit" value="Submit" className="submit"  />
      </form>

    </div>
  );
}

export default App;

*/