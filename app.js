const minAge = 18;
const maxAge = 60;

var listOfEmployee = [];

if (localStorage.getItem("list")) {
  listOfEmployee = JSON.parse(localStorage.getItem("list"));
}

function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);

  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  const dayDifference = today.getDate() - birthDateObj.getDate();

  // Adjust age if the current month and day are before the birth month and day
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const name = `${data.get("firstname")} ${data.get("lastname")}`;
  const dateOfBirth = data.get("dob");
  const mobile = data.get("mobile");
  const place = data.get("place");
  const emailId = data.get("email");
  const aadharNumber = data.get("aadhar");
  const PAN = data.get("PAN");
  const file = data.get("file").name;
  const age = calculateAge(dateOfBirth);

  if (age < minAge) {
    alert(`Minimum age is ${minAge}`);
    return;
  } else if (age > maxAge) {
    alert(`Maximum age is ${maxAge}`);
    return;
  }
  const num_string = mobile.toString();
  const aadhar_string = aadharNumber.toString();
  const empId =
    name.substring(0, 2) + num_string.slice(-2) + aadhar_string.slice(-2);
  const existing = listOfEmployee.filter((emp) => empId === emp.empId);
  console.log(existing);
  if (existing.length > 0) {
    alert(`Employee already exists with ID = ${empId}`);
    return;
  }
  listOfEmployee.push({
    name,
    dateOfBirth,
    mobile,
    place,
    emailId,
    aadharNumber,
    PAN,
    file,
    empId,
  });
  localStorage.setItem("list", JSON.stringify(listOfEmployee));

  document.getElementById("result").classList.remove("d-none");

  document.getElementById(
    "result-paragraph"
  ).innerHTML = `<h6>Name:-  ${name}</h6><br>
    <h6>Employee ID:-</h6>${empId} <br>
    <h6>Date of Birth:-</h6>${dateOfBirth} <br>
    <h6>Mobile:-</h6>${mobile}<br>
    <h6>Place:-</h6>${place}<br>
    <h6>emailID:-</h6>${emailId}<br>
    <h6>Aadhar Number:-</h6>${aadharNumber}<br>
    <h6>PAN:-</h6>${PAN}<br>
    <h6>Attached file:-</h6>${file}<br>`;
}
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
