let arrayOfHiredDevelopers = [];
let showList = document.querySelector(".showList");
let listOfDevelopersPriperedToHire = document.querySelector(
  ".listOfDevelopersPriperedToHire ul"
);
let b = [];
let btnHireDevloper = document.querySelector(".HireDeveloper");
let hireDevelopersForm = document.querySelector(".hireDevelopers");
let hireNow = document.querySelector(".hireNow");
let hiring = document.querySelector(".hiring");
showList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnHire")) {
    // console.log(e.target);
    e.target.disabled = true;
    hiring.style.display = "flex";
    btnHireDevloper.style.display = "block";
    arrayOfHiredDevelopers.push(
      Array.from(e.target.parentElement.children)[1].textContent
    );
    console.log(arrayOfHiredDevelopers);

    listOfDevelopersPriperedToHire.innerHTML += `<li>${e.target.parentElement.children[1].textContent}</li>`;
    localStorage.setItem(
      "arrayOfHiredDevelopers",
      JSON.stringify(arrayOfHiredDevelopers)
    );
  }
});

btnHireDevloper.addEventListener("click", (e) => {
  hireDevelopersForm.style.display = "flex";
});
let startDateWanted = document.querySelector("#startDate");
let endDateWanted = document.querySelector("#endDate");

hireNow.addEventListener("click", (e) => {
  let d= new Array();
  e.preventDefault();
  hireNow.disabled = true;
  let today = new Date();
  let start1 = new Date(startDateWanted.value);
  let end1 = new Date(endDateWanted.value);
  console.log(today.getTime(), start1.getTime());
  console.log(JSON.parse(localStorage.getItem("arrayOfHiredDevelopers")));
  JSON.parse(localStorage.getItem("arrayOfHiredDevelopers")).forEach((a) => {
    db.collection("developers")
      .where("fullName", "==", `${a}`)
      .get()
      .then((data) => {
        data.docs.forEach((doc) => {
          // console.log(doc.data());
          if (today.getTime() < start1) {
            doc.data().zauzetost.forEach((b) => {
              // console.log(
              //   new Date(b.end).getTime(),
              //   new Date(b.start).getTime(),
              //   new Date(start1).getTime(),
              //   new Date(end1).getTime()
              // );

              if (
                (new Date(b.start).getTime() < new Date(start1).getTime() &&
                  new Date(b.end).getTime() < new Date(start1).getTime()) ||
                (new Date(end1).getTime() < new Date(b.start).getTime() &&
                  new Date(end1).getTime() < new Date(b.end).getTime())
              ) {
                d.push(true);
              } else {
                d.push(false);
                console.log(
                  "You cannot hire same user two times in same period of time!"
                );
              }
            });
          } else {
            console.log("Mistake! You must pick future date!");
            document.querySelector(".feedback").innerHTML =
              "<p>Mistake! You must pick future date!</p>";
          }
        });
      }).then(()=>{
        console.log(d)

        localStorage.setItem('d',JSON.stringify(d))
      })
  });




  function myFunction(value) {
    return value === true;
  }
  console.log(JSON.parse(localStorage.getItem('d')), JSON.parse(localStorage.getItem('d')).every(myFunction) )
  if (JSON.parse(localStorage.getItem('d')).every(myFunction)) {

    document.querySelector(
      ".feedback"
    ).innerHTML += `<p>You succesfully hire developer ${localStorage.getItem(
      "arrayOfHiredDevelopers"
    )} from ${start1} to ${end1}!</p>`;

    JSON.parse(localStorage.getItem("arrayOfHiredDevelopers")).forEach((c) => {
      db.collection("developers")
        .where("fullName", "==", `${c}`)
        .get()
        .then((data) => {
          data.docs.forEach((doc) => {
            console.log(doc.data());

            db.collection("developers")
              .doc(doc.id)
              .update({
                zauzetost: firebase.firestore.FieldValue.arrayUnion({
                  start: `${start1}`,
                  end: `${end1}`,
                }),
              })
              .then((data) => {
                // document.querySelector('.feedback').innerHTML+=`<p>You succesfully hire developer!</p>`
              });
          });
        });
    });
  } else {
    
    document.querySelector(
      ".feedback"
    ).innerHTML = `<p>'You cannot hire same user two times in same period of time!</p>`;
  }
});



