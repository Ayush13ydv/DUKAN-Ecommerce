import React, { useEffect, useState } from 'react'
import myContext from './MyContext'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
function MyState(props) {
 const[mode,setMode] = useState("light");
 const[loading,setLoading] = useState(false);
 const[products,setProducts] = useState({
  title:null,
  price:null,
  description:null,
  imgUrl:null,
  category:null,
  time:Timestamp.now(),
  date:new Date().toLocaleString(
    "en-US",
  
  {
      month:"short",
      day:"2-digit",    
      year:"numeric"
    }
  )
})

 const toggleMode =()=>{
    if(mode === 'light'){
     setMode("dark");
     document.body.style.backgroundColor = "rgb(17,24,39)";
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
 }
// *****************************ADD PRODUCT************************************
 const addProduct = async ()=>{
 if(products.title == null || products.price == null || products.description == null || products.imgUrl == null || products.category == null){
  return  toast.error("All fields are required");
 }

 setLoading(true)
 try {
  const productRef = collection(fireDB,"products");
    await addDoc(productRef,products);
     toast.success("Add Products succesfully")
     setTimeout(() => {
      window.location.href = "/dashboard"
     }, 800);
     getProductData()
     setLoading(false)
 } catch (error) {
  console.log(error)
  setLoading(false)
 }
 setProducts({
  title: null,
  price: null,
  description: null,
  imgUrl: null,
  category: null,
  time: Timestamp.now(),
  date: new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }),
});

 }

//  ***********************GET PRODUCT*********************************

 const [product,setProduct] = useState([])

 const getProductData=()=>{
  setLoading(true)
  try {
    const q = query(
      collection(fireDB,'products'),
    orderBy('time')
  )
      const data= onSnapshot(q,(QuerySnapshot)=>{
        let productArray = [];
        QuerySnapshot.forEach((doc)=>{
         return productArray.push({...doc.data(), id: doc.id})
        
        })
        setProduct(productArray)
        setLoading(false)
      })
      return()=>data
  } catch (error) {
    console.log(error)
    setLoading|(false)
  }

}
useEffect(()=>{
getProductData()
},[])

const editHandle=(item)=>{
setProducts(item)
}

const updateProduct=async(item)=>{
  setLoading(true)
 try {
   await setDoc(doc(fireDB,"products",products.id),products)
   toast.success("Product updated Succesfully");
   getProductData();
   setTimeout(() => {
    window.location.href = "/dashboard";
   }, 800);
   
   setLoading(false)
 } catch (error) {
  console.log(error)
 }
}

const deleteProduct=async(item)=>{
  setLoading(true)
  try {
    await deleteDoc(doc(fireDB,"products",item.id))
    toast.success("Product deleted succesfully")
    getProductData();
    window.location.href = "/dashboard";
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false);
  }
}

const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
       ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getProductData();
    getOrderData()

  }, []);
  

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')



  return (
    <myContext.Provider value={{mode,toggleMode,loading,setLoading,products,setProducts,addProduct,product,editHandle,updateProduct,deleteProduct,order,user
      , searchkey, setSearchkey,filterType, setFilterType,
      filterPrice, setFilterPrice
    }}>
     {props.children}
    </myContext.Provider>
  )
  
}

export default MyState
