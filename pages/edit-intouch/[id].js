import React from 'react'

import FormIntouch from '../../components/formIntouch/index'
import BigCardWrapper from '../../components/bigCard/index'
import Drawer from '../../components/drawer'

import {getCookie} from '../../lib/cookie'
import * as action from '../../redux/actionIndex'

import {url} from '../../lib/api_url'
import {absoluteUrl} from '../../lib/absoluteUrl'

const EditIntouch = ({intouch,idintouchslider}) => {
    return (
        <Drawer>
            <BigCardWrapper>
                <FormIntouch edit={true} url={`${url}/api/editIntouchSlider`} intouch={intouch} idintouchslider={idintouchslider}/>
            </BigCardWrapper>
        </Drawer>
    )
}

EditIntouch.getInitialProps = async (ctx) => {
    const { origin } = absoluteUrl(ctx.req, "localhost:3014");

    const id = ctx.query.id
    const res = await fetch(`${origin}/api/editIntouch/${id}`)
    const dataIntouch = await res.json()

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

    return { intouch: dataIntouch,idintouchslider: id}
}


export default EditIntouch
