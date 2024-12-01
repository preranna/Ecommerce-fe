'use client';
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const statuses = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
}
export default function PaymentSuccess() {
    const [loginToken] = useLocalStorage('loginToken', null);
    const [status, setStatus] = useState(statuses.LOADING);
    const searchParams = useSearchParams()

    useEffect(() => {
        axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/orders/pay-with-khalti-success?${searchParams.toString()}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${loginToken.token}`
                }
            }
        ).then(() => {
            setStatus(statuses.SUCCESS);
        }).catch(e => {
            console.error(e);
            setStatus(statuses.ERROR);
        })
    }, []);

    return <div className="flex justify-center align-center">
        {
            status === statuses.LOADING && (
                <div>loading....</div>
            )
        }
        {
            status === statuses.SUCCESS && (
                <h1 className="text-3xl font-bold">Order Confirmed!!</h1>
            )
        }
        {
            status === statuses.ERROR && (
                <div>
                    <h1 className="text-3xl font-bold">Something Unexpected Happened!!</h1>
                    <p>We could not process your order. Please contact support.</p>
                </div>
            )
        }
    </div>
}