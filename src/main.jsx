import "./app.css";
import { useState } from "react";
import Card from "./components/card";
function Main() {
  const [data, setdata] = useState([])
  const [value, setValue] = useState({id: '', title: '', description: ''})
  const almashish = (event) => {
    setValue((p) => ({ ...p, id: Date.now(), [event.target.name]: event.target.value }))
  };
  const submiting = (e) => {
    e.preventDefault();
    setdata([...data, value])
    setValue({ title: null, description: null })
    e.target.reset()
  }
  const removeItem = (id) => {
    setdata((p)=> p.filter((item)=> item.id !==id))
  }
  const editItem = (obj) => { 
    // setdata((p) => p.map((el) => el.id===obj.id ? obj : el ))
    setdata((p) => p.map((el) => el.id === obj.id ? obj : el))
  }
  return (
    <div className="app">
      <div className="heading">
        <h1>Todo app</h1>
      </div>
      <div className="forms">
        <form className="todoForm" onSubmit={submiting}>
          <input defaultValue={value.title} type="text" onChange={almashish} name="title"/>
          <input defaultValue={value.description} type="text" onChange={almashish} name="description" />
          <button type="submit" >Saqlash</button>
        </form>
      </div>
      <div className="todobody">
        {
          data.map((item, index) => {
            return <Card item={item} editItem={ editItem} key={item.id} removeItem={removeItem}/>

           })
        }
        

      </div>
    </div>
  );
}

export default Main;
