import {Button} from "@material-ui/core";
//types
import {cartItemType} from "../App";
//styles
import {Wrapper} from "./cartItem.styles";

interface props{
    item:cartItemType
    addToCart:(clickedItem: cartItemType) => void
    removeFromCart:(id:number)=>void
}

const CartItem:React.FC<props>=(props)=>{
    return (
        <Wrapper>
            <div>
                <div>
                    <h3>{props.item.title}</h3>
                    <div className={'information'}>
                        <p>Price: ${props.item.price}</p>
                        <p>Total: ${(props.item.amount*props.item.price).toFixed(2)}</p>
                    </div>
                </div>
                <div className={'buttons'}>
                    <Button
                        size={'small'}
                        disableElevation
                        variant={'contained'}
                        onClick={()=>{props.removeFromCart(props.item.id)}}
                    >
                        -
                    </Button>
                    <p>{props.item.amount}</p>
                    <Button
                        size={'small'}
                        disableElevation
                        variant={'contained'}
                        onClick={()=>{props.addToCart(props.item)}}
                    >
                        +
                    </Button>
                </div>
            </div>
            <img src={props.item.image} alt={props.item.title}/>
        </Wrapper>
    )
}

export default CartItem