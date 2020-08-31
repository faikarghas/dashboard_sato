import React from 'react'
import FormHomeSlider from '../components/FormHomeSlider/index'
import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import {url} from '../lib/api_url'


const CreateHomeSlider = () => {
    return (
        <Drawer>
            <BigCardWrapper>
                <FormHomeSlider edit={false}  url={`${url}/api/insertHomeSlider`}/>
            </BigCardWrapper>
        </Drawer>
    )
}

export default CreateHomeSlider
