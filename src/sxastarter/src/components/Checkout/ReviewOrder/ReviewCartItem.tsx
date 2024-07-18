import { ProductItem } from 'src/components/Cart/Models/ShoppingCartType';

interface ReviewCartItemProps {
  productitem: ProductItem;
}

const ReviewCartItem = (props: ReviewCartItemProps) => {
  const { productitem } = props;

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
      <td>{productitem.Quantity}</td>
      <td>{productitem.SubTotal}</td>
    </tr>
  );
};
export default ReviewCartItem;
