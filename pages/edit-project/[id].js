import React,{useState} from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {getCookie} from '../../lib/cookie'
import * as action from '../../redux/actionIndex'

import Drawer from '../../components/drawer'
import BigCardWrapper from '../../components/bigCard'
import FormProject from '../../components/formProject'
import ImageUpload from '../../components/imageUpload'
import Gallery from '../../components/gallery'

import {url} from '../../lib/api_url'


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <div>{children}</div>
        )}
      </div>
    );
}

const EditProject = ({project,imageProject}) => {
    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Drawer>
            <BigCardWrapper>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChangeTab} aria-label="simple tabs example">
                    <Tab label="Edit" {...a11yProps(0)} />
                    <Tab label="Gallery" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <FormProject edit={true} url={`${url}/api/editProject`} idProject={project.project[0].idProject} project={project}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Gallery id={project.project[0].idProject} imageData={imageProject} url={[`${url}/api/insertImageProject`,`${url}/api/getImageProject/${project.project[0].idProject}`,`${url}/api/deleteImage`]}/>
                </TabPanel>
            </BigCardWrapper>
        </Drawer>
    )
}

EditProject.getInitialProps = async (ctx) => {
    const host = ctx.req ? ctx.req.headers['host'] : 'localhost:3014'
    const id = ctx.query.id
    const res = await fetch(`http://${host}/api/editProject/${id}`)
    const dataProject = await res.json()

    const res2 = await fetch(`${url}/api/getImageProject/${dataProject.project[0].idProject}`)
    const imageProject = await res2.json()

    if(ctx.res){
      ctx.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    }

    if(ctx && !process.browser) {
        if(ctx.req.headers.cookie) {
          ctx.store.dispatch(action.reauthenticate(getCookie('token', ctx.req),getCookie('idusers', ctx.req)))
          ctx.store.dispatch(action.addImg(imageProject))
        }
    }

    const token = ctx.store.getState().token;

    // set gettoken to false if no token in cookies
    if(!token && token !== undefined && ctx.pathname === '/leads'){
        if(process.browser){
            Router.push('/login')
        }
    }

    return { project: dataProject, imageProject: imageProject }
}



export default EditProject
