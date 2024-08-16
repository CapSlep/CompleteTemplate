import { useData } from "../../DataContext"; // Correct the path

export default function SubheroSection({ subheroType }) {
    const data = useData(); // Access data from the context

    let chosenHeader;
    let chosenContent;

    function chooseType() {
        switch (subheroType) {
            case data.subheroTypes.faq:
                console.log("faq");
                chosenHeader = <span className="faq-text">FAQ</span>;
                chosenContent = data.faqs.map((faqElement) => {
                    return (
                        <div className="info__element">
                            <b className="faq-question">
                                {faqElement.question}
                            </b>
                            <p className="faq-answer">{faqElement.answer}</p>
                        </div>
                    );
                });
                return;

            case data.subheroTypes.shortReviews:
                console.log("review");
                chosenHeader = <RatingHeading></RatingHeading>;
                chosenContent = data.reviewsArr.map((comment) => {
                    return (
                        <Comment
                            key={comment.name}
                            commentData={comment}
                        ></Comment>
                    );
                });
                return;
            default:
                console.error("No shuch type: " + data.subheroTypes.faq);
                return null;
        }
    }

    chooseType();
    return (
        <div className="subhero__container">
            <div className="heading-box">
                <div className="heading__content-outer">
                    <div className="heading__content-inner">{chosenHeader}</div>
                </div>
            </div>
            <div className="info__content">{chosenContent}</div>
        </div>
    );
}

function RatingHeading({}) {
    const data = useData(); // Access data from the context

    return (
        <>
            <h2 className="heading__content-header">{data.reviews.title}</h2>
            <span className="percentage">{data.reviews.percent}%</span>
            <span className="heading__content-description">
                {data.reviews.description}
            </span>
            <div className="starbox">
                <div className="stars">
                    <div className="stars-inactive">
                        <div
                            className="stars-active"
                            style={{
                                width: `${data.reviews.percent}%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className="stars-text">
                    {(data.reviews.percent / 20).toFixed(2)}
                </div>
            </div>
        </>
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
        <div className="info__element">
            <div className="rating__header">
                <div className="stars">
                    <div className="stars-inactive">
                        <div
                            className="stars-active"
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
