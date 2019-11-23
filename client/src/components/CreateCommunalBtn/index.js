import React from 'react'
import { Button } from 'react-bootstrap'
import API from '../../utils/API'

export default function CreateCommunalBtn(props) {

    const { name, description, going } = props.social;

    const convertSocial = () => {
        API.createNewCommunal(name, description, going);
    }

    return (
        <div>
            <Button onClick={convertSocial}>
                Convert to Communal
            </Button>
        </div>
    )
}
