import React,{useState,useEffect} from 'react'
import Router from 'next/router'
import Drawer from '../components/drawer'
import {getCookie} from '../lib/cookie'
import * as action from '../redux/actionIndex'
import Chip from '@material-ui/core/Chip';
import BigCardWrapper from '../components/bigCard/index'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core'
import {url} from '../lib/api_url'


function Index({dataCategory,dataProjectTitle}) {
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
    setListCategory(dataCategory.category)
    console.log(dataProjectTitle.projectTitle);
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
            <h2><b>Project Title</b></h2>
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
        </BigCardWrapper>
      </Drawer>
    </div>
  )
}

Index.getInitialProps = async (ctx) => {
  const host = ctx.req ? ctx.req.headers['host'] : 'localhost:3014'
  const pageRequest = `http://${host}/api/category`
  const res = await fetch(pageRequest)
  const json = await res.json()


  const pageRequest2 = `http://${host}/api/project`
  const res2 = await fetch(pageRequest2)
  const json2 = await res2.json()

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

  return { dataCategory: json, dataProjectTitle:json2 }

}

export default Index

