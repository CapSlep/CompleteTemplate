import { useData } from "../../DataContext";

export default function FaqList() {
    return (
        <div className="subhero__container">
            <HeadingBox></HeadingBox>
            <FaqsBlock></FaqsBlock>
        </div>
    );
}

function HeadingBox() {
    return (
        <div className="heading-box">
            <div className="heading__content-outer">
                <div className="heading__content-inner">
                    <span className="faq-text">FAQ</span>
                </div>
            </div>
        </div>
    );
}

function FaqsBlock() {
    const data = useData(); // Access data from the context
    return (
        <div className="info__content">
            {data.faqs.map((faqElement) => {
                return (
                    <div className="info__element">
                        <b className="faq-question">{faqElement.question}</b>
                        <p className="faq-answer">{faqElement.answer}</p>
                    </div>
                );
            })}
        </div>
    );
}
