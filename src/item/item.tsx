import {Button} from "@material-ui/core";
// types
import {cartItemType} from "../App";
//styles
import {Wrapper} from "./item.styles";

interface props{
    item:cartItemType
    handleAddToCart:(clickedItem:cartItemType)=>void
}

const Item:React.FC<props>=({item,handleAddToCart})=>{
    return (
        <Wrapper>
            <img src={item.image} alt={item.title}/>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button onClick={()=>{handleAddToCart(item)}}>
                Add to cart
            </Button>
        </Wrapper>
    )
}

export default Item