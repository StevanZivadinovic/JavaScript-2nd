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

  document.querySelector(".addPeriod").addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector(
      ".mainHireDevelopers"
    ).innerHTML += `<div class='section'>
                      <input type="date" name="startDate" class="startDate" />
                      <input type="date" name="endDate" class="endDate" />
                      <button class="removePeriod">X</button>
                    </div>`;
  });
  hireDevelopersForm.addEventListener("click", (e) => {
    if (e.target.classList.contains("removePeriod")) {
      e.target.parentElement.remove();
    }
  });
});

// let startDateWanted = document.querySelectorAll(".startDate");
// let endDateWanted = document.querySelectorAll(".endDate");
let start1;
let end1;

// hireNow.addEventListener("click", (e) => {
//   e.preventDefault()
//   let startDateWanted = document.querySelectorAll(".startDate");
//   let endDateWanted = document.querySelectorAll(".endDate");
//   let startDateWanted1 = [];
//   let endDateWanted1 = []
//   let f = []

//   startDateWanted.forEach((a,i)=>{

//     startDateWanted1.push(a.value);
//   })

//   endDateWanted.forEach(a=>{
//     endDateWanted1.push(a.value)
//   })
//   console.log(startDateWanted1, endDateWanted1);

//   startDateWanted1.forEach((a,i)=>{
//     f.push( {start1:a, end1:endDateWanted1[i]})
//   })
//   console.log(f)

// })

hireNow.addEventListener("click", (e) => {
  e.preventDefault();
  let startDateWanted = document.querySelectorAll(".startDate");
  let endDateWanted = document.querySelectorAll(".endDate");
  let startDateWanted1 = [];
  let endDateWanted1 = [];
  let f = [];
  hireNow.disabled = true;
  let d = new Array();
  let today = new Date();

  console.log(startDateWanted, endDateWanted);

  startDateWanted.forEach((a, i) => {
    startDateWanted1.push(a.value);
  });

  endDateWanted.forEach((a) => {
    endDateWanted1.push(a.value);
  });

  startDateWanted1.forEach((a, i) => {
    f.push({ start1: a, end1: endDateWanted1[i] });
  });
  console.log(f);
  let s = [];
  f.forEach((x) => {
    // console.log(new Date(x.start1).getTime() / 1000);
    if (today.getTime() < new Date(x.start1)) {
      s.push(true);
    } else {
      s.push(false);
    }
  });
  function Function(value) {
    return value === true;
  }
  let c = () => {
    if (s.every(Function)) {
      return true;
    } else {
      return false;
    }
  };

  let z = [];
  JSON.parse(localStorage.getItem("arrayOfHiredDevelopers")).forEach((a) => {
    db.collection("developers")
      .where("fullName", "==", `${a}`)
      .get()
      .then((data) => {
        data.docs.forEach((doc) => {
          // console.log(doc.data());
          if (c()) {
            doc.data().zauzetost.forEach((b) => {
              f.forEach((x) => {
                if (
                  (b.start.seconds < new Date(x.start1).getTime() / 1000 &&
                    b.end.seconds < new Date(x.start1).getTime() / 1000 &&
                    b.start.seconds !== new Date(x.start1).getTime() / 1000 &&
                    b.end.seconds !== new Date(x.end1).getTime()) / 1000 ||
                  (new Date(x.end1).getTime() / 1000 < b.start.seconds &&
                    new Date(x.end1).getTime() / 1000 < b.end.seconds &&
                    b.start.seconds !== new Date(x.start1).getTime() / 1000 &&
                    b.end.seconds !== new Date(x.end1).getTime() / 1000)
                ) {
                  console.log("true");
                  z.push(true);
            
                } else {
                  console.log("false");
                  z.push(false);
               
                }
              });

              console.log(z);
              function fun(value) {
                return value === true;
              }
              console.log(z.every(fun));
              if (
                z.every(fun)
                // f.forEach((x) => {
                //   (b.start.seconds < new Date(x.start1).getTime() / 1000 &&
                //     b.end.seconds < new Date(x.start1).getTime() / 1000 &&
                //     b.start.seconds !== new Date(x.start1).getTime() / 1000 &&
                //     b.end.seconds !== new Date(x.end1).getTime()) / 1000 ||
                //     (new Date(x.end1).getTime() / 1000 < b.start.seconds &&
                //     new Date(x.end1).getTime() / 1000 < b.end.seconds &&
                //       b.start.seconds !== new Date(x.start1).getTime() / 1000 &&
                //       b.end.seconds !== new Date(x.end1).getTime() / 1000);
                // })
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
            d.push(false);
            console.log("Mistake! You must pick future date!");
            document.querySelector(".feedback").innerHTML =
              "<p>Mistake! You must pick future date!</p>";
          }
        });
      })
      .then(() => {
        console.log(d);
        // g = [...d];
        localStorage.setItem("d", JSON.stringify(d));
        console.log("haj");
      });
  });

  console.log(d, localStorage.getItem("d"));
  //
  function myFunction(value) {
    return value === true;
  }
  // window.addEventListener('storage', function(e) {

  setTimeout(() => {
    console.log(JSON.parse(localStorage.getItem("d")).every(myFunction));
    if (JSON.parse(localStorage.getItem("d")).every(myFunction)) {
      f.forEach((x) => {
        document.querySelector(
          ".feedback"
        ).innerHTML += `<p>You succesfully hire developer ${localStorage.getItem(
          "arrayOfHiredDevelopers"
        )} from ${x.start1} to ${x.end1}!</p>`;
      });
      JSON.parse(localStorage.getItem("arrayOfHiredDevelopers")).forEach(
        (c) => {
          db.collection("developers")
            .where("fullName", "==", `${c}`)
            .get()
            .then((data) => {
              data.docs.forEach((doc) => {
                console.log(doc.data());


                f.forEach((x) => {
                  let start1 = new Date(x.start1).getTime()
                  let end1 = new Date(x.end1).getTime()
                  console.log(new Date(x.start1),  new Date(x.end1));

                db.collection("developers")
                  .doc(doc.id)
                  .update({
                    zauzetost: firebase.firestore.FieldValue.arrayUnion({
                      start: firebase.firestore.Timestamp.fromDate(new Date(x.start1)),
                      end: firebase.firestore.Timestamp.fromDate(new Date(x.end1)),
                    }),
                  })
                })

              });
            });
        }
      );
    } else {

      if(!c()){
        document.querySelector(".feedback").innerHTML =
              "<p>Mistake! You must pick future date!</p>";
      }else{

        document.querySelector(
          ".feedback"
        ).innerHTML = `<p>'You cannot hire same user two times in same period of time!</p>`;
      }
      }
    //
  }, 1000);

  // })
});
