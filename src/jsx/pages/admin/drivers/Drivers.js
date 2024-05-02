import { Suspense, lazy, useEffect, useState } from "react";
import { Accordion, Badge, Button, Card, Col, Dropdown, Modal, Table } from "react-bootstrap"

import { Link } from "react-router-dom";
import swal from "sweetalert";
import { GetAllDrivers, GetAllStores, GetAllTenants, GetCategory } from "../../../../services/CommonService";
import Pagination from "react-js-pagination";
import EventBus from "../../../../services/EventBus";
import AddDrivers from "./AddDrivers";




const Drivers = () => {

    const svg1 = (
        <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24"></rect>
                <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                <circle fill="#000000" cx="19" cy="12" r="2"></circle>
            </g>
        </svg>
    );

    useEffect(() => {
        getallDrivers();
        getStores();

        EventBus.on("loadpagedata", (data) => {
            let obj = {
                payload: {
                    "pageNo": data?.message?.page,
                    "size": 10
                }
            }
            loadData(data?.message?.page);
            //dispatch(fetchAllPaitentsForMedicalBoard({obj:obj}));
        });
        EventBus.remove("loadpagedata");

    }, []);

    const [drivers, setDrivers] = useState([]);
    const [postModal, setPostModal] = useState(false);
    const [modaltype, setModalType] = useState({});
    const [storeList, setStoreList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0)
    const[updatedata,setUpdateData] =useState({});
    const[page,setPage]=useState([])
    const handlePageChange = async (pn) => {
        if (pn !== activePage && !isNaN(pn)) {
            loadNextsetofRecords(pn);
        }
    };
    const loadNextsetofRecords = async (pn) => {
        setActivePage(pn);
        EventBus.dispatch("loadpagedata", {
            message: {
                "page": pn
            }

        });
    };

    const loadData = async (pn) => {
        
        const reqparams = {
            pageno: pn
        }
        setPage(pn)
        const respData = await GetAllDrivers(reqparams);
        console.log(respData.data);
        setDrivers(respData?.data?.docs);
        setTotalRecords(respData.data.total);
    }


    const getallDrivers = async () => {
        const reqparams = {
            pageno: '1'
        }
        const respData = await GetAllDrivers(reqparams);
        console.log("respData.data",respData.data);
        setDrivers(respData?.data.docs);
        setTotalRecords(respData.data.total);
    }

    const getStores = async () => {

        const reqdata = {
            pageno: '-1',
            query: { status: 'Active' }
        }

        const Response = await GetAllStores(reqdata)
        let counter = 0;
        const rowdata = [];
        await Response.data.reduce(async (promise, res) => {
            await promise;
            const opts = {
                label: res.name,
                value: res.id
            }
            rowdata.push(opts);
            if (counter == Response.data.length - 1) {

                setStoreList(rowdata);
            }
            counter++;
        }, Promise.resolve());

    }

    // console.log(storeList);

    const openModal = async (item) => {
        //alert("hi");
        // console.log(item);
        setUpdateData(item);
        setPostModal(true);
    }
    const addModal = async () => {
        // console.log(storeList);
        setUpdateData({});
        setPostModal(true);
    }
    const closemodal = async () => {

        getallDrivers()
        // loadData(page)
        setPostModal(false);
     
    }

    const deleteRow = async (id) => {
        const data = {
            id: id
        }

        // const response = await deletePricing(data);


        /* if (response.status != 'success') {
             swal( "Failed to update data", "failure")
         } else {
           // notifyTopInfo("Profile data updated successfully");
           swal("Data updated successfully", "success")
           getPricings();
            
         } */

    }
    const fields = {
        categoryname: '',
       
    }
    const [formfields, setFromFields] = useState(fields);

    const { categoryname } = formfields;


    const handleChange1 = (e) => {
        const { name, value } = e.target;

        setFromFields((prevState) => ({
            ...prevState,
            [name]: value
        }));


    }
    const [percent, setPercent] = useState(50);
   

    const resetform =async() =>{
        setFromFields(fields);
    }
   

    return (
        <>
            <Col lg={12}>
                <Card>
                    <Card.Header>
                        <Card.Title>Drivers <Button onClick={() => addModal()}
                            className="me-2" variant="primary btn-square"
                            title="Add Drivers"
                        >
                            <span className="btn-icon-start text-danger">
                                <i className="fa fa-plus color-danger" />
                            </span>
                            ADD
                        </Button></Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="width80">
                                        <strong>Display Order</strong>
                                    </th>
                                    <th>
                                        <strong>Name</strong>
                                    </th>
                                    <th>
                                        <strong>Tenant Name</strong>
                                    </th>
                                    <th>
                                        <strong>Status</strong>
                                    </th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {drivers?.map(item => (
                                    <tr>
                                        <td>
                                            <strong>{item.displayposition}</strong>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{displayTenants(item.stores)}</td>
                                        <td>{item.status}</td>
                                        <td></td>

                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="success"
                                                    className="light sharp i-false"
                                                >
                                                    {svg1}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => openModal(item)}>
                                                             Edit
                                                     
                                                    </Dropdown.Item >



                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                        <div >

                            <Pagination
                                activePage={activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={totalRecords}
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                                activeClass="active"
                                itemClass="page-item"
                                innerClass="pagination mb-0"
                                linkClass="page-link"
                                firstPageText="First"
                                lastPageText="Last"
                                prevPageText="Previous"
                                nextPageText="Next"
                                disabledClass="disabled"
                                activeLinkClass="disabled"
                            />
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            <Modal className="modal fade" size="xl" show={postModal} onHide={setPostModal} >
                <div className="" role="document">
                    <div className="">
                        <form >
                            <div className="modal-header">

                                <button type="button" className="btn-close" onClick={closemodal} data-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">

                               
                                        <Suspense fallback={<div>Loading</div>}>
                                            {/* <AddStores tenantprops={storeList} updateprop ={updatedata}/> */}
                                            <AddDrivers  tenantprops={storeList} updateprop ={updatedata} />
                                             </Suspense>
                                   

                            </div>

                        </form>

                    </div>
                </div>
            </Modal>
        </>
    )
}

function displayTenants(item) {

    
    let counter =0;
    let retdata ='';
    for (var j = 0; j < item.length; j++){

        // console.log(item[j]);
        if(retdata ==''){
            retdata =item[j].label;
        }else{
            retdata =retdata+','+ item[j].label;
        }
        if(counter == item.length-1){
          return retdata;
        }

        counter++;
        
        }
}

export default Drivers