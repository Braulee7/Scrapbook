import button from "../../assets/svg/arrow-button.svg";
import "./index.css";
// Navigation button
// orientation: 0 is left, 1 is right
function NavigationButton({ orientation, handleClick }) {
  return (
    <>
      <img
        data-testid="navigation-button"
        onClick={handleClick}
        className={orientation === 1 ? "right navigation" : "navigation"}
        src={button}
        alt={orientation === 1 ? "Go to next page" : "Go to previous page"}
      />
    </>
  );
}

export default NavigationButton;
