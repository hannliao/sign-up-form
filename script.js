const fields = [
  {
    id: "email",
    error: "Enter valid email",
  },
  {
    id: "phone",
    error: "Too short",
  },
  {
    id: "pwd",
    error: "At least 8 characters",
  },
  {
    id: "confirmPwd",
    error: "Passwords do not match",
  },
];

const checkFields = () => {
  let allValid = true;

  fields.forEach((obj) => {
    const field = document.getElementById(obj.id);
  
    field.addEventListener("input", (event) => {
      const msg = field.nextElementSibling;
      const pwd = document.getElementById("pwd");
  
      if (field.id === "confirmPwd" && field.value !== pwd.value) {
        msg.textContent = obj.error;
        allValid = false;
      } else if (field.validity.valid) {
        msg.textContent = "";
        allValid = true;
      } else if (field.id === "phone" && field.validity.patternMismatch) {
        msg.textContent = "Numbers only";
        allValid = false;
      } else {
        msg.textContent = obj.error;
        allValid = false;
      }
    });
  });
  return allValid;
}

checkFields();

const country = document.getElementById("country");
country.onchange = checkZip;

const zipcode = document.getElementById("zipcode");
zipcode.oninput = checkZip;

function checkZip() {
  const constraints = {
    pf: [
      "^987\\d{2}$",
      "French Polynesia ZIPs start with '987' followed by 2 digits (e.g. 98745)",
    ],
    jp: [
      "^\\d{3}-\\d{4}$",
      "Japan ZIPs have 3 digits, a hyphen, then 4 digits (e.g. 987-6543)",
    ],
    kr: [
      "^\\d{3}-\\d{3}$",
      "South Korea ZIPs have 3 digits, a hyphen, then 3 digits (e.g. 987-654)",
    ],
    tw: [
      "^\\d{3}(\\d{2})?$",
      "Taiwan ZIPs have 3 digits optionally followed by 2 digits (e.g. 987 or 98765)",
    ],
    us: [
      "^\\d{5}(?:-\\d{4})?$",
      "United States ZIPs have 5 digits optionally followed by a space or hyphen, then 4 digits (e.g. 98765 or 98765-4321)",
    ],
  };

  const msg = document.querySelector(".zip.error");
  const constraint = new RegExp(constraints[country.value][0], "");

  if (constraint.test(zipcode.value)) {
    msg.textContent = "";
    return true;
  } else {
    msg.textContent = constraints[country.value][1];
    return false;
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const fieldsValid = checkFields();
  const zipValid = checkZip();

  const svgText = document.querySelector(".header h1");

  if (fieldsValid && zipValid) {
    svgText.textContent = "success";
  } else {
    svgText.textContent = "try again";
  }
});
