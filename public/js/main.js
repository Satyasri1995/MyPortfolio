function toggleMenu(pId, cId) {
  const element = document.getElementById(pId);
  [].forEach.call(element.children, (child) => {
    child.classList.replace("show", "hide");
  });
  const cElement = document.getElementById(cId);
  cElement.classList.replace("hide", "show");
  const navItems = document.getElementsByClassName("navBar__list__item");
  [].forEach.call(navItems, (child) => {
    child.classList.replace("active", "inactive");
  });
  document
    .getElementById(cId + "_menu_item")
    .classList.replace("inactive", "active");
}



function typingEffect(id, words) {
  let typeText = document.getElementById(id);
  let textToBeTyped = words[0];
  let textToBeTypedArr = words;
  let index = 0,
    isAdding = true,
    textToBeTypedIndex = 0;

  function playAnim() {
    setTimeout(
      function () {
        // set the text of typeText to a substring of the text to be typed using index.
        typeText.innerHTML =
          textToBeTypedArr[textToBeTypedIndex].slice(0, index).trim() + "|";
        if (isAdding) {
          // adding text
          if (index > textToBeTypedArr[textToBeTypedIndex].length) {
            // no more text to add
            isAdding = false;
            typeText.classList.add("showAnim");
            //break: wait 2s before playing again
            setTimeout(function () {
              typeText.classList.remove("showAnim");
              playAnim();
            }, 2000);
            return;
          } else {
            // increment index by 1
            index++;
          }
        } else {
          // removing text
          if (index === 0) {
            // no more text to remove
            isAdding = true;
            //switch to next text in text array
            textToBeTypedIndex =
              (textToBeTypedIndex + 1) % textToBeTypedArr.length;
          } else {
            // decrement index by 1
            index--;
          }
        }
        // call itself
        playAnim();
      },
      isAdding ? 120 : 60
    );
  }
  // start animation
  playAnim();
}

function openTab(evt, tab) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";
}

function addMyService() {
  const container = document.getElementById("myService_FormContainer");
  const formLen = container.children.length;
  const form = `<form class="my_service_details_form form mt-2" action="/edit/service?id=" method="POST">
  <div class="field">
      <label for="icon_service${formLen}"><span class="gradientText">I</span>con</label>
      <input type="text" name="icon" id="_serviceicon${formLen}">
  </div>
  <div class="field">
      <label for="title_service${formLen}"><span class="gradientText">T</span>itle</label>
      <input type="text" name="title" id="title_service${formLen}">
  </div>
  <div class="field">
      <label for="description_service${formLen}"><span class="gradientText">D</span>escription</label>
      <input type="text" name="description" id="description_service${formLen}">
  </div>
  <div class="button-field">
      <button type="submit"><i class="fas fa-save"></i>&nbsp;Save</button>
  </div>
</form>`;
  container.innerHTML += form;
  document.getElementById("removeMyService").classList.remove("disabled");
}

function removeMyService(id, size) {
  const container = document.getElementById("myService_FormContainer");
  const formLen = container.children.length;
  if (formLen > 1) {
    if (formLen <= size) {
      const form = document.createElement("form");
      form.action = "/delete/service?id=" + id;
      form.method = "POST";
      form.style.visibility = "hidden";
      document.body.appendChild(form);
      form.submit();
    } else {
      container.removeChild(container.lastElementChild);
      if (container.children.length == 1) {
        document.getElementById("removeMyService").classList.add("disabled");
      }
    }
  }
}

function addFunFact() {
  const container = document.getElementById("funFacts_FormContainer");
  const formLen = container.children.length;
  const form = `<form class="fun_facts_details_form form mt-2" action="/edit/funfact?id=" method="POST">
  <div class="field">
      <label for="icon_facts${formLen}"><span class="gradientText">I</span>con</label>
      <input type="text" name="icon" id="icon_facts${formLen}">
  </div>
  <div class="field">
      <label for="title_facts${formLen}"><span class="gradientText">T</span>itle</label>
      <input type="text" name="title" id="title_facts${formLen}">
  </div>
  <div class="button-field">
      <button type="submit"><i class="fas fa-save"></i>&nbsp;Save</button>
  </div>
</form>`;
  container.innerHTML += form;
  document.getElementById("removeFunFact").classList.remove("disabled");
}

function removeFunFact(id, size) {
  const container = document.getElementById("funFacts_FormContainer");
  const formLen = container.children.length;
  if (formLen > 1) {
    if (formLen <= size) {
      const form = document.createElement("form");
      form.action = "/delete/funfact?id=" + id;
      form.method = "POST";
      form.style.visibility = "hidden";
      document.body.appendChild(form);
      form.submit();
    } else {
      container.removeChild(container.lastElementChild);
      if (container.children.length == 1) {
        document.getElementById("removeFunFact").classList.add("disabled");
      }
    }
  }
}

function addEducation() {
  const container = document.getElementById("Education_FormContainer");
  const formLen = container.children.length;
  const form = `<form class="education_details_form form mt-2" action="/edit/education?id=" method="POST">
  <div class="field">
      <label for="start${formLen}"><span class="gradientText">Start</span>&nbsp;Date</label>
      <input type="date" name="start" id="start${formLen}">
  </div>
  <div class="field">
      <label for="end${formLen}"><span class="gradientText">End</span>&nbsp;Date</label>
      <input type="date" name="end" id="end${formLen}">
  </div>
  <div class="field"> 
      <label for="school${formLen}"><span class="gradientText">S</span>chool</label>
      <input type="text" name="school" id="school${formLen}">
  </div>
  <div class="field">
      <label for="location${formLen}"><span class="gradientText">L</span>ocation</label>
      <input type="text" name="location" id="location${formLen}">
  </div>
  <div class="field">
      <label for="description_education${formLen}"><span class="gradientText">D</span>escription</label>
      <textarea name="description" id="description_education${formLen}" cols="30" rows="5"></textarea>
  </div>
  <div class="button-field">
      <button type="submit"><i class="fas fa-save"></i>&nbsp;Save</button>
  </div>
</form>`;
  container.innerHTML += form;
  document.getElementById("removeEducation").classList.remove("disabled");
}

function removeEducation(id, size) {
  const container = document.getElementById("Education_FormContainer");
  const formLen = container.children.length;
  if (formLen > 1) {
    if (formLen <= size) {
      const form = document.createElement("form");
      form.action = "/delete/education?id=" + id;
      form.method = "POST";
      form.style.visibility = "hidden";
      document.body.appendChild(form);
      form.submit();
    } else {
      container.removeChild(container.lastElementChild);
      if (container.children.length == 1) {
        document.getElementById("removeEducation").classList.add("disabled");
      }
    }
  }
}

function addExperience() {
  const container = document.getElementById("Experience_FormContainer");
  const formLen = container.children.length;
  const form = `<form class="experience_details_form form mt-2" action="/edit/experience?id=" method="POST">
  <div class="field">
      <label for="start${formLen}"><span class="gradientText">Start</span>&nbsp;Date</label>
      <input type="date" name="start" id="start${formLen}">
  </div>
  <div class="field">
      <label for="end${formLen}"><span class="gradientText">End</span>&nbsp;Date</label>
      <input type="date" name="end" id="end${formLen}">
  </div>
  <div class="field">
      <label for="organisation${formLen}"><span class="gradientText">O</span>rganisation</label>
      <input type="text" name="organisation" id="organisation${formLen}">
  </div>
  <div class="field">
      <label for="job${formLen}"><span class="gradientText">J</span>ob</label>
      <input type="text" name="job" id="job${formLen}">
  </div>
  <div class="field">
      <label for="description_experience${formLen}"><span class="gradientText">D</span>escription</label>
      <textarea name="description" id="description_experience${formLen}" cols="30" rows="5"></textarea>
  </div>
  <div class="button-field">
      <button type="submit"><i class="fas fa-save"></i>&nbsp;Save</button>
  </div>
</form>`;
  container.innerHTML += form;
  document.getElementById("removeExperience").classList.remove("disabled");
}

function removeExperience(id, size) {
  const container = document.getElementById("Experience_FormContainer");
  const formLen = container.children.length;
  if (formLen > 1) {
    if (formLen <= size) {
      const form = document.createElement("form");
      form.action = "/delete/experience?id=" + id;
      form.method = "POST";
      form.style.visibility = "hidden";
      document.body.appendChild(form);
      form.submit();
    } else {
      container.removeChild(container.lastElementChild);
      if (container.children.length == 1) {
        document.getElementById("removeExperience").classList.add("disabled");
      }
    }
  }
}

function addLanguage() {
  const container = document.getElementById("language_FormContainer");
  const formLen = container.children.length;
  const form = `<form class="language_details_form form mt-2" action="/edit/language?id=" method="POST">
  <div class="field">
      <label for="language${formLen}"><span class="gradientText">L</span>anguage</label>
      <input type="text" name="language" id="language${formLen}">
  </div>
  <div class="field">
      <label for="speak${formLen}"><span class="gradientText">S</span>peak</label>
      <input type="number" min="0" max="100" name="speak" id="speak${formLen}">
  </div>
  <div class="field">
      <label for="read${formLen}"><span class="gradientText">R</span>ead</label>
      <input type="number" min="0" max="100" name="read" id="read${formLen}">
  </div>
  <div class="field">
      <label for="write${formLen}"><span class="gradientText">W</span>rite</label>
      <input type="number" min="0" max="100" name="write" id="write${formLen}">
  </div>
  <div class="button-field">
      <button type="submit"><i class="fas fa-save"></i>&nbsp;Save</button>
  </div>
</form>`;
  container.innerHTML += form;
  document.getElementById("removeLanguage").classList.remove("disabled");
}

function removeLanguage(id, size) {
  const container = document.getElementById("language_FormContainer");
  const formLen = container.children.length;
  if (formLen > 1) {
    if (formLen <= size) {
      const form = document.createElement("form");
      form.action = "/delete/language?id=" + id;
      form.method = "POST";
      form.style.visibility = "hidden";
      document.body.appendChild(form);
      form.submit();
    } else {
      container.removeChild(container.lastElementChild);
      if (container.children.length == 1) {
        document.getElementById("removeLanguage").classList.add("disabled");
      }
    }
  }
}

function addMycode() {
  const container = document.getElementById("mycode_FormContainer");
  const formLen = container.children.length;
  const form = `<form class="my_code_details_form form mt-2" action="/edit/code?id=" method="POST">
  <div class="field">
      <label for="icon_code${formLen}"><span class="gradientText">I</span>con</label>
      <input type="text" name="icon" id="icon_code${formLen}">
  </div>
  <div class="field">
      <label for="title_code${formLen}"><span class="gradientText">T</span>itle</label>
      <input type="text" name="title" id="title_code${formLen}">
  </div>
  <div class="field">
      <label for="star${formLen}"><span class="gradientText">S</span>tars</label>
      <input type="number" name="star" id="star${formLen}">
  </div>
  <div class="button-field">
      <button type="submit"><i class="fas fa-save"></i>&nbsp;Save</button>
  </div>
</form>`;
  container.innerHTML += form;
  document.getElementById("removeMycode").classList.remove("disabled");
}

function removeMycode(id, size) {
  const container = document.getElementById("mycode_FormContainer");
  const formLen = container.children.length;
  if (formLen > 1) {
    if (formLen <= size) {
      const form = document.createElement("form");
      form.action = "/delete/code?id=" + id;
      form.method = "POST";
      form.style.visibility = "hidden";
      document.body.appendChild(form);
      form.submit();
    } else {
      container.removeChild(container.lastElementChild);
      if (container.children.length == 1) {
        document.getElementById("removeMycode").classList.add("disabled");
      }
    }
  }
}

function checkMessage(flag) {
  if (flag == "true") {
    document.getElementById("message").classList.remove("hide");
    document.getElementById("message").classList.add("show");
  } else {
    document.getElementById("message").classList.remove("show");
    document.getElementById("message").classList.add("hide");
  }
}
