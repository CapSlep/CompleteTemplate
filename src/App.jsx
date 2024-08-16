import Wheel from "./modules/hero/Wheel.jsx";
import Rating from "./modules/subhero/Rating.jsx";
import Modal from "./modules/modals/Modal.jsx";
import { useData } from "./DataContext"; // Import the custom hook

import { useState } from "react";

export default function App() {
    const data = useData(); // Access data from the context
    return (
        <>
            <Header data={data} />
            <MainPage data={data} /> {/* Pass data to MainPage */}
        </>
    );
}

function Header({ data }) {
    return (
        <header className="header">
            <div className="header-logo">
                <img src={data.imagesPath.headerPath} alt="Header" />
            </div>
        </header>
    );
}

function MainPage({ data }) {
    const [modalType, setModalType] = useState(data.modalTypes.none);
    const [modalProduct, setModalProduct] = useState(null);

    const subheroType = data.subheroTypes.faq;

    const closeModal = () => {
        setModalType(data.modalTypes.none);
        setModalProduct(null);
    };

    function wheelSpinCallback(loseSpin, spinRefresh, winProduct) {
        setModalProduct(winProduct);
        setTimeout(() => {
            if (loseSpin) {
                spinRefresh();
                setModalType(data.modalTypes.lose);
            } else {
                spinRefresh();
                setModalType(data.modalTypes.win);
            }
        }, 6000);
    }

    return (
        <section className="page page__container">
            <Modal
                modalType={modalType}
                handleModalClick={closeModal}
                showProduct={modalProduct}
            />
            <Wheel wheelSpinCallback={wheelSpinCallback} />
            <Rating subheroType={subheroType} />
        </section>
    );
}
