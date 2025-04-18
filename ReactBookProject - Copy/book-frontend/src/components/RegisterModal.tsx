import { useRef, useState } from "react";
import { PostRegister } from "../api/authAPI";
import { useAuth } from "../Context/authContext";

function RegisterModal (){
    const modalRef = useRef<HTMLDialogElement>(null);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const {register} = useAuth();
    const openModal = () => {
        modalRef?.current?.showModal();
    }

    const handleRegister = async (e: React.FormEvent) =>{
        e.preventDefault();
        if(username && password && email){

            const data = await PostRegister(username,email, password)
             register(data.user,data.token)
             modalRef.current?.close();
        } else {
            alert("Please enter username password and email")
        }
    }

    return(
        <>
        <button className="btn" onClick={openModal}>
                Register
            </button>
            <dialog id="register_modal" className="modal" ref={modalRef}>
                <div className="modal-box bg-white text-black">
                    <h3 className="font-bold text-lg">Register</h3>
                    <p className="py-4">Register Form.</p>

                    <div className="modal-action">
                        <form onSubmit={handleRegister}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full mb-4"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full mb-4"
                            />
                            
                            <button
                                type="submit"
                                className="btn btn-primary">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        
        </>
    )
}
export default RegisterModal;