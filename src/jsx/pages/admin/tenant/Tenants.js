
import React,{ useEffect, useMemo, useState } from 'react';
import { GetAllTenants } from '../../../../services/CommonService';
import TenantTable from './TenantTable';
import EventBus from '../../../../services/EventBus';

const Tenants =() =>{
    const [data, setData] = useState([]);
	useEffect(() => {
		getTenants();

        EventBus.on("tenantSave", (data) => {
           
            getTenants();
          });
          EventBus.remove("tenantSave");
	}, []);  

   const getTenants =async() =>{
   
    setData([]);
    const tenantdata = await GetAllTenants({pageno:'-1'});
    console.log(data);
    setData(tenantdata.data);
   }

   
    return(
    <>
   
       {data.length > 0 &&
				<TenantTable propdata={data} />
               }
			 

    
    </>
    )

}
export default Tenants