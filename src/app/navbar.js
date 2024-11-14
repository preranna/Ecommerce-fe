"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";

export default function Navbar() {

    const [loginToken, setLoginToken] = useLocalStorage("loginToken", null);

    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!loginToken) return;
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${loginToken.token}`
                }
            });
            setUserInfo(data);
        };
        fetchUserInfo();
    }, []);

    return (
        <div className="w-full  flex flex-row justify-between p-4">
            <div></div>
            <div className="flex flex-row gap-2 text-lg">
                <Link href='/'>Home</Link>
                <Link href="/products"> Products</Link>
            </div>
            <div className="flex flex-row gap-2">
                <Link href='/cart' className="w-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    {
                        !!userInfo && (<span>{userInfo.cart.productIds.length}</span>)
                    }
                </Link>
                {
                    !loginToken ?
                        <button className="bg-gray-900 text-white rounded px-2 py-1" >
                            <Link href="/Login">Log In</Link>
                        </button>
                        :
                        <button className="bg-gray-900 text-white rounded px-2 py-1" onClick={() => { setLoginToken(null); }} >
                            Log Out
                        </button>
                }
            </div>
        </div>
    );
}