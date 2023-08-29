import "./index.css";
import HomeWelcome from "../../components/Home-welcome";
import MemoriesComponent from "../../components/memories-component";
import { getUser } from "../../util/firebase";
import SignOut from "../../components/sign-out";
function Home() {
  const user = getUser();
  return (
    <>
      <div className="home-container">
        <SignOut />
        <div className="main-components">
          <HomeWelcome />
          <MemoriesComponent uid={user.uid} page={0} />
        </div>
        <div className="triangle-container"></div>
      </div>
    </>
  );
}

export default Home;
