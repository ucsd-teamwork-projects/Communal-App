import React from "react";

function UserProfileCircle(props) {
    return (
        <img src={props.src} alt="" className="mr-2" style={{
            "border-radius": "50%",
            "width": `${props.size}px`,
            ...props.style
        }}></img>
    );
}

export default UserProfileCircle;
