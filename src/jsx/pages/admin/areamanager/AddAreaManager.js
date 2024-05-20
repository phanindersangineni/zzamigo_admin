
import React, { useEffect, useState } from 'react';
import { GetAllAreas, GetAllStores, SaveBanner, SaveLogos, UpdateBanner, UpdateLogos } from '../../../../services/CommonService';
import { ToastContainer, toast } from "react-toastify";
import FileBase64 from 'react-file-base64';
import { Accordion } from 'react-bootstrap';
import { MultiSelect } from "react-multi-select-component";




const AddAreaManager = ({ tenantprop, updateprop }) => {

    const [filefields, setFileFields] = useState(null);
    const [iconfields, setIcon] = useState(null);
    const [webiconfields, setWebIcon] = useState(null);
    const [favicon, setFavicon] = useState(null);
    const [imageshow, setImageshow] = useState(null);
    const [iconshow, setIconshow] = useState(null);
    const [webiconshow, setwebIconshow] = useState(null);
    const [faviconShow, setFaviconShow] = useState(null);
  
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
        stores:[],
        drivers:[],
        status: '',
        area:'',
        name:'',
        mobileno:'',
        email:'',
        areaname:''

    }

    const errors = {
        status: '',
        name: '',
        mobileno:'',
        email:'',
        area:''

    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
    const [item, setItemList] = useState([]);
    const [percent, setPercent] = useState(50);
    const [selected, setSelected] = useState([]);
    const [storesOption,setStoresOption]=useState([])
    const [areaList,setAreaList]=useState([])


    useEffect(() => {
        setFieldData();


    }, []);



    const {  status, base64,area,name,mobileno,email,areaname,stores,drivers } = formfields;

    const setFieldData = async () => {
        if (updateprop?.id) {
            setFromFields(updateprop);
            setFileFields(updateprop.largeicon);
            setImageshow(true);
        
        }

        getallStores()
        getArea()

    }

    const getallStores = async () => {
        const reqparams = {
            pageno: '-1',
            query:{status:"Active"}
        }
        const respData = await GetAllStores(reqparams);
        console.log("respData.data",respData.data);
        let Arr=respData.data.map((item)=>{
            return {
                label:item.name,
                value:item.id
            }
        })
        setStoresOption(Arr)
        // console.log("The new arr is",Arr);
    }


    const getArea = async () => {
        let reqparams = null;
    
        reqparams = {
            pageno: '-1',
            query:{status:"Active"}
          }
        const respData = await GetAllAreas(reqparams);
        console.log("respData area detailks",respData.data); 
        setAreaList(respData.data)
      }

    function handleChangeFileIcon(files) {
        console.log(files);
        setIcon(files[0]);
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
                setIcon(files[0].base64);
                //setImageShow(files[0].base64);
                setIconshow(true);
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

    function handleChangeFilewebIcon(files) {
        console.log(files);
        // setIcon(files[0]);
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
                setWebIcon(files[0].base64);
                //setImageShow(files[0].base64);
                setwebIconshow(true);
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




    function handleChangeFileFavicon(files) {
        console.log(files);
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
                setFavicon(files[0].base64);
                setFaviconShow(true);
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



        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter name .";
        }
        if (!fields["area"]) {
            formIsValid = false;
            errors["area"] = "*Please select area .";
        }
        if (!fields["mobileno"]) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter mobileno .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please select email .";
        }
        
        setErrorFields(errors)
        return formIsValid;

    }

    const submitForm = async () => {
        console.log(formfields);
        const isValid = await validateForm();
        if (isValid) {
            formfields.largeicon = filefields;
            formfields.smallicon = iconfields;
            formfields.webicon = webiconfields;
            formfields.favicon = favicon;
            if (!formfields.id) {
                //save
                const Response = await SaveLogos(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("data saved successfully");
                    formfields.id = Response.data.id;
                }

            } else {
                //update
                const Response = await UpdateLogos(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("data updated successfully");
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
        {/* <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Tenant Name
            </label>
            <div className="col-lg-6">
                <b> {tenantprop.name} </b>

            </div>
        </div> */}


        {/* <br /> */}
        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                Name
            </label>
            <div className="col-lg-6">

            <input component="input"
                        placeholder="name"
                        name="name"
                        className="form-control"
                        value={name} maxLength={500} onChange={handleChange} />


            </div>
            <div className="errorMsg">{errorFields.name}</div>
        </div>
        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
               mobileno
            </label>
            <div className="col-lg-6">

            <input component="input"
                        placeholder="mobileno"
                        name="mobileno"
                        className="form-control"
                        value={mobileno} maxLength={500} onChange={handleChange} />


            </div>
            <div className="errorMsg">{errorFields.mobileno}</div>
        </div>
        <br/>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
               email
            </label>
            <div className="col-lg-6">

            <input component="input"
                        placeholder="email"
                        name="email"
                        className="form-control"
                        value={email} maxLength={500} onChange={handleChange} />


            </div>
            <div className="errorMsg">{errorFields.email}</div>
        </div>
        <br/>

        <div className="form-group mb-3 row">
            <label
                className="col-lg-4 col-form-label"
                htmlFor="val-username"
            >
                area
            </label>
            <div className="col-lg-6">
                <select
                    className="form-control" name='status'
                    onChange={handleChange} value={status}>
                    <option value="">Select Area</option>
                    { areaList.map((item)=>{
                         <option value={item.id}>{item.title}</option>
                    })}
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
                    Stores
                </label>
                <div className="col-lg-6">
                    <MultiSelect
                        options={storesOption}
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


        <br />


        <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
            <Accordion.Item key={percent} eventKey={`${percent}`}>
                <Accordion.Header className="accordion-header">
                    Image 
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
                            <div className="errorMsg">{errorFields.largeicon}</div>
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

    </>)

}

export default AddAreaManager