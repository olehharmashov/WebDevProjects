/* FlowTask — landing page behaviour */

document.addEventListener("DOMContentLoaded", function () {
  /* Sign-up flow */

  function startSignup() {
    var trial = document.getElementById("trial");
    if (trial) {
      trial.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "index.html#trial";
    }
  }

  var headerCta = document.getElementById("header-cta");
  if (headerCta) {
    headerCta.addEventListener("click", startSignup);
  }

  var heroCta = document.getElementById("hero-cta");
  if (heroCta) {
    heroCta.addEventListener("click", startSignup);
  }

  /* Trial form */

  var trialForm = document.getElementById("trial-form");
  if (trialForm) {
    var email = trialForm.querySelector('input[name="email"]');
    var error = document.getElementById("trial-error");
    var status = document.getElementById("trial-status");

    trialForm.addEventListener("submit", function (event) {
      event.preventDefault();
      error.hidden = true;
      email.removeAttribute("aria-invalid");

      if (!email.validity.valid) {
        error.textContent = "Enter a valid work email address.";
        error.hidden = false;
        email.setAttribute("aria-invalid", "true");
        email.focus();
        return;
      }

      status.textContent = "Thanks. This demo form does not send your details.";
      trialForm.reset();
    });

    email.addEventListener("input", function () {
      if (email.validity.valid) {
        error.hidden = true;
        email.removeAttribute("aria-invalid");
      }
    });
  }

  /* FAQ accordion */

  document.querySelectorAll(".faq__q").forEach(function (question) {
    question.addEventListener("click", function () {
      var expanded = question.getAttribute("aria-expanded") === "true";
      question.setAttribute("aria-expanded", String(!expanded));
      question.parentElement.classList.toggle("is-open", !expanded);
    });
  });
});
