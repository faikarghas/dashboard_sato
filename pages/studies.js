import React, {useEffect,useState} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'
import { CSVLink, CSVDownload } from "react-csv";

import {getCookie} from '../lib/cookie'
import {absoluteUrl} from '../lib/absoluteUrl'
import * as action from '../redux/actionIndex'

import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import StudiesTable from '../components/tableStudies/index'


function Studies({dataStudies}) {
    return (
        <Drawer>
            <BigCardWrapper>
            <div className="pad-">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="mei" role="tabpanel" aria-labelledby="mei-tab">
                        <StudiesTable dataStudies={dataStudies} />
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


Studies.getInitialProps = async (ctx) => {
    const { origin } = absoluteUrl(ctx.req, "localhost:3014");

    const pageRequest = `${origin}/api/studies`
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
    if(!token && token !== undefined && ctx.pathname === '/studies'){
        if(process.browser){
            Router.push('/login')
        }
    }

    return { dataStudies: json }
}


export default Studies
