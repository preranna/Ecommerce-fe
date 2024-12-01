"use client";
import { useState } from "react";

/**
 * const x  = {
 *  a: { b: 'c' }
 * }
 * console.log(x.a) -> result = { b: 'c'}
 * console.log(x.a.b) -> result = c
 *
 * console.log(x.a.d) -> result = TypeError (code crashes) [cannot read property d of undefined]
 * console.log(x.a && x.a.d) result = undefined / false
 * console.log(x.a?.d) -> result = undefined
 */

export default function ShippingDetailsForm({ orderInfo, onSubmit, onCancel }) {
    const [shippingDetails, setShippingDetails] = useState({
        name: orderInfo.shippingInfo?.name || '',
        address: orderInfo.shippingInfo?.address || '',
        city: orderInfo.shippingInfo?.city || '',
        postalCode: orderInfo.shippingInfo?.postalCode || '',
        phone: orderInfo.shippingInfo?.phone || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(shippingDetails); // Pass shipping details to parent
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-medium">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={shippingDetails.name}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="address" className="font-medium">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="city" className="font-medium">
                    City
                </label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="postalCode" className="font-medium">
                    Postal Code
                </label>
                <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingDetails.postalCode}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-medium">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    className="border rounded px-4 py-2"
                    required
                />
            </div>
            <div className="flex gap-4 mt-4">
                <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800" role="submit">Next</button>
                <button className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}