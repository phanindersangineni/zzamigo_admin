import { Suspense, lazy, useEffect, useState } from "react";
import { Button, Table,Modal } from "react-bootstrap";
import { DeleteAddons, DeleteSections, GetAllAddons, GetSections, SaveAddons, SaveSections, UpdateAddons, UpdateSections } from "../../../../services/CommonService";
import { ToastContainer, toast } from "react-toastify";

const Addons = ({itemprops}) => {

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
        value: '',
        name: '',
        status:'',
        itemid:itemprops.id

    }
    const errors = {
        order: '',
        title: '',
        status:''
    }
    const [formfields, setFromFields] = useState(fields);
    const [errorFields, setErrorFields] = useState(errors);
    const { name, value,status } = formfields;
    const [sectionlist, setSectionList] = useState([]);
    const [postModal, setPostModal] = useState(false);
    const [sectioncontentdata, setSectioncontentData] = useState({});
    

    const [checkedTwo, setCheckedTwo] = useState(false);
    const updateTwo = () => setCheckedTwo((prev) => !prev);

    useEffect(() => {
        getAllSections();
    }, []);

    const getAllSections =async() =>{

        const reqdata = {
            pageno: '-1',
            query: { itemid:itemprops.id}
        }
            console.log("all add ons is",reqdata);
        const Response =await GetAllAddons(reqdata);
        console.log("Addons",Response.data);
        setSectionList(Response.data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromFields((prevState) => ({
            ...prevState,
            [name]: value
        }));

    }

    const validateForm = async () => {
        let fields = formfields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter name  .";
        }

        if (!fields["value"]) {
            formIsValid = false;
            errors["value"] = "*Please enter value  .";
        }
        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "*Please select status .";
        }



        setErrorFields(errors)
        return formIsValid;

    }

    const submitForm = async () => {
        const isValid = await validateForm();
        if (isValid) {
            if (!formfields.id) {
                //save
                const Response = await SaveAddons(formfields);
                console.log("saved addon resp is",Response.data);
                if (Response.data.id) {
                    notifyTopFullWidth("Data saved successfully");
                    getAllSections();
                    setFromFields(fields);
                }

            } else {
                //update
                const Response = await UpdateAddons(formfields);
                if (Response.data.id) {
                    notifyTopFullWidth("Data updated successfully");
                    getAllSections();
                }
            }
        }
    }

    const deleteRecord = async(item) =>{
        const Response = await DeleteAddons(item);
                if (Response.data.id) {
                    notifyTopFullWidth("Data deleted successfully");
                    getAllSections();
                }
    }

    const updateRecord = async(item) =>{
       setFromFields(item);
    }
    const openModal = async (item) => {
        setSectioncontentData(item);
        setPostModal(true);
    }
   
    const closemodal = async () => {
        setPostModal(false);
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
            <div className="row">
                <div className="form-group mb-3 col-md-3">
                    <label>Name</label>
                    <input component="input"
                        placeholder="name"
                        name="name"
                        className="form-control"
                        value={name} maxLength={50} onChange={handleChange} />

                    <div className="errorMsg">{errorFields.name}</div>
                </div>
                <div className="form-group mb-3 col-md-3">
                    <label>Value</label>
                    <input component="input"
                        placeholder="value"
                        name="value"
                        className="form-control"
                        value={value} maxLength={50} onChange={handleChange} />
                    <div className="errorMsg">{errorFields.value}</div>
                </div>
                <div className="form-group mb-3 col-md-3">
                    <label>Status</label>
                    <select
                        className="form-control" name='status'
                        onChange={handleChange} value={status}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <div className="errorMsg">{errorFields.status}</div>
                </div>
                <div className="form-group mb-3 col-md-3">
                    <Button onClick={submitForm} className="me-2" variant="info">
                        Save Addons
                    </Button>
                    
                </div>


            </div>

            <Table responsive>
                <thead>
                    <tr>
                        <th className="width80">
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
                    {sectionlist.map(item => (
                        <tr>
                            <td>
                                <strong>{item.name}</strong>
                            </td>
                            <td>{item.value}</td>
                            <td>{item.status}</td>
                            <td>
                            <Button onClick={()=>updateRecord(item)} className="me-2"
                             variant="info">
                                    Update
                                </Button>

                                <Button onClick={()=>deleteRecord(item)} className="me-2" variant="danger">
                                    Delete
                                </Button>

                            </td>


                        </tr>
                    ))}

                </tbody>
            </Table>


        </>)

}

export default Addons

