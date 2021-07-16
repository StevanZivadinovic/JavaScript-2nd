//DOM
let addDeveloper = document.querySelector("input#addDeveloper");
let formAddDeveloper = document.querySelector("form.addDeveloper");
let submitAddDeveloper = document.querySelector("#submitAddDeveloper");
let submitUpdateDeveloper = document.querySelector("#submitUpdateDeveloper");
let showList = document.querySelector(".showList");
let btnShowDeveloper = document.querySelector("#btnShowDeveloper");
// let priceShow = document.querySelector(".priceShow");

formAddDeveloper.style.display = "none";
//Add developer

addDeveloper.addEventListener("click", (e) => {
  e.preventDefault();

  formAddDeveloper.style.display = "flex";
  addDeveloper.style.display = "none";
  submitUpdateDeveloper.style.display = "none";
  submitAddDeveloper.style.display = "block";
});

//add Developer to firebase
formAddDeveloper.addEventListener("submit", (e) => {
  e.preventDefault();

  // e.preventDefault();

  //DOM - add developer for firebase
  let fullName = document.querySelector("#fullName").value;
  let emailAddress = document.querySelector("#emailAddress").value;
  let phoneNumber = document.querySelector("#phoneNumber").value;
  let location = document.querySelector("#location").value;
  let profilePicture = document.querySelector("#profilePicture").value;
  let pricePerHour = document.querySelector("#pricePerHour").value;
  let technology = document.querySelector("#technology").value;
  let description = document.querySelector("#description").value;
  let yearsOfExpirience = document.querySelector("#yearsOfExpirience").value;
  let nativeLanguage = document.querySelector("#nativeLanguage").value;
  let linkedin = document.querySelector("#linkedin").value;

  let patternForMobile = /([0-9])\w+/;

  let patternForEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  if (
    fullName.length > 0 &&
    emailAddress.length > 0 &&
    phoneNumber.length > 9 &&
    location.length > 0 &&
    profilePicture.length > 0 &&
    pricePerHour.length > 0 &&
    technology.length > 0 &&
    description.length > 0 &&
    yearsOfExpirience.length > 0 &&
    nativeLanguage.length > 0 &&
    linkedin.length > 0
    //   &&
    // (phoneNumber.match(patternForMobile) && emailAddress.match(patternForEmail))
  ) {
    db.collection("developers")
      .add({
        fullName: fullName,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber,
        location: location,
        profilePicture: profilePicture,
        pricePerHour: pricePerHour,
        technology: technology,
        description: description,
        yearsOfExpirience: yearsOfExpirience,
        nativeLanguage: nativeLanguage,
        linkedin: linkedin,
        zauzetost: [
          {
            start: new Date(),
            end: new Date(),
          },
        ],
      })
      .then((data) => {
        console.log("Developer is added");
        formAddDeveloper.style.display = "none";
        addDeveloper.style.display = "flex";
        // priceShow.style.display = 'none';
      });
  } else {
    alert("Some field is empty or invalid!");
  }
  return false;
});

addDeveloper.addEventListener("click", (e) => {
  document.querySelector("ul.showList").style.display = "none";
});

btnShowDeveloper.addEventListener("click", (e) => {
  document.querySelector("ul.showList").style.display = "block";
});
//show developers

showList.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("dugmeDelete")) {
    console.log("haj");

    let id = e.target.parentElement.getAttribute("data-id");
    console.log(id);
    if (confirm("Delete developer?")) {
      db.collection("developers")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Developer is deleted");
        });
    }
  }
});

let preuzmi1 = (data, id) => {
  let zz = document.createElement("ul");

  data.zauzetost.forEach((a, i) => {
    // console.log(a.start.seconds);
    if (i !== 0) {
      zz.innerHTML += `<li>${new Date(
        a.start.seconds * 1000
      ).toLocaleDateString()} - ${new Date(
        a.end.seconds * 1000
      ).toLocaleDateString()}</li>`;
    }
  });
  console.log(data.fullName);

  let html1 = `<tr data-id='${id}'>
    <td>${data.fullName}</td>
    <td>${zz.innerHTML}</td>
  </tr>`;

  document.querySelector(".table").innerHTML += html1;
};

let preuzmi = (data, id) => {
  console.log(id);

  let html = `<li class='listShowDeveloper' data-id='${id}'>

      <img src=${data.profilePicture} style="min-width:10%; height:10vh;">
      <div>${data.fullName}</div>
      <div>${data.emailAddress}</div>
      <div>${data.phoneNumber}</div>
      <div>${data.location}</div>
      <div>${data.pricePerHour}</div>
      <div>${data.technology}</div>
      <div>${data.description}</div>
      <div>${data.yearsOfExpirience}</div>
      <div>${data.nativeLanguage}</div>
      <div>${data.linkedin}</div>
      

     
      <button class="dugmeDelete">Delete</button>
      <button class="dugmeUpdate">Update</button>
      <button class="btnHire">Hire</button>

      
      

      </li>`;

  showList.innerHTML += html;
  let hiringAll = document.querySelector(".hiring");
  document.querySelectorAll(".btnHire").forEach((a) => {
    a.disabled = false;

    a.addEventListener("click", (e) => {
      document.querySelector(".hiringTable").style.display = "block";

      hiringAll.style.display = "block";
      document.body.append(hiringAll);
      console.log(hiringAll);
    });
  });
};

let obrisati = (id) => {
  let li = document.querySelectorAll("li");
  li.forEach((a) => {
    let dataId = a.getAttribute("data-id");
    if (dataId === id) {
      a.remove();
    }
  });
};

let obrisati1 = (id) => {
  let tr = document.querySelectorAll("tr");
  tr.forEach((a) => {
    let dataId = a.getAttribute("data-id");
    if (dataId === id) {
      a.remove();
    }
  });
};

btnShowDeveloper.addEventListener("click", (e) => {
  // document.querySelector('#btnShowDeveloper').disabled = true;
  document.querySelector(".hiringTable").style.display = "block";

  showList.innerHTML = "";
  document.querySelector(".table").innerHTML = "";

  db.collection("developers").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      let doc = change.doc.data();

      if (change.type === "added") {
        obrisati(change.doc.id);
        obrisati1(change.doc.id);

        preuzmi(doc, change.doc.id);
        preuzmi1(doc, change.doc.id);
        console.log(change.doc.id, `added`);
      } else if (change.type === "modified") {
        console.log(change.doc.id, `update`);
        obrisati(change.doc.id);
        obrisati1(change.doc.id);

        preuzmi(doc, change.doc.id);
        preuzmi1(doc, change.doc.id);
      } else if (change.type === "removed") {
        obrisati(change.doc.id);
      }
    });
  });

  
});
//update developer

let id1;
showList.addEventListener("click", (e) => {
  if (e.target.classList.contains("dugmeUpdate")) {
    formAddDeveloper.reset();
    console.log("haj");
    formAddDeveloper.style.display = "flex";

    document.querySelector(".x").addEventListener("click", (e) => {
      formAddDeveloper.reset();
    });

    id1 = e.target.parentElement.getAttribute("data-id");
    console.log(id1);
    submitUpdateDeveloper.style.display = "block";
    submitAddDeveloper.style.display = "none";
    db.collection("developers")
      .doc(id1)
      .onSnapshot((snapshot) => {
        console.log(snapshot.data());
        document.querySelector("#profilePicture").value =
          snapshot.data().profilePicture;
        document.querySelector("#fullName").value = snapshot.data().fullName;
        document.querySelector("#emailAddress").value =
          snapshot.data().emailAddress;
        document.querySelector("#phoneNumber").value =
          snapshot.data().phoneNumber;
        document.querySelector("#location").value = snapshot.data().location;
        document.querySelector("#pricePerHour").value =
          snapshot.data().pricePerHour;
        document.querySelector("#technology").value =
          snapshot.data().technology;
        document.querySelector("#description").value =
          snapshot.data().description;
        document.querySelector("#yearsOfExpirience").value =
          snapshot.data().yearsOfExpirience;
        document.querySelector("#nativeLanguage").value =
          snapshot.data().nativeLanguage;
        document.querySelector("#linkedin").value = snapshot.data().linkedin;
      });
  }
});

submitUpdateDeveloper.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(id1);
  db.collection("developers")
    .doc(id1)
    .update({
      profilePicture: document.querySelector("#profilePicture").value,
      fullName: document.querySelector("#fullName").value,
      emailAddress: document.querySelector("#emailAddress").value,
      phoneNumber: document.querySelector("#phoneNumber").value,
      location: document.querySelector("#location").value,
      pricePerHour: document.querySelector("#pricePerHour").value,
      technology: document.querySelector("#technology").value,
      description: document.querySelector("#description").value,
      yearsOfExpirience: document.querySelector("#yearsOfExpirience").value,
      nativeLanguage: document.querySelector("#nativeLanguage").value,
      linkedin: document.querySelector("#linkedin").value,
    })
    .then((data) => {
      formAddDeveloper.style.display = "none";
      formAddDeveloper.reset();
      console.log("update is finished");
      submitUpdateDeveloper.style.display = "none";
      // submitAddDeveloper.style.display = "none";
    });
});

//Browse developers

let search = document.querySelector(".search");
let btnSearch1 = document.querySelector(".search1");
search.style.display = "none";
btnSearch1.style.display = "none";
btnShowDeveloper.addEventListener("click", (e) => {
  search.style.display = "inline-block";
  btnSearch1.style.display = "inline-block";
  btnSearch1.addEventListener("click", (e) => {
    let result = search.value.trim().toLowerCase();
    console.log(result.length, typeof result);

    db.collection("developers")
      .get()
      .then((data) => {
        data.docs.forEach((a) => {
          let c = a.data().fullName.trim().toLowerCase().replace(" ", "");
          // console.log(c, c.includes(result), result);

          if (c.includes(result) && result.length > 0) {
            console.log("haj haj");
            console.log(c);

            db.collection("developers")
              .where("fullName", "!=", `${a.data().fullName}`)
              .get()
              .then((data) => {
                data.docs.forEach((a) => {
                  console.log(a);
                  obrisati(a.id);
                });
              });
            let ab = true;
            if (true) {
              db.collection("developers")
                .where("fullName", "==", `${a.data().fullName}`)
                .get()
                .then((data) => {
                  ab = false;
                  let array = [];
                  data.docs.forEach((a) => {
                    console.log(a.data());

                    array.push(a.data());
                    obrisati(a.id);
                    preuzmi(a.data(), a.id);
                  });

                  // document.querySelectorAll(".btnHire").forEach((a) => {
                  //   let hiringAll = document.querySelector(".hiring");
                  //   a.disabled = false;

                  //   a.addEventListener("click", (e) => {
                  //     document.body.append(hiringAll);
                  //   });
                  // });
                });
            }
          }
        });
      });
  });
});

let x = document.querySelector(".x");
x.addEventListener("click", (e) => {
  formAddDeveloper.classList.add("removingForm");
  setTimeout(() => {
    formAddDeveloper.style.display = "none";
    addDeveloper.style.display = "inline-block";
  }, 2000);
});

document.querySelector(".search1").addEventListener("click", (e) => {
  document.querySelector(".search1").style.transform = "translateY(.0rem)";
  document.querySelector(".search1").style.transition = ".2s all ease";
});


