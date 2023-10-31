import { NavBar } from '../../components/NavBar/NavBar';
import { VariantButtonGroup } from '../../components/TopBar/Topbar';

const Home = () => {
    return (
      <div style={{position:'relative', width:'100vw'}}>
      <>
        <NavBar />
        <section>
          <VariantButtonGroup />
        </section>
      </>
      </div>
    );
  };
  
  export default Home;