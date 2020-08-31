import React from 'react'
import FormCareer from '../components/FormCareer/index'
import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import {url} from '../lib/api_url'

const CreateCareer = () => {
    console.log(url);
    return (
        <Drawer>
            <BigCardWrapper>
                <FormCareer edit={false} url={`${url}/api/insertCareer`}/>
            </BigCardWrapper>
        </Drawer>
    )
}

export default CreateCareer
