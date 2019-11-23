import React from "react";

function CommunalFont(props) {
    return (
    <span style={{"fontFamily": "'Bungee', cursive", "color": "#EFEFEF"}}>{props.children}</span>
    )
};

export default CommunalFont;