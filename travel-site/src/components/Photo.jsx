import React from 'react';
import { Link } from 'react-router-dom';
import './Photo.css'

const Photo = () => {
  return (
    <>
        <div className='imgBox'>
            <Link to='../Hotels'>
                <div className='cityName'>Rovaniemi</div>
                <img src='https://plus.unsplash.com/premium_photo-1677343210638-5d3ce6ddbf85?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' height={200} width={200} alt='hotel'/>
            </Link>
        </div>
        <div className='imgBox'>
            <Link to='../Hotels'>
                <div className='cityName'>Stockholm</div>
                <img src='https://images.unsplash.com/photo-1562182384-08115de5ee97?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' height={200} width={200} alt='hotel'/>
            </Link>
            <img src='https://images.unsplash.com/photo-1454388683759-ee76c15fee26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
        </div>
    </>
  );
}

export default Photo; 