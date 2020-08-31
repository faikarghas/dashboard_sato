import React from 'react'
import FormProject from '../components/formProject/index'
import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import {url} from '../lib/api_url'


const CreateProject = () => {
    return (
        <Drawer>
            <BigCardWrapper>
                <FormProject edit={false} url={`${url}/api/insertProject`}/>
            </BigCardWrapper>
        </Drawer>
    )
}

export default CreateProject
