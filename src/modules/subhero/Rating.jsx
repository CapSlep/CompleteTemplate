import { useData } from "../../DataContext"; // Correct the path

export default function RatingSection() {
    return (
        <div className="reviews__container">
            <RatingBox></RatingBox>
            <CommentsBlock></CommentsBlock>
        </div>
    );
}

function RatingBox() {
    const data = useData(); // Access data from the context
    return (
        <div className="ratingbox">
            <div className="rating">
                <div className="rat">
                    <h2 className="h2rat">{data.reviews.title}</h2>
                    <span className="percentrat">{data.reviews.percent}%</span>
                    <span className="recrat">{data.reviews.description}</span>
                    <div className="starbox">
                        <div className="stars">
                            <div className="rating__inactive-stars">
                                <div
                                    className="rating__active-stars"
                                    style={{
                                        width: `${data.reviews.percent}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="starstext">
                            {(data.reviews.percent / 20).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CommentsBlock() {
    const data = useData(); // Access data from the context
    return (
        <div className="reviews">
            {data.reviewsArr.map((comment) => {
                return (
                    <Comment key={comment.name} commentData={comment}></Comment>
                );
            })}
        </div>
    );
}

function Comment({ commentData }) {
    const data = useData(); // Access data from the context
    const reviewImage = () => {
        if (commentData.image != null) {
            return (
                <div className="mt-2">
                    <img
                        className="review__image"
                        src={commentData.image}
                        alt="Review Image"
                    ></img>
                </div>
            );
        } else {
            return null;
        }
    };

    const boughtProduct = (productId) => {
        const boughtProductData = data.products.find((product) => {
            if (productId == product.id) {
                return product;
            }
        });

        if (boughtProductData != null) {
            return (
                <div>
                    <div className="review__bought-product">
                        <img src={boughtProductData.miniImg} alt="" />
                        {boughtProductData.name} ({boughtProductData.id})
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="review">
            <div className="rating__header">
                <div className="stars">
                    <div className="rating__inactive-stars">
                        <div
                            className="rating__active-stars"
                            style={{
                                width: `${commentData.rating}%`,
                            }}
                        ></div>
                    </div>
                </div>
                <span className="review-username">{commentData.name}</span>
                <span>{commentData.time}</span>
            </div>
            <b>{commentData.header}</b>
            <p className="mt-2">{commentData.review}</p>
            {reviewImage()}
            {boughtProduct(commentData.product)}
        </div>
    );
}
