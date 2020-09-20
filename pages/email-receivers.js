import React, {useEffect,useState} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'
import { CSVLink, CSVDownload } from "react-csv";
import TextField from '@material-ui/core/TextField';
import { Button, CircularProgress } from '@material-ui/core'
import Chip from '@material-ui/core/Chip';

import {getCookie} from '../lib/cookie'
import {url} from '../lib/api_url'
import * as action from '../redux/actionIndex'

import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'


function EmailRe({dataEmailRe}) {
    const [loading, setLoading] = useState(false);
    const [listEmail,setListEmail] = useState()
    const [email,setEmail] = useState([])

    function submitValue(params) {
        setLoading(true)

        fetch('http://localhost:3009/api/insertEmail',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({email:email})
        })
        .then((response) => response.json())
        .then((dataRes) => {
            console.log('Success:', dataRes);

            listEmail.push({idemail_receivers:dataRes.insertId,name:email})

            setLoading(false)
        })
    }

    function handleDelete(id) {
        fetch(`http://localhost:3009/api/deleteEmail`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:id})
          })
          .then((response) => response.json())
          .then((dataRes) => {
            setListEmail(
                listEmail.filter(item=>{
                    return id !== item.idemail_receivers
                })
            )
            setLoading(false)
          })
    }

    useEffect(() => {
        setListEmail(dataEmailRe.message)
        console.log(dataEmailRe.message);
    }, [])

    let list_category

    if (listEmail) {
      list_category =listEmail.map((item,i)=>{
          return (
            <Chip key={i} style={{marginRight:'1.5rem'}} size="small" label={item.email} onDelete={()=>handleDelete(item.idemail_receivers)} color="primary" />
          )
        })
    }

    return (
        <Drawer submenuCt={true}>
            <BigCardWrapper >
            <div className="pad-">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="mei" role="tabpanel" aria-labelledby="mei-tab">
                        <div className="category__wrapper">
                            <h2><b>Email</b></h2>
                            <br/>
                            <div className="addCategory__wrapper">
                                <TextField
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                id="title_en"
                                placeholder="Email"
                                name="title_en"
                                type="email"
                                autoComplete='off'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                />
                                <Button className="button_submit" variant="outlined" color="primary" onClick={submitValue} disabled={loading} >
                                    {loading ? <CircularProgress size={24} className="buttonProgress" /> : 'Add'}
                                </Button>
                            </div>
                            <div className="list__category">
                            {list_category}
                            </div>
                        </div>
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


EmailRe.getInitialProps = async (ctx) => {
    const pageRequest = `https://api.sato.id/api/getEmailReceiver`
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

    console.log(json);

    return { dataEmailRe: json}
}


export default EmailRe
