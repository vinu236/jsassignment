const RegexHelper = {
  phone: /\D/g,
  postalCode: /[^A-Z0-9]/g,
};

const registeredUsers = [];
console.log(registeredUsers);
console.log(registeredUsers);
function registerUser() {
  document.getElementById("phone")?.addEventListener("input", function (e) {
    //remove all non-numeric characters from a string
    let input = e.target.value.replace(RegexHelper.phone, "");
    console.log(input);
    const inputLength = input.length;
    if (inputLength <= 3) {
      e.target.value = input;
    } else if (inputLength <= 6) {
      e.target.value = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else {
      e.target.value = `(${input.slice(0, 3)}) ${input.slice(
        3,
        6
      )}-${input.slice(6, 10)}`;
    }
  });

  document.getElementById("postalCode").addEventListener("input", function (e) {
    // remove invalid characters
    let input = e.target.value
      .toUpperCase()
      .replace(RegexHelper.postalCode, "");

    // Create a masked format
    if (input.length <= 3) {
      e.target.value = input;
    } else if (input.length <= 6) {
      e.target.value = `${input.slice(0, 3)} ${input.slice(3)}`;
    } else {
      e.target.value = `${input.slice(0, 3)} ${input.slice(3, 6)}`;
    }
  });
  clearErrors();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const province = document.getElementById("province").value;
  const phone = document.getElementById("phone").value.trim();
  const postalCode = document.getElementById("postalCode").value.trim();
  const email = document.getElementById("email").value.trim();

  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!firstName) {
    showError("firstName", "First Name is required.");
    isValid = false;
  }
  if (!lastName) {
    showError("lastName", "Last Name is required.");
    isValid = false;
  }
  if (!phone) {
    showError("phone", "Phone number is required.");
    isValid = false;
  }
  if (!postalCode) {
    showError("postalCode", "Postal Code is required.");
    isValid = false;
  }
  if (!email) {
    showError("email", "Email address is required.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError("email", "Invalid email address.");
    isValid = false;
  }

  // If all required fields are valid
  if (isValid) {
    if (isClientRegistered(email)) {
      alert("User is already registered. Please login.");
    } else {
      console.log({
        firstName,
        lastName,
        address,
        city,
        province,
        phone,
        postalCode,
        email,
      });
      registeredUsers.push({
        firstName,
        lastName,
        address,
        city,
        province,
        phone,
        postalCode,
        email,
      });

      // Clear form fields (optional)
      document.getElementById("registerForm").reset();
      alert("Registration successful! Please login.");
      window.location.href = "login.html";
    }
  }
}

// Function to clear previous error messages
function clearErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => error.remove());
}

function loginUser(event) {
  console.log(registeredUsers);
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
  let isValid = true;

  // Clear previous error messages
  clearErrors("email");

  // Email validation
  if (!email) {
    showError("email", "Email address is required.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError("email", "Invalid email address.");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  if (isClientRegistered(email)) {
    alert("Login successful! Redirecting to Services Option Page...");
  } else {
    alert("User not found. Please register first.");
  }
}

// Function to show error message
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.createElement("div");
  error.className = "error";
  error.style.color = "red";
  error.textContent = message;
  field.parentElement.appendChild(error);
}

function forgotPassword() {
  const email = document.getElementById("loginEmail").value.trim();
  if (email) {
    alert(`Password reset link has been sent to ${email}`);
  } else {
    alert("Please enter your registered email.");
  }
}

// Example implementation of isClientRegistered function (dummy data)
function isClientRegistered(email) {
  alert(email);
  const registeredUsers = ["test@example.com"];
  return registeredUsers.includes(email);
}

/* Services */
const services = [
  { id: 1, name: "Haircut", price: 30, duration: 30, stylist: "Akhil" },
  { id: 2, name: "Hair Coloring", price: 50, duration: 60, stylist: "Ajesh" },
  {
    id: 3,
    name: "Keratin Treatment	",
    price: 70,
    duration: 75,
    stylist: "Ajesh",
  },
  {
    id: 4,
    name: "Scalp Treatment",
    price: 50,
    duration: 40,
    stylist: "Akhil",
  },
  { id: 6, name: "Bridal Styling", price: 50, duration: 60, stylist: "Akash" },
  { id: 7, name: "Keratin Treatment", price: 50, duration: 60, stylist: "Akhil" },
  { id: 8, name: "Hair Extensions", price: 50, duration: 60, stylist: "Ajesh" },
  { id: 9, name: "Keratin Treatment", price: 50, duration: 60, stylist: "Abin" },
  {
    id: 10,
    name: "Hair Extensions",
    price: 50,
    duration: 60,
    stylist: "Akhil",
  },
  {
    id: 11,
    name: "Bridal Trial",
    price: 50,
    duration: 60,
    stylist: "Abin",
  },
  {
    id: 12,
    name: "Beard Trim	",
    price: 50,
    duration: 60,
    stylist: "Akash",
  },
];



let selectedServices = [];

// Function to hide the "Select Services" message
function hideServiceMessage() {
  const serviceText = document.getElementById("service-text");
  serviceText.innerHTML = "";
}

// Function to show the "No service selected" message if no service is selected
function updateNoServiceText() {
  const noServiceText = document.getElementById("noServiceSelectedText");

  // Show the "No service selected" text if no services are selected
  if (selectedServices.length === 0) {
    noServiceText.style.display = "block"; // Show the text
  } else {
    noServiceText.style.display = "none"; // Hide the text
  }
}

// On initial page load, populate the stylist dropdown
document.addEventListener("DOMContentLoaded", function () {
  const stylistDropdown = document.getElementById("stylist");
  const stylists = [...new Set(services.map(service => service.stylist))];

  stylists.forEach(stylist => {
    const option = document.createElement("option");
    option.value = stylist;
    option.textContent = stylist;
    stylistDropdown.appendChild(option);
  });

  hideServiceMessage();  // Hide the "Select Services" message initially
  updateNoServiceText(); // Check if any services are selected

  stylistDropdown.addEventListener("change", filterServicesByStylist);
});

// Function to filter services by stylist and show checkboxes
function filterServicesByStylist() {
  const stylist = document.getElementById("stylist").value;
  const serviceTable = document.getElementById("service-table");
  const serviceTableBody = document.getElementById("service-table").querySelector("tbody");
  const noDataText = document.getElementById("no-data-available");
  const servicesByStylist = services.filter(service => service.stylist === stylist);

  // Clear previous list
  serviceTableBody.innerHTML = '';

  // If no services available for the selected stylist, show "No data available"
  if (servicesByStylist.length === 0) {
    serviceTable.style.display = "none"; // Hide the table
    noDataText.style.display = "block"; // Show the "No data available" message
    document.getElementById("noServiceSelectedText").style.display = "none"; // Hide the "No service selected" text
  } else {
    // If services are available, create rows for each service
    serviceTable.style.display = "table"; // Show the table
    noDataText.style.display = "none"; // Hide the "No data available" message

    servicesByStylist.forEach(service => {
      const row = document.createElement("tr");

      // Checkbox cell
      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = JSON.stringify(service);
      checkbox.id = service.id;

      // Check if this service is already in selectedServices and check the checkbox
      checkbox.checked = selectedServices.some(s => s.id === service.id);
      checkbox.addEventListener("change", updateSelectedServices);
      checkboxCell.appendChild(checkbox);

      // Name cell
      const nameCell = document.createElement("td");
      nameCell.textContent = service.name;

      // Price cell
      const priceCell = document.createElement("td");
      priceCell.textContent = `$${service.price}`;

      // Duration cell
      const durationCell = document.createElement("td");
      durationCell.textContent = `${service.duration} mins`;

      row.appendChild(checkboxCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(durationCell);

      serviceTableBody.appendChild(row);
    });

    // Hide the "No service selected" text because services are now available
    updateNoServiceText();
  }
}

// Update selected services based on checkbox state
function updateSelectedServices(event) {
  const service = JSON.parse(event.target.value);

  // If checked, add the service to the list, otherwise remove it
  if (event.target.checked) {
    if (!selectedServices.find(s => s.id === service.id)) {
      selectedServices.push(service);
    }
  } else {
    selectedServices = selectedServices.filter(s => s.id !== service.id);
  }

  // Update the "No service selected" text visibility based on selected services
  updateNoServiceText();

  // Update total cost and duration
  updateTotalCostAndDuration();
}

// Function to update the total cost and duration
function updateTotalCostAndDuration() {
  const totalCost = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  document.getElementById("totalCost").textContent = totalCost;
  document.getElementById("totalDuration").textContent = totalDuration;
}