
interface Props
{
    heading:string, 
    value:Boolean,
    onClick: ()=> void
}

function MenuToggleItem({heading, value, onClick}:Props)
{
    return(
        <div onClick={onClick}>
        {heading}
        [{value? "On" : "Off"}]
        </div>
    )
}

export default MenuToggleItem;