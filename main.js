window.addEventListener("load", function () {
  const confirm = document.querySelector(".confirm");
  const iconConfirm = document.querySelector(".icon-confirm");
  const confirmText = document.querySelector(".confirm-text");
  const input_1 = document.querySelector(".form-input-1");
  const emailPart = document.querySelector(".email-part");
  const confirmPart = document.querySelector(".confirm-part");
  const secondContent = document.querySelector(".second-content");
  const registerText = document.querySelectorAll(".register-text");
  const registerEmail = document.querySelector(".register-email");
  const registerPassword = document.querySelector(".register-password");
  const registerDetermine = document.querySelector(".register-determine");
  const prevRegister = document.querySelector(".prevRegister");
  const prevRegisterText = document.querySelector(".prevRegister span");
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  secondContent.style = `height: ${emailPart.scrollHeight}px; overflow-y: auto`;
  function preventScroll(e) {
    e.preventDefault();
  }
  const form_1 = document.querySelector(".form-1");
  form_1.addEventListener("submit", handleEmailForm);
  function handleEmailForm(e) {
    const valueInput = e.target.elements["input"].value;
    e.preventDefault();
    if (!regexEmail.test(valueInput)) {
      confirm.classList.add("error");
      iconConfirm.classList.add("fa-exclamation");
      confirmText.innerText = "Please fill in valid email";
      iconConfirm.style.border = `none`;
    } else {
      localStorage.setItem("emailValid", valueInput);
      secondContent.scroll(0, emailPart.scrollHeight);
      registerEmail.classList.add("finish");
      registerEmail.classList.remove("active");
      registerPassword.classList.add("active");
      emailPart.classList.add("checked");
      prevRegister.classList.add("active");
      prevRegisterText.innerText = "Edit email";
    }
    e.target.elements["input"].value = "";
  }

  secondContent.addEventListener("wheel", preventScroll);

  input_1.addEventListener("input", function (e) {
    const inputValue = this.value;
    if (regexEmail.test(inputValue)) {
      confirm.classList.remove("error");
      iconConfirm.classList.remove("fa-exclamation");
      confirmText.innerText = "I want to receive promote email";
      emailPart.classList.add("valid");
      this.nextElementSibling.nextElementSibling.querySelector(
        "span"
      ).style.transform = `translateX(0)`;
    } else {
      emailPart.classList.remove("valid");
      iconConfirm.classList.remove("active");
      this.nextElementSibling.nextElementSibling.querySelector(
        "span"
      ).style.transform = `translateX(-100%)`;
    }
  });

  input_1.addEventListener("keydown", function (e) {
    confirm.classList.remove("error");
    if (emailPart.classList.contains("checked")) {
      e.preventDefault();
    }
  });
  window.addEventListener("keydown", function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      preventScroll(e);
    }
  });

  iconConfirm.addEventListener("click", function (e) {
    e.target.classList.toggle("active");
  });

  //password
  const passwordPart = document.querySelector(".password-part");
  const form_2 = document.querySelector(".form-2");
  const textUppercase = document.querySelector(".uppercase");
  const textNumber = document.querySelector(".number");
  const textSpecial = document.querySelector(".special");
  const textCharacter = document.querySelector(".character");
  const inputPassword = document.querySelector(".form-input-2");
  const requestItems = document.querySelectorAll(".request-item");
  passwordPart.style.height = `${emailPart.scrollHeight}px`;
  form_2.addEventListener("submit", handlePasswordForm);
  function handlePasswordForm(e) {
    e.preventDefault();
    const inputValue = this.elements["password"].value;
    if (passwordPart.classList.contains("checked")) {
      localStorage.setItem("passwordValid", inputValue);
      registerPassword.classList.remove("active");
      registerPassword.classList.add("finish");
      secondContent.scroll(
        0,
        emailPart.scrollHeight + emailPart.scrollHeight + 10
      );
      registerText.forEach((item) => item.classList.remove("active"));
      registerDetermine.classList.add("active");
      prevRegisterText.textContent = "Edit password";
    } else {
      localStorage.setItem("passwordValid", "");
    }
  }

  inputPassword.addEventListener("input", handleInputPassword);
  function regexFn(regex, value, typeData) {
    if (regex.test(value)) {
      typeData.classList.add("checked");
    } else {
      typeData.classList.remove("checked");
    }
  }

  function checkLength(typeData, value, min, max) {
    if (value.length >= min && value.length <= max) {
      typeData.classList.add("checked");
    } else {
      typeData.classList.remove("checked");
    }
  }
  function handleInputPassword(e) {
    const inputValue = this.value;
    regexFn(/[A-Z]/, inputValue, textUppercase);
    regexFn(/[0-9]/, inputValue, textNumber);
    regexFn(/[`!#$%^&*()\_\+=|\\?/.,\-]/, inputValue, textSpecial);
    checkLength(textCharacter, inputValue, 8, 16);
    if (
      textUppercase.classList.contains("checked") &&
      textNumber.classList.contains("checked") &&
      textSpecial.classList.contains("checked") &&
      textCharacter.classList.contains("checked")
    ) {
      passwordPart.classList.add("checked");
      this.nextElementSibling.nextElementSibling.querySelector(
        "span"
      ).style.transform = `translateX(0)`;
    } else {
      passwordPart.classList.remove("checked");
      this.nextElementSibling.nextElementSibling.querySelector(
        "span"
      ).style.transform = `translateX(-100%)`;
    }
  }

  //confirm part
  const confirmBtn = document.querySelector(".confirm-button");
  const modal = document.querySelector(".modal");
  confirmPart.style.height = `${emailPart.scrollHeight}px`;
  confirmBtn.addEventListener("click", (e) => {
    modal.classList.add("active");
    registerDetermine.classList.remove("active");
    registerDetermine.classList.add("finished");
  });

  //edit email, password
  prevRegisterText.addEventListener("click", function (e) {
    if (this.textContent.includes("Edit email")) {
      secondContent.scroll(0, 0);
      prevRegister.classList.remove("active");
      emailPart.classList.remove("checked");
      emailPart.classList.remove("valid");
      registerEmail.classList.remove("finish");
      registerText.forEach((item) => item.classList.remove("active"));
      registerEmail.classList.add("active");
    }
    if (this.textContent.includes("Edit password")) {
      secondContent.scroll(0, emailPart.scrollHeight);
      prevRegisterText.textContent = "Edit email";
      inputPassword.value = "";
      passwordPart.classList.remove("checked");
      requestItems.forEach((item) => item.classList.remove("checked"));
      registerPassword.classList.remove("finish");
      registerText.forEach((item) => item.classList.remove("active"));
      registerPassword.classList.add("active");
    }
  });

  //btn submit
  const btnForm = document.querySelectorAll(".form-btn");
  const template = `<span></span>`;
  btnForm.forEach((item) => item.insertAdjacentHTML("beforeend", template));
  btnForm.forEach((item) =>
    item.addEventListener("mouseenter", function (e) {
      this.querySelector("span").style.transform = `translateX(0)`;
    })
  );
  btnForm.forEach((item) =>
    item.addEventListener("mouseleave", function (e) {
      this.querySelector("span").style.transform = `translateX(-100%)`;
    })
  );
});
