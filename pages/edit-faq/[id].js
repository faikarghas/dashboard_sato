import React,{useState} from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {getCookie} from '../../lib/cookie'
import * as action from '../../redux/actionIndex'

import Drawer from '../../components/drawer'
import BigCardWrapper from '../../components/bigCard'
import FormFaq from '../../components/formFaq'

import {url} from '../../lib/api_url'
import {absoluteUrl} from '../../lib/absoluteUrl'

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

const EditOurTeam = ({faq}) => {
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
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <FormFaq edit={true} url={`${url}/api/editFaq`} idFaq={faq.faq[0].idfaq} faq={faq}/>
                </TabPanel>
            </BigCardWrapper>
        </Drawer>
    )
}

EditOurTeam.getInitialProps = async (ctx) => {
    const { origin } = absoluteUrl(ctx.req, "localhost:3014");
    const id = ctx.query.id

    const res = await fetch(`${origin}/api/editFaq/${id}`)
    const dataFaq = await res.json()

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

    return { faq: dataFaq}
}



export default EditOurTeam
