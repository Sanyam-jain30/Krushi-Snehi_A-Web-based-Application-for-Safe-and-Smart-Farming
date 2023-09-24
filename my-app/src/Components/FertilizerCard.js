import React from "react";
import './FertilizerCard.css';
import {Link} from 'react-router-dom';

function FertilizerCard(props){
    return(
        <div class="card" style={{width: "20rem"}}>
            <img src={props.data.img} class="card-img-top" alt={props.data.fertilizer} />
            <div class="card-body">
                <h5 class="card-title">{props.data.fertilizer}</h5>
                <p class="card-text">{props.data.productName}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{props.data.rating} Likes</li>
                <li class="list-group-item">{props.data.price}</li>
            </ul>
            <div class="card-footer">
                <a href={props.data.url} class="link">Check out</a>
                <Link
                    to="/usermanual"
                    class="link"
                    state= {{
                        "name": props.data.fertilizer
                    }}
                >User Manual</Link>
            </div>
        </div>
    )
}

export default FertilizerCard;