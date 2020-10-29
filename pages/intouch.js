import React, {useEffect,useState} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'
import { CSVLink, CSVDownload } from "react-csv";
import { Button, CircularProgress } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {getCookie} from '../lib/cookie'
import {absoluteUrl} from '../lib/absoluteUrl'

import * as action from '../redux/actionIndex'

import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import Editor from '../components/editor/index'
import ListOtherProject from '../components/listOtherProjects/index'
import IntouchTable from '../components/tableIntouch/index'
import {url} from '../lib/api_url'
import FormUploadImg from '../components/formUploadImgIntouch';
import TableImgIntouch from '../components/tableImgIntouch'

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

function Intouch({dataIntouch,listOtherProject,listProject,listImageIntouch}) {
    const [data, setData] = useState(dataIntouch.intouch[0].content)
    const [content_id, setContent_id] = useState(dataIntouch.intouch[0].content_id)
    const [loading, setLoading] = useState(false)
    const [value, setValue] = React.useState(0);

    function handleChangeTab(event, newValue) {
        setValue(newValue);
    };

    function handleEditorChange1(content) {
        setData(content)
    }

    function handleEditorChange2(content) {
        setContent_id(content)
    }


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        fetch(`${url}/api/insertIntouch`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({content:data,content_id:content_id})
        })
        .then((response) => response.json())
        .then((dataRes) => {
            console.log('Success:', dataRes);
            setLoading(false)
        })
    }

    return (
        <Drawer>
            <BigCardWrapper>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChangeTab} aria-label="simple tabs example">
                    <Tab label="List" {...a11yProps(0)} />
                    <Tab label="Description" {...a11yProps(1)} />
                    <Tab label="Upload Image" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <IntouchTable dataIntouchSlider={dataIntouch.intouch_slider}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <form onSubmit={handleSubmit} style={{textAlign:'left',marginTop:'5rem'}}>
                        <div className="editor__wrapper">
                            <h3>EN</h3>
                            <Editor handleEditorChange={handleEditorChange1} value={dataIntouch.intouch[0].content}/>
                        </div>
                        <div className="editor__wrapper">
                            <h3>ID</h3>
                            <Editor handleEditorChange={handleEditorChange2} value={dataIntouch.intouch[0].content_id}/>
                        </div>
                        <Button className="button_submit" variant="outlined" color="primary" type="submit" disabled={loading} >
                            {loading ? <CircularProgress size={24} className="buttonProgress" /> : 'Submit'}
                        </Button>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <FormUploadImg edit={false}  url={`${url}/api/insertImageIntouch`}/>
                    <TableImgIntouch dataImg={listImageIntouch.message}/>
                </TabPanel>
            </BigCardWrapper>
        </Drawer>
    )
}


Intouch.getInitialProps = async (ctx) => {
    const { origin } = absoluteUrl(ctx.req, "localhost:3014");

    const pageRequest = `${origin}/api/intouch`
    const res = await fetch(pageRequest)
    const json = await res.json()

    const pageRequest2 = `https://api.sato.id/api/getOtherProjects`
    const res2 = await fetch(pageRequest2)
    const json2 = await res2.json()

    const pageRequest3 = `https://api.sato.id/api/project`
    const res3 = await fetch(pageRequest3)
    const json3 = await res3.json()

    const pageRequest4 = `https://api.sato.id/api/getImageIntouch`
    const res4 = await fetch(pageRequest4)
    const json4 = await res4.json()


    if(ctx.res){
      ctx.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    }
    if(ctx && !process.browser) {
        if(ctx.req.headers.cookie) {
          ctx.store.dispatch(action.reauthenticate(getCookie('token', ctx.req),getCookie('idusers', ctx.req)))
        }
    }

    const token = ctx.store.getState().token;

    // set gettoken to false if no token in cookies
    if(!token && token !== undefined && ctx.pathname === '/intouch'){
        if(process.browser){
            Router.push('/login')
        }
    }

    return { dataIntouch: json, listOtherProject: json2, listProject:json3, listImageIntouch: json4 }
}


export default Intouch
