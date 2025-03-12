import React from "react";
import futureTripCSS from "./FutureTrip.module.css"

import image3 from '@assets/Blog3.png'
import image2 from '@assets/Blog2.png'
import image1 from '@assets/Blog1.png'

function FutureTrip () {
    return (
        <div className={`${futureTripCSS.FutureTrip_Wrapper} section`} id="inspiration">
            <div className={futureTripCSS.FutureTripCards}>
                <div className={futureTripCSS.FutureTripCard}>
                    <div className={futureTripCSS.FutureTripCardImage}>
                        <img src={image1} alt="" />
                    </div>
                    <h3>10Europian ski Destination you should visit this winter</h3>
                    <p>jan-06-2024</p>
                </div>
                <div className={futureTripCSS.FutureTripCard}>
                    <div className={futureTripCSS.FutureTripCardImage}>
                        <img src={image2} alt="" />
                    </div>
                    <h3>Booking Travel To the most Beautiful Places in the World</h3>
                    <p>jan-14-2024</p>
                </div>
                <div className={futureTripCSS.FutureTripCard}>
                    <div className={futureTripCSS.FutureTripCardImage}>
                        <img src={image3} alt="" />
                    </div>
                    <h3>Where  can i go? 5 Amazing Countryies that open right now</h3>
                    <p>jan-06-2024</p>
                </div>
            </div>

        </div>
    )
}

export default FutureTrip