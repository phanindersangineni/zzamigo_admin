
import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from "react-toastify";
import { SaveAreas, SaveBranches, SaveSemisters, UpdateAreas, UpdateBranches, UpdateSemisters } from '../../../../services/CommonService';





const AddAreas = ({updateprop }) => {

   
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
        title: '',
        status: '',
     
    }

    const errors = {
        title:'',
       status: '',
  

    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
   

    useEffect(() => {
        setFieldData();


    }, []);



    const { title,status } = formfields;

    const setFieldData = async () => {
         if(updateprop?.id){
         setFromFields(updateprop);
          
         }
    }

  
    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;

      

        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "*Please enter title .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
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
                const Response = await SaveAreas(formfields);
                if(Response.data.id){
                    notifyTopFullWidth("Data saved successfully");
                    formfields.id =Response.data.id;
                }

            } else {
                //update
                const Response = await UpdateAreas(formfields);
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


        <br />

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

export default AddAreas