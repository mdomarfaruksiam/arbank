import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

import Input from "../Utils/Input";
import { authContext } from "../Context";

export default function Nav() {

    const { userCredentials } = useContext(authContext)

    const [showSearch, setShowSearch] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border shadow-sm">
            {/* Navbar */}
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-primary tracking-wide"
                >
                    ARBank
                </Link>


                {/* Right Side */}
                <div className="flex items-center gap-2">
                    <div className="hidden sm:block w-80">
                        <div className="flex items-center rounded-lg border border-border bg-background px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition">
                            <FiSearch className="text-secondary text-lg shrink-0" />

                            <Input
                                type="search"
                                placeholder="Search clients..."
                                className="border-0  bg-transparent  focus:ring-0 "
                            />
                        </div>
                    </div>
                    {/* Mobile Search Toggle */}
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="sm:hidden h-10 w-10 rounded-full hover:bg-primary/10 transition flex items-center justify-center"
                    >
                        {showSearch ? (
                            <IoClose className="text-2xl text-secondary" />
                        ) : (
                            <FiSearch className="text-xl text-secondary" />
                        )}
                    </button>

                    {/* Notification */}
                    <button className="relative h-10 w-10 rounded-full hover:bg-primary/10 transition flex items-center justify-center">
                        <IoMdNotificationsOutline className="text-2xl text-secondary" />

                        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-error"></span>
                    </button>

                    {/* Profile */}
                    <button className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-primary/10 transition">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CgProfile className="text-3xl text-primary" />
                        </div>

                        <div className="hidden lg:block text-left">
                            <p className="text-sm font-semibold text-secondary">
                                {userCredentials.user.fullName}
                            </p>
                            <p className="text-xs text-secondary/70">
                                {userCredentials.user.username}
                            </p>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Search Panel */}
            <div
                className={`sm:hidden overflow-hidden transition-max-h duration-300 ease-in-out ${showSearch
                    ? "max-h-24 opacity-100 border-t border-border"
                    : "max-h-0 opacity-0"
                    }`}
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center rounded-lg border border-border bg-background px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition">
                        <FiSearch className="text-secondary text-lg shrink-0" />

                        <Input
                            autoFocus
                            type="search"
                            placeholder="Search clients..."
                            className="border-0 focus:border-0 focus:ring-0 bg-transparent py-2 px-3"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}