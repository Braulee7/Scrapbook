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
        <HomeWelcome />
        <MemoriesComponent uid={user.uid} page={0} />
        <div className="triangle-container"></div>
      </div>
    </>
  );
}

export default Home;
