

export interface FetchData<T>
{
    read: () => T,
    getStatus: ()=> string
}