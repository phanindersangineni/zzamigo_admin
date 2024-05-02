
import React, { useEffect, useMemo, useState, Suspense, lazy } from 'react';
import { Accordion, Badge, Button, Card, Col, Dropdown, Modal, Table } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "react-js-pagination";

import { GetAllAcademicsTypes, GetAllBranches, GetAllSemisters, GetAllTenants, GetAllUsersData, commonGet, 
 deleteAccesstokenData, generateResume, reactivateAccountData } from '../../../services/CommonService';
import EventBus from '../../../services/EventBus';
import { CSVLink, CSVDownload } from "react-csv";

import { Deleteuserfromadmin } from '../../../services/CommonService';


const TenantUsers = ({tenantid,role,tenantlist}) => {
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
    const [modaltype, setModalType] = useState(0);
    
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

    const [tenantdata, setTenantData] = useState({});
    const [updateitem, setUpdateItem] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [username, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobilenumber, setMobilenumber] = useState(null);
    const [searchfields, setSearchfields] = useState(null);
    const[candidatelist,setCandidateList] =useState([]);
    const [csvdata,setCsvData] =useState([]);
    const [isAdmin,setIsAdmin] =useState(true);
    useEffect(() => {
        //getBanner();
        loadMasterdata();
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

    const searchData = async (pn, searchfields) => {
        setSearchfields(searchfields);
        let defaulttenantid ='526daf25';
        if(tenantid ==undefined) {
           searchfields.searchtenantid =defaulttenantid;
       }
       
        const reqparams = {
            pageno: pn,
            query: { }
        }

        if (searchfields != null) {
            reqparams.searchfields = searchfields;
        }

        if (username != null) {
            reqparams.query.username = { '$regex': username, '$options': 'i' };
        }

        const respData = await GetAllUsersData(reqparams);
        setData(respData.data.docs);
        setTotalRecords(respData.data.totalDocs);
    }

    const loadData = async (pn) => {
       
        const reqparams = {
            pageno: pn,
            query: { tenantid:localStorage.getItem('tenantidsearch') }
        }

        if (searchfields != null) {
            reqparams.searchfields = searchfields;
        }

        if (username != null) {
            reqparams.query.username = { '$regex': username, '$options': 'i' };
        }

        const respData = await GetAllUsersData(reqparams);
        setData(respData.data.docs);
        setTotalRecords(respData.data.totalDocs);
    }

    const getDatalist = async (tenantid) => {
        let reqparams = null;

        if (tenantid == null) {
            reqparams = {
                pageno: '1'
            }
        } else {
            reqparams = {
                pageno: '1',
                query: { tenantid: tenantid }

            }
        }
        const respData = await GetAllUsersData(reqparams);
        
        setData(respData.data.docs);
        setTotalRecords(respData.data.totalDocs);

    }

 

    const openModal = async (type) => {

        if (tenantid == null) {
            notifyTopFullWidth("Please choose the tenant");
        } else {
            setModalType(type);
            setUpdateItem({});
            setPostModal(true);
        }
    }


    const handleNameChange = (e) => {
        const { name, value } = e.target;


        if (value.length >= 10) {
            setUserName(value);
            getDatalistbyname(value);
            candidatedatalist(tenantid,null);
        } if (value.length == 0) {
            setUserName(null);
            console.log(tenantid);
            getDatalist(tenantid);
            candidatedatalist(tenantid,null);
        }
        else {
            setUserName(value);
        }


    }

    const getDatalistbyname = async (name) => {
        let reqparams = null;
        console.log(username);

        if (tenantid == null) {
            notifyTopFullWidth("Please choose tenant id");
        } else {

            reqparams = {
                pageno: '1',
                query: { tenantid: tenantid }

            }
            if (username != null) {
                reqparams.query.username = { '$regex': name, '$options': 'i' };
            }


        }
        const respData = await GetAllUsersData(reqparams);
        setData(respData.data.docs);
        setTotalRecords(respData.data.totalDocs);

    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        
        const tenantdata = tenantlist.filter(t => t.tenantid == value);

        setTenantData(tenantdata[0]);
       
        getDatalist(value);

        localStorage.setItem('tenantidsearch',value);

      
        candidatedatalist(value,null);
        

    }
    const closemodal = async () => {

        getDatalist(tenantid);
        setPostModal(false);
    }

    const viewprofile = async (item) => {
        setModalType(3);
        setUpdateItem(item);
        setPostModal(true);
    }

 


    const sendresume = async (item) => {

        const reqdata = {
            userid: item.id
        }

        const resData = await generateResume(reqdata);
        notifyTopFullWidth("resume mailed successfully");
    }

    const [percent, setPercent] = useState(50);

    const fields = {
        branch: '',
        branchname: '',
        frommarks: '',
        tomarks: '',
        skills: '',
        certification: '',
        semister: '',
        semistername: '',
        academictype: '',
        yearname: '',
        criteria: '',
        searchtenantid:''

    }
    const [formfields, setFromFields] = useState(fields);
    const [semsisterdata, setSemisterData] = useState([]);
    const [branchdata, setBranchData] = useState([]);
    const [academictypes, setAcademictypes] = useState([]);
    const [stskills, setSkills] = useState([]);
    const { branch, semister, academictype, frommarks, tomarks, skills, certification, criteria,searchtenantid } = formfields;


    const loadMasterdata = async () => {
        const constuserdetails = JSON.parse(localStorage.getItem('userDetails'));
       
        if(constuserdetails !=null){
        const reqparams1 = {
            pageno: '-1',
            query: { status: 'Active' },
            ptype: 'SKILLS'

        }
        //settypesList(dataResponse.data);
        const SemisterResponse = await GetAllSemisters(reqparams1);
        const BranchResponse = await GetAllBranches(reqparams1);
        const AcademicResponse = await GetAllAcademicsTypes(reqparams1);
        const skillsResponse = await commonGet(reqparams1);
        setSemisterData(SemisterResponse.data);
        setBranchData(BranchResponse.data);
        setAcademictypes(AcademicResponse.data);
        setSkills(skillsResponse.data);

    }

    }


    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;
        // setErrorFields(errors)
        return formIsValid;

    }

    const resetform = async () => {
        setFromFields(fields);
    }

    const submitForm = async () => {
        //  console.log(formfields);
        const isValid = await validateForm();

        if (formfields.criteria != '' || formfields.branch == '' || formfields.semister == '' || formfields.academictype == ''
            || formfields.frommarks == '' || formfields.tomarks == '') {
            notifyTopFullWidth("please choose atleast one search criteria");
        } else {
            searchData(1, formfields);
            candidatedatalist( tenantid,formfields);
        }

    }

    const handleChange1 = (e) => {
        const { name, value } = e.target;

        setFromFields((prevState) => ({
            ...prevState,
            [name]: value
        }));


    }

    const candidatedatalist =async(tenantid,formfields) =>{

        if(tenantid ==null){
            tenantid ='526daf25';
        }
       
        const reqparams = {
            pageno: -1,
            query: { tenantid: tenantid }
        }

        if (searchfields != null) {
            reqparams.searchfields = formfields;
        }

        if (username != null) {
            reqparams.query.username = { '$regex': username, '$options': 'i' };
        }

        const candidateResponse = await GetAllUsersData(reqparams);

         const exeldata =[];
         
         let counter =0;
        await candidateResponse.data.reduce(async (promise, res) => {
            await promise;

            const semisters = semsisterdata.filter(t => t.id == res.id);
            const branches = branchdata.filter(t => t.id == res.id);
            const academicstypes = academictypes.filter(t=>t.id==res.id);
   

            const singledata ={
                candidatename:res.name,
                candidatemail:res.email,
                candidatemobile:res.mobileno,
                avgmarks:res.avgmarks,
                iscertified:res.iscertified,
                semister:semisters[0]?.name,
                branch:branches[0]?.name,
                btechyear:academicstypes[0]?.name,
                skills :skills.toString()

            }

            let usercertficates ='';
            let checkcounter =0;
          
           
            await res.certificates?.reduce(async (promise, res4) => {
                await promise;
              
                if(usercertficates ==''){
                    usercertficates =res4.name
                }else{
                    usercertficates = usercertficates +","+res4.name;

                }
                if(checkcounter ==res.certificates.length -1){
                singledata.certificates =usercertficates;
                }
                checkcounter++;

            }, Promise.resolve());
        

            exeldata.push(singledata);
            console.log(singledata);
            if(counter == candidateResponse.data.length-1){
               console.log(exeldata);
                setCsvData(exeldata);
               // return exeldata;
            }

        counter ++;

        }, Promise.resolve());

        

    }

    const headers = [
        { label: "Candidate Name", key: "candidatename" },
        { label: "Email", key: "candidatemail" },
        { label: "Mobile number", key: "candidatemobileno" },
        { label: "Branch", key: "branch" },
        { label: "Year", key: "btechyear" },
        { label: "Semister", key: "semister" },
        { label: "Semister Marks", key: "semistermarks" },
        { label: "Avg Marks", key: "avgmarks" },
        { label: "Skills", key: "skills" },
        { label: "Is Certified", key: "iscertified" },
        { label: "Certificates", key: "certificates" }
     
      ];

     
const deleteThisUser =async (item)=>{

    const reqdata ={
        userid: item.id
    }
    const resData = await deleteAccesstokenData(reqdata);
    if(resData.message =='SUCCESS'){
        const reqParams={
            pageno:'-1',
            query:{userid:item.id}
        }
        console.log(item, "check item data")
      const response = await Deleteuserfromadmin(reqParams)
    
    notifyTopFullWidth("User deleted successfully");
    }
    
 /*   const reqParams={
        pageno:'-1',
        query:{userid:item.id}
    }
    console.log(item, "check item data")
  const response = await Deleteuserfromadmin(reqParams)*/

  //console.log(response, "check response")

  loadData()
}



    return (<>
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
            <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
                <Accordion.Item key={percent} eventKey={`${percent}`}>
                    <Accordion.Header className="accordion-header">
                        Search Candidates
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                        <div className="accordion-body">
                            <div className="row">
                                <div className="form-group mb-3 col-md-3">
                                    <label

                                        htmlFor="val-username"
                                    >
                                        Branch
                                    </label>
                                    <select className="form-control" name="branch"
                                        value={branch} onChange={handleChange1}>
                                        <option value=''>Select</option>
                                        {branchdata.map(item => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>


                                </div>


                                <div className="form-group mb-3 col-md-3">
                                    <label

                                        htmlFor="val-username"
                                    >
                                        Academic Year
                                    </label>

                                    <select className="form-control" name="academictype"
                                        value={academictype} onChange={handleChange1}>
                                        <option value=''>Select</option>
                                        {academictypes.map(item => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>


                                </div>

                                <div className="form-group mb-3 col-md-3">
                                    <label

                                        htmlFor="val-username"
                                    >
                                        Semister
                                    </label>
                                    <div >
                                        <select className="form-control" name="semister"
                                            value={semister} onChange={handleChange1}>
                                            <option value=''>Select</option>
                                            {semsisterdata.map(item => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                </div>


                                <div className="form-group mb-3 col-md-3">
                                    <label
                                        htmlFor="val-username"
                                    >
                                        Marks From (%)
                                    </label>

                                    <input component="input"
                                        placeholder="Marks From "
                                        name="frommarks"
                                        className="form-control"

                                        value={frommarks} maxLength={50} onChange={handleChange1} />


                                </div>


                                <div className="form-group mb-3 col-md-3">
                                    <label

                                        htmlFor="val-username"
                                    >
                                        Marks To (%)
                                    </label>

                                    <input component="input"
                                        placeholder="To Marks"
                                        name="tomarks"
                                        className="form-control"

                                        value={tomarks} maxLength={50} onChange={handleChange1} />


                                </div>


                                <br />

                                <div className="form-group mb-3 col-md-3">
                                    <label

                                        htmlFor="val-username"
                                    >
                                        Skills
                                    </label>

                                    <select className="form-control" name="skills"
                                        value={skills} onChange={handleChange1}>
                                        <option value=''>Select</option>
                                        {stskills.map(item => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>


                                </div>

                                <div className="form-group mb-3 col-md-3">
                                    <label

                                        htmlFor="val-username"
                                    >
                                        IS Certifications
                                    </label>

                                    <select
                                        className="form-control" name='certification'
                                        onChange={handleChange1} value={certification}>
                                        <option value="">Select </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>



                                </div>

                                <div className="form-group mb-3 col-md-3">
                                    <label

                                        htmlFor="val-username"
                                    >
                                        Marks Criteria
                                    </label>

                                    <select
                                        className="form-control" name='criteria'
                                        onChange={handleChange1} value={criteria}>
                                        <option value="">Select </option>
                                        <option value="1">Average of all sems</option>
                                        <option value="2">Between marks from and to</option>
                                        <option value="3">Above </option>
                                    </select>



                                </div>
                                {role =='ROLE_ADMIN'  && <>   <div className="form-group mb-3 col-md-3">
                                    <label

                                        htmlFor="val-username"
                                    >
                                        Tenant
                                    </label>
                                    <div >
                                    <select className="form-control" value={searchtenantid} name ={searchtenantid} onChange={handleChange}>
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
                                </div> </>}



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

            </Accordion>
            <Card>
                <Card.Header>

                    <Card.Title>All Candidates
                      &nbsp; <u> <CSVLink
                            filename="all_Candidates_list"
                            data={csvdata}
                            headers={headers}>
                            Download Candidates
                        </CSVLink> </u>


                    </Card.Title>
                 



                </Card.Header>
                <Card.Body>
                    <Table responsive>
                        <thead>
                            <tr>

                                <th>
                                    <strong>User Name</strong>
                                </th>
                                <th>
                                    <strong>Email</strong>
                                </th>
                                <th>
                                    <strong>Mobile Number</strong>
                                </th>

                                <th>
                                    <strong>Is  Certified</strong>
                                </th>

                                <th>
                                    <strong>Skills</strong>
                                </th>

                              


                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr>
                                    <td>
                                        <strong>{item.name}</strong>
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.iscertified}</td>
                                    <td>{item?.skillnames?.toString()}</td>
                                  
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="success"
                                                className="light sharp i-false"
                                            >
                                                {svg1}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              

                                                <Dropdown.Item onClick={() => viewprofile(item)}>
                                                    View Profile

                                                </Dropdown.Item >


                                                <Dropdown.Item onClick={() => sendresume(item)}>
                                                    Send Resume

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

                            {/* <Suspense fallback={<div>Loading</div>}>
                                {modaltype == 1 && <>
                                    <ChangeProgram userprops={updateitem} />
                                </>}
                                {modaltype == 2 && <>
                                    <UserSubscription userprops={updateitem} />
                                </>}

                                {modaltype == 3 && <>
                                    <ViewProfile userprops={updateitem} />
                                </>}

                                {modaltype == 4 && <>
                                    <UserSearch />
                                </>}
             


                            </Suspense> */}
                        </div>
                        {/*<div className="modal-footer">
                              <button type="submit" className="btn btn-primary" >Add</button>  
                              <button type="button" onClick={()=> setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
</div>*/}
                    </form>

                </div>
            </div>
        </Modal>

    </>)
}
export default TenantUsers;