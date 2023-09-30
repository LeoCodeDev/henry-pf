import Slider from "../../components/ProductList/Slider";
import Top from "../../components/ProductList/Top";
import Bottom from "../../components/ProductList/Bottom";
import Products from "../../components/ProductList/Products";

const ProductList = () => {
  return (
    <div>
      <section style={{ marginTop: "2rem", width: "100%" }}>
        <Slider />
      </section>
      <section>
        <Top />
      </section>
      <section>
        <Bottom />
      </section>
      <section  style={{display: 'flex', justifyContent: 'center' , width:'90%' , margin :'0 auto'}}>
      <Products />
      </section>
    </div>
  );
};

export default ProductList;
