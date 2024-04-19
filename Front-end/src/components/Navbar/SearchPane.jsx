import React, { useEffect, useState, useRef, Fragment } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CloseIcon from "../../assets/Icon/Close";
import axios from "axios";
import _debounce from "lodash/debounce";
import SmallLoader from "../Loader/SmallLoader";
import NoProductsFound from "../../assets/Icon/NoProductsFound";
import Typing from "../../assets/Icon/Typing";
import { Link, useNavigate } from "react-router-dom";

const SearchPane = ({ searchPane, setSearchPane }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useRef(
    _debounce(async (searchTerm) => {
      if (searchTerm && /[a-zA-Z0-9]/.test(searchTerm)) {
        setLoading(true);
        const apiUrl = `https://luxe-lane-backend.vercel.app/api/product?search=${searchTerm}`;
        try {
          const response = await axios.get(apiUrl);
          const result = await response.data; 
          setSearchData(result.products);
        } catch (error) { 
          
        }finally{
          setLoading(false);
        }
      } else {
        setSearchData(null);
      }
    }, 1500)
  );

  useEffect(() => {
    // Call the debounced search function when the user stops typing
    debouncedSearch.current(search);
  }, [search]);

  const handeInputChange = (e) => {
    setSearch(e.target.value);  
    if((e.target.value).length>0){
      setLoading(true)
    }
  };

  const closeSearchPane=()=>{
    setSearchPane(false);
    setSearchData(null);
    setLoading(false); 
    setSearch(null)
  }

  const onSearchResultClick = () => {
    setSearchPane(false);
    setSearch(null);
    setSearchData(null);
    setLoading(false);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setSearchPane(false);
    setSearch(null);
    setSearchData(null);
    setLoading(false);
    if (search && /[a-zA-Z0-9]/.test(search)) {
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <SlidingPane
      isOpen={searchPane}
      from="bottom"
      width="100vw"
      overlayClassName="z-[1000]"
      hideHeader
      onRequestClose={() => closeSearchPane()}
    >
      <div style={{zIndex:1000}} className="absolute z-[110] gap-3 flex justify-center px-3 sm:px-10 py-7 top-0 left-0 w-full text-black bg-white h-full">
        <div className="flex flex-col w-full items-center">
          {/* Input  */}
          <div className="w-full flex justify-center relative">
            <button
              className="absolute hidden sm:block top-3 right-5"
              onClick={() => closeSearchPane()}
            >
              <CloseIcon height={40} width={40} />
            </button>
            <button
              className="absolute sm:hidden top-3 right-1"
              onClick={() => closeSearchPane()}
            >
              <CloseIcon height={30} width={30} />
            </button>
            <form action="submit" onSubmit={onFormSubmit} className="w-full">
              <input
                value={search}
                type="text"
                onChange={(e) => handeInputChange(e)}
                placeholder="Search for products"
                className="w-full border-b border-b-black border-opacity-[0.15] text-center outline-none p-3 sm:p-5 text-xl sm:text-4xl font-semibold text-black text-opacity-[0.65] sm:placeholder:text-4xl placeholder:text-lg xs:placeholder:text-xl placeholder:uppercase placeholder:font-semibold placeholder:text-black placeholder:text-opacity-60"
              />
            </form>
          </div>
          {/* Results  */}
          {!loading ? (
            <div className="flex flex-col gap-2 py-5 items-center w-[95vw] sm:w-[80%] lg:w-[50%]">
              {searchData !== null && searchData.length > 0 ? (
                searchData
                  .map((item, index) => (
                    <Fragment key={index + 401}>
                      <Link
                        onClick={onSearchResultClick}
                        to={`/product/${item._id}?category=${item.category}`}
                        className="flex hover:bg-gray-100 items-center gap-2"
                      >
                        <div className="p-[0.1rem] bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-[4rem] max-w-[4rem] object-contain"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className=" line-clamp-1 font-semibold text-sm">
                            {item.name}
                          </div>
                          <div className=" line-clamp-1 font-[350] text-sm">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                      {index <5 && (
                        <div className=" border-b-black border-t border-opacity-[0.15] h-[1px] w-full"></div>
                      )}
                    </Fragment>
                  ))
                  .slice(0, 5)
              ) : (
                <div className="pt-20"> 
                  {search ? (
                    <div className="flex   justify-center w-[98vw] sm:w-[90vw] text-sm xs:text-xl sm:text-3xl md:text-4xl items-center gap-2 sm:gap-4">
                      No products found
                      <span className="hidden sm:block"><NoProductsFound height={50} width={50} />{" "}</span>
                      <span className="hidden xs:block sm:hidden"><NoProductsFound height={35} width={35} />{" "}</span>
                      <span className="xs:hidden"><NoProductsFound height={30} width={30} />{" "}</span>
                    </div>
                  ) : (
                    <div className="flex   justify-center w-[98vw] sm:w-[90vw]  items-center gap-2 sm:gap-4  text-sm xs:text-xl sm:text-3xl md:text-4xl ">
                      Start typing to search for products{" "} 
                      <span className="hidden sm:block"><Typing height={50} width={50} />{" "}</span>
                      <span className="hidden xs:block sm:hidden"><Typing height={35} width={35} />{" "}</span>
                      <span className="xs:hidden"><Typing height={30} width={30} />{" "}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="pt-20 flex justify-center items-center w-full">
              <SmallLoader />
            </div>
          )}
        </div>
      </div>
    </SlidingPane>
  );
};

export default SearchPane;
