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


const Index = ({dataContact}) => {
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

    function date(time) {
      let month = new Date(time).getMonth() + 1
      let date = new Date(time).getDate()
      let year = new Date(time).getFullYear()

      return (
        <div>{date}-{month}-{year}</div>
      )
    }


    const columns = React.useMemo(clickHandler => [
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
          grow: 2,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            grow: 2,
        },
        {
          name: 'Phone Number',
          selector: 'phoneNumber',
          sortable: true,
          grow: 2,
        },
        {
          name: 'Message',
          selector: 'message',
          sortable: true,
          grow: 4,
        },
        {
          name: 'Date',
          cell: (row) => {return (<p>{date(row.date)}</p>)},
          grow: 4,
          sortable: true,
        },
    ]);


    useEffect(() => {
      setData(dataContact)
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

