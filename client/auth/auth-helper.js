/*you can use  localStorage  instead of sessionStorage  to store the JWT credentials. 
With sessionStorage, the user auth state will only be remembered in the current window tab.
 With  localStorage, the user auth state will be remembered across tabs in a browser.*/

const { signout } = require("./api-auth");

const authenticate = (jwt, cb) => {
    if (typeOf(window) !== "undefined") {
        sessionStorage.setItem('jwt', JSON.stringify(jwt))
        
    }
    cb();/*The purpose of the callback here is to allow the component that calls authenticate to execute certain logic when the
            authentication process is completed.*/
}

const isAuthenticated = ()=>{
    if (typeOf(window) == "undefined") {
        return false
    }
    if(sessionStorage.getItem('jwt')){
        return JSON.parse(sessionStorage.getItem('jwt'));
    }
    else{
        return false
    }
}

const clearJWT= (cb)=>{
    if (typeOf(window) !== "undefined") {
        sessionStorage.removeItem('jwt')
    }
    cb();
    signout().then((data)=>{
        document.cookie = "t=; expires Thu,01 Jan 1970 00:00:00 UTC; path=/;"
    });
}