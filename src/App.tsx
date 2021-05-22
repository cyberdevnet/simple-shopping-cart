import { useState } from "react";
import { useQuery } from "react-query";

// Components
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import Item from './item/item'
import Cart from './Cart/Cart'

// Styles
import { Wrapper, StyledButton } from "./App.styles";

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

export default function App() {
  const { data, isLoading, error } = useQuery<CartItemType[]>("products", getProducts);
  const [cartOpen, setcartOpen] = useState(false)
  const [cartItems, setcartItems] = useState([] as CartItemType[])

  const getTotalItems = (items: CartItemType[]) =>  {
    return items.reduce((ack: number, item) => ack + item.amount, 0)
  }
  const handleAddToCart = (clickedItem: CartItemType) => {
    setcartItems(prev => {
      // 1 is the item already in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id 
          ? {...item, amount: item.amount + 1}
          : item
        )
      }
      // first time item is added
      return [...prev, {...clickedItem, amount: 1}]
    })
  }
  const handleRemoveFromCart = (id: number) => {
  setcartItems(prev => 
    prev.reduce((ack, item) => {
      if (item.id === id) {
        if (item.amount === 1) return ack;
        return [...ack, { ...item, amount: item.amount -1}]
      } else {
        return [...ack, item]
      }

    }, [] as CartItemType[])
  )
  

  }

  if (isLoading) return <LinearProgress  />;;
  if (error) return <div>Something went wrong</div>;;
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setcartOpen(false)}>
        <Cart 
        cartItems={cartItems} 
        addToCart={handleAddToCart} 
        removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setcartOpen(true)} >
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} ></Item>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}
