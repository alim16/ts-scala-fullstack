import React from 'react'
import {DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid'
import { ColorizeOutlined } from '@material-ui/icons'


const rows: GridRowsProp = [
    {id: 1, name: '1500 people', type: 'People', properties:50},
    {id: 2, name: '10k roles', type: "Roles", properties:100},
    {id: 3, name: '100k people', type: "People", properties:20},
]

const columns: GridColDef[] = [
    {field:'id', headerName:'Id', width:170},
    {field:'name', headerName:'Name', width:170},
    {field:'type', headerName:'Type', width:170},
    {field:'properties', headerName:'# Properties', width:170},
]

 const DatasetsDisplay = () => (
    <div style={{height:300, width:'100%'}}>
        <DataGrid rows={rows} columns={columns}/>
    </div>
)


export default DatasetsDisplay