import {useState} from "react";
import {useQuery} from "react-query";
//components
import {Drawer} from "@material-ui/core";
import {LinearProgress} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import {AddShoppingCart} from "@material-ui/icons";
import {Badge} from "@material-ui/core";
import Item from "./item/item";
import Cart from "./cart/cart";
//styles
import {Wrapper} from "./App.styles"
import {StyledButton} from "./App.styles";

//types
export type cartItemType={
    id:number
    category:string
    description:string
    image:string
    price:number
    title:string
    amount:number
}

const getProduct=async ():Promise<cartItemType[]>=>{
    return await (await fetch('http://fakestoreapi.com/products')).json() //get data from api and convert to json format
}

const App=()=>{
    const [cartOpen,setCartOpen]=useState(false)
    const [cartItems,setCartItems]=useState([] as cartItemType[])

    const {data,isLoading,error}=useQuery<cartItemType[]>('product',getProduct)
    console.log(data)

    const getTotalItems=(items:cartItemType[])=>
        items.reduce((total:number ,item)=>total+item.amount,0)
        //total is returned previous calculated value, item is current selection value
        //0 is total initial value

    const handleAddToCart=(clickedItem:cartItemType)=>{
        setCartItems(prevState => {
            //1.Is the item already added in the cart?
            const isItemInCart=prevState.find((item)=>{
                return item.id===clickedItem.id
            })
            if(isItemInCart){
                return prevState.map((item)=>{
                    return item.id===clickedItem.id ? {...item,amount:item.amount+1}:item
                })
            }
            // First time the item is added
            return [...prevState,{...clickedItem,amount:1}]
        })
    }
    const handleRemoveFromCart=(id:number)=>{
        setCartItems(prevState => (
            prevState.reduce((total,item)=>{
                if(item.id===id){
                    if(item.amount===1) return total
                    return [...total,{...item,amount:item.amount-1}]
                }else{
                    return [...total,item]
                }
            },[] as cartItemType[])
        ))
    }

    if(isLoading) return <LinearProgress/>
    if(error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
        <Drawer anchor={'right'} open={cartOpen} onClose={()=>{setCartOpen(false)}}>
            <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
        </Drawer>
        <StyledButton onClick={()=>{setCartOpen(true)}}>
            <Badge badgeContent={getTotalItems(cartItems)} color={'error'}/>
            <AddShoppingCart/>
        </StyledButton>
        <Grid container spacing={3}>
            {data?.map((item)=>{
                return (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart}/>
                    </Grid>
                )
            })}
        </Grid>
    </Wrapper>
  );
}

export default App;
