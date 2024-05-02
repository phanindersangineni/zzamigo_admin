
import React, { useEffect, useMemo, useState, Suspense, lazy } from 'react';
import { DeleteBannerImage, DeleteSubCategory, GetAllAreas, GetAllBanner, GetAllBranches, GetAllGlobalCharges, GetAllLogos, GetAllSubCategory, GetAllTenants, deletLogoImages, getAllArea } from '../../../../services/CommonService';
import { Badge, Button, Card, Col, Dropdown, Modal, Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "react-js-pagination";
import EventBus from '../../../../services/EventBus';
import AddGlobalCharges from './AddGlobalCharges';

const GlobalCharges = () => {
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
    const [updateitem, setUpdateItem] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0)
    useEffect(() => {
        //getBanner();
        getDatalist();
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
            pageno: pn
        }
        const respData = await GetAllGlobalCharges(reqparams);
        setData(respData.data.docs);
        setTotalRecords(respData.data.total);
    }

    const getDatalist = async () => {
        let reqparams = null;

        reqparams = {
            pageno: '1'
        }
        const respData = await GetAllGlobalCharges(reqparams);
        console.log("respData", respData.data);
        setData(respData?.data?.docs);
        // setTotalRecords(respData.data.total);

    }


    const openModal = async () => {
        setPostModal(true);
    }



    const closemodal = async () => {
        setPostModal(false);
        getDatalist();
    }

    const updateData = async (item) => {

        setUpdateItem(item);
        setPostModal(true);
    }

    const deleteRecord = async (item) => {
        const Response = await DeleteSubCategory(item);
        console.log("Delete resp", Response.data);
        if (Response.data?.id) {
            notifyTopFullWidth("Data deleted successfully");
            getDatalist()
        }


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

                        <Card.Title>GlobalCharges <Button onClick={() => openModal(1, '')}
                            className="me-2" variant="primary btn-square"
                            title="Add GlobalCharges"
                        >
                            <span className="btn-icon-start text-danger">
                                <i className="fa fa-plus color-danger" />
                            </span>
                            ADD
                        </Button>


                        </Card.Title>

                    </Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>

                                    <th>
                                        <strong>Title</strong>
                                    </th>
                                    <th>
                                        <strong>Charge Type</strong>
                                    </th>
                                    <th>
                                        <strong>Amount</strong>
                                    </th>
                                    <th>
                                        <strong>Area</strong>
                                    </th>
                                    <th>
                                        <strong>Status</strong>
                                    </th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map(item => (
                                    <tr>
                                        <td>
                                            <strong>{item.title}</strong>
                                        </td>
                                        <td>{item.chargetype}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.areaname}</td>
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
                                                    <Dropdown.Item onClick={() => updateData(item)}>
                                                        Update

                                                    </Dropdown.Item >
                                                    {/* <Dropdown.Item onClick={() => deleteRecord(item)}>
                                                        Delete

                                                    </Dropdown.Item > */}



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

            <Modal className="modal fade" size="lg" show={postModal} onHide={setPostModal} >
                <div className="" role="document">
                    <div className="">
                        <form >
                            <div className="modal-header">

                                <button type="button" className="btn-close" onClick={closemodal} data-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">

                                <Suspense fallback={<div>Loading</div>}>
                                    {/* <AddSubCategory updateprop={updateitem} /> */}
                                    <AddGlobalCharges updateprop={updateitem} />
                                </Suspense>
                            </div>

                        </form>

                    </div>
                </div>
            </Modal>
        </>
    )

}
export default GlobalCharges