import React,{useState} from 'react'

const Index = ({id,order}) => {
    const [value, setValue] = useState("");

    const handleOnChange = e => {
        setValue(e.target.value)
        fetch('https://api.sato.id/api/reorder',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {
                    reorder:e.target.value,
                    idProject:id
                }
            )
        })
        .then((response) => response.json())
        .then((dataRes) => {
            console.log('Success:', dataRes);
        })
    };

    React.useEffect(() => {
        setValue(order)
    }, [])

    return (
        <div className="form-order" style={{width:'100%'}}>
            <input onChange={handleOnChange} id="reorder" name="reorder" type="number" value={value} style={{width:'100%'}}/>
        </div>
    )
}

export default Index
