import React, {useEffect,useState} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'

import {getCookie} from '../lib/cookie'
import {absoluteUrl} from '../lib/absoluteUrl'
import * as action from '../redux/actionIndex'

import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import CareerTable from '../components/tableCareer/index'


function Career({dataCareer}) {
    return (
        <Drawer>
            <BigCardWrapper>
                <div className="pad-">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="mei" role="tabpanel" aria-labelledby="mei-tab">
                            <CareerTable dataCareer={dataCareer} />  
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


Career.getInitialProps = async (ctx) => {
    const { origin } = absoluteUrl(ctx.req, "localhost:3014");

    const pageRequest = `${origin}/api/career`
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
    if(!token && token !== undefined && ctx.pathname === '/career'){
        if(process.browser){
            Router.push('/login')
        }
    }

    return { dataCareer: json }
}


export default Career
