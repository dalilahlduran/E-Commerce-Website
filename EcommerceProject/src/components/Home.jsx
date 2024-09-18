import review_img from "../img/reviews.jpg";
import logo from "../img/Logo-white.svg";
import logo2 from "../img/Pickle.svg";
import '../styles/Home.css';

function Home() {
    return (
        <header>
            <div className = "head-text">
            <div className = "head-image">
                <img src={logo} alt="Background"/>
            </div>
            <div class='text-on-image'>
            <h3>Help the world with your opinion! </h3>
            <p>
                Use Pickle to rate all your favorite products and help the world find quality by providing your truth. Pickle it!
            </p>
            </div>
            </div>
        </header>
    );
}

export default Home;