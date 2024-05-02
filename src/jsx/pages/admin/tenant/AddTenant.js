
import React, { useEffect, useState } from 'react';
import { SaveTenants, UpdateTenants } from '../../../../services/CommonService';
import '../../../index.css';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import EventBus from '../../../../services/EventBus';
import FileBase64 from 'react-file-base64';

const AddTenant = ({ dataprops }) => {
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

    const fields = {
        name: '',
        status: '',
        domain: '',
        type: '',
        tenantid: uuid().slice(0, 8),
        subscriptionallowed: '',
        subscriptionamount: '',
        capturearea: '',
        capturecollege: '',
        offeramount: '',
        capturestate: '',
        tenantemail: '',
        password: '',
        showcourseprice: 'Yes',
        autosubscribe: 'No',
        months: '',
        isacademicsfree: false,
        isstudentprogramfree: false,
        isofflineenrollment: false,
        showdistrict: 'no',
        showcontituencybutton: 'yes',
        singledevice: false,
        androidlink: '',
        ioslink:''


    }

    const errors = {
        name: '',
        status: '',
        domain: '',
        type: '',
        tenantid: '',
        subscriptionallowed: '',
        subscriptionamount: '',
        capturearea: '',
        capturecollege: '',
        offeramount: '',
        capturestate: '',
        tenantemail: '',
        password: '',
        showcourseprice: '',
        autosubscribe: '',
        months: '',
        androidlink: '',
        ioslink:''



    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFormFields] = useState(fields);
    const [checkedOne, setCheckedOne] = useState(false);
    const updateOne = () => setCheckedOne((prev) => !prev);

    const [checkedTwo, setCheckedTwo] = useState(false);
    const updateTwo = () => setCheckedTwo((prev) => !prev);

    const [checkedThree, setCheckedThree] = useState(false);
    const [checkedFour, setCheckedFour] = useState(false);
    const updateThree = () => setCheckedThree((prev) => !prev);
    const updateFour = () => setCheckedFour((prev) => !prev);
    const [filefields, setFileFields] = useState(null);
    const [imageShow, setImageshow] = useState(false);
    const [iosfields,setIosfields]=useState(null);
    const [iosImage,setIosImage]=useState(false)

    useEffect(() => {
        console.log(dataprops);
        setFieldData();

    }, []);


    const { name, status, domain, type, tenantid, subscriptionallowed,
        subscriptionamount, capturearea, capturecollege, offeramount, capturestate, tenantemail, password, showcourseprice,
        autosubscribe, months, isacademicsfree, isstudentprogramfree, showdistrict, showcontituencybutton, androidlink ,ioslink} = formfields;

    const setFieldData = async () => {
        if (dataprops?.id) {

            setFormFields(dataprops);
            setCheckedOne(dataprops.isacademicsfree);
            setCheckedTwo(dataprops.isstudentprogramfree);
            setCheckedThree(dataprops.isofflineenrollment);
            setCheckedFour(dataprops.singledevice);
            setFileFields(dataprops.androidqr);
            setImageshow(true);
            setIosfields(dataprops.iosqr)
            setIosImage(true)
        }
    }

    function handleChangeFile(files) {
        console.log(files);
        setFileFields(files[0]);
        if (files[0].type === 'image/png' || files[0].type === 'image/jpeg' || files[0].type === 'image/jpg') {
            let sz = files[0].size.split(' ');
            if (sz[0] > 200) {
                toast('File size should be below 200 kb', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setFileFields(files[0].base64);
                //setImageShow(files[0].base64);
                setImageshow(true);
            }
        } else {
            toast('Please upload only png or jpg', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        //setFile(event.target.files[0])
    }

    function handleChangeIOSFile(files) {
        console.log(files);
        setIosfields(files[0]);
        if (files[0].type === 'image/png' || files[0].type === 'image/jpeg' || files[0].type === 'image/jpg') {
            let sz = files[0].size.split(' ');
            if (sz[0] > 200) {
                toast('File size should be below 200 kb', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setIosfields(files[0].base64);
                //setImageShow(files[0].base64);
                setIosImage(true);
            }
        } else {
            toast('Please upload only png or jpg', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        //setFile(event.target.files[0])
    }

    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter tenant name .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status either active or inactive.";
        }
        if (!fields["tenantemail"]) {
            formIsValid = false;
            errors["tenantemail"] = "*Please select tenant login email";
        }

        if (!fields["password"] && !dataprops?.id) {
            formIsValid = false;
            errors["password"] = "*Please select tenant login password";
        }

        setErrorFields(errors)
        return formIsValid;

    }

    const submitForm = async () => {
        console.log(formfields);
        const isValid = await validateForm();
        if (isValid) {
            if (!formfields.id) {
                //save
                const Response = await SaveTenants(formfields);
                if (Response.data?.id) {
                    notifyTopFullWidth("Tenant saved sucessfully");
                    formfields.id = Response.data.id;
                    formfields.tenantid = Response.data.tenantid
                    EventBus.dispatch("tenantSave", {
                        message: 'Y'
                    });
                } else {
                    notifyTopFullWidth("Failed to save tenant");
                }


            } else {
                //update
                const Response = await UpdateTenants(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Tenant updated sucessfully");
                    formfields.id = Response.data.id;
                    EventBus.dispatch("tenantSave", {
                        message: 'Y'
                    });
                } else {
                    notifyTopFullWidth("Failed to update tenant");
                }
            }

        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields((prevState) => ({
            ...prevState,
            [name]: value,
        }))
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
        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Tenant Name
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="enter tenant name"
                    name="name"
                    className="form-control"

                    value={name} maxLength={50} onChange={handleChange} />

            </div>
            <div className="errorMsg">{errorFields.name}</div>
        </div>
        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Status
            </label>
            <div className="col-lg-6" >

                <select
                    value={status} name='status' onChange={handleChange} className="form-control">
                    <option value="">Select below</option>
                    <option value="Active">Active</option>
                    <option value="InActive">Inactive</option>
                </select>

            </div>
            <div className="errorMsg">{errorFields.status}</div>
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Tenant Login Email
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="enter tenant  login email"
                    name="tenantemail"
                    className="form-control"
                    value={tenantemail} maxLength={50} onChange={handleChange} />

            </div>
            <div className="errorMsg">{errorFields.tenantemail}</div>
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Tenant Login Password
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="enter tenant  login password"
                    name="password"
                    className="form-control"
                    value={password} maxLength={50} onChange={handleChange} />

            </div>
            <div className="errorMsg">{errorFields.password}</div>
        </div>
        <div className="form-group">
            <button onClick={submitForm} className="btn btn-primary" type="button"
            >Save</button>
        </div>

    </>)

}

export default AddTenant