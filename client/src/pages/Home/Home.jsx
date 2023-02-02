import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from 'react';

export function Home() {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({})

    useEffect(() => {
      getHomePage()
    }, [])
    
    const getHomePage = async () =>{
        try{
            const res = await fetch("/AdminPage", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                },
                credentials: "include"
              }) 
              if (res.status !== 200) {
                throw new Error
              }
              const data = await res.json()
              setUserData(data)

        } catch(err) {
            navigate("/")
            console.log(err)
        }
    }

    const buyPageRouting = () =>{
        navigate("")
    }

    const sellPageRouting = () =>{
        navigate("")
    }

    return (
        <>
            <div className="contentForHomePage">
                <button className="bigButton" onClick={buyPageRouting}>
                    I want to buy
                </button>
                <button className="bigButton" onClick={sellPageRouting}>
                    I want to sell
                </button>
            </div>
        </>
    )
}
