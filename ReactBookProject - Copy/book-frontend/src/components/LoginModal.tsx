import { useRef, useState } from "react";
import { PostLogin } from "../api/authAPI";
import { useAuth } from "../Context/authContext";
function LoginModal() {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();


    const openModal = () => {
        modalRef.current?.showModal();
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password) {

           const data = await PostLogin(username, password)
           login(data.user,data.token)
            modalRef.current?.close();
        } else {
            alert("Please enter username and password");
        }
    }
    return (
        <>
            <button className="btn" onClick={openModal}>
                Login
            </button>
            <dialog id="login_modal" className="modal" ref={modalRef}>
                <div className="modal-box bg-white text-black">
                    <h3 className="font-bold text-lg">Login</h3>
                    <p className="py-4">Login form.</p>

                    <div className="modal-action">
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input input-bordered w-full mb-2"
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
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    )
}

export default LoginModal;