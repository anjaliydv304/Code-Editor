import React from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate=useNavigate()
  const [roomId,setRoomId]=useState('')
  const [userName,setUserName]=useState('')
  const createNewRoom = (e) => {
      e.preventDefault();
      const id=uuidv4();
      setRoomId(id);
      toast.success('Created a new room');
  }
  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error('ROOM ID & username is required');
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }
  };

  
  return (
    <div className='homePageWrapper'>

      <div className='formWrapper'>

        <img className='homePageLogo' src="logo.png" alt="logo"/>
        <h4 className='mainLabel'>Paste invitation ROOM ID </h4>
        <div className='inputGroup'>

          <input type="text" 
          className='inputBox' 
          onChange={(e) => setRoomId(e.target.value)}
          placeholder='ROOM ID'
          value={roomId}
          onKeyUp={handleInputEnter}
          />
          <input type="text" 
          className='inputBox' 
          placeholder='USERNAME'
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          onKeyUp={handleInputEnter}
            />
          <button className='btn joinBtn' onClick={joinRoom}>Join</button>
          <span className='createInfo'>If you don't have an invite link then create &nbsp; <a onClick={createNewRoom} href="" className='createNewBtn'>new room</a></span>

        </div>
      </div>
      <footer>

        <h4>Developed with 💛 by <a href="https://github.com/Ankita-2002">Anjali</a></h4>
      </footer>
    </div>
  )
};

export default Home;
