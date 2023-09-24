import React from "react";
import assamese from "../assests/assamese.png";
import bengali from "../assests/bengali.png";
import bhojpuri from "../assests/bhojpuri.png";
import english from "../assests/english.png";
import gujarathi from "../assests/gujarathi.png";
import hindi from "../assests/hindi.png";
import kannada from "../assests/kannada.png";
import malayalam from "../assests/malayalam.png";
import marathi from "../assests/marathi.png";
import punjabi from "../assests/punjabi.png";
import tamil from "../assests/tamil.png";
import telugu from "../assests/telugu.png";
import urdu from "../assests/urdu.png";
import "./Example.css";


function Example(){
    return(
        <div class="gallery-grid">
            <div class="gallery-frame">
                <img
                src={assamese}
                class="gallery-img"
                alt=""
                />
                <span>Assamese</span>
            </div>

            <div class="gallery-frame">
                <img
                src={bengali}
                class="gallery-img"
                alt=""
                />
                <span>Bengali</span>
            </div>

            <div class="gallery-frame">
                <img
                src={bhojpuri}
                class="gallery-img"
                alt=""
                />
                <span>Bhojpuri</span>
            </div>

            <div class="gallery-frame">
                <img
                src={english}
                class="gallery-img"
                alt=""
                />
                <span>English</span>
            </div>

            <div class="gallery-frame">
                <img
                src={gujarathi}
                class="gallery-img"
                alt=""
                />
                <span>Gujarathi</span>
            </div>

            <div class="gallery-frame">
                <img
                src={hindi}
                class="gallery-img"
                alt=""
                />
                <span>Hindi</span>
            </div>

            <div class="gallery-frame">
                <img
                src={kannada}
                class="gallery-img"
                alt=""
                />
                <span>Kannada</span>
            </div>

            <div class="gallery-frame">
                <img
                src={malayalam}
                class="gallery-img"
                alt=""
                />
                <span>Malayalam</span>
            </div>

            <div class="gallery-frame">
                <img
                src={marathi}
                class="gallery-img"
                alt=""
                />
                <span>Marathi</span>
            </div>

            <div class="gallery-frame">
                <img
                src={punjabi}
                class="gallery-img"
                alt=""
                />
                <span>Punjabi</span>
            </div>

            <div class="gallery-frame">
                <img
                src={tamil}
                class="gallery-img"
                alt=""
                />
                <span>Tamil</span>
            </div>

            <div class="gallery-frame">
                <img
                src={telugu}
                class="gallery-img"
                alt=""
                />
                <span>Telugu</span>
            </div>

            <div class="gallery-frame">
                <img
                src={urdu}
                class="gallery-img"
                alt=""
                />
                <span>Urdu</span>
            </div>
        </div>
    )
}

export default Example;