
import React, { useEffect,useState } from "react"


const AuthContext=React.createContext({
    isLoggedIn:false,
    loginTrue:(tf)=>{}
    
})

export default AuthContext

export const AuthProvider=(props)=>{

    const login=JSON.parse(localStorage.getItem('currUser'))
    const [isLogin,setIsLogin]=useState(!!login)

    const makeLoginTrue=(tf)=>{
        setIsLogin(tf)
    }
    
    
    useEffect(()=>{
        
        if (login){
            setIsLogin(true)
        }
        
        

    },[])
    
    const value={
        isLoggedIn:isLogin,
        loginTrue:makeLoginTrue
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

