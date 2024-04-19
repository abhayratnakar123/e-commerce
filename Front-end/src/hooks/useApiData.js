import { useState, useEffect } from "react";
import axios from "axios"; 
 

const useApiData = (apiUrl,authToken=null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if(authToken===null){
           response = await axios.get(apiUrl);
        }else{
           response = await axios.get(apiUrl,{headers:{token:authToken}});
        }
        const result = await response.data; 
        setData(result);
      } catch (error) {
        setError(error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, loading, error };
};

export default useApiData;
