"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

export default function Cart() {
    const items = [
        {
            productname: 'jacket',
            description: 'hgweqykrukfyyfjgygiqwevhgjehjfyk,kfbkfk',
            price: 3000,
            image: 'https://th.bing.com/th/id/OIP.Ub5eVTSQryIaXgm0LaRtgAHaJZ?rs=1&pid=ImgDetMain',
        },
        {
            productname: 'bag',
            description: 'hgweqykrukfyyfjgygiqwevhgjehjfyk,kfbkfk',
            price: 3000,
            image: 'https://th.bing.com/th/id/OIP.Ub5eVTSQryIaXgm0LaRtgAHaJZ?rs=1&pid=ImgDetMain',
        },
        {
            productname: 'pant',
            description: 'hgweqykrukfyyfjgygiqwevhgjehjfyk,kfbkfk',
            price: 3000,
            image: 'https://th.bing.com/th/id/OIP.Ub5eVTSQryIaXgm0LaRtgAHaJZ?rs=1&pid=ImgDetMain',
        },
    ];

    const categories = ['Shopping Cart', 'Shipping Details', 'Payment Options'];

    return (
        <div className="flex flex-col h-screen w-full items-center pt-7 px-4 bg-gray-50">
            <div className="w-full max-w-5xl flex flex-col">
                <TabGroup>
                    <TabList className="flex justify-center gap-4 w-full px-2">
                        {categories.map((name) => (
                            <Tab
                                key={name}
                                className={({ selected }) =>
                                    `py-2 text-sm font-semibold ${selected ? "text-black border-b-2 border-black" : "text-gray-500"
                                    }`
                                }
                            >
                                {name}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels className="mt-6 w-full flex justify-start">
                        <TabPanel className="w-full max-w-5xl px-4">
                            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow">
                                <div className="md:w-2/3">
                                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                                    <div className="flex flex-col gap-6">
                                        {items.map((item, index) => (
                                            <div key={index} className="flex flex-row gap-4 items-center">
                                                <div className="w-24 h-24 border">
                                                    <img src={item.image} alt={item.productname} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <p><strong>{item.productname}</strong></p>
                                                    <p>{item.description}</p>
                                                    <p>Rs. {item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:w-1/3">
                                    <h1 className="text-2xl font-semibold mb-4">Summary</h1>
                                    <div className="text-sm">
                                        <div className="flex justify-between mb-2">
                                            <span>Subtotal</span>
                                            <span>Rs. 9000</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>Shipping</span>
                                            <span>RS. 130</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg mt-4">
                                            <span>Total</span>
                                            <span>Rs. 9130</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">Next</button>
                                <button className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
                            </div>
                        </TabPanel>

                        <TabPanel className="w-full max-w-5xl bg-white p-4 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
                        </TabPanel>

                        <TabPanel className="w-full max-w-5xl bg-white p-4 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    );
}
