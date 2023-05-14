import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

TodoList.propTypes = {
    TodoList : PropTypes.array,
    onTodoClick : PropTypes.func,
};

TodoList.defaultProps = {
    todoList : [],
    onTodoClick : null,
};

function TodoList({todoList, onTodoClick}) {

    const handleTodoClick = (todo, idx) =>{
        if(!onTodoClick) return;

        onTodoClick(todo,idx);
    }

    return (
        <ul className="todo-List">
            {todoList.map((todo, idx) =>(
                <li key={todo.id} className={classNames({
                    'todo-item' : true,
                    completed: todo.status === true
                })}
                onClick={()=> handleTodoClick(todo, idx)}
                >
                 {todo.title} </li>
            ))}
        </ul>
    );
}

export default TodoList;