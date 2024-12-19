import { useEffect } from "react";
import "./Three.css"; // Import your CSS file

function Three () {
  useEffect(() => {
    const radios = document.querySelectorAll<HTMLInputElement>("input[type='radio']");

    radios.forEach((radio) => {
      let isChecked: boolean;

      const handleEvent = (event: MouseEvent | Event) => {
        if (event.type === "click") {
          if (isChecked) {
            isChecked = (radio.checked = false); // Uncheck and update status
          } else {
            isChecked = true; // Update status
          }
        } else if (event.type === "mousedown") {
          isChecked = radio.checked; // Get the status before browser sets it
        }
      };

      radio.addEventListener("mousedown", handleEvent);
      radio.addEventListener("click", handleEvent);

      // Cleanup event listeners
      return () => {
        radio.removeEventListener("mousedown", handleEvent);
        radio.removeEventListener("click", handleEvent);
      };
    });
  }, []);

  return (
    <form>
      <li>
        <input name="r" type="radio" id="red" />
        <label htmlFor="red">Red Ranger</label>
      </li>
      <li>
        <input name="r" type="radio" id="blue" />
        <label htmlFor="blue">Blue Ranger</label>
      </li>
      <li>
        <input name="r" type="radio" id="black" />
        <label htmlFor="black">Black Ranger</label>
      </li>
      <li>
        <input name="r" type="radio" id="pink" />
        <label htmlFor="pink">Pink Ranger</label>
      </li>
      <li>
        <input name="r" type="radio" id="yellow" />
        <label htmlFor="yellow">Yellow Ranger</label>
      </li>
    </form>
  );
};

export default Three;