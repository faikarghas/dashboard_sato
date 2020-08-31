import React from 'react'
import FormOurTeam from '../components/formOurTeam/index'
import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import {url} from '../lib/api_url'

const CreateCareer = () => {
    return (
        <Drawer>
            <BigCardWrapper>
                <FormOurTeam edit={false} url={`${url}/api/insertOurTeam`}/>
            </BigCardWrapper>
        </Drawer>
    )
}

export default CreateCareer
