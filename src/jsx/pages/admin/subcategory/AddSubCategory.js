
import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from "react-toastify";
import { GetAllStores, SaveAreas, SaveBranches, SaveSemisters, SaveSubCategory, UpdateAreas, UpdateBranches, UpdateSemisters, UpdateSubCategory } from '../../../../services/CommonService';

const AddSubCategory = ({ updateprop }) => {

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
        storeid: '',
        subcategoryname: '',
        status: '',

    }

    const errors = {
        storeid: '',
        subcategoryname: '',
        status: '',

    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
    const [stores, setstores] = useState([])


    useEffect(() => {
        getStores()
        setFieldData();
    }, []);



    const { storeid, status, subcategoryname, order } = formfields;

    const setFieldData = async () => {
        if (updateprop?.id) {
            setFromFields(updateprop);

        }
    }

    const getStores = async () => {
        const reqparams = {
            pageno: "-1",
            query: { status: "Active" }

        }

        const Response = await GetAllStores(reqparams)
        setstores(Response.data)
    }


    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;



        if (!fields["subcategoryname"]) {
            formIsValid = false;
            errors["subcategoryname"] = "*Please enter subcategoryname .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }
        if (!fields["storeid"]) {
            formIsValid = false;
            errors["storeid"] = "*Please select store .";
        }


        setErrorFields(errors)
        return formIsValid;

    }

    const submitForm = async () => {
        // console.log(formfields);
        const isValid = await validateForm();
        if (isValid) {
            if (!formfields.id) {
                //save
                const Response = await SaveSubCategory(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Data saved successfully");
                    formfields.id = Response.data.id;
                }

            } else {
                //update
                const Response = await UpdateSubCategory(formfields);
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
                Sub Category Name
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="subcategoryname"
                    name="subcategoryname"
                    className="form-control"

                    value={subcategoryname} maxLength={50} onChange={handleChange} />

            </div>
            <div className="errorMsg">{errorFields.subcategoryname}</div>
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Store
            </label>
            <div className="col-lg-6">
                <select className="form-control" name="storeid"
                    value={storeid} onChange={handleChange}>
                    <option value=''>Select Store</option>
                    {stores?.map(item => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>

            </div>
            <div className="errorMsg">{errorFields.subcategoryname}</div>
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

export default AddSubCategory