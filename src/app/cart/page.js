/* eslint-disable @next/next/no-img-element */
"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useLocalStorage } from '@uidotdev/usehooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CartDetails from './cart-details';
import ShippingDetailsForm from './shippingForm.js';
import PaymentForm from './PaymentForm';
import { orderStatus } from './constants';

export default function Cart() {
    const [loginToken] = useLocalStorage('loginToken', null);
    const [orderInfo, setOrderInfo] = useState(null);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const router = useRouter()

    useEffect(() => {
        const createDraftOrder = async () => {
            if (!loginToken) return;
            const response = await axios.post(`${ process.env.NEXT_PUBLIC_SERVER_BASE_URL }/orders/order-from-cart`, {}, {
                headers: {
                    Authorization: `Bearer ${ loginToken.token }`
                }
            });
            setOrderInfo(response.data);
        };

        createDraftOrder();
    }, []);

    const categories = ['Shopping Cart', 'Shipping Details', 'Payment Options'];

    const handleSubmitCartDetails = async () => {
        const { data: updatedOrderInfo } = await axios.patch(`${ process.env.NEXT_PUBLIC_SERVER_BASE_URL }/orders/${ orderInfo._id }`,
            { status: orderStatus.SHIPPING_DETAILS },
            {
                headers: {
                    Authorization: `Bearer ${ loginToken.token }`
                }
            }
        );
        setOrderInfo(updatedOrderInfo);
        setActiveTabIndex(1);      
    } 

    const handleAddShippingInfo = async (shippingInfo) => {
        const {data: updatedOrderInfo} = await axios.patch(`${ process.env.NEXT_PUBLIC_SERVER_BASE_URL }/orders/${ orderInfo._id }`,
            { status: orderStatus.PAYMENT_PENDING, shippingInfo },
            {
                headers: {
                    Authorization: `Bearer ${ loginToken.token }`
                }
            }
        );
        setOrderInfo(updatedOrderInfo);
        setActiveTabIndex(2);
    };

    const handlePayWithKhalti = async () => {
        const { data: { khaltiPaymentData } } = await axios.post(
            `${ process.env.NEXT_PUBLIC_SERVER_BASE_URL }/orders/${ orderInfo._id }/pay-with-khalti`, 
            {
                returnUrl: 'http://localhost:3000/payment-success'
            },
            {
                headers: {
                    Authorization: `Bearer ${ loginToken.token }`
                }
            }
        );
        router.push(khaltiPaymentData.payment_url);
    }

    const handleCancel = () => {
        setActiveTabIndex(0);
    };

    return (
        <div className="flex flex-col h-screen w-full items-center pt-7 px-4 bg-gray-50">
            <div className="w-full max-w-5xl flex flex-col">
                <TabGroup selectedIndex={activeTabIndex} onChange={setActiveTabIndex}>
                    <TabList className="flex justify-center gap-4 w-full px-2">
                        {categories.map((name) => (
                            <Tab
                                key={name}
                                className={({ selected }) =>
                                    `py-2 text-sm font-semibold ${ selected ? "text-black border-b-2 border-black" : "text-gray-500"
                                    }`
                                }
                            >

                                {name}
                            </Tab>
                        ))}
                    </TabList>
                    {
                        !orderInfo
                            ? <>loading...</>
                            : <TabPanels className="mt-6 w-full flex justify-start">
                                <TabPanel className="w-full max-w-5xl px-4">
                                    <CartDetails 
                                    orderInfo={orderInfo} 
                                    onSubmit={handleSubmitCartDetails}
                                    onCancel={handleCancel}
                                    />
                                </TabPanel>

                                <TabPanel className="w-full max-w-5xl bg-white p-4 rounded-lg shadow">
                                    <ShippingDetailsForm
                                        orderInfo={orderInfo}
                                        onSubmit={handleAddShippingInfo}
                                        onCancel={handleCancel}
                                    />
                                </TabPanel>

                                <TabPanel className="w-full max-w-5xl bg-white p-4 rounded-lg shadow">
                                    <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
                                    <PaymentForm
                                        onPayWithKhalti={handlePayWithKhalti}
                                        onCancel={handleCancel}
                                    />
                                </TabPanel>
                            </TabPanels>
                    }
                </TabGroup>
            </div>
        </div>
    );
}