import { Toaster, toast } from 'sonner';
import { MutableRefObject, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const userEmailRef:MutableRefObject<HTMLInputElement | null> = useRef(null);
    const userPasswordRef:MutableRefObject<HTMLInputElement | null> = useRef(null);

    const handleLogin = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const userEmail = userEmailRef.current?.value;
        const userPassword = userPasswordRef.current?.value;

        console.info(`user email is ${userEmail} and password is ${userPassword}`);

        if(!userEmail || !userPassword) {
            toast.error("Invalid user credential");
            return;
        }

        console.info("user has been authenticated successfully");

        // Set user info to local storage
        localStorage.setItem('authenticate', JSON.stringify({userEmail, userPassword}))
        navigate("/admin");
    }

    return (
        <section className="h-full relative bg-gray-900 py-10 sm:py-16 lg:py-24">
            <div className="absolute inset-0">
                <img className="h-full w-full object-cover" src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/2/man-eating-noodles.jpg" alt="" />
            </div>
            <div className="absolute inset-0 bg-gray-900/20"></div>

            <div className="relative mx-auto max-w-lg px-4 sm:px-0">
                <div className="overflow-hidden rounded-md bg-white shadow-md">
                    <div className="px-4 py-6 sm:px-8 sm:py-7">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                            <p className="mt-2 text-base text-gray-600">Don’t have one? <a href="#" title="" className="text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline">Create a free account</a></p>
                        </div>

                        <form className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900"> Email address </label>
                                    <div className="mt-2.5">
                                        <input ref={userEmailRef} type="email" name="" id="" placeholder="Enter email to get started" className="block w-full rounded-md border border-gray-200 bg-white p-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900"> Password </label>

                                        <a href="#" title="" className="text-sm font-medium text-rose-500 transition-all duration-200 hover:text-rose-600 hover:underline focus:text-rose-600"> Forgot password? </a>
                                    </div>
                                    <div className="mt-2.5">
                                        <input ref={userPasswordRef} type="password" name="" id="" placeholder="Enter your password" className="block w-full rounded-md border border-gray-200 bg-white p-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <button onClick={(event) => handleLogin(event)} type="submit" className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none">Log in</button>
                                </div>

                                <div>
                                    <button type="button" className="relative inline-flex w-full items-center justify-center rounded-md border-2 border-gray-200 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none">
                                        <div className="absolute inset-y-0 left-0 p-4">
                                            <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                            </svg>
                                        </div>
                                        Sign in with Google
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Toaster richColors position="top-right"/>
        </section>
    )
}

export default Login;