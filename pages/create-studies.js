import React from 'react'
import FormStudies from '../components/formStudies/index'
import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import {url} from '../lib/api_url'

const CreateStudies = () => {
    return (
        <Drawer>
            <BigCardWrapper>
                <FormStudies edit={false}  url={`${url}/api/insertStudies`}/>
            </BigCardWrapper>
        </Drawer>
    )
}

export default CreateStudies
