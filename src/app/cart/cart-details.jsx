/* eslint-disable @next/next/no-img-element */
export default function CartDetails({ orderInfo, onSubmit, onCancel }) {
    return (
        <div className=" bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                    <div className="flex flex-col gap-6">
                        {orderInfo.cartItems.map((item, index) => (
                            <div key={index} className="flex flex-row gap-4 items-center">
                                <div className="w-24 h-24 border">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${item.imageUrl}`}
                                        alt={item.productname}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p><strong>{item.name}</strong></p>
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
                            <span>Rs. {orderInfo.subTotal}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>RS. {orderInfo.shippingCost}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg mt-4">
                            <span>Total</span>
                            <span>Rs. {orderInfo.grandTotal}</span>
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="flex gap-4 mt-4">
                    <button
                        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
                        onClick={onSubmit}
                    >Next</button>
                    <button className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={onCancel}
                    >Cancel</button>
                </div>
        </div>
    );
}