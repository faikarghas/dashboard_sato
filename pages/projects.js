import React, {useEffect,useState} from 'react'
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'
import { CSVLink, CSVDownload } from "react-csv";
import TextField from '@material-ui/core/TextField';
import { Button, CircularProgress } from '@material-ui/core'
import Chip from '@material-ui/core/Chip';

import {getCookie} from '../lib/cookie'
import {url} from '../lib/api_url'
import {absoluteUrl} from '../lib/absoluteUrl'
import * as action from '../redux/actionIndex'

import BigCardWrapper from '../components/bigCard/index'
import Drawer from '../components/drawer'
import ProjectTable from '../components/tableProjects/index'


function Projects({dataProject,dataProjectTitle,dataCategory}) {
    const [project_en,setProject_en] = useState('')
    const [project_id,setProject_id] = useState('')
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [listCategory,setListCategory] = useState()
    const [category,setCategory] = useState([])

    function submitValue1(params) {
        setLoading1(true)
        fetch(`${url}/api/insertProjectTitle`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            description_en:project_en,
            description_id:project_id
          })
        })
        .then((response) => response.json())
        .then((dataRes) => {
            setLoading1(false)
        })
    }

    function submitValue2(params) {
        setLoading2(true)

        fetch(`${url}/api/insertCategory`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({category:category})
        })
        .then((response) => response.json())
        .then((dataRes) => {
            console.log('Success:', dataRes);

            listCategory.push({idcategory:dataRes.insertId,name:category})

            setLoading2(false)
        })
    }

    function handleDelete(id) {
        fetch(`${url}/api/deleteCategory`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:id})
          })
          .then((response) => response.json())
          .then((dataRes) => {
              setListCategory(
                    listCategory.filter(item=>{
                        return id !== item.idcategory
                    })
            )
              setLoading2(false)
          })
    }

    useEffect(() => {
        setListCategory(dataCategory.category)
        if (dataProjectTitle.projectTitle[0]) {
          setProject_en(dataProjectTitle.projectTitle[0].description_en)
          setProject_id(dataProjectTitle.projectTitle[0].description_id)
        }
    }, [])

    let list_category

    if (listCategory) {
      list_category =listCategory.map((item,i)=>{
          return (
            <Chip key={i} style={{marginRight:'1.5rem'}} size="small" label={item.name} onDelete={()=>handleDelete(item.idcategory)} color="primary" />
          )
        })
    }

    return (
        <Drawer>
            <BigCardWrapper >
            <div className="pad-">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="mei" role="tabpanel" aria-labelledby="mei-tab">
                        <div className="category__wrapper">
                            <h2><b>Company Statement</b></h2>
                            <br/>
                            <div className="addCategory__wrapper">
                                <TextField
                                label="Project EN"
                                variant="outlined"
                                margin="normal"
                                id="project_en"
                                placeholder="Project EN"
                                name="project_en"
                                type="text"
                                autoComplete='off'
                                fullWidth
                                multiline
                                rows={5}
                                onChange={e => setProject_en(e.target.value)}
                                value={project_en}
                                />
                                <TextField
                                label="Project ID"
                                variant="outlined"
                                margin="normal"
                                id="project_id"
                                placeholder="Project ID"
                                name="project_id"
                                type="text"
                                autoComplete='off'
                                fullWidth
                                multiline
                                rows={5}
                                onChange={e => setProject_id(e.target.value)}
                                value={project_id}
                                />
                                <Button className="button_submit" variant="outlined" color="primary" onClick={submitValue1} disabled={loading1} >
                                    {loading1 ? <CircularProgress size={24} className="buttonProgress" /> : 'Submit'}
                                </Button>
                            </div>
                        </div>
                        <div className="category__wrapper mb-5">
                            <h2><b>Category</b></h2>
                            <br/>
                            <div className="addCategory__wrapper">
                                <TextField
                                label="Category"
                                variant="outlined"
                                margin="normal"
                                id="title_en"
                                placeholder="Category"
                                name="title_en"
                                type="text"
                                autoComplete='off'
                                onChange={e => setCategory(e.target.value)}
                                value={category}
                                />
                                <Button className="button_submit" variant="outlined" color="primary" onClick={submitValue2} disabled={loading2} >
                                    {loading2 ? <CircularProgress size={24} className="buttonProgress" /> : 'Add'}
                                </Button>
                            </div>
                            <div className="list__category">
                            {list_category}
                            </div>
                        </div>
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
    const { origin } = absoluteUrl(ctx.req, "localhost:3014");

    const pageRequest = `${origin}/api/project`
    const res = await fetch(pageRequest)
    const json = await res.json()

    const pageRequest2 = `${origin}/api/project`
    const res2 = await fetch(pageRequest2)
    const json2 = await res2.json()

    const pageRequest3 = `${origin}/api/category`
    const res3 = await fetch(pageRequest3)
    const json3 = await res3.json()


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

    return { dataProject: json,dataProjectTitle:json2, dataCategory: json3 }
}


export default Projects
