
import React, { useState , useEffect } from "react";
import './Todo.css';
import Cross from '../Assets/images/icon-cross.svg';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [state, setState] = useState({value:''});
  const [data, setData] = useState([]);
  const [active, setActive] = useState('');
  const [count, setCount] = useState(1);
  const [noOfActive, setNoOfActive] = useState(0);

  function createNewTodo(){
    setTodoList(prevList => [...prevList,{todo: state.value, completed:false, id:count}]);
    setData(prevList => [...prevList,{todo: state.value, completed:false, id:count}]);
    //clear inputs in create new inputs
    setState({value:''});
    document.getElementById('round-checkbox-create-new').checked = false;
    setCount(count + 1);
  }

  function clearCompleted(){
    setActive('');
    const clone = data.map(i => ({ ...i }))
    const activeList = clone.filter((x) => x.completed !== true);
    setTodoList(activeList);
    setData(activeList);
  }

  const filterCompleted = () =>{
    setActive('completed');
    const clone = data.map(i => ({ ...i }))
    const completedList = clone.filter((x) => x.completed === true);
    setTodoList(completedList);
  }

  const filterActive = () =>{
    setActive('active');
    const clone = data.map(i => ({ ...i }))
    const activeList = clone.filter((x) => x.completed === false);
    setTodoList(activeList);
  }

  const removeFilter = () =>{
    setActive('all');
    setTodoList(data);
  }
  
  const deleteTodo = (id) =>{
    const newList = todoList.filter((x) => x.id !== id);
    setTodoList(newList);
    setData(newList);
  }

  const handleChange = (e) => {
    setState({value: e.target.value});
  }

  const toggleCheck = (item) => {
    todoList.map(i => {
      if(i.id === item.id){
        i.completed = !i.completed;
      }
    })
    setTodoList(todoList);
    setData(todoList);
  }

  useEffect(() => {
      setTimeout(() => {
        data.forEach(i => {
          if(document.getElementById(`round-checkbox-${i.id}`)){
            if(i.completed === true){
              document.getElementById(`round-checkbox-${i.id}`).checked = true;
            }else{
              document.getElementById(`round-checkbox-${i.id}`).checked = false;
            }
          }
        })
      });
  }, [active]);

  useEffect(() => {
    setTimeout(() => {
      const clone = data.map(i => ({ ...i }))
      const activeList = clone.filter((x) => x.completed === false);
      setNoOfActive(activeList.length);
    })
  }, [data]);

  return (
    <div className='todo-container'>
      {/* create new */}
      <div className='create-new'>
        <div className='checkbox'>
          <input type="checkbox" disabled={!state.value} name="round-checkbox-create-new" id="round-checkbox-create-new" onClick={() => createNewTodo(state.value)}/>
          <label for="round-checkbox-create-new">
            <input type="text" name="newTodo" value={state.value} onChange={(e)=>handleChange(e)} id="newTodo" placeholder="Create a new todo..."  />
          </label>
        </div>
      </div>
      {/* to do list*/}
      <div className='todo-list'>
        {
          // map over the todoList here and display your list items
          (todoList).map(function(item, key) {
            return (
              <div className='todo' key={key}>
                <div className='checkbox point'>
                  <input type="checkbox" onChange={()=>toggleCheck(item)} name="round-checkbox" id={`round-checkbox-${item.id}`} />
                  <label for={`round-checkbox-${item.id}`}>{item.todo}</label>
                  <img src={Cross} className="cross point" onClick={() => deleteTodo(item.id)}/>
                </div>
              </div>
            )
          })
        }
        
        {/* action */}
        <div className='action'>
          <div>{noOfActive}{noOfActive > 1?<span> items </span>:<span> item </span>}left</div>
          <div className="point desktop-only ">
            <span onClick={removeFilter} className={active == 'all'?'active':''}>All</span> 
            <span onClick={filterActive} className={active == 'active'?'active':''}>Active</span> 
            <span onClick={filterCompleted} className={active == 'completed'?'active':''}>Completed</span>
          </div>
          <div className="point" onClick={clearCompleted}>Clear Completed</div>
        </div>
        
     </div>
     <div className='todo-list mobile-only'>
      <div className='action-mobile'>
          <span onClick={removeFilter} className={active == 'all'?'active':''}>All</span> 
          <span onClick={filterActive} className={active == 'active'?'active':''}>Active</span> 
          <span onClick={filterCompleted} className={active == 'completed'?'active':''}>Completed</span>
      </div>
     </div>
     
    </div>
  )
}

export default Todo
