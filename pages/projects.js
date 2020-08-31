import React, {useEffect,useState} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'
import { CSVLink, CSVDownload } from "react-csv";

import {getCookie} from '../lib/cookie'
import * as action from '../redux/actionIndex'

import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import ProjectTable from '../components/tableProjects/index'


function Projects({dataProject}) {
    return (
        <Drawer>
            <BigCardWrapper>
            <div className="pad-">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="mei" role="tabpanel" aria-labelledby="mei-tab">
                        <ProjectTable dataProject={dataProject} />
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


Projects.getInitialProps = async (ctx) => {
    const host = ctx.req ? ctx.req.headers['host'] : 'localhost:3014'
    const pageRequest = `http://admin.sato.id/api/project`
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

    return { dataProject: json }
}


export default Projects
