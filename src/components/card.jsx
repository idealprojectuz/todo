import './card.css';
import { useState } from 'react';

function Card({ item, removeItem, editItem }) {
    const [shows, setShows] = useState(true)
    const [update, setUpdate] = useState({id: item.id, title: item.title, description: item.description})
    const edit = () => { 
        setShows((p)=>p=false)
    }
    const updateing = (e) => {
        setUpdate((p) => ({ ...p, id: item.id, [e.target.name]: e.target.value }))
    
    }
    const updateform = (e) => { 
        e.preventDefault()
        editItem(update)
        setShows((p) => p = true)
        console.log(update)
    }
    return (
        <>
            {(shows) ?  <div className="cardItem"> 
                <h3 className='cardTitle'>{item.title }</h3>
                <p className='cardDesc'>{item.description}</p>
                <div className="close">
                    <i className="fa-regular fa-circle-xmark" onClick={() => { removeItem(item.id) }}></i>
                </div>
                <div className='edit'>
                    <i className="fa-solid fa-pen" onClick={edit}></i>
                </div>
                </div> : <div className="forms">
        <form className="todoForm" onSubmit={updateform}>
          <input defaultValue={item.title } onChange={updateing}   type="text"  name="title"/>
          <input defaultValue={item.description} onChange={updateing} type="text"  name="description" />
          <button type="submit" >O'zgartirish</button>
        </form>
      </div> }
           
        </>
    );
}

export default Card