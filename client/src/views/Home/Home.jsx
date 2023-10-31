import { NavBar } from '../../components/NavBar/NavBar';
import { TopBar } from '../../components/TopBar/Topbar';
import { UsersList } from '../../components/UsersList/UsersList';

const Home = () => {
    return (
      <div style={{position:'relative', width:'100vw'}}>
      <>
        <NavBar />
        <section>
          <TopBar />
        </section>
        <section>
          <UsersList />
        </section>
      </>
      </div>
    );
  };
  
  export default Home;