(function () {
    var MultiStepFormPlugin = function (formId, active) {
        var form = document.getElementById(formId);
        var nextBtn = form.querySelector("#nextBtn");
        var prevBtn = form.querySelector("#prevBtn");
  
        nextBtn.addEventListener("click", function () {
            nextPrev(1, formId);
        });
  
        prevBtn.addEventListener("click", function () {
            nextPrev(-1, formId);
        });
  
        if (active === "active") {
            setupProgressBar(formId);
        }
        
        showTab(form, 0);
    };
  
    function setupProgressBar(formId) {
        var form = document.getElementById(formId);
        var progressBar = form.querySelector(".progress-bar");
        progressBar.style.width = "0%";
    }
  
    function nextPrev(n, formId) {
        var form = document.getElementById(formId);
        var x = form.getElementsByClassName("step");
        var steps = form.getElementsByClassName("stepIndicator");
        var textMessage = form.querySelector("#text-message");
        var progressBar = form.querySelector(".progress-bar");
        var currentTab = parseInt(form.getAttribute("data-current-tab")) || 0;
  
        if (n === 1 && !validateForm(form, currentTab)) {
            return false;
        }
        x[currentTab].style.display = "none";
        currentTab += n;
  
        if (currentTab >= x.length) {
            var prevBtn = form.querySelector("#prevBtn");
            var nextBtn = form.querySelector("#nextBtn");
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
            for (var i = 0; i < steps.length; i++) {
                steps[i].style.display = "none";
            }
            textMessage.style.display = "block";
        }
        showTab(form, currentTab);
        form.setAttribute("data-current-tab", currentTab);
  
        var progressPercent = (currentTab / (x.length - 1)) * 100;
        progressBar.style.width = progressPercent + "%";
    }
  
    function validateForm(form, tab) {
        var x = form.getElementsByClassName("step")[tab].querySelectorAll("input, select, textarea");
        var valid = true;
  
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("is-invalid");
  
            if (x[i].value.trim() === "") {
                x[i].classList.add("is-invalid");
                valid = false;
            }
        }
  
        if (!valid) return false;
  
        var formElement = form.getElementsByClassName("step")[tab].querySelector(".form-validation");
        if (formElement && !formElement.checkValidity()) {
            formElement.classList.add("was-validated");
            return false;
        }
  
        form.getElementsByClassName("step")[tab].classList.add("finish");
        return true;
    }
  
    function showTab(form, n) {
        var x = form.getElementsByClassName("step");
        var steps = form.getElementsByClassName("stepIndicator");
        var prevBtn = form.querySelector("#prevBtn");
        var nextBtn = form.querySelector("#nextBtn");
  
        for (var i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[n].style.display = "block";
  
        if (n === 0) {
            prevBtn.style.display = "none";
        } else {
            prevBtn.style.display = "inline";
        }
  
        if (n === x.length - 1) {
            nextBtn.innerHTML = "Submit";
        } else {
            nextBtn.innerHTML = "Next";
        }
  
        fixStepIndicator(form, n);
    }
  
    function fixStepIndicator(form, n) {
        var steps = form.getElementsByClassName("stepIndicator");
        for (var i = 0; i < steps.length; i++) {
            steps[i].classList.remove("active");
        }
        steps[n].classList.add("active");
    }
  
    document.addEventListener("input", function (event) {
        if (event.target && event.target.classList.contains("is-invalid")) {
            event.target.classList.remove("is-invalid");
        }
    });
  
    window.MultiStepFormPlugin = MultiStepFormPlugin;
})();