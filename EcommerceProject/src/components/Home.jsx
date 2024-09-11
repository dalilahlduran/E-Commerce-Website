import review_img from "../img/reviews.jpg"

function Home() {
    return (
        <section>
            <h1>ECommerce Website</h1>
            <img src={review_img}/>
            <p>
                Help the world with your opinion! 
                Use the Ecommerce Reviews website to find all your favorite products and leave reviews, as well as comment on other people's thoughts.
            </p>
        </section>
    );
}

export default Home;