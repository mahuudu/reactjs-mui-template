import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { increase } from './counterSlide';

function CounterFeature(props) {
    const count = useSelector(state => state.couter);
    const dispatch  = useDispatch();
    const handleBtnClick = () => {
        const action = increase(123);
        dispatch(action);
    }

    return (
        <div>
            <h1>counter {count} </h1>
            <button onClick={handleBtnClick}>  Click Count</button>
        </div>
    );
}

export default CounterFeature;