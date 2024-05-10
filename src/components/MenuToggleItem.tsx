
interface Props
{
    heading:string, 
    value:Boolean,
    onClick: ()=> void
}

function MenuToggleItem({heading, value, onClick}:Props)
{
    return (
        <div onClick={onClick} style={{ display: "flex", justifyContent: "space-between", width: "100%"}}>
            <span>{heading}</span>
            <span>[{value? "On" : "Off"}]</span>
        </div>
    )
}

export default MenuToggleItem;