import React,{useState,useEffect} from 'react'
import Router from 'next/router'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core'

import {url} from '../lib/api_url'
import Drawer from '../components/drawer'
import {getCookie} from '../lib/cookie'
import * as action from '../redux/actionIndex'
import Chip from '@material-ui/core/Chip';
import BigCardWrapper from '../components/bigCard/index'
import ListOtherProject from '../components/listOtherProjects/index'



function Index({dataCategory,dataProjectTitle,listProject,listOtherProject}) {
  const [category,setCategory] = useState([])
  const [project_en,setProject_en] = useState('')
  const [project_id,setProject_id] = useState('')
  const [listCategory,setListCategory] = useState()
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  function handleDelete(id) {
    fetch(`${url}/api/deleteCategory`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:id})
    })
    .then((response) => response.json())
    .then((dataRes) => {
      setListCategory(listCategory.filter(item => item.idcategory !== id));
    })
  }

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


  useEffect(() => {

    window.location.href = `/projects`

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
    <div>
      <Drawer>
        <BigCardWrapper>
          <div className="category__wrapper">
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
          <div className="category__wrapper">
            <h2><b>Other Projects</b></h2>
            <br/>
            <ListOtherProject listProject={listProject} listOtherProject={listOtherProject}/>
          </div>
        </BigCardWrapper>
      </Drawer>
    </div>
  )
}

Index.getInitialProps = async (ctx) => {
  const pageRequest = `https://admin.sato.id/api/category`
  const res = await fetch(pageRequest)
  const json = await res.json()

  const pageRequest2 = `https://admin.sato.id/api/project`
  const res2 = await fetch(pageRequest2)
  const json2 = await res2.json()

  const pageRequest3 = `https://api.sato.id/api/project`
  const res3 = await fetch(pageRequest3)
  const json3 = await res3.json()

  const pageRequest4 = `https://api.sato.id/api/getOtherProjects`
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
  if(!token && token !== undefined && ctx.pathname === '/'){
      if(process.browser){
          Router.push('/login')
      } else {

      }
  }

  return { dataCategory: json, dataProjectTitle:json2,listProject:json3,listOtherProject: json4 }

}

export default Index

