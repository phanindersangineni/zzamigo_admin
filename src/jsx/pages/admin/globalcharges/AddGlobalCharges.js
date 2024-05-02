
import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from "react-toastify";
import { GetAllAreas, SaveAreas, SaveBranches, SaveGlobalCharges, SaveSemisters, SaveSubCategory, UpdateAreas, UpdateBranches, UpdateGlobalCharges, UpdateSemisters, UpdateSubCategory } from '../../../../services/CommonService';

const AddGlobalCharges = ({ updateprop }) => {

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
        chargetype: '',
        title: '',
        description: '',
        amount: '',
        area: '',
        status: '',

    }

    const errors = {
        chargetype: '',
        title: '',
        description: '',
        amount: '',
        area: '',
        status: '',

    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
    const [Areas, setAreas] = useState([])


    useEffect(() => {
        getAreas()
        setFieldData();
    }, []);



    const { status, chargetype, title, description, amount, area, order } = formfields;

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
        setAreas(Response.data)
    }


    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;



        if (!fields["chargetype"]) {
            formIsValid = false;
            errors["chargetype"] = "*Please enter chargetype .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }
        if (!fields["area"]) {
            formIsValid = false;
            errors["area"] = "*Please select area .";
        }
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "*Please enter title .";
        }
        if (!fields["amount"]) {
            formIsValid = false;
            errors["amount"] = "*Please enter amount .";
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
                const Response = await SaveGlobalCharges(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Data saved successfully");
                    formfields.id = Response.data.id;
                }

            } else {
                //update
                const Response = await UpdateGlobalCharges(formfields);
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

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Title
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="title"
                    name="title"
                    className="form-control"

                    value={title} maxLength={50} onChange={handleChange} />

            </div>
            <div className="errorMsg">{errorFields.title}</div>
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Area
            </label>
            <div className="col-lg-6">
                <select className="form-control" name="area"
                    value={area} onChange={handleChange}>
                    <option value=''>Select Area</option>
                    {Areas?.map(item => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.title}
                        </option>
                    ))}
                </select>

            </div>
            <div className="errorMsg">{errorFields.area}</div>
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Chargetype
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="chargetype"
                    name="chargetype"
                    className="form-control"

                    value={chargetype} maxLength={50} onChange={handleChange} />

            </div>
            <div className="errorMsg">{errorFields.chargetype}</div>
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Amount
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="amount"
                    name="amount"
                    className="form-control"

                    value={amount} maxLength={50} onChange={handleChange} />

            </div>
            <div className="errorMsg">{errorFields.amount}</div>
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Description
            </label>
            <div className="col-lg-6">
                <textarea
                    rows={4}
                    className="form-control"
                    name="description"
                    placeholder="description"
                    id="comment"
                    onChange={handleChange}
                    value={description}
                />

            </div>
            <div className="errorMsg">{errorFields.description}</div>
        </div>



        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Status
            </label>
            <div className="col-lg-6">
                <select
                    className="form-control" name='status'
                    onChange={handleChange} value={status}>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

            </div>
            <div className="errorMsg">{errorFields.status}</div>
        </div>



        <br />
        <div className="form-group">
            <button onClick={submitForm} className="btn btn-primary" type="button"
            >Save</button>
        </div>

    </>)

}

export default AddGlobalCharges