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


const actions = (
  <IconButton
    color="primary"
    className="IconButtonCustom"
  >
    <Link href="/create-slider"><a><Add /></a></Link>
  </IconButton>
);

const Index = ({dataImg}) => {
    const [data,setData] = useState([])

    const columns = React.useMemo(clickHandler => [
        {
          name: 'Name',
            cell: (row) => <div>https://api.sato.id/images/intouch/{row.imageName}</div>,
          sortable: true,
          grow: 2,
        },
        {
          cell: (row) => <div className="iconWrapper"><DeleteIcon onClick={()=>_deleteHandler(row.idimages)} /></div>,
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

            fetch(`${globUrl}/api/deleteImageIntouch`,{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                id:idContent
              })
            })
            .then(res=>res.json())
            .then(resJson=>{
              let newData = data.filter(data=>{
                return data.idimages !== idContent
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
      setData(dataImg)
      console.log(dataImg);
    }, [])

    return (
        <DataTable
            columns={columns}
            data={data} //props
            pagination
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            // actions={actions}
        />
    )
}


export default Index
