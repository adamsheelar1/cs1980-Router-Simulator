import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Greet from './components/Greet';
import Button from './components/Button';
import CenterBox from './components/CenterBox';

const root = ReactDOM.createRoot(document.getElementById('root'));
const handleClick1 = () => {
  alert('clicked');
}
root.render(
  <React.StrictMode>
    <CenterBox>
        <p>This is some text in the center of the screen.</p>
    </CenterBox>
    <div className="container">
    <Button onClick={handleClick1}>First</Button>
    <Button onClick={handleClick1}>Second</Button>
    <Button onClick={handleClick1}>Third</Button>
    <Button onClick={handleClick1}>Fourth</Button>
    <Button onClick={handleClick1}>Fifth</Button>
    <Button onClick={handleClick1}>Sixth</Button>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
