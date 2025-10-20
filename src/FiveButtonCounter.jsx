import { useState, useEffect } from 'react';
import './styles.css';

export default function FiveButtonCounter() {
  const prayers = ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'];

  const [counter, setCounter] = useState(() => {
    const saved = localStorage.getItem('counterValue');
    return saved ? Number(saved) : 10;
  });

  const [buttons, setButtons] = useState(() => {
    const saved = localStorage.getItem('buttonStates');
    return saved ? JSON.parse(saved) : [false, false, false, false, false];
  });

  const [flash, setFlash] = useState(false);

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('counterValue', counter);
  }, [counter]);

  useEffect(() => {
    localStorage.setItem('buttonStates', JSON.stringify(buttons));
  }, [buttons]);

  const handleToggle = (index) => {
    const newButtons = [...buttons];
    newButtons[index] = !newButtons[index];
    setButtons(newButtons);

    if (newButtons.every((b) => b)) {
      setCounter((prev) => prev - 1);
      setFlash(true);
      setTimeout(() => {
        setButtons([false, false, false, false, false]);
        setFlash(false);
      }, 500);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // Only allow positive integers (no empty, no negative)
    if (/^\d*$/.test(value)) {
      const num = value === '' ? 0 : Number(value);
      setCounter(num);
      localStorage.setItem('counterValue', num);
    }
  };

  return (
    <div className="container">
      <div className={`card ${flash ? 'flash' : ''}`}>
        <h1 className="title">عداد الصلوات</h1>

        <div className="counter">
          <label>العداد:</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={counter}
            onChange={handleChange}
            className="counter-input"
            style={{ width: `${String(counter).length + 2}ch` }}
          />
        </div>

        <div className="button-grid">
          {buttons.map((active, i) => (
            <button
              key={i}
              onClick={() => handleToggle(i)}
              className={active ? 'btn active' : 'btn'}
            >
              {prayers[i]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
