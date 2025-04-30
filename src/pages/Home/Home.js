import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import "./Home.scss";

function Home() {
    useEffect(() => {
        document.title = "CtrlPlusC.com - a web-based, accountless clipboard manager!";
    }, []);
    const navigate = useNavigate();

    return (
        <div className='full-screen with-center-child'>
            <div className='home-content'>
                <h1>Welcome To CtrlPlusC.com!</h1>
                <p>Here, you can create multiple clipboards for yourself, and use them with a single keyboard command!</p>
                <button onClick={() => navigate("/clipboards")}>Well then, what are we waiting for?</button>
            </div>
        </div>
    );
}

export default Home;