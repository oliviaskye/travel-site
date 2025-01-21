import React from "react";
import './../../components/Live bg/Livebg.css';
import BgVideo from './../../assets/BgVideo.mp4';

const Livebg = () => {
    return (
        <div className="livebg">
            <video src={BgVideo} autoPlay muted loop className="video-bg" />
            <div className="overlay"></div>
        </div>
    );
}

export default Livebg;
