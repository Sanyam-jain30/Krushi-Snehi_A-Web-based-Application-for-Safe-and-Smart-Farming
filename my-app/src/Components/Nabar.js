import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar(){
    return(
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="/">Krushi Sheni</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <Link class="nav-link" to="/test"> Test </Link> 
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/example">Examples</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/scheme">Scheme</a>
                </li>
                <li class="nav-item dropdown">
                    <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" onLoad={() => {
                            const googleTranslateElementInit = () => {
                                new window.google.translate.TranslateElement({ pageLanguage: 'en'} , 'google_translate_element')
                            }
                            window.googleTranslateElementInit = googleTranslateElementInit;
                    }}/>
                </li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;