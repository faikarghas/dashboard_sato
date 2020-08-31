import React, {useEffect,useState} from 'react'
import Switch from '@material-ui/core/Switch'

const Index = (props) => {
    const [state, setState] = React.useState(true);

    const handleChange = (event) => {
        setState(value => !value)
        if (!state) {
            // fetch('https://hello.umeetme.id/api/updateStatus',{
            //     method: 'POST',
            //     headers:{'Content-Type':'application/json'},
            //     body:JSON.stringify({
            //         id: props.id,
            //         status: 1
            //     })
            // })
            console.log(1);
        } else {
            // fetch('https://hello.umeetme.id/api/updateStatus',{
            //     method: 'POST',
            //     headers:{'Content-Type':'application/json'},
            //     body:JSON.stringify({
            //         id: props.id,
            //         status: 0
            //     })
            // })
            console.log(0);
        }

    };

    function _checkStatus(status = 0) {
        switch (status) {
            case 1:
                return setState(true)
            case 0:
                return setState(false)
            default:
                break;
        }
    }

    useEffect(() => {
        _checkStatus(props.status)
    }, [])

    return (
        <Switch
            checked={state}
            onChange={handleChange}
            name={props.name}
            color="primary"
        />
    )
}

export default Index
