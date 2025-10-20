import { useState } from 'react';
import './styles.css';

export default function FiveButtonCounter() {
  const prayers = ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'];
  const [buttons, setButtons] = useState([false, false, false, false, false]);
  const [counter, setCounter] = useState(10);
  const [flash, setFlash] = useState(false);

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

  return (
    <div className="container">
      <div className={`card ${flash ? 'flash' : ''}`}>
        <h1 className="title">عداد الصلوات</h1>

        <div className="counter">
          <label>Counter:</label>
          <input
            type="number"
            value={counter}
            onChange={(e) => setCounter(Number(e.target.value))}
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
