
import React, { useEffect, useState } from 'react';
import { SaveAnnouncement, SaveTenants, UpdateTenants, commonUpdate } from '../../../../services/CommonService';
import '../../../index.css';
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import EventBus from '../../../../services/EventBus';

const AddOtherInfo = ({ dataprops,updateprops }) => {
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
        tenantid:dataprops.tenantid,
        twitterlink:'',
        facebooklink:'',
        contactaddress:'',
        supportemail:'',
        mobilenumber:'',
        copyrights:'',

    }

    const errors = {
        twitterlink:'',
        facebooklink:'',
        contactaddress:'',
        supportemail:'',
        mobilenumber:'',
        copyrights:''


    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFormFields] = useState(fields);
   

    useEffect(() => {
        console.log(dataprops);
        setFieldData();

    }, []);


    const { tenantid,twitterlink,facebooklink,contactaddress,supportemail,mobilenumber,copyrights} = formfields;

    const setFieldData = async () => {
         if(updateprops){
            setFormFields(updateprops);
         }
        
    }

    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;

      
    
        setErrorFields(errors)
        return formIsValid;

    }

    const submitForm = async () => {
        console.log(formfields);
        const isValid = await validateForm();
        if (isValid) {
            formfields.ptype='TENANTOTHERINFO';
            if (!formfields.id) {
                //save
                const Response = await commonUpdate(formfields);
                if (Response.data?.id) {
                    notifyTopFullWidth(" saved sucessfully");
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
                const Response = await commonUpdate(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth(" updated sucessfully");
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
                Twitter Link
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="enter twitter link"
                    name="twitterlink"
                    className="form-control"

                    value={twitterlink} maxLength={1000} onChange={handleChange} />

            </div>
        </div>
        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Facebook Link
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="enter facebook link"
                    name="facebooklink"
                    className="form-control"
                    value={facebooklink} maxLength={1000} onChange={handleChange} />

            </div>
        </div>
        
       

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Contact Address
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="enter contact address"
                    name="contactaddress"
                    className="form-control"
                    value={contactaddress} maxLength={1000} onChange={handleChange} />

            </div>
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Support Email
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="enter support email"
                    name="supportemail"
                    className="form-control"
                    value={supportemail} maxLength={50} onChange={handleChange} />

            </div>
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Mobile Number
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="enter mobile number"
                    name="mobilenumber"
                    className="form-control"
                    value={mobilenumber} maxLength={50} onChange={handleChange} />

            </div>
            
        </div>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Copy rights
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="enter copy rights"
                    name="copyrights"
                    className="form-control"
                    value={copyrights} maxLength={50} onChange={handleChange} />

            </div>
        </div>
       

       
        <br />
      
    
        <div className="form-group">
            <button onClick={submitForm} className="btn btn-primary" type="button"
            >Save</button>
        </div>

    </>)

}

export default AddOtherInfo