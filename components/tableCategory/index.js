import React,{useEffect,useState} from 'react'
import DataTable from 'react-data-table-component';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Link from 'next/link'
import swal from 'sweetalert';
import {url as globUrl} from '../../lib/api_url'

import Switch from '../toggleSwitch/index'

import {convertMonth} from '../../lib/date'


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


const Index = ({dataCategory}) => {
    const [data,setData] = useState([])
    const [open, setOpen] = useState('');

    const handleOpen = () => {
      setOpen('open');
    };

    const handleClose = () => {
      setOpen('');
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

    const columns = React.useMemo(clickHandler => [
        {
          name: 'Question',
          selector: 'question_en',
          sortable: true,
          grow: 2,
        },
        // {
        //   cell: (row) => <Switch id={row.id} name={row.pembicara_nama} status={row.status}/>,
        //   allowOverflow: true,
        //   button: true,
        //   width:'56px'
        // },
        {
          cell: (row) => <div className="iconWrapper"><Link href={`/edit-faq/[id]`} as={`/edit-faq/${row.idfaq}`}><a><EditIcon/></a></Link></div>,
          allowOverflow: true,
          button: true,
          width:'56px'
        },
        {
          cell: (row) => <div className="iconWrapper"><DeleteIcon onClick={()=>_deleteHandler(row.idfaq)} /></div>,
          allowOverflow: true,
          button: true,
          width:'56px'
        },
    ]);

    function _deleteHandler(idContent) {

        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {

            fetch(`${globUrl}/api/deleteCategory`,{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                id:idContent
              })
            })
            .then(res=>res.json())
            .then(resJson=>{
              let newData = data.filter(data=>{
                return data.idfaq !== idContent
              })
              setData(newData)
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            })
          } else {
            swal("Your imaginary file is safe!");
          }
        });


    }

    useEffect(() => {
      setData(dataCategory.category)
    }, [])

    return (
        <React.Fragment>
        <DataTable
            columns={columns}
            data={data} //props
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
            </div>
          </div>
          </React.Fragment>
    )
}




export default Index

