//DOM
let addDeveloper = document.querySelector("input#addDeveloper");
let formAddDeveloper = document.querySelector("form.addDeveloper");
let submitAddDeveloper = document.querySelector("#submitAddDeveloper");
// let priceShow = document.querySelector(".priceShow");

formAddDeveloper.style.display = "none";
//Add developer

addDeveloper.addEventListener("click", (e) => {
  e.preventDefault();

  formAddDeveloper.style.display = "flex";
  addDeveloper.style.display = "none";
});

//add Developer to firebase
submitAddDeveloper.addEventListener("click", (e) => {
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




  e.preventDefault();

  if (
    fullName.length > 0 &&
    emailAddress.length > 0 &&
    phoneNumber.length > 0 &&
    location.length > 0 &&
    profilePicture.length > 0 &&
    pricePerHour.length > 0 &&
    technology.length > 0 &&
    description.length > 0 &&
    yearsOfExpirience.length > 0 &&
    nativeLanguage.length>0 &&
    linkedin.length>0
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
        linkedin:linkedin,
        zauzetost:[{start:new Date('03-01-1994').getTime(), end:new Date('04-01-1994').getTime()}]
      })
      .then((data) => {
        console.log("Developer is added");
        formAddDeveloper.style.display = "none";
        addDeveloper.style.display = "flex";
        // priceShow.style.display = 'none';
      });
  } else {
    alert("Fill all fields");
  }
});

//show cars

let showList = document.querySelector(".showList");
let btnShowDeveloper = document.querySelector("#btnShowDeveloper");

showList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("dugmeDelete")) {
    console.log("haj");

    let id = e.target.parentElement.getAttribute("data-id");
    console.log(id);

    db.collection("developers")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Developer is deleted");
      });
  }
});

let preuzmi = (data, id) => {
  console.log(id);

  let html = `<li class='listShowDeveloper' data-id='${id}'>

      <img src=${data.profilePicture} style="width:100px;">
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

btnShowDeveloper.addEventListener("click", (e) => {
  showList.innerHTML = "";

  db.collection("developers").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      let doc = change.doc.data();

      if (change.type === "added") {
        // obrisati(change.doc.id);
        preuzmi(doc, change.doc.id);
      } else if (change.type === "modified") {
        console.log(change.doc.id, `update`);
        obrisati(change.doc.id);
        preuzmi(doc, change.doc.id);
      } 
      else if (change.type === "removed") {
        if (confirm("Delete developer?")) {
          obrisati(change.doc.id);
        }
      }
    });
  });
});
//update car
let submitUpdateDeveloper = document.querySelector("#submitUpdateDeveloper");

showList.addEventListener("click", (e) => {
  if (e.target.classList.contains("dugmeUpdate")) {
    console.log("haj");
    formAddDeveloper.style.display = "flex";

    let id = e.target.parentElement.getAttribute("data-id");
    console.log(id);
    submitUpdateDeveloper.style.display = "block";
    submitAddDeveloper.style.display = "none";
    db.collection("developers")
      .doc(id)
      .onSnapshot((snapshot) => {
        console.log(snapshot.data());
        document.querySelector("#profilePicture").value = snapshot.data().profilePicture;
        document.querySelector("#fullName").value = snapshot.data().fullName;
        document.querySelector(
          "#emailAddress"
        ).value = snapshot.data().emailAddress;
        document.querySelector("#phoneNumber").value = snapshot.data().phoneNumber;
        document.querySelector(
          "#location"
        ).value = snapshot.data().location;
        document.querySelector(
          "#pricePerHour"
        ).value = snapshot.data().pricePerHour;
        document.querySelector(
          "#technology"
        ).value = snapshot.data().technology;
        document.querySelector(
          "#description"
        ).value = snapshot.data().description;
        document.querySelector("#yearsOfExpirience").value = snapshot.data().yearsOfExpirience;
        document.querySelector("#nativeLanguage").value = snapshot.data().nativeLanguage;
        document.querySelector("#linkedin").value = snapshot.data().linkedin;
      });

    submitUpdateDeveloper.addEventListener("click", (e) => {
      e.preventDefault();

      db.collection("developers")
        .doc(id)
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
          linkedin: document.querySelector("#linkedin").value
        });
      formAddDeveloper.style.display = "none";
    });
  }
});

let search = document.querySelector(".search");
let btnSearch1 = document.querySelector(".search1");
search.style.display = "none";
btnSearch1.style.display = "none";
//Browse cars
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
          let c = a.data().fullName.trim().toLowerCase().replace(' ','');
          // console.log(c, c.includes(result), result);

          if (c.includes(result) && result.length > 0) {
            console.log("haj haj");
            console.log(c);

            db.collection("developers")
            .where("fullName", "!=", `${a.data().fullName}`)
              .get()
              .then((data) => {
                data.docs.forEach((a) => {
                  console.log(a)
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
                });
            }
          }
        });
      });
  });
});

let x = document.querySelector(".x");
x.addEventListener("click", (e) => {

  formAddDeveloper.classList.add('removingForm');
  setTimeout(()=>{
    formAddDeveloper.style.display = 'none';
    addDeveloper.style.display = 'inline-block';
  },2000)

});


document.querySelector('.search1').addEventListener('click',e=>{

  document.querySelector('.search1').style.transform='translateY(.0rem)';
  document.querySelector('.search1').style.transition='.2s all ease'
})
