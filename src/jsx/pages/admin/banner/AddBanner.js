
import React, { useEffect, useState } from 'react';
import { SaveBanner, UpdateBanner } from '../../../../services/CommonService';
import { ToastContainer, toast } from "react-toastify";
import FileBase64 from 'react-file-base64';




const AddBanner = ({ tenantprop,updateprop }) => {

    const [filefields, setFileFields] = useState(null);
   
    const [strtype,setStrType] =useState([]);

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
        position: '',
        status: '',
        base64: '',
        tenantid: tenantprop.tenantid,
        tenant: tenantprop,
     

    }

    const errors = {
        position: '',
        status: '',
        base64: '',

    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
    const [item, setItemList] = useState([]);
    const [imageShow, setImageshow] = useState(false);

    useEffect(() => {
        setFieldData();


    }, []);



    const { bannertype, position, status, base64,subapplicationid ,subapplicationname} = formfields;


    const setFieldData = async () => {
         if(updateprop?.id){
         setFromFields(updateprop);
         setFileFields(updateprop.image);
         setImageshow(true);
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

    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;

      

        if (!fields["position"]) {
            formIsValid = false;
            errors["position"] = "*Please select display position .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }
        if(filefields ==null){
            errors["base64"] = "*Please choose banner file .";  
        }

        setErrorFields(errors)
        return formIsValid;

    }

    const submitForm = async () => {
        console.log(formfields);
        const isValid = await validateForm();
        if (isValid) {
            formfields.image =filefields;
            if (!formfields.id) {
                //save
                const Response = await SaveBanner(formfields);
                if(Response.data.id){
                    notifyTopFullWidth("Banner saved successfully");
                    formfields.id =Response.data.id;
                }

            } else {
                //update
                const Response = await UpdateBanner(formfields);
                if(Response.data.id){
                    notifyTopFullWidth("Banner updated successfully");
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
                <b> {tenantprop.name} </b>

            </div>
        </div>


        <br />

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Position
            </label>
            <div className="col-lg-6">
                <input component="input"
                    placeholder="Display Order"
                    name="position"
                    className="form-control"

                    value={position} maxLength={50} onChange={handleChange} />

            </div>
            <div className="errorMsg">{errorFields.position}</div>
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
        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Banner Image (1020w * 680h)
            </label>
            <div className="custom-file">
                <FileBase64
                    multiple={true}
                    onDone={handleChangeFile} />
            </div>
            <div className="errorMsg">{errorFields.base64}</div>
        </div>

        <br />
     {imageShow &&  <> <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Uploaded Banner
            </label>
            <img src={filefields} alt="Red dot" />
            
        </div> </>}
        <br />
        <div className="form-group">
            <button onClick={submitForm} className="btn btn-primary" type="button"
            >Save</button>
        </div>

    </>)

}

export default AddBanner