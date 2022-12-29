
import React, { useEffect,useState } from "react"


const AuthContext=React.createContext({
    isLoggedIn:false,
    loginTrue:(tf)=>{}
    
})

export default AuthContext

export const AuthProvider=(props)=>{

    const [isLogin,setIsLogin]=useState(false)

    const makeLoginTrue=(tf)=>{
        setIsLogin(tf)
    }
    
    const login=JSON.parse(localStorage.getItem('currUser'))
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

