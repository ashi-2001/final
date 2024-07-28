const fetchdata = async () => {
  const response = await fetch("employee.json");
  const data = await response.json();
  return data.people;
};

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const name = data.get("name").toLowerCase();
  let list = await fetchdata();

  const user = list.filter((usr) => {
    return usr.name.toLowerCase() === name;
  });
  if (user.length === 0) {
    alert("User not found");
    return;
  }
  const row = document.getElementById("row");
  row.innerHTML = `
  <td>${user[0].name}</td>
  <td>${user[0].place}</td>
  <td>${user[0].dateOfBirth}</td>
  <td>${user[0].age}</td>
  <td>${user[0].mobileNumber}</td>
  <td>${user[0].aadharNumber}</td>
  `;
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
