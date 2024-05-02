
import React, { useEffect, useMemo, useState, Suspense, lazy } from 'react';
import { DeleteBannerImage, GetAllBanner, GetAllTenants } from '../../../../services/CommonService';
import { Badge, Button, Card, Col, Dropdown, Modal, Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "react-js-pagination";
import EventBus from '../../../../services/EventBus';

const AddBanner = lazy(() => import('./AddBanner'));
const Banner = () => {
    const notifyTopFullWidth = (message) => {
        toast.info(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const [postModal, setPostModal] = useState(false);
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
    const [data, setData] = useState([]);
    const [tenantid, setTenantId] = useState(null);
    const [tenantlist, setTenantList] = useState([]);
    const [tenantdata, setTenantData] = useState({});
    const [updateitem, setUpdateItem] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [strtype,setStrType] =useState([]);
    const [subapptypeid,setSubapptypeid] =useState(null);
    
    useEffect(() => {
        //getBanner();
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
            pageno: pn,
            query :{tenantid: tenantid }
        }
        const respData = await GetAllBanner(reqparams);
        setData(respData.data.docs);
        setTotalRecords(respData.data.totalDocs);
    }

    const getBanner = async (tenantid) => {
        let reqparams = null;

        if (tenantid == null) {
            reqparams = {
                pageno: '1'
            }
        } else {
            reqparams = {
                pageno: '1',
                query :{tenantid: tenantid }
            }
        }
        const respData = await GetAllBanner(reqparams);
        // console.log("respData.data.docs",respData.data.docs);
        setData(respData.data.docs);
        setTotalRecords(respData.data.totalDocs);

    }

    const getTenants = async () => {
        const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));
        if(constuserdetails.roles[0] =='ROLE_ADMIN'){
          
        
        const Response = await GetAllTenants({ pageno: -1,status:'Active' })
        setTenantList(Response.data);
        }else{
            const Response = await GetAllTenants({ pageno: -1,status:'Active',query: { tenantid: constuserdetails.user.tenantid }})  
            setTenantList(Response.data);
        }
    }

    const openModal = async () => {
        setUpdateItem({});
        if (tenantid == null) {
            notifyTopFullWidth("Please choose the tenant");
        } else {
            setPostModal(true);
        }
    }

    const deleteBanner = async (item) => {
        const Response = await DeleteBannerImage(item);
        if (Response.data.id) {
            notifyTopFullWidth("Record deleted successfully");
            getBanner(tenantid,subapptypeid);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const tenantdata = tenantlist.filter(t => t.tenantid == value);

        setTenantData(tenantdata[0]);
        setTenantId(value);
        getBanner(value,null);

    }

    const handleChange1 = (e) => {
        const { name, value } = e.target;
         setSubapptypeid(value);
         getBanner(tenantid,value);

    }

   

    const closemodal = async () => {

        getBanner(tenantid);
        setPostModal(false);
    }

    const updateBanner = async (item) => {

        setUpdateItem(item);
        setPostModal(true);
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Col lg={12}>
                <Card>
                    <Card.Header>

                        <Card.Title>Banner <Button onClick={() => openModal(1, '')}
                            className="me-2" variant="primary btn-square"
                            title="Add Banner"
                        >
                            <span className="btn-icon-start text-danger">
                                <i className="fa fa-plus color-danger" />
                            </span>
                            ADD
                        </Button>


                        </Card.Title>
                        <div className="col-lg-3">
                            <select className="form-control" name="tenant"
                                value={tenantid} onChange={handleChange}>
                                <option value=''>Select Tenant</option>
                                {tenantlist.map(item => (
                                    <option
                                        key={item.tenantid}
                                        value={item.tenantid}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="width80">
                                        <strong>Display Order</strong>
                                    </th>
                                    <th>
                                        <strong>Image</strong>
                                    </th>
                                    <th>
                                        <strong>Status</strong>
                                    </th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(item => (
                                    <tr>
                                        <td>
                                            <strong>{item.position}</strong>
                                        </td>
                                        <td>
                                            <img style={{ "height": "100px" }}
                                             src={item.image} alt="Red dot" />
                                        </td>
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
                                                    <Dropdown.Item onClick={() => updateBanner(item)}>
                                                            Update
                                                    
                                                    </Dropdown.Item >

                                                  {/*  <Dropdown.Item>
                                                        <Link to={"#"} onClick={() => deleteBanner(item)}>
                                                            Delete
                                                        </Link>

                                </Dropdown.Item >*/}

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

            <Modal className="modal fade" size="m" show={postModal} onHide={setPostModal} >
                <div className="" role="document">
                    <div className="">
                        <form >
                            <div className="modal-header">

                                <button type="button" className="btn-close" onClick={closemodal} data-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">

                                <Suspense fallback={<div>Loading</div>}>
                                    <AddBanner tenantprop={tenantdata} updateprop={updateitem} /> </Suspense>
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
export default Banner