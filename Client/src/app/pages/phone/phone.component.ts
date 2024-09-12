import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    const inputs = document.querySelectorAll("input");
    const button = document.querySelector("button");

    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e: KeyboardEvent) => {
        const currentInput = input as HTMLInputElement;
        const nextInput = input.nextElementSibling as HTMLInputElement;
        const prevInput = input.previousElementSibling as HTMLInputElement;

        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }

        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }

        if (e.key === "Backspace") {
          inputs.forEach((input, index2) => {
            if (index1 <= index2 && prevInput) {
              input.setAttribute("disabled", "true");
              input.value = "";
              prevInput.focus();
            }
          });
        }

        // Null check for the button
        if (button) {
          if (!inputs[3].hasAttribute("disabled") && inputs[3].value !== "") {
            button.classList.add("active");
          } else {
            button.classList.remove("active");
          }
        }
      });
    });

    window.addEventListener("load", () => (inputs[0] as HTMLInputElement).focus());
  }
}
