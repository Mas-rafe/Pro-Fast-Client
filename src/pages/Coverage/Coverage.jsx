import { useLoaderData } from "react-router";
import BangladeshMap from "./BangladeshMap";





const Coverage = () => {

  

  const serviceCenters = useLoaderData();
 
  
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center text-[#03373D] mb-6">
        We are available in 64 districts
      </h2>
      
      {/* Pass data to BangladeshMap */}
      <BangladeshMap serviceCenters={serviceCenters}></BangladeshMap>
    </div>
  );
};

export default Coverage;
