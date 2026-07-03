import React from "react";

export default function Loading({
    text = "Loading...",
    fullScreen = true,
}) {
    return (
        <div
            className={`${fullScreen ? "fixed inset-0" : "w-full h-full min-h-[200px]"
                } flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50`}
        >
            {/* Spinner */}
            <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>

            {/* Text */}
            <p className="mt-4 text-gray-700 font-medium text-lg animate-pulse">
                {text}
            </p>
        </div>
    );
} ``