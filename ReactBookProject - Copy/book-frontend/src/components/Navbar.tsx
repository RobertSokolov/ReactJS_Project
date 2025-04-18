
import { NavLink } from "react-router";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../Context/authContext";

function Navbar() {
  
  const {logout,isLoggedIn} = useAuth();
  return (

    <nav className=" p-4 text-white grid grid-cols-8 border-b-2 border-gray-200   ">
      <div className="col-span-6 flex gap-4">
        <NavLink to="/" className="btn btn-soft">
          Home
        </NavLink>
        {isLoggedIn &&(
        <NavLink to="/favorites" className="btn btn-soft">
          favorites
        </NavLink>
        )}
      </div>
      <div className="col-span-2 flex justify-end">
        {!isLoggedIn ? (
          <>
             <LoginModal/>

             <RegisterModal/>
          </>
        ) : (
          <button className="btn btn-secondary " onClick={logout}>
            SignOut
          </button>
        )
        }
      </div>
    </nav>
  )
}

export default Navbar;