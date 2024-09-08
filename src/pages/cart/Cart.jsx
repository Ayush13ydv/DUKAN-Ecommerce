import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/MyContext';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCart, updateCartQuantity } from '../../components/store/cartSlice';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { addDoc, collection } from 'firebase/firestore';

function Cart() { 

  const context = useContext(myContext)
  let [Open, setOpen] = useState(false)
  const { mode } = context;
  const dispatch = useDispatch();

  const cartItems = useSelector((state)=>state.cart)

  function NewcloseModal() {
    setOpen(false)
}

function NewopenModal() {
    setOpen(true)
}
 const deleteCart=(item)=>{
  dispatch(DeleteCart(item))
  toast.success("Item removed from cart")
  console.log("deleted items")
 }

 const updateQuantity = (item, type) => {
  dispatch(updateCartQuantity({ item, type }));
};
 useEffect(()=>{
  localStorage.setItem('cart',JSON.stringify(cartItems))
},[cartItems])

const[totalAmount,setTotalAmount] = useState(0);

useEffect(()=>{
  let temp = 0;
  cartItems.forEach((cartItem)=>{
    console.log(cartItems)
    console.log(cartItem.price)


    const parsedPrice = Number(cartItem.price.replace(/[,.]/g, '')); // Removes commas and decimal points

    console.log('Price before parsing:', cartItem.price, typeof cartItem.price);
    console.log('Parsed Price:', parsedPrice, 'Quantity:', cartItem.quantity, 'Type of Quantity:', typeof cartItem.quantity);

    temp += parsedPrice * cartItem.quantity;
    console.log(parsedPrice)
    console.log(temp)

  })
  setTotalAmount(temp)
  console.log(temp)
},[cartItems])

const shipping = parseInt(100);
console.log('totalAmount:', totalAmount, 'Type:', typeof totalAmount);

const grandTotal = shipping + totalAmount;
console.log(grandTotal);

const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const buyNow = async () => {
    // Validation 
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    };
    console.log(addressInfo)

    const orderInfo = {
      cartItems,
      addressInfo,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      ),
      email: JSON.parse(localStorage.getItem("user")).user.email,
      userid: JSON.parse(localStorage.getItem("user")).user.uid,
      paymentId: null  // No paymentId since we're not using Razorpay
    };
  
    try {
      // Save order info to Firebase
      const result = await addDoc(collection(fireDB, "order"), orderInfo);
      toast.success('Order Placed Successfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log('Order saved to Firebase:', result);
    } catch (error) {
      console.error("Error saving order to Firebase:", error);
      toast.error('Error placing order', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
  return (
    <Layout >
        {
                  cartItems.length > 0 ?(
                    <div className="h-screen bg-gray-100 pt-5 mb-[70%]" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
                      <div className="rounded-lg md:w-2/3 ">
                      {
                        cartItems.map((item)=>{
                          const {title,price,description,imgUrl,quantity} = item;
                          return(
                          
                            <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                            <img src={imgUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                                <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{description}</h2>
                                <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{price}</p>
                                <div className="flex items-center mt-4"> 
                                <button onClick={() => updateQuantity(item, 'decrease')} className="bg-gray-200 px-2 py-1 rounded">
                            -
                          </button>
                          <span className="mx-4">{quantity}</span>
                          <button onClick={() => updateQuantity(item, 'increase')} className="bg-gray-200 px-2 py-1 rounded">
                            +
                          </button>
                                <button onClick={()=>deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                </button>
                              </div>
                              </div>
                            
                              <div className="  text-center rounded-lg text-white font-bold">
                <button
                    type="button"
                    onClick={NewopenModal}
                    className="w-full  bg-violet-600 py-3 px-3 mt-3 text-center rounded-lg text-white font-bold bg-green-600"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={Open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={NewcloseModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2  text-left align-middle shadow-xl transition-all bg-gray-50">

                                    <section className="">
                                        <div className="flex flex-col items-center justify-center py-8 mx-auto  lg:py-0">
                                          
                                            <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                                                    <form className="space-y-4 md:space-y-6" action="#">
                                                    <div>
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Name</label>
                                                            <input value={name} onChange={(e)=>setName(e.target.value)} type="name" name="name" id="name" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Address</label>
                                                            <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" name="address" id="address" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Enter Pincode</label>
                                                            <input value={pincode} onChange={(e)=>setPincode(e.target.value)} type="text" name="pincode" id="pincode" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                                                            <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type="text" name="mobileNumber" id="mobileNumber" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>

                                                    </form>
                                                    <button onClick={()=>{buyNow(); NewcloseModal()}} type="button" className="focus:outline-none w-full text-white bg-violet-600 hover:bg-violet-800  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 ">Order Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

                              
                            </div>
                           
                          </div>
                          
            
                          )
                        })
                      }
                       
            
                      </div>
            
                      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <div className="mb-2 flex justify-between">
                          <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
                          <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
                          <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between mb-3">
                          <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
                          <div className>
                            <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
                          </div>
                        </div>
                        <Modal 
                            name={name} 
                            address={address} 
                            pincode={pincode} 
                            phoneNumber={phoneNumber} 
                            setName={setName} 
                            setAddress={setAddress} 
                            setPincode={setPincode} 
                            setPhoneNumber={setPhoneNumber} 
                            buyNow={buyNow} 
            />
                      
                      </div>
                    </div>
                  </div>
                  ):(
                    <>
                    <div style={{justifyContent:'center',display:'flex',alignItems:"center",padding:'10px'}}>
                      <div>
                        <img style={{width:"120px"}} src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png?f=webp'></img>
                        </div>
                        <h1 style={{fontWeight:"bold",fontFamily:'Poppins,sans-serif'}}>Mere DMs zyada khali hain ya tumhari cart :(</h1>
                    </div>
                    </>
                  )
        }
    
    </Layout>
  )
}

export default Cart