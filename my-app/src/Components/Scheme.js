import React, { useEffect, useState } from "react";
import schemeimg from '../assests/schemeimg.jpg';
import "./Scheme.css";

function GuideLine(){
    const [content, setContent] = useState(null);

    const names = async() => {
        await fetch("/scheme").then((res) =>
            res.json().then((data) => {
                setContent(data);
            })
        );
    }

    useEffect(() => {
        names();
    }, []);

    return(
        <div>
            {content && 
                <div>
                    {content.map(function(ele, index){
                            return(
                                <div class="card card-total" key={index}>
                                    <div class="card-start">
                                        <img src={schemeimg} alt="scheme" />
                                        <h3>{ele.heading}</h3>
                                    </div>
                                    <div class="card-group">
                                        {ele.details.map(function(li, ind){
                                            return(
                                                <div key={ind} class="card" style={{width: "18rem"}}>
                                                    <div class="card-body">
                                                        <h5 class="card-title">{li.heading}</h5>
                                                        <p class="card-text">{li.text}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                </div>}
        </div>
    )
}

export default GuideLine;