import React from "react";

const FilterButton = ({
  applyFilter,
  setIsFilterModalOpen,
  isFilterModalOpen, 
}) => {
  return (
    <button
      style={{zIndex:70}}
      title="filters"
      className="relative"
      onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
    >
      <img
        className="w-6 h-6 sm:h-9 sm:w-9 object-contain"
        src="https://cdn-icons-png.freepik.com/512/425/425734.png?ga=GA1.1.2123370009.1690711012&"
        alt="Filter"
      />
      {isFilterModalOpen && (
        <div className="fixed text-sm inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white m-2 p-2 sm:p-4 rounded-md">
            <div className="flex justify-between px-1 text-sm sm:text-lg items-center mb-1"> 
              <div>Filters</div>
              <button
                className="text-xl  cursor-pointer"
                onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
              >
                ✖
              </button>
            </div> 
            <div className="flex items-center flex-wrap text-xs sm:text-base gap-2 sm:gap-3 ">
              
              <button
                className="py-2 px-3  sm:px-4  bg-black font-light text-white rounded-3xl hover:bg-gray-700 focus:bg-gray-700"
                onClick={() => applyFilter("Headphones")}
              >
                Headphones
              </button>
              <button
                className="py-2 px-4 bg-black font-light text-white rounded-3xl hover:bg-gray-700 focus:bg-gray-700  "
                onClick={() => applyFilter("Earbuds")}
              >
                Earbuds
              </button>
              <button
                className="py-2 px-4 bg-black font-light text-white rounded-3xl hover:bg-gray-700 focus:bg-gray-700  "
                onClick={() => applyFilter("Speakers")}
              >
                Speakers
              </button>
              <button
                className="py-2 px-4 bg-black font-light text-white rounded-3xl hover:bg-gray-700 focus:bg-gray-700  "
                onClick={() => applyFilter("Watches")}
              >
                Watches
              </button>
            </div>
          </div>
        </div>
      )}
    </button>
  );
};

export default FilterButton;
