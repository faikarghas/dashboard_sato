import React from 'react'
import FormTestimonials from '../components/formTestimonials/index'
import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import {url} from '../lib/api_url'

const CreateTestimonials = () => {
    return (
        <Drawer>
            <BigCardWrapper>
                <FormTestimonials edit={false} url={`${url}/api/insertTestimonials`}/>
            </BigCardWrapper>
        </Drawer>
    )
}

export default CreateTestimonials
