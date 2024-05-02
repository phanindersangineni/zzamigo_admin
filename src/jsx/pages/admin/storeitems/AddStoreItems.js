
import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from "react-toastify";
import { GetAllStores, GetAllSubCategory, SaveAreas, SaveBranches, SaveItems, SaveSemisters, SaveStoreCharges, SaveSubCategory, UpdateAreas, UpdateBranches, UpdateItems, UpdateSemisters, UpdateStoreCharges, UpdateSubCategory } from '../../../../services/CommonService';
import FileBase64 from 'react-file-base64';
import { Accordion, Button, Table } from 'react-bootstrap';
import Addons from './Addons';

const AddStoreItems = ({ updateprop }) => {

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
        name: '',
        status: '',
        description: '',
        originalprice: '',
        offerprice: '',
        subcategoryid: '',
        deliverytime: '',
        foodtype: '',
        addons: [],
        addonpositions: [],
        servingfor: '',
        energy: '',
        image: ''

    }

    const errors = {
        storeid: '',
        status: '',
        name: '',
        description: '',
        originalprice: '',
        offerprice: '',
        subcategoryid: '',


    }

    const fields2 = {
        addonname: '',
        value: '',
        addonstatus: '',
    }

    const [errorFields, setErrorFields] = useState(errors);
    const [formfields, setFromFields] = useState(fields);
    const [filefields, setFileFields] = useState(null);
    const [imageshow, setImageShow] = useState(null);
    const [percent, setPercent] = useState(50);
    const [stores, setstores] = useState([])
    const [subcategory, setSubcategory] = useState([])
    const [morefields, setMoreFields] = useState(fields2)
    const [data, setData] = useState([]);

    useEffect(() => {
        getStores()
        getSubCategory()
        setFieldData();
    }, []);

    const { storeid, status, name, description, originalprice, offerprice, subcategoryid, deliverytime
        , foodtype, servingfor, energy } = formfields;
    const { addonname, value, addonstatus } = morefields;


    const setFieldData = async () => {
        if (updateprop?.id) {
            setFromFields(updateprop);
            setFileFields(updateprop.image)
            setImageShow(true)
            setData(updateprop.addons)


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

    const getSubCategory = async () => {
        const reqparams = {
            pageno: "-1",
            query: { status: "Active" }

        }

        const Response = await GetAllSubCategory(reqparams)
        setSubcategory(Response.data)
    }

    const deleteRow = (index) => {

        const updatedItems = data.filter((_, i) => i !== index);
        setData(updatedItems);
        notifyTopFullWidth("Addon deleted successfully")


    }

    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;



        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter name .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }
        if (!fields["storeid"]) {
            formIsValid = false;
            errors["storeid"] = "*Please select store .";
        }
        if (!fields["subcategoryid"]) {
            formIsValid = false;
            errors["subcategoryid"] = "*Please select subcategoryid .";
        }
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "*Please enter description .";
        }
        if (!fields["originalprice"]) {
            formIsValid = false;
            errors["originalprice"] = "*Please enter originalprice .";
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
        // console.log(formfields);
        const isValid = await validateForm();
        if (isValid) {
            formfields.image = filefields;
            formfields.addons = data;
            if (!formfields.id) {
                //save
                const Response = await SaveItems(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Data saved successfully");
                    formfields.id = Response.data.id;
                }

            } else {
                //update
                const Response = await UpdateItems(formfields);
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

    const handleChange1 = (e) => {
        const { name, value } = e.target;

        setMoreFields((prevState) => ({
            ...prevState,
            [name]: value
        }));

    }

    const submitAddons = async () => {
        setData([...data, morefields])
        setMoreFields(fields2)
        notifyTopFullWidth("addons added successfully")
       
    }


    return (<>
        <div className='row'>

            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Store
                </label>
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

                <div className="errorMsg">{errorFields.name}</div>
            </div>


            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Name
                </label>
                <input component="input"
                    placeholder="item name"
                    name="name"
                    className="form-control"

                    value={name} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.name}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Originalprice
                </label>
                <input component="input"
                    placeholder="originalprice"
                    name="originalprice"
                    className="form-control"

                    value={originalprice} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.originalprice}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Offerprice
                </label>
                <input component="input"
                    placeholder="offerprice"
                    name="offerprice"
                    className="form-control"

                    value={offerprice} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.offerprice}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Deliverytime
                </label>
                <input component="input"
                    placeholder="deliverytime"
                    name="deliverytime"
                    className="form-control"

                    value={deliverytime} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.deliverytime}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label

                >
                    Subcategory
                </label>
                <select className="form-control" name="subcategoryid"
                    value={subcategoryid} onChange={handleChange}>
                    <option value=''>Select Subcategory</option>
                    {subcategory?.map(item => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.subcategoryname}
                        </option>
                    ))}
                </select>

                <div className="errorMsg">{errorFields.name}</div>
            </div>


            <div className="form-group mb-3 col-md-6">
                <label
                >
                    Foodtype
                </label>
                <input component="input"
                    placeholder="foodtype"
                    name="foodtype"
                    className="form-control"

                    value={foodtype} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.foodtype}</div>
            </div>
            <div className="form-group mb-3 col-md-6">
                <label
                >
                    Servingfor
                </label>
                <input component="input"
                    placeholder="servingfor"
                    name="servingfor"
                    className="form-control"

                    value={servingfor} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.servingfor}</div>
            </div>

            <div className="form-group mb-3 col-md-6">
                <label
                >
                    Energy
                </label>
                <input component="input"
                    placeholder="energy"
                    name="energy"
                    className="form-control"

                    value={energy} maxLength={50} onChange={handleChange} />

                <div className="errorMsg">{errorFields.energy}</div>
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

            <div className="form-group mb-3 col-md-6">
                <label
                >
                    Description
                </label>
                <textarea
                    rows={4}
                    className="form-control"
                    name="description"
                    placeholder="description"
                    id="comment"
                    onChange={handleChange}
                    value={description}
                />
                <div className="errorMsg">{errorFields.description}</div>
            </div>

        </div>

        <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
            <Accordion.Item key={percent} eventKey={`${percent}`}>
                <Accordion.Header className="accordion-header">
                    Add Addons
                </Accordion.Header>
                <Accordion.Collapse eventKey={`${percent}`} className="accordion__body">
                    <div className="accordion-body">

                        {/* <Addons/> */}
                        <div className="row">
                            <div className="form-group mb-3 col-md-3">
                                <label>Name</label>
                                <input component="input"
                                    placeholder="name"
                                    name="addonname"
                                    className="form-control"
                                    value={addonname} maxLength={50} onChange={handleChange1} />

                            </div>
                            <div className="form-group mb-3 col-md-3">
                                <label>Value</label>
                                <input component="input"
                                    placeholder="value"
                                    name="value"
                                    className="form-control"
                                    value={value} maxLength={50} onChange={handleChange1} />
                            </div>
                            <div className="form-group mb-3 col-md-3">
                                <label>Status</label>
                                <select
                                    className="form-control" name='addonstatus'
                                    onChange={handleChange1} value={addonstatus}>
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group mb-3 col-md-3">
                                <Button onClick={submitAddons} className="me-2" variant="info">
                                    Save Addons
                                </Button>

                            </div>


                        </div>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>
                                        <strong>Name</strong>
                                    </th>
                                    <th>
                                        <strong>Value</strong>
                                    </th>
                                    <th>
                                        <strong>Status</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item,index) => (
                                    <tr>
                                        <td>
                                            <strong>{item.addonname}</strong>
                                        </td>
                                        <td>{item.value}</td>
                                        <td>{item.addonstatus}</td>
                                        <td>
                                            

                                            <Button onClick={() => deleteRow(index)} className="me-2" variant="danger">
                                                Delete
                                            </Button>

                                        </td>


                                    </tr>
                                ))}

                            </tbody>
                        </Table>

                    </div>
                </Accordion.Collapse>
            </Accordion.Item>

        </Accordion>

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

    </>)

}

export default AddStoreItems