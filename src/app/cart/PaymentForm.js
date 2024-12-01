
export default function PaymentForm ({ onCancel, onPayWithKhalti }) {
    return (
        <div>
           <div className="flex gap-4 mt-4">
                <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800" onClick={onPayWithKhalti} >Pay with Khalti</button>
                <button className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}