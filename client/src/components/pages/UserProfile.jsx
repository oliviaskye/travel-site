import { useState, useEffect, React } from "react";
import axios from "axios";

const UserProfile = () => {

    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const User = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/User");
                setUser(res.data);
            } catch (error) {
                //:(
                console.error(error);
            }
        };
        User();
    }, []);
    
    return(
        <>
            {/* <Header/> */}
            <h2>My Profile</h2>

            <div>
                <p>Hello, ${user.name}</p>
            </div>
        </>
    )
}
export default UserProfile;