import { useState } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-[25px] flex flex-col items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#E5E7EB] text-[16px] cursor-pointer bg-[#1F2937] hover:bg-[#374151] border-[3px] border[#EAB308] 
            shadow-md font-medium rounded-full text-sm px-[25px] py-[15px] text-center flex gap-[5px] items-center hover:font-[800]   
            active:transition-all active:scale-[0.95] active:ease-in-out"
        type="button"
      >
        Dropdown button
        <svg
          className="w-[20px] h-[20px] ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="h-[200px] w-[170px] border border-[#000000]] mt-[5px] transition-opacity duration-[0.3s]"></div>
      )}
    </div>
  );
}
