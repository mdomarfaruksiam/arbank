import React, { useState } from "react";

import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

export default function Home() {
    const [openSignInForm, setOpenSignInForm] = useState(true);

    return (
        <main className="container m-auto flex items-center justify-center px-4">
            <section className="w-full my-2 max-w-md rounded-2xl bg-surface p-6 shadow-xl transition-all duration-300">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-semibold text-primary">
                        ARBank
                    </h1>

                    <p>
                        {openSignInForm
                            ? "Secure Sign In to Your Account"
                            : "Create Your OurBank Account"}
                    </p>
                </div>

                {/* Form */}
                {openSignInForm
                    ? <SignIn />
                    : <SignUp setOpenSignInForm={setOpenSignInForm} />}

                {/* Footer */}
                <div className="mt-6 text-center">
                    {openSignInForm ? (
                        <p>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setOpenSignInForm(false)}
                                className="font-semibold text-primary hover:underline"
                            >
                                Register
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setOpenSignInForm(true)}
                                className="font-semibold text-primary hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}