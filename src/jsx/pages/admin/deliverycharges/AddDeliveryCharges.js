
import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from "react-toastify";
import { GetAllAreas, GetAllStores, GetAllSubCategory, SaveAreas, SaveBranches, SaveDeliveryCharges, SaveItems, SaveSemisters, SaveStoreCharges, SaveSubCategory, UpdateAreas, UpdateBranches, UpdateDeliveryCharges, UpdateItems, UpdateSemisters, UpdateStoreCharges, UpdateSubCategory } from '../../../../services/CommonService';
import FileBase64 from 'react-file-base64';
import { Accordion } from 'react-bootstrap';

const AddDeliveryCharges = ({ updateprop }) => {

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
        basekm: '',
        basefare: '',
        extrakm: '',
        extrafare: '',
        waittimecharges: '',
        waittime: '',
        surgecharge: '',
        area: '',
        status:''

    }

    const errors = {
        basekm: '',
        basefare: '',
        extrakm: '',
        extrafare: '',
        waittimecharges: '',
        waittime: '',
        surgecharge: '',
        area: '',
        status:''


    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
    const [filefields, setFileFields] = useState(null);
    const [imageshow, setImageShow] = useState(null);
    const [percent, setPercent] = useState(50);
    const [stores, setstores] = useState([])
    const [subcategory, setSubcategory] = useState([])

    useEffect(() => {
        getAreas()
        getSubCategory()
        setFieldData();
    }, []);

    const {  status,
          basekm,basefare ,extrafare,extrakm,waittimecharges,waittime,surgecharge,area} = formfields;

    const setFieldData = async () => {
        if (updateprop?.id) {
            setFromFields(updateprop);


        }
    }

    const getAreas = async () => {
        const reqparams = {
            pageno: "-1",
            query: { status: "Active" }

        }

        const Response = await GetAllAreas(reqparams)
        setstores(Response.data)
    }

    const getSubCategory = async () => {
        const reqparams = {
            pageno: "-1",
            query: { status: "Active" }

        }

        const Response = await GetAllSubCategory(reqparams)
        setSubcategory(Response.data)
    }

    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;



        if (!fields["basekm"]) {
            formIsValid = false;
            errors["basekm"] = "*Please enter basekm .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }
        if (!fields["basefare"]) {
            formIsValid = false;
            errors["basefare"] = "*Please enter basefare .";
        }
        if (!fields["extrakm"]) {
            formIsValid = false;
            errors["extrakm"] = "*Please enter extrakm .";
        }
        if (!fields["waittimecharges"]) {
            formIsValid = false;
            errors["waittimecharges"] = "*Please enter waittimecharges .";
        }
        if (!fields["waittime"]) {
            formIsValid = false;
            errors["waittime"] = "*Please enter waittime .";
        }
        if (!fields["area"]) {
            formIsValid = false;
            errors["area"] = "*Please select area .";
        }

        setErrorFields(errors)
        return formIsValid;

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


    const submitForm = async () => {
       
        const isValid = await validateForm();
        if (isValid) {
            // console.log(formfields);
            if (!formfields.id) {
                //save
                const Response = await SaveDeliveryCharges(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Data saved successfully");
                    formfields.id = Response.data.id;
                }

            } else {
                //update
                const Response = await UpdateDeliveryCharges(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Data updated successfully");
                    formfields.id = Response.data.id;
                }
            }

        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFromFields((prevState) => ({
            ...prevState,
            [name]: value
        }));

    }


    return (<>
        <div className='row'>


            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Basekm
                </label>
                <input component="input"
                    placeholder="basekm"
                    name="basekm"
                    className="form-control"

                    value={basekm} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.basekm}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Area
                </label>
                <select className="form-control" name="area"
                    value={area} onChange={handleChange}>
                    <option value=''>Select Area</option>
                    {stores?.map(item => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.title}
                        </option>
                    ))}
                </select>

                <div className="errorMsg">{errorFields.name}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Basefare
                </label>
                <input component="input"
                    placeholder="basefare"
                    name="basefare"
                    className="form-control"

                    value={basefare} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.basefare}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Extrakm
                </label>
                <input component="input"
                    placeholder="extrakm"
                    name="extrakm"
                    className="form-control"

                    value={extrakm} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.extrakm}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Extrafare
                </label>
                <input component="input"
                    placeholder="extrafare"
                    name="extrafare"
                    className="form-control"

                    value={extrafare} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.extrafare}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label
                >
                    Waittimecharges
                </label>
                <input component="input"
                    placeholder="waittimecharges"
                    name="waittimecharges"
                    className="form-control"

                    value={waittimecharges} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.waittimecharges}</div>
            </div>
            <div className="form-group mb-3 col-md-6">
                <label
                >
                    Wait Time
                </label>
                <input component="input"
                    placeholder="waittime"
                    name="waittime"
                    className="form-control"

                    value={waittime} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.waittime}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label
                >
                    Surge Charge
                </label>
                <input component="input"
                    placeholder="surgecharge"
                    name="surgecharge"
                    className="form-control"

                    value={surgecharge} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.surgecharge}</div>
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

    
        <div className="form-group">
            <button onClick={submitForm} className="btn btn-primary" type="button"
            >Save</button>
        </div>

    </>)

}

export default AddDeliveryCharges