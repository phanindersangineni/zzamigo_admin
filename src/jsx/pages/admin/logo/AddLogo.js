
import React, { useEffect, useState } from 'react';
import { SaveBanner, SaveLogos, UpdateBanner, UpdateLogos } from '../../../../services/CommonService';
import { ToastContainer, toast } from "react-toastify";
import FileBase64 from 'react-file-base64';
import { Accordion } from 'react-bootstrap';



const AddLogo = ({ tenantprop, updateprop }) => {

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
        largeicon: '',
        smallicon: '',
        favicon: '',
        status: '',
        tenantid: tenantprop.tenantid,
        tenant: tenantprop,
        introcontonent: '',
        webicon: ''

    }

    const errors = {
        status: '',
        introcontonent: ''

    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
    const [item, setItemList] = useState([]);
    const [percent, setPercent] = useState(50);


    useEffect(() => {
        console.log("####");
        console.log(tenantprop);
        console.log(updateprop);
        setFieldData();


    }, []);



    const { introcontonent, position, status, base64 } = formfields;

    const setFieldData = async () => {
        if (updateprop?.id) {
            setFromFields(updateprop);
            setFileFields(updateprop.largeicon);
            setIcon(updateprop.smallicon);
            setWebIcon(updateprop.webicon);
            setFavicon(updateprop.favicon);
            setImageshow(true);
            setIconshow(true);
            setwebIconshow(true);
            setFaviconShow(true);
        }
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



        if (!fields["introcontonent"]) {
            formIsValid = false;
            errors["introcontonent"] = "*Please enter intro content .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }
        if (filefields == null) {
            errors["largeicon"] = "*Please choose logo file .";
        }
        if (iconfields == null) {
            errors["smallicon"] = "*Please choose small icon file .";
        }
        if (favicon == null) {
            errors["favicon"] = "*Please choose logo faveicon file .";
        }
        console.log(errors);
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
                Intro Content
            </label>
            <div className="col-lg-6">

                <textarea
                    rows={8}
                    className="form-control"
                    name="introcontonent"
                    placeholder="Comment"
                    id="comment"
                    onChange={handleChange}
                    value={introcontonent}
                />

            </div>
            <div className="errorMsg">{errorFields.introcontonent}</div>
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


{console.log("webiconfields====",webiconfields)}
        <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
            <Accordion.Item key={percent} eventKey={`${percent}`}>
                <Accordion.Header className="accordion-header">
                    Logo Image Large Icon
                </Accordion.Header>
                <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                    <div className="accordion-body">

                        <div className="form-group mb-3 row">
                            <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-username"
                            >
                                Logo Image (460w * 120h)
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


        <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
            <Accordion.Item key={percent} eventKey={`${percent}`}>
                <Accordion.Header className="accordion-header">
                    Logo Image Small Icon
                </Accordion.Header>
                <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                    <div className="accordion-body">
                        <div className="form-group mb-3 row">
                            <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-username"
                            >
                                Small Icon (392 * 392)
                            </label>
                            <div className="custom-file">
                                <FileBase64
                                    multiple={true}
                                    onDone={handleChangeFileIcon} />
                            </div>
                            <div className="errorMsg">{errorFields.smallicon}</div>
                        </div>

                        <br />
                        {iconshow && <> <div className="form-group mb-3 row">
                            <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-username"
                            >
                                Uploaded Logo
                            </label>
                            <img src={iconfields} alt="Red dot" />

                        </div> </>}

                    </div>
                </Accordion.Collapse>
            </Accordion.Item>

        </Accordion>



        <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
            <Accordion.Item key={percent} eventKey={`${percent}`}>
                <Accordion.Header className="accordion-header">
                    Web Banner Image
                </Accordion.Header>
                <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                    <div className="accordion-body">
                        <div className="form-group mb-3 row">
                            <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-username"
                            >
                                Web Banner
                            </label>
                            <div className="custom-file">
                                <FileBase64
                                    multiple={true}
                                    onDone={handleChangeFilewebIcon} />
                            </div>
                            <div className="errorMsg">{errorFields.webicon}</div>
                        </div>

                        <br />
                        {webiconshow && <> <div className="form-group mb-3 row">
                            <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-username"
                            >
                                Uploaded Logo
                            </label>
                            <img src={webiconfields} alt="Red dot" />

                        </div> </>}

                    </div>
                </Accordion.Collapse>
            </Accordion.Item>

        </Accordion>



        <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
            <Accordion.Item key={percent} eventKey={`${percent}`}>
                <Accordion.Header className="accordion-header">
                    Web Favicon
                </Accordion.Header>
                <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                    <div className="accordion-body">
                        <div className="form-group mb-3 row">
                            <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-username"
                            >
                                Web Favicon
                            </label>
                            <div className="custom-file">
                                <FileBase64
                                    multiple={true}
                                    onDone={handleChangeFileFavicon} />
                            </div>
                            <div className="errorMsg">{errorFields.favicon}</div>
                        </div>

                        <br />
                        {faviconShow && <> <div className="form-group mb-3 row">
                            <label
                                className="col-lg-4 col-form-label"
                                htmlFor="val-username"
                            >
                                Uploaded Favicon
                            </label>
                            <img src={favicon} alt="Red dot" />

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

export default AddLogo