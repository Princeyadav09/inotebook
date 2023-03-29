import React, {useState} from "react";



export default function Textform(props) {
  const handleUpClick = ()=>{
    // console.log("Uppercase was clicked");
    let newText = text.toUpperCase();
    setText(newText)
    props.showAlert("Converted to uppercase!","success");
  }
  const handleLowClick = ()=>{
    // console.log("Lowercase was clicked");
    let newText = text.toLowerCase();
    setText(newText)
    props.showAlert("Converted to lowercase!","success");

  }
  const handleClrClick = ()=>{
    // console.log("Reset was clicked");
    let newText = '';
    setText(newText)
    props.showAlert("Text Cleared!","success");

  }
  const handleOnChange = (event)=>{
    // console.log("On Change");
    setText(event.target.value);
  }
  const handleCopyClick = ()=>{
    // console.log("Copy was clicked");
    var text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText((text.value));
    props.showAlert("Copied to clipboard!","success");
  }
  




  const [text, setText] = useState('');
  
  return (
    <>
    <div className="container" style={{color:props.mode==='dark'?'white':'black'}}>
        <h1>{props.heading} </h1>
      <div className="mb-3" >
  
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="8"
          style={{backgroundColor:props.mode==='dark'?'grey':'white',color:props.mode==='dark'?'white':'black'}}
        ></textarea>
      </div>
      <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
      <button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert to Lowercase</button> 
      <button className="btn btn-primary mx-1" onClick={handleCopyClick}>Copy Text</button>
      <button className="btn btn-primary mx-1" onClick={handleClrClick}>Reset</button>
    </div>
    <div className="container my-3" style={{color:props.mode==='dark'?'white':'black'}}>
      <h2>Your Text Summary</h2>
      <p> {text===""?0:text.split(" ").length} words and {text.length} characters</p>
      <p>{0.008 * text.split(" ").length} Minutes read</p>
      <h2>Preview</h2>
      <p>{text.length>0?text:"Enter something in the textbox above to preview it"}</p>
    </div>
    </>
  );
}
