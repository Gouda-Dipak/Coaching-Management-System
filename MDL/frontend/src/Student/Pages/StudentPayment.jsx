
import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import { FaUserCircle, FaDownload, FaCreditCard, FaGooglePay, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

export const StudentPayment = ({ profileImage }) => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [upiID, setUpiID] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const studentInfo = {
        name: "John Doe",
        rollNo: "A12345",
        division: "10th - A",
        address: "41, Balaji Nagar, Surat",
        mobileno: "0987654324",
        totalFees: "₹25,000",
        paidFees: "₹25,000",
        dueFees: "₹0",
    };

    const handleDownloadReceipt = () => {
        const receiptContent = `Student Name: ${studentInfo.name}\nRoll No: ${studentInfo.rollNo}\nDivision: ${studentInfo.division}\nAddress: ${studentInfo.address}\nMobile No: ${studentInfo.mobileno}\nTotal Fees: ${studentInfo.totalFees}\nPaid: ${studentInfo.paidFees}\nDue: ${studentInfo.dueFees}`;
        const blob = new Blob([receiptContent], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Fee_Receipt.txt";
        link.click();
    };

    const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/"); // Redirect to home after logout
      }
    });
  };
    const handlePayment = (method) => {
        setPaymentMethod(method);
        setShowPaymentModal(true);
    };

    const handlePaymentSubmit = () => {
        if (paymentMethod === "Card Payment" && (!cardNumber || !expiry || !cvv)) {
            alert("Please fill all card details!");
            return;
        }

        if (paymentMethod === "Google Pay" && !upiID) {
            alert("Please enter a valid UPI ID!");
            return;
        }

        alert(`Payment successful via ${paymentMethod}!`);
        setShowPaymentModal(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-menu")) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-black text-white py-4 px-6 grid grid-cols-3 items-center shadow-md fixed top-0 left-0 w-full z-50">
                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="p-2 bg-white text-blue-500 rounded-full shadow-md hover:bg-gray-200 transition flex items-center justify-center w-10 h-10"
                >
                    <FaArrowLeft className="text-xl" />
                </button>

                {/* Title */}
                <h1 className="text-xl font-bold text-center">Payment</h1>

                {/* Profile Image with Dropdown */}
                <div className="relative flex justify-end dropdown-menu">
                    <button onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }} className="focus:outline-none">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="h-10 w-10 rounded-full border-2 border-white object-cover cursor-pointer"
                            />
                        ) : (
                            <FaUserCircle className="text-white text-3xl cursor-pointer hover:text-gray-200 transition mr-2" />
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-md" onClick={(e) => e.stopPropagation()}>
                            <Link to="/studentMenu/studentProfile" className="flex items-center px-4 py-2 hover:bg-gray-200">
                                <FaUser className="mr-2" /> Profile
                            </Link>
                            <button onClick={handleLogout} className="flex items-center px-4 py-2 hover:bg-gray-200">
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </div>
                     
                    )}
                </div>
            </header>

            <div className="flex flex-col items-center justify-center flex-grow px-6 mt-20">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                    <h2 className="text-2xl font-bold text-center text-black-800 mb-4">💰 Fee Payment</h2>

                    <div className="border p-4 rounded-lg bg-black-50 mb-4 bg-orange-100">
                        {Object.entries(studentInfo).map(([key, value]) => (
                            <p key={key} className="text-lg font-semibold text-gray-700">
                                {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}: {value}
                            </p>
                        ))}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-700 mb-3">💳 Select Payment Method:</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <button onClick={() => handlePayment("Card Payment")} className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
                            <FaCreditCard className="mr-2" /> Card Payment
                        </button>

                        <button onClick={() => handlePayment("Google Pay")} className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-green-600 transition">
                            <FaGooglePay className="mr-2" /> Google Pay
                        </button>
                    </div>
                    <button onClick={handleDownloadReceipt} className="bg-blue-500 text-black py-2 px-4 rounded-lg flex items-center justify-center hover:bg-black-600 transition w-full mb-4">
                        <FaDownload className="mr-2" /> Download Receipt
                    </button>
                </div>
            </div>

            {showPaymentModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowPaymentModal(false)}>
                            <FaTimes className="text-2xl" />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center">{paymentMethod}</h2>

                        {paymentMethod === "Card Payment" && (
                            <>
                                <input type="text" placeholder="Card Number" className="w-full p-2 border rounded mt-2" />
                            </>
                        )}
                        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full" onClick={handlePaymentSubmit}>Proceed</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};
