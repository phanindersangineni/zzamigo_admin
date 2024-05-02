import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer, toast } from "react-toastify";
import { GetAllAreas, GetCategory, SaveCategory, SaveDrivers, SaveStores, UpdateCategory, UpdateDrivers, UpdateStores } from '../../../../services/CommonService';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import { Accordion } from 'react-bootstrap';
const AddDrivers = ({ tenantprops, updateprop }) => {

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
    const [selected, setSelected] = useState([]);
    const [filefields, setFileFields] = useState(null);
    const [imageshow, setImageShow] = useState(null);
    const options = [
        { label: "tdpyuva", value: "7e71674b" }
    ];

    const fields = {
        displayposition: '',
        status: '',
        stores: [],
        name: '',
        mobileno: '',
        email: '',
        area: "",
        password: '',
        loginstatus: '',
        image: ''



    }

    const errors = {
        displayposition: '',
        categoryname: '',
        status: '',


    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
    const [category, setCategory] = useState([])
    const [storeaddress, setStoreaddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [areas, setAreas] = useState([])
    const [percent, setPercent] = useState(50);

    useEffect(() => {
        //getBanner();
        getAreas()
        if (updateprop?.id) {
            // console.log("updateprop",updateprop);
            setFromFields(updateprop);
            setSelected(updateprop.stores);
            setFileFields(updateprop.image)
            setImageShow(true)

        }
    }, []);

    const { displayposition, status, name,
        mobileno, email,  password, area, loginstatus } = formfields;

    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;

        if (!fields["displayposition"]) {
            formIsValid = false;
            errors["displayposition"] = "*Please display position .";
        }

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter Driver name .";
        }

        if (!fields["mobileno"]) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter mobileno .";
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter email .";
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter password .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }
        if (!fields["area"]) {
            formIsValid = false;
            errors["area"] = "*Please select area .";
        }

        setErrorFields(errors)
        return formIsValid;

    }
    const getAreas = async () => {
        const reqparams = {
            pageno: '-1',
            query: { status: "Active" }
        }
        const ResponseData = await GetAllAreas(reqparams)
        // console.log("ResponseData",ResponseData);
        setAreas(ResponseData?.data)
    }

    const submitForm = async () => {
        const isValid = await validateForm();
        if (isValid) {
            formfields.stores = selected;
            formfields.image = filefields;
            // console.log("formfields final", formfields);
            if (!formfields.id) {
                //save
                const Response = await SaveDrivers(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Data saved successfully");
                    formfields.id = Response.data.id;
                }

            } else {
                //update
                const Response = await UpdateDrivers(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Data updated successfully");
                    formfields.id = Response.data.id;
                }
            }

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
                setImageShow(true);
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


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFromFields((prevState) => ({
            ...prevState,
            [name]: value
        }));

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

            <div className='row'>
                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Display position
                    </label>
                    <input component="input"
                        placeholder="Display position"
                        name="displayposition"
                        className="form-control"
                        value={displayposition} maxLength={50} onChange={handleChange} />
                    <div className="errorMsg">{errorFields.displayposition}</div>
                </div>
                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Name
                    </label>
                    <input component="input"
                        placeholder="name"
                        name="name"
                        className="form-control"
                        value={name} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.name}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Mobileno
                    </label>
                    <input component="input"
                        placeholder="mobileno"
                        name="mobileno"
                        className="form-control"
                        value={mobileno} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.mobileno}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Email
                    </label>
                    <input component="input"
                        placeholder="email"
                        name="email"
                        className="form-control"
                        value={email} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.email}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Login Status
                    </label>
                    <select
                        className="form-control" name='loginstatus'
                        onChange={handleChange} value={loginstatus}>
                        <option value="">Login Status</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>

                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Password
                    </label>
                    <input component="input"
                        placeholder="password"
                        name="password"
                        className="form-control"
                        value={password} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.password}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Stores
                    </label>
                    <MultiSelect
                        options={tenantprops}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label>Area</label>
                    <select className="form-control" name="area"
                        value={area} onChange={handleChange}>
                        <option value=''>Select Area</option>
                        {areas?.map(item => (
                            <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.title}
                            </option>
                        ))}
                    </select>
                    <div className="errorMsg">{errorFields.area}</div>
                </div>

                <div className="form-group mb-3 col-md-6">
                    <label
                    >
                        Status
                    </label>
                    <select
                        className="form-control" name='status'
                        onChange={handleChange} value={status}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <div className="errorMsg">{errorFields.status}</div>
                </div>

            </div>

            <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
                <Accordion.Item key={percent} eventKey={`${percent}`}>
                    <Accordion.Header className="accordion-header">
                        Add Image
                    </Accordion.Header>
                    <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                        <div className="accordion-body">

                            <div className="form-group mb-3 row">
                                <label
                                    className="col-lg-4 col-form-label"
                                    htmlFor="val-username"
                                >
                                    Image 
                                </label>
                                <div className="custom-file">
                                    <FileBase64
                                        multiple={true}
                                        onDone={handleChangeFile} />
                                </div>
                                <div className="errorMsg">{errorFields.base64}</div>
                            </div>

                            {imageshow && <> <div className="form-group mb-3 row">
                                <label
                                    className="col-lg-4 col-form-label"
                                    htmlFor="val-username"
                                >
                                    Uploaded Image
                                </label>
                                <img src={filefields} alt="Red dot" />

                            </div> </>}

                        </div>
                    </Accordion.Collapse>
                </Accordion.Item>

            </Accordion>

            <div className="form-group">
                <button onClick={submitForm} className="btn btn-primary" type="button"
                >Save</button>
            </div>
        </>
    )

}

export default AddDrivers