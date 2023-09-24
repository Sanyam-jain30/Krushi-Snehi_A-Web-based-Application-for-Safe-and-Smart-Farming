import React from "react";
import {useLocation} from 'react-router-dom';
import img from '../uploads/crop.jpg';
import FertilizerCard from './FertilizerCard';
import './TestResult.css';

function TestResult(){
    const location = useLocation();
    console.log(location.state);

    return(
        <div class="card mb-3 display-result" style={{maxWidth: "540px"}}>
            <div class="row g-0">
                <div class="col-md-" style={{textAlign: "center"}}>
                    <img src={img} class="img-fluid rounded-start cropimg" alt="crop" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" style={{fontSize: "2.2rem", color: "red", fontWeight: "bolder"}}>{location.state.name}</h5>
                        <p class="card-text effected-text">{(location.state.effected) ? "Effected" : "Not Effected"}</p>
                        {(location.state.effected) && 
                            <div>
                                <h5>Symptom</h5>
                                <p class="card-text">{location.state.symptom}</p>
                                <h5>Solution</h5>
                                <p class="card-text">{location.state.solution}</p>
                            </div>}
                    </div>
                </div>
            </div>
            {(location.state.effected === "true") && 
                <div class="fertilizer">
                    <h5>Fertilizers</h5>
                    <div class="card-deck">
                        {location.state.htmlContent.map(function(ele, index){
                            return <FertilizerCard key={index} data={ele} />
                        })}
                    </div>
                </div>}
        </div>
    )
}

export default TestResult;