import CartItem from "../cartItem/cartItem";
//styles
import {Wrapper} from "./cart.styles";
//types
import {cartItemType} from "../App";

interface props {
    cartItems: cartItemType[]
    addToCart: (clickedItem: cartItemType) => void
    removeFromCart:(id:number)=>void
}

const Cart:React.FC<props>=(props)=>{
    const calculateTotal=(items:cartItemType[])=>
        items.reduce((total:number,item)=>total+item.amount*item.price,0)

    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {props.cartItems.length===0?<p>No Items in cart.</p>:null}
            {props.cartItems.map((item)=>{
                return <CartItem
                    key={item.id}
                    item={item}
                    addToCart={props.addToCart}
                    removeFromCart={props.removeFromCart}
                />
            })}
            <h2>Total: ${calculateTotal(props.cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart