import HomeWelcome from "../../components/Home-welcome";
import MemoriesComponent from "../../components/memories-component";
import { getUser } from "../../util/firebase";
function Home() {
  const user = getUser();
  return (
    <>
      <div className="home-container">
        <HomeWelcome />
        <MemoriesComponent uid={user.uid} page={0} />
      </div>
    </>
  );
}

export default Home;
