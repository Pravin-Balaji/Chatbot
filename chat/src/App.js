import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { useState, useEffect} from 'react';


function App() {

const [msgReg, setmsgReg] = useState('')
const [resReg, setresReg] = useState('')

  /*const date = new Date();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const [time,setTime] = useState(`${hours};${seconds}`);
  const [dateTime, setDateTime] = useState(`${days[day]}, ${months[month]} ${year}`);

  const checkStatus = (e) => {
    let isActive = true;
    if(dateTime === 'Thursday, May 20 2022'){
      isActive = false;
    }
    const status = document.querySelector('.status');
    if(isActive === true){
      status.innerHTML = 'Active';
      status.style.color = 'green';
    }else{
      status.innerHTML = 'Not Active';
      status.style.color = 'red';
    }
  }*/

  useEffect(() =>{
    Axios.get("http://localhost:3001/api/get").then((response)=> {
      setresReg(response.data);
    });
  },[]);

  const submit = () =>{
    Axios.post("http://localhost:3001/api/get", {
      msg: msgReg,
    }).then(() =>{
      alert("succesfull")
    })
  }
  
  const handleInput = () => {
    const botMessage = document.querySelector('#message1');
    const userMessage = document.querySelector('#message2');
    
    let badwords = ['fuck|bad|stupid|useless|bitch|cringe'];
    let words = new RegExp(badwords);
    if(words.test(document.querySelector('#input').value)){
      botMessage.innerHTML = 'Typing...';
      setTimeout(() => {
        botMessage.innerHTML = resReg.map((val) =>{ 
          return val.res;
        });
        document.querySelector('#input').value = " ";
      }, 2000);
    }
    userMessage.innerHTML = document.querySelector('#input').value;
  }
  return (
    <div className="App"> 
      <div className="wrapper">
        <div className="content">
          <div className="header">
            <div className='img'>
              <img src={logo} alt="" />
            </div>
            <div className="right">
              <div className="name">ChatBot</div>
              <div className='status'>Active</div>
            </div>          
            </div>
            <div className="main">
              <div className='main_content'>
                <div className='messages'>
                  <div className='bot-message' id='message1'></div>
                  <div className='human-message' id='message2'></div>
                </div>
              </div>
            </div>
            <div className='bottom'>
              <div className='btm'>
                <div className='input'>
                  <input type="text" id="input" placeholder="Enter your message"></input>
                </div>
                <div className='btn'>
                    <button onClick={handleInput}><i className='fas fa-paper-plane'>Send</i></button>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
