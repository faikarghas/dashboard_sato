import React,{useState}from 'react'
import Chip from '@material-ui/core/Chip';

const Index = () => {

    function handleDelete(params) {

    }

    return (
        <Chip size="small" label="Deletable Primary" onDelete={handleDelete} color="primary" />
    )
}

export default Index
