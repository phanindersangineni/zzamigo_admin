

import React, { useEffect, useState } from 'react';
import loadable from "@loadable/component";


import { GetAllTenants } from '../../../services/CommonService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';


import { Row, Col, Card } from "react-bootstrap";
import pMinDelay from 'p-min-delay';
//import UserChart from './UserChart';


const Home = () => {
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
    const [value, setValue] = useState('');
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: [] }],
            [{ font: [] }],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: ["red", "#785412"] }],
            [{ background: ["red", "#785412"] }]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align",
        "size",
        "font"
    ];
    const [tenantlist, setTenantList] = useState([]);
    const [tenantid, setTenantId] = useState(null);
    const [smscontent, setSmsContent] = useState(null);
    const [introcontent, setIntroContent] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [role, setRole] = useState(null);
    useEffect(() => {
        //getBanner();
        getTenants();

    }, []);

    const getTenants = async () => {
        const constuserdetails =  await JSON.parse(localStorage.getItem('userDetails'));
        if(constuserdetails !=null){
        setRole(constuserdetails.roles[0]);
        if (constuserdetails.roles[0] == 'ROLE_ADMIN') {

            setIsAdmin(true);
            const Response = await GetAllTenants({ pageno: -1, status: 'Active' })
            setTenantList(Response.data);
            
        } else {
            const Response = await GetAllTenants({ pageno: -1, status: 'Active', query: { tenantid: constuserdetails.user.tenantid } })
            setIsAdmin(false);
            setTenantList(Response.data);
        }
    }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTenantId(value);

    }
    const [tenantsmsid, setTenantSmsID] = useState(null);
    const [smstext, setSMStext] = useState(null);

    const handleChangeSMS = (e) => {
        const { name, value } = e.target;
        setTenantSmsID(value);

    }

    // const sendSMS = async () => {
    //     if (tenantsmsid == null) {
    //         notifyTopFullWidth("Please choose tenant");
    //     } else if (smstext == null) {
    //         notifyTopFullWidth("Please enter smstext");
    //     }
    //     else {
    //         const reqdata = {
    //             tenantid: tenantsmsid,
    //             message: smstext,
    //             reqtype: 'SMS'

    //         }

    //         const resData = await genericmessage(reqdata);
    //         if (resData.message == 'SUCCESS') {
    //             notifyTopFullWidth("push notification successful ");
    //         } else {
    //             notifyTopFullWidth("Failed to notify");
    //         }

    //     }
    // }


    const [tenantpushid, setTenantpushID] = useState(null);
    const [pushtext, setpushtext] = useState(null);
    const [pushsubject, setPushsubject] = useState(null);

    const handleChangePush = (e) => {
        const { name, value } = e.target;
        setTenantpushID(value);

    }

    // const sendPushnotification = async () => {
    //     if (tenantpushid == null) {
    //         notifyTopFullWidth("Please choose tenant");
    //     } else if (pushtext == null) {
    //         notifyTopFullWidth("Please enter text");
    //     }
    //     else if (pushsubject == null) {
    //         notifyTopFullWidth("Please title");
    //     }
    //     else {
    //         const reqdata = {
    //             tenantid: tenantpushid,
    //             message: pushtext,
    //             title: pushsubject,
    //             reqtype: 'NOTIFICATIONS'

    //         }

    //         const resData = await genericmessagepushnotification(reqdata);
    //         if (resData.message == 'SUCCESS') {
    //             notifyTopFullWidth("push notification successful ");
    //         } else {
    //             notifyTopFullWidth("Failed to notify");
    //         }

    //     }
    // }

    const [tenantemailid, setTenantemailID] = useState(null);
    const [emailsubject, setEmailSubject] = useState(null);

    const handleChangeEmail = (e) => {
        const { name, value } = e.target;
        setTenantemailID(value);

    }

    // const sendEmail = async () => {
    //     if (tenantemailid == null) {
    //         notifyTopFullWidth("Please choose tenant");
    //     } else if (value == '') {
    //         notifyTopFullWidth("Please enter text");
    //     }
    //     else {
    //         const reqdata = {
    //             tenantid: tenantemailid,
    //             message: value,
    //             reqtype: 'EMAIL',
    //             subject: emailsubject

    //         }

    //         const resData = await genericmessage(reqdata);
    //         if (resData.message == 'SUCCESS') {
    //             notifyTopFullWidth("push notification successful ");
    //         } else {
    //             notifyTopFullWidth("Failed to notify");
    //         }

    //     }
    // }


    const handleProcedureContentChange = (content, delta, source, editor) => {
        setValue(content);
        //let has_attribues = delta.ops[1].attributes || "";
        //console.log(has_attribues);
        //const cursorPosition = e.quill.getSelection().index;
        // this.quill.insertText(cursorPosition, "★");
        //this.quill.setSelection(cursorPosition + 1);
    };


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
             {/* <CountReport tenantid={tenantlist?.tenantid} role={role} /> */}

          {/* <UserChart tenantid={tenantlist?.tenantid} role={role} tenantlist ={tenantlist} /> */}

             {/* <TenantUsers  tenantid={tenantlist?.tenantid} role={role} tenantlist ={tenantlist}/>  */}

    {/* <CourseEnrollment  tenantid={tenantlist?.tenantid} role={role} tenantlist ={tenantlist} /> */}

    {/* <AssessmentResult tenantid={tenantlist?.tenantid} role={role}  tenantlist ={tenantlist} /> */}



            {/* <DoctorDetails/> */}

            {/* <Patients/> */}

            {/* <div className="col-xl-12">
                <div className="card">
                    <div className="card-header d-sm-flex d-block border-0">
                        <div className="me-auto mb-sm-0 mb-4">
                            <h4 className="fs-20 text-black font-w700">Send SMS</h4>



                        </div>
                        <div className="col-xl-6 col-lg-12">
                            <div className="card">

                                <div className="card-body">
                                    <div className="basic-form">
                                        <form onSubmit={(e) => e.preventDefault()}>
                                            <div className="row">
                                                <div className="form-group mb-3 col-md-6">
                                                    <label>Tenant</label>
                                                    <select className="form-control" name="tenantsmsid"
                                                        value={tenantsmsid} onChange={handleChangeSMS}>
                                                        <option value=''>Select Tenant</option>
                                                        {tenantlist?.map(item => (
                                                            <option
                                                                key={item.tenantid}
                                                                value={item.tenantid}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="form-group mb-3 col-md-12">
                                                    <label>SMS Message</label>
                                                    <textarea
                                                        rows={3}
                                                        className="form-control"
                                                        name="smstext"
                                                        placeholder="message"
                                                        id="comment"
                                                        onChange={(e) => setSMStext(e.target.value)}
                                                        value={smstext}
                                                    />
                                                </div>


                                            </div>

                                            <button type="submit" onClick={sendSMS} className="btn btn-primary">
                                                Send Now
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div> */}
            {/* <div className="col-xl-12">
                <div className="card">
                    <div className="card-header d-sm-flex d-block border-0">
                        <div className="me-auto mb-sm-0 mb-4">
                            <h4 className="fs-20 text-black font-w700">Push Notifications</h4>



                        </div>
                        <div className="col-xl-6 col-lg-12">
                            <div className="card">

                                <div className="card-body">
                                    <div className="basic-form">
                                        <form onSubmit={(e) => e.preventDefault()}>
                                            <div className="row">
                                                <div className="form-group mb-3 col-md-6">
                                                    <label>Tenant</label>
                                                    <select className="form-control" name="tenantpushid"
                                                        value={tenantpushid} onChange={handleChangePush}>
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

                                                <div className="form-group mb-3 col-md-6">
                                                    <label>Message Title</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Message Title"
                                                        name={pushsubject}
                                                        value={pushsubject}
                                                        onChange={(e) => setPushsubject(e.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group mb-3 col-md-12">
                                                    <label>Push Message</label>
                                                    <textarea
                                                        rows={3}
                                                        className="form-control"
                                                        name="pushtext"
                                                        placeholder="message"
                                                        id="comment"
                                                        onChange={(e) => setpushtext(e.target.value)}
                                                        value={pushtext}
                                                    />
                                                </div>

                                            </div>

                                            <button type="submit" onClick={sendPushnotification} className="btn btn-primary">
                                                Send Now
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div> */}

            {/* <div className="col-xl-12">
                <div className="card">
                    <div className="card-header d-sm-flex d-block border-0">
                        <div className="me-auto mb-sm-0 mb-4">
                            <h4 className="fs-20 text-black font-w700">Send Email</h4>



                        </div>
                        <div className="col-xl-6 col-lg-12">
                            <div className="card">

                                <div className="card-body">
                                    <div className="basic-form">
                                        <form onSubmit={(e) => e.preventDefault()}>
                                            <div className="row">
                                                <div className="form-group mb-3 col-md-6">
                                                    <label>Tenant</label>
                                                    <select className="form-control" name="tenantemailid"
                                                        value={tenantemailid} onChange={handleChangeEmail}>
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
                                                <div className="form-group mb-3 col-md-6">
                                                    <label>Subject</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Email subject"
                                                        name={emailsubject}
                                                        value={emailsubject}
                                                        onChange={(e) => setEmailSubject(e.target.value)}
                                                    />
                                                </div>

                                                <div className="form-group mb-3 col-md-12">
                                                    <label>Email Message</label>
                                                    <ReactQuill
                                                        theme="snow"
                                                        modules={modules}
                                                        formats={formats}
                                                        value={value}
                                                        onChange={handleProcedureContentChange}
                                                    />
                                                </div>

                                            </div>

                                            <button type="submit" onClick={sendEmail} className="btn btn-primary">
                                                Send Now
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div> */}


        </>
    )



}
export default Home