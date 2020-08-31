import React from 'react'
import FormFaq from '../components/formFaq/index'
import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import {url} from '../lib/api_url'

const CreateCareer = () => {
    return (
        <Drawer>
            <BigCardWrapper>
                <FormFaq edit={false} url={`${url}/api/insertFaq`}/>
            </BigCardWrapper>
        </Drawer>
    )
}

export default CreateCareer
