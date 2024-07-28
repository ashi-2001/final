function handleSubmit(event) {
  event.preventDefault();
  const list = JSON.parse(localStorage.getItem("list"));
  const data = new FormData(event.target);
  const empId = data.get("empID");
  const employee = list.filter((emp) => emp.empId === empId);
  
  
  

  if (employee.length === 0) {
    alert("Employee ID doesn't exist");
    return
  }

  document.getElementById("result").classList.remove("d-none")

  document.getElementById(
    "result-paragraph"
  ).innerHTML = `<h6>Name:-  ${employee[0].name}</h6><br>
    <h6>Employee ID:-</h6>${employee[0].empId} <br>
    <h6>Date of Birth:-</h6>${employee[0].dateOfBirth} <br>
    <h6>Mobile:-</h6>${employee[0].mobile}<br>
    <h6>Place:-</h6>${employee[0].place}<br>
    <h6>emailID:-</h6>${employee[0].emailId}<br>
    <h6>Aadhar Number:-</h6>${employee[0].aadharNumber}<br>
    <h6>PAN:-</h6>${employee[0].PAN}<br>
    <h6>Attached file:-</h6>${employee[0].file}<br>`;
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
