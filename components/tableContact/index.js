import React,{useEffect,useState} from 'react'
import DataTable from 'react-data-table-component';
import DownloadButton from '../downloadToExcel'

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


const Index = ({dataContact,fileName}) => {
    const [data,setData] = useState([])

    const actions = (
      <DownloadButton csvData={dataContact} fileName={fileName}/>
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
          grow: 3,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            grow: 3,
        },
        {
          name: 'Phone Number',
          selector: 'phoneNumber',
          sortable: true,
          grow: 4,
        },
        {
          name: 'Message',
          selector: 'message',
          sortable: true,
          grow: 3,
        },
        {
          name: 'Date',
          cell: (row) => {return (<p>{date(row.date)}</p>)},
          grow: 3,
          sortable: true,
        },
    ]);


    useEffect(() => {
      setData(dataContact)
    }, [])

    return (
        <DataTable
            columns={columns}
            data={data} //props
            pagination
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            actions={actions}
        />
    )
}




export default Index

