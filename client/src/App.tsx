import { Header } from "./components/Header";
import { MainContainer } from "./components/MainContainer";

function App() {


  return (
    <div className='w-screen h-full m-0 bg-slate-100 flex flex-col justify-start items-center'>
      <Header />
      <MainContainer />
    </div>
  );
}

export default App;