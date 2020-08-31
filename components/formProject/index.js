import React,{useState} from 'react'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import {useFormik } from 'formik'
import * as Yup from 'yup';

const category = [
    {
      value: 'offices',
      label: 'OFFICES',
    },
    {
      value: 'retails',
      label: 'RETAILS',
    },
    {
      value: 'show units',
      label: 'SHOW UNITS',
    },
    {
      value: 'resedentials',
      label: 'RESEDENTIALS',
    },
    {
      value: 'SELECT CATEGORY',
      label: 'SELECT CATEGORY',
    },
];

const FormProject = ({project,idProject,url,edit}) => {
    const [selectCategory, setSelectCategory] = useState('SELECT CATEGORY');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(project);
    const router = useRouter()

    let formik

    if (edit === true) {
         formik = useFormik({
            enableReinitialize:true,
            initialValues: {
                name:data.project[0].name,
                client:data.project[0].client,
                duration:data.project[0].duration,
                location:data.project[0].location,
                architect:data.project[0].architect,
                area:data.project[0].area,
                year:data.project[0].year,
                projectCategory: selectCategory,
                desc_en:data.project[0].description_en,
                desc_id:data.project[0].description_id
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                const dataFormik = {
                    name: values.name,
                    client:values.client,
                    duration: values.duration,
                    location: values.location,
                    architect: values.architect,
                    area: values.area,
                    year: values.year,
                    category: selectCategory,
                    desc_en: values.desc_en,
                    desc_id: values.desc_id,
                    idProject: idProject
                }
                setLoading(true)
                fetch(url,{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(dataFormik)
                })
                .then((response) => response.json())
                .then((dataRes) => {
                    console.log('Success:', dataRes);
                    setLoading(false)
                    alert('berhasil')
                    router.push(window.location.pathname)
                })
            },
        });
    } else {
         formik = useFormik({
            enableReinitialize:true,
            initialValues: {
                name:'',
                client:'',
                duration:'',
                location:'',
                architect:'',
                area:'',
                year:'',
                projectCategory: '',
                desc_en:'',
                desc_id:''
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                const dataFormik = {
                    name: values.name,
                    client:values.client,
                    duration: values.duration,
                    location: values.location,
                    architect: values.architect,
                    area: values.area,
                    year: values.year,
                    category: selectCategory,
                    desc_en: values.desc_en,
                    desc_id: values.desc_id,
                }
                setLoading(true)
                fetch(url,{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(dataFormik)
                })
                .then((response) => response.json())
                .then((dataRes) => {
                    console.log('Success:', dataRes);
                    setLoading(false)
                    setTimeout(() => {
                        router.push('/projects')
                    }, 1500)
                })
            },
        });
    }


    const handleChangeSelect = (event) => {
        setSelectCategory(event.target.value);
    };

    React.useEffect(() => {
        edit ? setSelectCategory(data.project[0].category) : null
    }, [])


    return (
        <form  onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <TextField
                        label="Name" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        placeholder="Name"
                        name="name"
                        type="text"
                        autoComplete='off'
                        // error={formik.errors.email && formik.touched.email ? true : null}
                        // helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                        onChange={formik.handleChange} value={formik.values.name || ''}
                    />
                    <TextField
                        label="Client" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="client"
                        placeholder="Client"
                        type="text"
                        id="client"
                        autoComplete='off'
                        // error={formik.errors.password && formik.touched.password ? true : null}
                        // helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        onChange={formik.handleChange} value={formik.values.client || ''}
                    />
                    <TextField
                        label="Duration" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="duration"
                        placeholder="Duration"
                        type="text"
                        id="duration"
                        // error={formik.errors.password && formik.touched.password ? true : null}
                        // helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        onChange={formik.handleChange} value={formik.values.duration || ''}
                    />
                    <TextField
                        label="Location" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="location"
                        placeholder="Location"
                        type="text"
                        id="location"
                        autoComplete='off'
                        // error={formik.errors.password && formik.touched.password ? true : null}
                        // helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        onChange={formik.handleChange} value={formik.values.location || ''}
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField
                        label="Architect" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="architect"
                        placeholder="Architect"
                        type="text"
                        id="architect"
                        // error={formik.errors.password && formik.touched.password ? true : null}
                        // helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        onChange={formik.handleChange} value={formik.values.architect || ''}
                    />
                    <TextField
                        label="Area" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="area"
                        placeholder="Area"
                        type="text"
                        id="area"
                        // error={formik.errors.password && formik.touched.password ? true : null}
                        // helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        onChange={formik.handleChange} value={formik.values.area || ''}
                    />
                    <TextField
                        label="Year" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="year"
                        placeholder="Year"
                        type="number"
                        id="year"
                        // error={formik.errors.password && formik.touched.password ? true : null}
                        // helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        onChange={formik.handleChange} value={formik.values.year || ''}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="projectCategory"
                        className="text-select"
                        name="projectCategory"
                        select
                        fullWidth
                        value={selectCategory}
                        onChange={handleChangeSelect}
                    >
                    {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description EN" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="desc_en"
                        placeholder="Description EN"
                        type="text"
                        id="desc_en"
                        multiline
                        rows={5}
                        // error={formik.errors.password && formik.touched.password ? true : null}
                        // helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        onChange={formik.handleChange} value={formik.values.desc_en || ''}
                    />
                    <TextField
                        label="Description ID" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="desc_id"
                        placeholder="Description ID"
                        type="text"
                        id="desc_id"
                        multiline
                        rows={5}
                        // error={formik.errors.password && formik.touched.password ? true : null}
                        // helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        onChange={formik.handleChange} value={formik.values.desc_id || ''}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} className="button_wrapper">
                <Button className="button_submit" variant="outlined" color="primary" type="submit" disabled={loading} >
                    {loading ? <CircularProgress size={24} className="buttonProgress" /> : 'Submit'}
                </Button>
            </Grid>
            <style jsx>{`
                form{
                    padding:1rem;
                }
            `}</style>
        </form>
    )
}

export default FormProject
