import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
TodoFeature.propTypes = {
    
};

function TodoFeature(props) {
    const initTodoList = [
        {
            id : 1,
            title : 'Hi',
            status : false,
        },
        {
            id : 2,
            title : 'Hi',
            status : false,
        },
        {
            id : 3,
            title : 'Hi',
            status : true,
        },
    ];

    const [todoList,settodoList] = useState(initTodoList);
    const [renderFilter,setrenderFilter] = useState(true);

    const handleTodoClick = (todo, idx) =>{
    
        const newtodoList = [...todoList];

        const newTodo = {
            ...newtodoList[idx],
            status : newtodoList[idx].status === false ? true : false,
        }
        newtodoList[idx] = newTodo; 
        settodoList(newtodoList);
    }

    const handleShowAvarible = () =>{
        setrenderFilter(true);
    }

    const handleShowHidden = () => {
        setrenderFilter(false);
    }

    const renderFilterList = todoList.filter(todo => renderFilter === true || renderFilter === todo.status);

    const handleTodoSubmit = (values) =>{
        console.log(values);

        const newTodo = {
            id : todoList.length + 1,
            title : values.title,
            status : false,
        };

        const newtodoList = [...todoList,newTodo];
        settodoList(newtodoList);
    };
    console.log(renderFilterList)
    return (
        <div>
            <h3>To do </h3>
            <TodoForm onSubmit={handleTodoSubmit}/>
            <TodoList todoList={renderFilterList}  onTodoClick={handleTodoClick}/>
            <button onClick={handleShowHidden} >Show Avarible</button>
            <button onClick={handleShowAvarible} >Show Full</button>
        </div>
    );
}

export default TodoFeature;