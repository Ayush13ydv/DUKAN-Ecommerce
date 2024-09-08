import React from 'react'
import Layout from '../../components/layout/Layout'
import { useContext } from 'react'
import myContext from '../../context/data/MyContext';
import HeroSection from '../../components/heroSection/heroSection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Track from '../../components/track/Track';
import Testimonial from '../../components/testimonials/Testimonials';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Home() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=>state.cart)

  return (
    <div>
      <Layout > 
     
        <HeroSection/>
        <Filter/>
        <ProductCard/>
        <div className='flex justify-center -mt-10 mb-4'>
          <Link to={'/allproducts'}>
          <button className='bg-gray-300 px-5 py-2 rounded-xl'>See more..</button>
          </Link>
        </div>
        <Track/>
        <Testimonial/>
      </Layout>
    </div>
  )
}

export default Home
