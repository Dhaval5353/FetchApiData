let api_data;

function get() {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer 9fac04b014b1d01f3a9bb3f24c6ba401c6b2972ca7f7389232c37caead8f3f3c"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://gorest.co.in/public/v2/users", requestOptions)
    .then((response) => response.json())
    .then((result) => printdata(result))
    .catch((error) => console.log("error", error));
}

function printdata(data) {
  api_data = data;
  let table = `<table class="table">
        <thead class ="table-dark">
          <tr>
          <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">gender</th>
            <th scope="col">Status</th>
            <th scope="col" colspan="2"></th>
          </tr>
        </thead>
        <tbody class="table-group-divider">`;

  let tr = "";
  for (let i of data) {
    tr = tr + "<tr>";

    tr = tr + `<td>${i.id}</td>`;
    tr = tr + `<td>${i.name}</td>`;
    tr = tr + `<td>${i.email}</td>`;
    tr = tr + `<td>${i.gender}</td>`;
    tr = tr + `<td>${i.status}</td>`;
    tr =
      tr +
      `<td><button class="btn btn-primary" value="${i.id}" onclick="updateData(this.value)">Update</button></td>`;
    tr =
      tr +
      `<td><button class="btn btn-primary" value="${i.id}" onclick="deleteuser(this.value)">Delete</button></td>`;

    tr = tr + "</tr>";
  }
  table = table + tr + `</tbody></table>`;

  document.getElementById("table").innerHTML = table;
}

function updateData(id) {
  const name = document.getElementById("eName").value;
  const email = document.getElementById("eEmail").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const status = document.querySelector('input[name="status"]:checked').value;
  for (let i of api_data) {
    if (i.id == id) {
      name.value = i.name;
      email.value = i.email;
      // if (i.gender == "male") {
      //   male.checked = true;
      // }
      // if (i.gender == "female") {
      //   female.checked = true;
      // }
      // if (i.status == "active") {
      //   active.checked = true;
      // } else {
      //   inactive.checked = true;
      // }
    }
  }

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer 9fac04b014b1d01f3a9bb3f24c6ba401c6b2972ca7f7389232c37caead8f3f3c"
  );

  var raw = JSON.stringify({
    name: name,
    email: email,
    gender: gender,
    status: status,
  });

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://gorest.co.in/public/v2/users/" + id, requestOptions)
    .then((response) => response.json())
    .then((result) => get())
    .catch((error) => console.log("error", error));
}

function addData() {
  const name = document.getElementById("eName").value;
  const email = document.getElementById("eEmail").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const status = document.querySelector('input[name="status"]:checked').value;

  console.log(name);
  console.log(email);
  console.log(gender);
  console.log(name);
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer 9fac04b014b1d01f3a9bb3f24c6ba401c6b2972ca7f7389232c37caead8f3f3c"
  );

  var raw = JSON.stringify({
    name: name,
    gender: gender,
    email: email,
    status: status,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://gorest.co.in/public/v2/users", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      get();
    })
    .catch((error) => console.log("error", error));
}

function deleteuser(id) {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer 9fac04b014b1d01f3a9bb3f24c6ba401c6b2972ca7f7389232c37caead8f3f3c"
  );

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://gorest.co.in/public/v2/users/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => get())
    .catch((error) => console.log("error", error));
}
