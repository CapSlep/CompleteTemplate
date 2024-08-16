import { useState } from "react";
import { useData } from "../../DataContext"; // Correct the path

export default function Modal({ modalType, showProduct, handleModalClick }) {
    const data = useData(); // Access data from the context

    const desiredModal = () => {
        switch (modalType) {
            case data.modalTypes.win:
                return (
                    <ModalWin
                        winProduct={showProduct}
                        handleModalClick={handleModalClick}
                    ></ModalWin>
                );
            case data.modalTypes.lose:
                return (
                    <ModalLose handleModalClick={handleModalClick}></ModalLose>
                );

            default:
                return null;
        }
    };

    if (modalType != data.modalTypes.none) {
        return (
            <>
                <section className="modal">
                    <div className="modal__wrapper">{desiredModal()}</div>
                </section>
            </>
        );
    } else {
        return null;
    }
}

function ModalWin({ winProduct, handleModalClick }) {
    return (
        <div className="modal__content">
            <img
                className="modal__img modal__img-animate"
                src={winProduct.miniImg}
                alt="Modal Win"
            />
            <h2 className="modal__heading">{winProduct.name}</h2>
            <div className="modal__text">
                <center>
                    Click "Get the coupon", fill out the form, and pay for the
                    order.
                    <br />
                    <br />
                    Receive a text message with the coupon and instructions on
                    how to activate it.
                    <br />
                    <br />
                    The coupon can be activated at any time and requires no
                    additional payment.
                </center>
            </div>
            <button
                className="button modal__button modal__button-ok"
                aria-label="Get the coupon"
                onClick={handleModalClick}
            >
                GET THE COUPON
            </button>
        </div>
    );
}

function ModalLose({ handleModalClick }) {
    const [modalLoader, setModalLoader] = useState("modal__loader");
    const [checkmark, setCheckmark] = useState("modal__checkmark");

    setTimeout(() => {
        setModalLoader("modal__loader modal__loader-complete");
        setCheckmark("modal__checkmark error");
    }, 1200);

    return (
        <div className="modal__content">
            <div className={modalLoader}>
                <div
                    className={checkmark}
                    style={{ display: "inline-block" }}
                ></div>
            </div>
            <h2 className="modal__heading">Oh, no...</h2>
            <div className="modal__text">
                <center>
                    Unfortunately, this gift is empty. You have two more
                    attempts, good luck!
                </center>
            </div>
            <button
                type="button"
                className="button modal__button modal__button-ok"
                aria-label="Try again"
                onClick={handleModalClick}
            >
                TRY AGAIN
            </button>
        </div>
    );
}
