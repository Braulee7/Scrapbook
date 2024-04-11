import "./index.css";

function SliderInput({ value, children, set, min = -200, max = 200 }) {
  return (
    <label>
      <code>{children}</code>
      <input
        className="slider-input"
        value={value}
        type="range"
        min={min}
        max={max}
        onChange={(e) => set(parseFloat(e.target.value))}
        step={0.01}
      />
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => set(parseFloat(e.target.value) || 0)}
      />
    </label>
  );
}

export default SliderInput;
