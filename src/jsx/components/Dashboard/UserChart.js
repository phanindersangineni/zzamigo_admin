import React, { useEffect, useState } from 'react';

import { Row, Col, Card } from "react-bootstrap";
import pMinDelay from 'p-min-delay';
import loadable from "@loadable/component";
import { assessmentstudentcoursewise, studentscousewise } from '../../../services/CommonService';
import PieChart1 from './PieChart1';
import BarChart from './BarChart';


const ApexBar2 = loadable(() => pMinDelay(import("./Bar2"), 1000));
const ApexBar3 = loadable(() => pMinDelay(import("./Bar3"), 1000));

const UserChart = ({tenantid,role,tenantlist}) => {

    const [setdata ,setData] =useState([]);
    const [setassessmentdata ,setAssessmentData] =useState([]);

    useEffect(() => {
        //getBanner();
        chartdata();
    
    }, []);

    const chartdata =async()=>{

      if(role !='ADMIN') {
        const reqdata ={
            tenantid:tenantid
        }
        
        const constuserdetails =  await JSON.parse(localStorage.getItem('userDetails'));
  
         const responsedata = await studentscousewise(reqdata);
         setData(responsedata.data);

         const asssessmentdata = await assessmentstudentcoursewise(reqdata);
         setAssessmentData(asssessmentdata.data);

     }

    

    }


    return(
        <div className="h-80">
        <Row>
            <Col xl={6} lg={6}>
                <Card>
                    <Card.Header>
                        <h4 className="card-title">Students Course Wise  
                                                    <select className="form-control">
                                                        <option value=''>Select Tenant</option>
                                                        {tenantlist.map(item => (
                                                            <option
                                                                key={item.tenantid}
                                                                value={item.tenantid}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </h4>
                    </Card.Header>
                    <Card.Body>
                        <PieChart1 branches={setdata?.branch} students ={setdata?.studentcounts}/>
                        {/* <ApexBar2  branches={setdata?.branch} students ={setdata?.studentcounts}/> */}
                    </Card.Body>
                </Card>
            </Col>
            <Col xl={6} lg={6}>
                <Card>
                    <Card.Header>
                        <h4 className="card-title">Assessment Result Course Wise
                        <select className="form-control">
                                                        <option value=''>Select Tenant</option>
                                                        {tenantlist.map(item => (
                                                            <option
                                                                key={item.tenantid}
                                                                value={item.tenantid}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select></h4>
                    </Card.Header>
                    <Card.Body>
                        <BarChart branches={setassessmentdata?.branch} assessments ={setassessmentdata?.assessmentcount}  students ={setassessmentdata?.studentcounts}/>
                        {/* <ApexBar3 branches={setassessmentdata?.branch} students ={setassessmentdata?.studentcounts} assessments ={setassessmentdata?.assessmentcount}/> */}
                    </Card.Body>
                </Card>
            </Col>
            </Row>
</div>
    )


}

export default  UserChart