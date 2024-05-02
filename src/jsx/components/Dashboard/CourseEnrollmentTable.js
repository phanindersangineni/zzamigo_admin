
import React,{ useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
//import { ColumnFilter } from '../../../components/table/FilteringTable/ColumnFilter';
//import { GlobalFilter } from '../../../components/table/FilteringTable/GlobalFilter'; 
import { Button, Modal } from 'react-bootstrap';

import { ColumnFilter } from '../table/FilteringTable/ColumnFilter';
import { GlobalFilter } from '../table/FilteringTable/GlobalFilter';


const CourseEnrollmentTable =({propdata}) =>{
    const [postModal, setPostModal] = useState(false);
    const[tenantdata,setTenantData] =useState(null);
    const COLUMNS = [
        {
            Header : 'User Name',
            Footer : 'User Name',
            accessor: 'username',
            Filter: ColumnFilter
            
            //disableFilters: true,
        },
        {
            Header : 'Mobile Number',
            Footer : 'Mobile Number',
            accessor: 'mobileno',
            Filter: ColumnFilter,
            
            //disableFilters: true,
        },
        {
            Header : 'Email',
            Footer : 'email',
            accessor: 'email',
            Filter: ColumnFilter,
        },
        {
            Header : 'Course Name',
            Footer : 'Course Name',
            accessor: 'name',
            Filter: ColumnFilter,
        },
        {
            Header : 'Course Status',
            Footer : 'Course Status',
            accessor: 'coursestatus',
            Filter: ColumnFilter,
        },
        
      
          
        
    ]

    const columns = useMemo( () => COLUMNS, [] )
	//console.log(propdata);
	const data = useMemo( () => propdata, [] )
    console.log(data);
	const tableInstance = useTable({
		columns,
		data,	
		initialState : {pageIndex : 0}
	}, useFilters, useGlobalFilter, usePagination)

	
	
	const { 
		getTableProps, 
		getTableBodyProps, 
		headerGroups, 
		prepareRow,
		state,
		page,
		gotoPage,
		pageCount,
		pageOptions,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setGlobalFilter,
	} = tableInstance
	
	
	const {globalFilter, pageIndex} = state

    const handleRowClick =async(row) =>{

        console.log("row values",row.values);
        //let tenantid = row.values.
        const tenantdata = propdata.filter(t => t.tenantid == row.values.tenantid);
     
        
        setTenantData(tenantdata[0]);
        setPostModal(true);
        }

    const openModal =async(data) =>{
        setPostModal(true); 
    }
    const closemodal = async()=>{
        setPostModal(false);
    }
    const deleteData=async(row)=>{
        
       

}


    // deleteTenantData=async()=>{
    //     const Response=DeleteTenants()
    // }

    return(
    <>
    <div className="card">
       	
				<div className="card-body">
             
					<div className="table-responsive">
						<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
						
                        <table {...getTableProps()} className="table dataTable display">
							<thead>
							   {headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map(column => (
											<th {...column.getHeaderProps()}>
												{column.render('Header')}
												{column.canFilter ? column.render('Filter') : null}
											</th>
										))}
									</tr>
							   ))}
							</thead> 
							<tbody {...getTableBodyProps()} className="" >
							
								{page.map((row) => {
									prepareRow(row)
									return(
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return <td {...cell.getCellProps()}> 
												{cell.render('Cell')} </td>
											})}
										</tr>
									)
								})}
							</tbody>
						</table>
						<div className="d-flex justify-content-between">
							<span>
								Page{' '}
								<strong>
									{pageIndex + 1} of {pageOptions.length}
								</strong>{''}
							</span>
							<span className="table-index">
								Go to page : {' '}
								<input type="number" 
									className="ml-2"
									defaultValue={pageIndex + 1} 
									onChange = {e => { 
										const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0 
										gotoPage(pageNumber)
									} } 
								/>
							</span>
						</div>
						<div className="text-center mb-3">	
							<div className="filter-pagination  mt-3">
								<button className=" previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
								
								<button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
									Previous
								</button>
								<button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>
									Next
								</button>
								<button className=" next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
							</div>
						</div>
					</div>
				</div>
			</div>

        

    </>
    )
}
export default CourseEnrollmentTable