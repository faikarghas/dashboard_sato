import React, {useEffect,useState} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'
import { CSVLink, CSVDownload } from "react-csv";
import { Button, CircularProgress } from '@material-ui/core'

import {getCookie} from '../lib/cookie'
import * as action from '../redux/actionIndex'

import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import Editor from '../components/editor/index'
import {url} from '../lib/api_url'


function Intouch({dataIntouch}) {
    const [data, setData] = useState(dataIntouch.intouch[0].content)
    const [content_id, setContent_id] = useState(dataIntouch.intouch[0].content_id)
    const [loading, setLoading] = useState(false)


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
            <div className="pad-">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="mei" role="tabpanel" aria-labelledby="mei-tab">
                        <h3 style={{marginBottom:'4rem'}}><b>Intouch</b></h3>
                        <form onSubmit={handleSubmit} style={{textAlign:'left'}}>
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
                    </div>
                </div>
                <style jsx>{`
                        .pad-1{
                        padding:1rem;
                        }
                `}</style>
            </div>
            </BigCardWrapper>
        </Drawer>
    )
}


Intouch.getInitialProps = async (ctx) => {
    const host = ctx.req ? ctx.req.headers['host'] : 'localhost:3014'
    const pageRequest = `https://admin.sato.id/api/intouch`
    const res = await fetch(pageRequest)
    const json = await res.json()


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
    if(!token && token !== undefined && ctx.pathname === '/leads'){
        if(process.browser){
            Router.push('/login')
        }
    }

    return { dataIntouch: json }
}


export default Intouch
