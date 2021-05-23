import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Button } from "@material-ui/core";
import CartItem from "../CartItem/CartItem";
//Types
import { CartItemType } from "../App";

// Styles
import { Wrapper } from "./Buy.styles";
import TakeMyMoney from "./shut-up-and-take-my-money.jpg";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  buyOpened: boolean;
  openBuyModal: () => void;
};

const Buy: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
  buyOpened,
  openBuyModal,
}) => {
  const [takeMyMoney, settakeMyMoney] = useState<boolean>(false);

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <Dialog fullWidth maxWidth="sm" open={buyOpened}>
      <Wrapper>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>

        <div className="row buttons">
          <Button className="buy-button" onClick={() => settakeMyMoney(!takeMyMoney)}>
            Buy
          </Button>
          <Button className="cancel-button" onClick={() => openBuyModal()}>
            Cancel
          </Button>
        </div>
        {takeMyMoney ? (
          <div className="take-my-money">
            <img src={TakeMyMoney} alt="TakeMyMoney" />
          </div>
        ) : (
          <div></div>
        )}
      </Wrapper>
    </Dialog>
  );
};

export default Buy;
