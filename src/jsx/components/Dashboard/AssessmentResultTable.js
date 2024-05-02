
import React,{ useEffect, useMemo, useState } from 'react';
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table';
//import { ColumnFilter } from '../../../components/table/FilteringTable/ColumnFilter';
//import { GlobalFilter } from '../../../components/table/FilteringTable/GlobalFilter'; 
import { Button, Modal } from 'react-bootstrap';

import { ColumnFilter } from '../table/FilteringTable/ColumnFilter';
import { GlobalFilter } from '../table/FilteringTable/GlobalFilter';


const AssessmentResultTable =({propdata}) =>{
    const [postModal, setPostModal] = useState(false);
    const[tenantdata,setTenantData] =useState(null);
    const COLUMNS = [
        {
            Header : 'User Name',
            Footer : 'User Name',
            accessor: 'name',
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
            Header : 'Course Program Name',
            Footer : 'Course Program Name',
            accessor: 'programname',
            Filter: ColumnFilter,
        },
        {
            Header : ' Status',
            Footer : ' Status',
            accessor: 'programstatus',
            Filter: ColumnFilter,
        },

        {
            Header : 'Created Date',
            Footer : 'Created Date',
            accessor: 'createddate',
            Filter: ColumnFilter,
        },

        {
            Header : 'Total Courses',
            Footer : 'Total Courses',
            accessor: 'totalitems',
            Filter: ColumnFilter,
        },
        {
            Header : 'Total Lesson Count',
            Footer : 'Total Lesson Count',
            accessor: 'lessonscount',
            Filter: ColumnFilter,
        },
        {
            Header : 'Completed Lesson Count',
            Footer : 'Completed Lesson Count',
            accessor: 'completedlessonscount',
            Filter: ColumnFilter,
        },

        {
            Header : 'Total Quiz Count',
            Footer : 'Total Quiz Count',
            accessor: 'quizcount',
            Filter: ColumnFilter,
        },
        {
            Header : 'Completed Quiz Count',
            Footer : 'Completed Quiz Count',
            accessor: 'completedquizcount',
            Filter: ColumnFilter,
        },
        {
            Header : 'Lesson / Quiz Completion',
            Footer : 'Lesson / Quiz Completion ',
            accessor: 'courseresult',
            Filter: ColumnFilter,
        },
        {
            Header : 'Over All Course Completion',
            Footer : 'Over All Course Completion ',
            accessor: 'percentagecompletion',
            Filter: ColumnFilter,
        },
        {
            Header : 'Assessment Attempts',
            Footer : 'Assessment Attempts',
            accessor: 'noofattempts',
            Filter: ColumnFilter,
        },
        {
            Header : 'Passing Grade',
            Footer : 'Passing Grade',
            accessor: 'passgrade',
            Filter: ColumnFilter,
        },
        {
            Header : 'Pass / Fail',
            Footer : 'Pass / Fail',
            accessor: 'pass',
            Filter: ColumnFilter,
        },
        {
            Header : 'Total Percentage',
            Footer : 'Total Percentage',
            accessor: 'totalpercentage',
            Filter: ColumnFilter,
        },
        {
            Header : 'Correct Answers',
            Footer : 'Correct Answers',
            accessor: 'correctansweredcount',
            Filter: ColumnFilter,
        },
        {
            Header : 'Wrong Answers',
            Footer : 'Wrong Answers',
            accessor: 'wronganswercount',
            Filter: ColumnFilter,
        },
        {
            Header : 'Questions Answered',
            Footer : 'Question Answered',
            accessor: 'questionanweredcount',
            Filter: ColumnFilter,
        },
        {
            Header : 'Questions Left',
            Footer : 'Question Left',
            accessor: 'emptycount',
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
export default AssessmentResultTable