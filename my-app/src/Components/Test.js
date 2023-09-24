import React, { useState } from "react";
import './Test.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";

function Test(){
    const [plant, setPlant] = useState(null);
    const hiddenFileInput = React.useRef(null);
  
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
    
        const Upload = async() => {
            await fetch('/result', {
                method: 'POST',
                body: data
            })
            .then(resp => resp.json())
            .then((data) => {
                setPlant(data);
            });
        }
        Upload();
    }
    
    return(
        <button onClick={handleClick} type="button" class="btn btn-outline-primary pictureUpload">
            <FontAwesomeIcon class="icon-camera" icon={faCamera} /><br />
            <span class="gallery">browse from gallery</span>
            <input type="file"
                    name="pic"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{display:'none'}} 
            /> 
            {plant && <Navigate to="/testresult" state={plant} replace={true} />}
        </button>
    )
}

export default Test;