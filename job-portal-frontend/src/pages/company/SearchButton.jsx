import React from "react";

const SearchButton = ({ jobId, setJobId, fetchJobById, handleClear }) => {
    return (
        <div className="flex justify-end w-full px-5 mt-2">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Search by JOB ID"
                    value={jobId}
                    onChange={(e) => {
                        setJobId(e.target.value);
                    }}
                    className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 mx-5"
                />
                <button
                    type="button"
                    className="bg-blue-500 text-white rounded-lg px-5 py-3 mx-5 hover:bg-blue-600 cursor-pointer font-semibold"
                    onClick={fetchJobById}
                >
                    Search
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    className=" font-semibold bg-gray-200 rounded-lg px-4 py-3"
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export default SearchButton;
