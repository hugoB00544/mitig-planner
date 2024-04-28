import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Style/App.css';


function App() {





  const navigate = useNavigate();
  const [navto, setisLoggedIn] = useState("lobby");
 
  useEffect(() => {
    // Checking if user is not loggedIn
    if (navto === "lobby") {
      navigate("/");
    } else if (navto === "solo"){
      navigate("/solo");
    }else if (navto === "party"){
      navigate("/party");
    }
  }, [navigate, navto]);
 
  return (
    <>
      
      
      
      <button onClick={() => setisLoggedIn("solo")}>Mode Solo</button>
      
      <button onClick={() => setisLoggedIn("party")}>Mode Party</button>
    </>
  );
}
 
export default App;