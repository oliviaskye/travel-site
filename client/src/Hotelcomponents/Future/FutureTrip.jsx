import React from "react";
import futureTripCSS from "./FutureTrip.module.css"

import image3 from '@assets/newyork.jpg'
import image2 from '@assets/paris.jpg'
import image1 from '@assets/ski.jpg'

function FutureTrip () {
    return (
        <div className={`${futureTripCSS.FutureTrip_Wrapper} section`} id="inspiration">
            <div className={futureTripCSS.FutureTripCards}>
                <div className={futureTripCSS.FutureTripCard}>
                    <div className={futureTripCSS.FutureTripCardImage}>
                        <img src={image1} alt="" />
                    </div>
                    <h3>10 Europian ski resort you should visit this winter</h3>
                    <p>jan-06-2024</p>
                </div>
                <div className={futureTripCSS.FutureTripCard}>
                    <div className={futureTripCSS.FutureTripCardImage}>
                        <img src={image2} alt="" />
                    </div>
                    <h3>Visiting Best location with us? </h3>
                    <p>jan-14-2024</p>
                </div>
                <div className={futureTripCSS.FutureTripCard}>
                    <div className={futureTripCSS.FutureTripCardImage}>
                        <img src={image3} alt="" />
                    </div>
                    <h3>Where  can I go? 5 Amazing Countryies that open right now!</h3>
                    <p>jan-06-2024</p>
                </div>
            </div>

        </div>
    )
}

export default FutureTrip