import React from "react";

const Button = ({ name }) => {
    return (
        <>
            <div className="flex justify-center border-t pt-4 gap-5">
                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-800"
                >
                    {name}
                </button>

                <button
                    type="button"
                    className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-800"
                    onClick={() => handleReset()}
                >
                    Cancel
                </button>
            </div>
        </>
    );
};

export default Button;
