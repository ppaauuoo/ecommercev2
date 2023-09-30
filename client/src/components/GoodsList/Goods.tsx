
import {  useDispatch } from "react-redux";
// import { RootState } from "../../redux";
import { increment } from "../../redux/cartTotalSlice";

interface GoodsParameters {
  goodsName: string;
  goodsDesc: string;
  goodsPrice: number;
  goodsImage: string;
}


export default function Goods(goodsProps: GoodsParameters) {
  const { goodsName, goodsDesc, goodsPrice,goodsImage } = goodsProps;
  // const cartTotal = useSelector((state: RootState) => state.cartTotal.value);
  const dispatch = useDispatch()
  
  return (
    <div className="card card-compact max-h-md max-w-sm bg-white shadow-xl">
      <figure>
        <img src={goodsImage} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{goodsName}</h2>
        <p>{goodsDesc}</p>
        <div className="flex justify-end">
          <div className="badge badge-secondary justify-end">
            {goodsPrice} บาท
          </div>
        </div>
        <div className="card-actions justify-end">
          {/* <form action="/cart" method="POST"> */}
            <button
              type="submit"
              className="btn btn-accent "
              name="selectedItem"
              value={goodsName}
              onClick={() => dispatch(increment())}
            >
              <i className="fa fa-shopping-cart "/>Add To Cart
              </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}