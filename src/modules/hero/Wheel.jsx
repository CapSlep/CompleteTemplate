import { useState } from "react";
import { useData } from "../../DataContext"; // Correct the path

export default function Wheel({ wheelSpinCallback }) {
    const data = useData(); // Access data from the context

    const [spinStyle, setSpinStyle] = useState({});
    const [loseSpins, setLoseSpins] = useState(1);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const products = data.products;
    const wheelImagesPaths = data.imagesPath.wheelImages;

    const handleWheelButtonClick = () => {
        setButtonDisabled(true);
        let rotateValue;
        let currentDish = null;
        let loseSpinsAmount = loseSpins;
        const dishes = [
            {
                fromTo: [0, 0.33],
                rotate: "3364",
                product: products[0],
            },
            {
                fromTo: [0.34, 0.66],
                rotate: "3550",
                product: products[1],
            },
            {
                fromTo: [0.67, 1],
                rotate: "3475",
                product: products[2],
            },
        ];

        const spinRefresh = () => {
            setSpinStyle({
                transform: `rotate(${0}deg)`,
                transition: "none",
            });

            setButtonDisabled(false);
        };

        if (loseSpinsAmount > 0) {
            rotateValue = 4250;
            loseSpinsAmount = loseSpinsAmount - 1;
            setLoseSpins(loseSpinsAmount);
        } else {
            const randomValue = Math.random().toFixed(2);
            currentDish = dishes.find(
                (dish) =>
                    randomValue >= dish.fromTo[0] &&
                    randomValue <= dish.fromTo[1]
            );
            rotateValue = currentDish.rotate;
        }

        wheelSpinCallback(loseSpins > 0, spinRefresh, currentDish?.product);
        setSpinStyle({ transform: `rotate(${rotateValue}deg)` });
    };

    return (
        <main className="wheel">
            <div className="wheel__item">
                <span className="wheel__item-selector"></span>
                <WheelImage
                    wheelImg={wheelImagesPaths.wheelWhite}
                    style={spinStyle}
                />
                <WheelButton
                    clickHandler={handleWheelButtonClick}
                    buttonDisabled={buttonDisabled}
                />
            </div>
            <div className="wheel__description">
                <p>{data.wheelDescription}</p>
            </div>
        </main>
    );
}

function WheelButton({ clickHandler, buttonDisabled }) {
    return (
        <button
            onClick={clickHandler}
            type="button"
            className="wheel__btn"
            disabled={buttonDisabled}
        ></button>
    );
}

function WheelImage({ wheelImg, style }) {
    return (
        <img
            className="wheel__item-img"
            src={wheelImg}
            alt="Wheel"
            style={style}
        />
    );
}
