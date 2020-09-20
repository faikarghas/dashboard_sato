import React,{useState,useRef,useEffect,createRef} from 'react'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import DataTable from 'react-data-table-component';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import { Button, CircularProgress } from '@material-ui/core'

import {Modal} from 'react-bootstrap'
import swal from 'sweetalert';
import Dropzone from 'react-dropzone'

import { connect } from 'react-redux'
import * as action from '../../redux/actionIndex'
import {url as globUrl} from '../../lib/api_url'


const customStyles = {
  headRow: {
    style: {
      border: 'none',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
    },
  },
  pagination: {
    style: {
      border: 'none',
    },
  },
};



function Gallery({id,images,addImg,url}) {
  const [data,setData] = useState([])
  const [imgUrl, setImgUrl] = useState();
  const [open, setOpen] = useState('');
  const [imgFile, setImgFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnUpload, setBtnUpload] = useState(true);

  const dropzoneRef = createRef();


  const columns = React.useMemo(clickHandler => [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        width:'300px',
      },
      {
        cell: (row) => <div className="img_list_wrapper"><img src={`${globUrl}/images/${row.name}`} width="100%"/></div>,
        allowOverflow: true,
        width:'270px',
      },
      {
        cell: (row) => <div className="iconWrapper"><DeleteIcon onClick={()=>_deleteHandler(row.idImages,row.name)} /></div>,
        allowOverflow: true,
        button: true,
        width:'56px'
      },
  ]);

  function handleUpload() {
    const dataForm = new FormData()
    dataForm.append('name', imgFile.name)
    dataForm.append('id', id)
    dataForm.append('files', imgFile)
    setLoading(true)
    fetch(url[0],{
        method:'POST',
        body:dataForm
    })
    .then(res=>res.json())
    .then(dataRes=>{
      setLoading(false)
      setOpen('')
      setImgUrl('')
      fetch(url[1],{
        method:'GET',
      })
      .then(res=>res.json())
      .then(dataRes=>{
        // setData(dataRes.result)
        addImg({result:dataRes.result})
      })
    })

}

  function _deleteHandler(idContent,name) {

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

          fetch(url[2],{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id: idContent,
              name: name
            })
          })
          .then(res=>res.json())
          .then(resJson=>{
            let newData = images.result.filter(data=>{
              return data.idImages !== idContent
            })
            addImg({result:newData})
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          })
        } else {
          swal("Your imaginary file is safe!");
        }
      });
  }

  const openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
        dropzoneRef.current.open()
    }
  };

  function onDropFile(acceptedFiles) {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onloadstart = () => {
    }

    reader.onload = (e) => {
    }

    reader.onloadend = function(e) {
        setImgUrl(reader.result)
        setImgFile(acceptedFiles[0])
        setBtnUpload(false)
    };

    reader.readAsDataURL(acceptedFiles[0])

  }

  const handleOpen = () => {
    setOpen('open');
  };

  const handleClose = () => {
    setOpen('');
    setImgUrl('')
  };


  const actions = (
    <IconButton
      color="primary"
      className="IconButtonCustom"
      onClick={handleOpen}
    >
      <Add  />
    </IconButton>
  );

  console.log(images,'images');

return (
      <React.Fragment>
        <DataTable
            columns={columns}
            data={images.result} //props
            pagination
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            actions={actions}
        />
        <div className={`overlay__modal ${open}`}></div>
        <div className={`modal__upload ${open}`}>
          <div className="modal__header">
            <p className="close__upload" onClick={handleClose}>X</p>
          </div>
          <div className="modal__body">
            <Dropzone onDrop={onDropFile} noClick noKeyboard ref={dropzoneRef}>
              {({getRootProps, getInputProps,acceptedFiles}) => (
                  <div className="dropzone" {...getRootProps({className:"dropzone-1"})}>
                      <input {...getInputProps()} />
                      <div className="img__preview">
                        <img src={imgUrl} width="100%" />
                        {btnUpload ? <div className="button_upload btn_upload" onClick={openDialog} >Select Images</div>  : ''}
                      </div>
                  </div>
              )}
            </Dropzone>
            <div className="action__wrapper">
              {/* <div className="button__upload" onClick={openDialog}>Pilih</div> */}
              <div onClick={handleUpload}>
              <Button  className="button_submit" variant="outlined" color="primary"  disabled={loading} >
                    {loading ? <CircularProgress size={24} className="buttonProgress" /> : 'Submit'}
              </Button>
              </div>
              {/* <div className="button__upload" >Upload</div> */}
            </div>
          </div>
        </div>
      </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    images: state.auth.images
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addImg: (images) => dispatch(action.addImg(images))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Gallery)


 