import React from 'react'
import FormIntouch from '../components/formIntouch/index'
import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import {url} from '../lib/api_url'

const CreateCareer = () => {
    console.log(url);
    return (
        <Drawer>
            <BigCardWrapper>
                <FormIntouch edit={false} url={`${url}/api/insertIntouchSlider`}/>
            </BigCardWrapper>
        </Drawer>
    )
}

export default CreateCareer
