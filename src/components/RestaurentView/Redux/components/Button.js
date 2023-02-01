import React from "react";
import { connect } from "react-redux";
import { increment, decrement } from "../Actions/counterActions";

const Buttons = (props) => {
  // const [count, setCount] = useState(0);

  // const increment = () => {
  //   // console.log('increment');
  //   // setCount(count+1);
  // }

  // const decrement = () => {
  //   // console.log('decrement');
  //   // setCount(count-1);
  // }

  return (
    <>
      <h3>Counter App</h3>
      <button onClick={props.increment}>+</button>
      <h3>{props.count}</h3>
      <button onClick={props.decrement}>-</button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch(increment());
    },
    decrement: () => {
      dispatch(decrement());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
