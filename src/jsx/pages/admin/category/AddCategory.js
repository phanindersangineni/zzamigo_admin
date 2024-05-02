import React, { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { ToastContainer, toast } from "react-toastify";
import { SaveCategory, UpdateCategory } from '../../../../services/CommonService';
const AddCategory = ({tenantprops,updateprop}) => {

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
    const options = [
        { label: "tdpyuva", value: "7e71674b" }
    ];

    const fields = {
        displayposition:'',
        categoryname: '',
        status: '',
        tenant:[]
       
    }

    const errors = {
      displayposition:'',
      categoryname:'',
       status: '',
  

    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);

    useEffect(() => {
        //getBanner();
        // console.log(tenantprops);
        if(updateprop?.id){
            setFromFields(updateprop);
            setSelected(updateprop.tenant);
             
            }
    }, []);

    const { displayposition,categoryname,status } = formfields;

    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;

        if (!fields["displayposition"]) {
            formIsValid = false;
            errors["displayposition"] = "*Please display position .";
        }

        if (!fields["categoryname"]) {
            formIsValid = false;
            errors["categoryname"] = "*Please enter category name .";
        }

        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }
      
        setErrorFields(errors)
        return formIsValid;

    }

    const submitForm = async () => {
        // console.log(selected);
        const isValid = await validateForm();
        if (isValid) {
            formfields.tenant =selected;
            if (!formfields.id) {
                //save
                const Response = await SaveCategory(formfields);
                if(Response.data.id){
                    notifyTopFullWidth("Data saved successfully");
                    formfields.id =Response.data.id;
                }

            } else {
                //update
                const Response = await UpdateCategory(formfields);
                if(Response.data.id){
                    notifyTopFullWidth("Data updated successfully");
                    formfields.id =Response.data.id;
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
            <div className="form-group mb-3 row">
                <label
                    className="col-lg-4 col-form-label"
                    htmlFor="val-username"
                >
                    Display position
                </label>
                <div className="col-lg-6">
                <input component="input"
                    placeholder="Display position"
                    name="displayposition"
                    className="form-control"

                    value={displayposition} maxLength={50} onChange={handleChange} />

            </div>
            <div className="errorMsg">{errorFields.displayposition}</div>
            </div>
            <div className="form-group mb-3 row">
                <label
                    className="col-lg-4 col-form-label"
                    htmlFor="val-username"
                >
                    Category Name
                </label>
                <div className="col-lg-6">
                    <input component="input"
                        placeholder="Category name"
                        name="categoryname"
                        className="form-control"
                        value={categoryname} maxLength={50} onChange={handleChange} />

                </div>
                <div className="errorMsg">{errorFields.categoryname}</div>
            </div>
            <div className="form-group mb-3 row">
                <label
                    className="col-lg-4 col-form-label"
                    htmlFor="val-username"
                >
                    Tenants
                </label>
                <div className="col-lg-6">
                    <MultiSelect
                        options={tenantprops}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                    />

                </div>
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
           
            <div className="form-group">
                <button onClick={submitForm} className="btn btn-primary" type="button"
                >Save</button>
            </div>
        </>
    )

}

export default AddCategory