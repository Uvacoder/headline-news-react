import axios from "axios";

export default function usePostApi<Type>(url:string)
{
    async function callApi(data?:object | FormData)
    {
        let formData = null;
        
        if(data instanceof FormData)
        {
            formData = data;
        }
        else
        {
            formData =  new FormData();
            if(data )
            {
                for (const [k, v] of Object.entries(data)) 
                {
                    formData.append(k,v);
                }
            }
        }

        try
        {
            const response = await axios.post(url,formData);
            return response.data as Type;
        }
        catch(error)
        {
            return error;
        }
    }

    return callApi;
}