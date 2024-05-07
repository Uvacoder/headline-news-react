import { FetchData } from '@/types/FetchData';
import axios, { AxiosResponse } from 'axios';
import { useRef } from 'react';

function wrapPromise(promise:Promise<AxiosResponse>)
{
    let status:string = "pending";
    let response:any =  null;

    const suspender = promise.then(
        (resource: any) =>{
            status = "success";
            response = resource;
        },
        (error: any)=>
        {
            if(error.code === "ERR_CANCELED")
            {
                status = "canceled";
                response = null;
            }
            else
            {
                status = "error";
                response = error;
            }
        }
    );

    const read =()=>
    {
        switch(status)
        {
            case "pending":
                throw suspender;

            case "error":
                throw response;

            case "canceled":
                return response;

            case "success":
                return response.data;

            default:
                throw new Error("Unknown Error");
        }

    }

    const getStatus = () =>
    {
        return status;
    }

    return {read, getStatus};
}

function useFetchApi<T>(url:string, data:object | null = null)
{
    const controller = useRef<AbortController>();

    if(controller.current !== null && controller.current !== undefined)
    {
        controller.current.abort();
    }

    const abortController = new AbortController();
    controller.current = abortController;

    const promise = axios.get(url,{signal: abortController.signal, params: data});
    
    return wrapPromise(promise) as FetchData<T>;
}

export default useFetchApi;