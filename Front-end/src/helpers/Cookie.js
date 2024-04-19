import Cookies from "js-cookie";

const defaultOptions={
    secure: true, sameSite: "Strict"
}
// Function to set a cookie
export const setCookie = (name, value, options = defaultOptions) => {
  Cookies.set(name, value, options);
};

// Function to get a cookie by name
export const getCookie = (name) => {
  return Cookies.get(name);
};

// Function to remove a cookie by name
export const removeCookie = (name) => {
  Cookies.remove(name);
};
