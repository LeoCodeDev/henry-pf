import Slider from "../../components/ProductList/Slider";
import Top from "../../components/ProductList/Top";
import Bottom from "../../components/ProductList/Bottom";
import Products from "../../components/ProductList/Products";
import {NavBar} from '../../components/NavBar/NavBar'
import { useAuthStore } from "../../store/authStore";
import SignUp from "../../components/LandingPage/SignUp";

const ProductList = () => {
  const{showRegisterModal}=useAuthStore()

  return (
    <div style={{position:'relative', width:'100vw',height:'100vh'}}>
    <>
      <NavBar />
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
      </>
      {showRegisterModal &&
      (<div style={{position:'fixed',top:'0', width:'100%', height:'100%', display:'grid',placeItems:'center', zIndex:'999', margin:'auto', backgroundBlendMode:'multiply', backgroundColor:'rgba(0,0,0,0.8)'}}>
            <div style={{width:'60%'}}>
              <SignUp/>
            </div>
        </div>
      )
    }
    </div>
  );
};

export default ProductList;
