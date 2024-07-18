import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import { ProductItem } from 'src/components/Cart/Models/ShoppingCartType';

interface CartItemProps {
  productitem: ProductItem;
  removeFromCart: any;
  setQuantity: any;
}

const CartItem = (props: CartItemProps) => {
  const { productitem, removeFromCart, setQuantity } = props;

  return (
    <tr key={productitem.Id}>
      <td>{productitem.Sku}</td>
      <td>
        <div className="cart-product__img">
          <img src={productitem.Picture.ImageUrl} alt="" />
        </div>
      </td>
      <td>
        {productitem.ProductName}
        <p dangerouslySetInnerHTML={{ __html: productitem.AttributeInfo }}></p>
      </td>
      <td>{productitem.UnitPrice}</td>
      <td>
        <div className="quantity-button">
          <button
            type="button"
            onClick={() => setQuantity(productitem.Quantity - 1, productitem)}
            className="quantity-button__btn"
          >
            -
          </button>
          <span>{productitem.Quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(productitem.Quantity + 1, productitem)}
            className="quantity-button__btn"
          >
            +
          </button>
        </div>
      </td>
      <td>{productitem.SubTotal}</td>
      <td>
        <Button onClick={() => removeFromCart(productitem.Id)} variant="text">
          <DeleteIcon />
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
