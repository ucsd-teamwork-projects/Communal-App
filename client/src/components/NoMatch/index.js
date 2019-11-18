import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Logo from "../../assets/img/logo.png";
import './style.css';

const NoMatch = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>4
                    <img
                        src={Logo}
                        width="150"
                        height="150"
                        style={{verticalAlign: "-10px"}}
                        alt=""
                    />
                    4</h1>
                </div>
                <h2>You seem lost...</h2>
                <form>
                    <p></p>
                    <Button as={Link} to="/" style={{ backgroundColor: "#ffc038", outlineColor: "#000", color: "#000" }}>
                        ...Lets get you home.  <i class="fas fa-home fa-2x"></i>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default NoMatch;
