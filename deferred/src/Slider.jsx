export default function Slider({ value, deferred, onChange, name, max }) {
  return (
    <li className="slider">
      <label htmlFor={name}>
        {name}
        {value !== deferred ? ' (updating)' : ''}
      </label>
      <input
        type="range"
        id={name}
        name={name}
        min={0}
        max={max}
        value={value}
        onChange={onChange}
      />
      <output htmlFor={name}>
        Actual value: {name} | Deferred Value: {deferred}
      </output>
    </li>
  );
}
