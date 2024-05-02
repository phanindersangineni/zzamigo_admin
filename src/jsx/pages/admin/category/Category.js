import { Suspense, lazy, useEffect, useState } from "react";
import { Accordion, Badge, Button, Card, Col, Dropdown, Modal, Table } from "react-bootstrap"

import { Link } from "react-router-dom";
import swal from "sweetalert";
import { GetAllTenants, GetCategory } from "../../../../services/CommonService";
import Pagination from "react-js-pagination";
import EventBus from "../../../../services/EventBus";


const AddCategory = lazy(() => import('./AddCategory'));


const Category = () => {

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
        getAllCategory();
        getTenants();

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

    const [category, setCategory] = useState([]);
    const [postModal, setPostModal] = useState(false);
    const [modaltype, setModalType] = useState({});
    const [tenantlist, setTenantList] = useState([]);
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
        const respData = await GetCategory(reqparams);
        setCategory(respData.data.docs);
        setTotalRecords(respData.data.total);
    }


    const getAllCategory = async () => {
        const reqparams = {
            pageno: '1'
        }
        const respData = await GetCategory(reqparams);
        console.log("respData.data",respData.data);
        setCategory(respData.data.docs);
        setTotalRecords(respData.data.total);
    }

    const getTenants = async () => {

        const reqdata = {
            pageno: '-1',
            query: { status: 'Active' }
        }

        const Response = await GetAllTenants(reqdata)
        let counter = 0;
        const rowdata = [];
        await Response.data.reduce(async (promise, res) => {
            await promise;
            const opts = {
                label: res.name,
                value: res.tenantid
            }
            rowdata.push(opts);
            if (counter == Response.data.length - 1) {

                setTenantList(rowdata);
            }
            counter++;
        }, Promise.resolve());

    }

    // console.log(tenantlist);

    const openModal = async (item) => {
        //alert("hi");
        // console.log(item);
        setUpdateData(item);
        setPostModal(true);
    }
    const addModal = async () => {
        // console.log(tenantlist);
        setUpdateData({});
        setPostModal(true);
    }
    const closemodal = async () => {

        // getAllCategory();
        getAllCategory()
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
    const submitForm =async() =>{
       
        const reqparams = {
            pageno: '1',
            query :{
                name : { $regex: categoryname, $options: "i" }
            }
        }
        const respData = await GetCategory(reqparams);
        setCategory(respData.data.docs);
        setTotalRecords(respData.data.total);
    }

    const resetform =async() =>{
        setFromFields(fields);
    }
   

    return (
        <>
            <Col lg={12}>
            {/* <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
                <Accordion.Item key={percent} eventKey={`${percent}`}>
                    <Accordion.Header className="accordion-header">
                        Search
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                        <div className="accordion-body">
                            <div className="row">
                                <div className="form-group mb-3 col-md-6">
                                    <label

                                        htmlFor="val-username"
                                    >
                                        Category Name
                                    </label>
                                    <input component="input"
                                        placeholder="Enter category name"
                                        name="categoryname"
                                        className="form-control"

                                        value={categoryname} maxLength={50} onChange={handleChange1} />


                                </div>




                                <br />
                                <div className="form-group">
                                    <button onClick={submitForm} className="btn btn-primary" type="button"
                                    >Search</button>
                                    <button onClick={resetform} className="btn btn-warning" type="button"
                                    >Reset</button>
                                </div>
                            </div>
                        </div>
                    </Accordion.Collapse>
                </Accordion.Item>

            </Accordion> */}
                <Card>
                    <Card.Header>
                        <Card.Title>Category <Button onClick={() => addModal()}
                            className="me-2" variant="primary btn-square"
                            title="Add Plan Category"
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
                                        <strong>Category Name</strong>
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
                                {category.map(item => (
                                    <tr>
                                        <td>
                                            <strong>{item.displayposition}</strong>
                                        </td>
                                        <td>{item.categoryname}</td>
                                        <td>{displayTenants(item.tenant)}</td>
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
                                            <AddCategory tenantprops={tenantlist} updateprop ={updatedata} /> </Suspense>
                                   

                            </div>
                            {/*<div className="modal-footer">
                              <button type="submit" className="btn btn-primary" >Add</button>  
                              <button type="button" onClick={()=> setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
</div>*/}
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

export default Category