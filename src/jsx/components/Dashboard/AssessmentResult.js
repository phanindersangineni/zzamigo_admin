
import React, { useEffect, useMemo, useState, Suspense, lazy } from 'react';
import { Accordion, Badge, Button, Card, Col, Dropdown, Modal, Table } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "react-js-pagination";

import { GetAllAcademicsTypes, GetAllBranches, GetAllSemisters, GetAllUsersData, commonGet, 
 generateResume, getassessmentreport, getquizresult } from '../../../services/CommonService';

import { CSVLink, CSVDownload } from "react-csv";

import AssessmentResultTable from './AssessmentResultTable';




const AssessmentResult = ({tenantid,role,tenantlist}) => {
    
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
    
    const [searchfields, setSearchfields] = useState(null);
    const[candidatelist,setCandidateList] =useState([]);
    const [csvdata,setCsvData] =useState([]);
    const [isAdmin,setIsAdmin] =useState(true);
    useEffect(() => {
        //getBanner();
      
       
        loadMasterData();
        
    }, []);

   

    const searchData = async (pn, searchfields) => {
        setSearchfields(searchfields);
        let defaulttenantid ='526daf25';
         if(tenantid ==undefined) {
            searchfields.searchtenantid =defaulttenantid;
        }

     
        const reqparams = {
            pageno: pn,
            query: {}
        }

        if (searchfields != null) {
            reqparams.searchfields = searchfields;
        }

       setData([]);
        const respData = await getquizresult(reqparams);
        setData(respData.data);
        setCsvData(respData.data);
    }

 


    const [percent, setPercent] = useState(50);

    const fields = {
        branch: '',
        semister: '',
        academictype: '',
        programname:'',
        searchtenantid:''
    }
    const [formfields, setFromFields] = useState(fields);
    const [semsisterdata, setSemisterData] = useState([]);
    const [branchdata, setBranchData] = useState([]);
    const [academictypes, setAcademictypes] = useState([]);
    const [stskills, setSkills] = useState([]);
    const { branch, semister, academictype, programname,searchtenantid } = formfields;


    const loadMasterData = async () => {
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


    const resetform = async () => {
        setFromFields(fields);
    }

    const submitForm = async () => {
          console.log(formfields);
      
        
            searchData(1, formfields);
            //candidatedatalist( tenantid,formfields);
        

    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFromFields((prevState) => ({
            ...prevState,
            [name]: value
        }));


    }

   

    const headers = [
        { label: "Candidate Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Mobile Number", key: "mobileno" },
        { label: "Course Name", key: "programname" },
        { label: "Course Status", key: "programstatus" },



        { label: "Created Date", key: "createddate" },
        { label: "Total Courses", key: "totalitems" },
        { label: "Total Lesson Count", key: "lessonscount" },
        { label: "Completed Lesson Count", key: "completedlessonscount" },
        { label: "Total Quiz Count", key: "quizcount" },

        { label: "Completed Quiz Count", key: "completedquizcount" },
        { label: "Lesson / Quiz Completion", key: "courseresult" },
        { label: "Over All Course Completion", key: "percentagecompletion" },
        { label: "Assessment Attempts", key: "noofattempts" },
        { label: "Passing Grade", key: "passgrade" },
        { label: "Pass / Fail", key: "pass" },

        { label: "Total Percentage", key: "totalpercentage" },
        { label: "Correct Answers", key: "correctansweredcount" },
        { label: "Wrong Answers", key: "wronganswercount" },

        { label: "Questions Answered", key: "questionanweredcount" },
        { label: "Questions Left", key: "emptycount" },
        
      
      
      ];

     




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
                        Search Assessment Result
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
                                        value={branch} onChange={handleChange}>
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
                                        value={academictype} onChange={handleChange}>
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
                                            value={semister} onChange={handleChange}>
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
                                        Program Name
                                    </label>
                                    <div >
                                    <input component="input"
                                        placeholder="Enter program name"
                                        name="programname"
                                        className="form-control"
                                        value={programname} onChange={handleChange}

                                         maxLength={500}  />

                                    </div>
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

                    <Card.Title> Candidates
                      &nbsp; <u> <CSVLink
                            filename="all_Candidates_list"
                            data={csvdata}
                            headers={headers}>
                            Download  Candidates
                        </CSVLink> </u>


                    </Card.Title>
                 



                </Card.Header>
                <Card.Body>
                <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
                <Accordion.Item key={percent} eventKey={`${percent}`}>
                    <Accordion.Header className="accordion-header">
                     Assessment Candidate Data List
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                        <div className="accordion-body">

                {data.length > 0 &&
				<AssessmentResultTable propdata={data} />
               }
               </div>
                    </Accordion.Collapse>
                </Accordion.Item>

            </Accordion>
			 
                 
                 
                </Card.Body>
            </Card>
        </Col>

      

    </>)
}
export default AssessmentResult;