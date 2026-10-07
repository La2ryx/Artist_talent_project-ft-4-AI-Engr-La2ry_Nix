const form = document.querySelector("#application-form");

if (form) {
  const errorSummary = document.querySelector("#form-errors");
  const successMessage = document.querySelector("#form-success");
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const allowedValues = {
    project_type: ["original-artwork", "private-commission", "installation", "exhibition"],
    budget: ["under-2500", "2500-5000", "5000-10000", "over-10000"],
  };

  function validateField(field) {
    const error = form.querySelector(`[data-error-for="${field.name}"]`);
    let message = "";
    if (field.validity.valueMissing) message = field.type === "checkbox" ? "Please give consent before sending your enquiry." : "This field is required.";
    else if (field.validity.typeMismatch) message = "Enter a valid email address.";
    else if (field.validity.tooShort) message = `Please enter at least ${field.minLength} characters.`;
    else if (field.name === "phone" && field.value && !/^[+()\d\s-]{7,20}$/.test(field.value)) message = "Enter a valid phone number.";
    else if (allowedValues[field.name] && !allowedValues[field.name].includes(field.value)) message = "Choose one of the available options.";
    else if (field.id === "completion_date" && field.value && field.value < new Date().toISOString().split("T")[0]) message = "Choose today or a future date.";
    error.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
    return message;
  }

  fields.forEach((field) => field.addEventListener("blur", () => validateField(field)));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalidFields = fields.filter((field) => validateField(field));
    errorSummary.classList.toggle("hidden", invalidFields.length === 0);
    successMessage.classList.add("hidden");
    if (invalidFields.length) {
      errorSummary.textContent = `Please correct ${invalidFields.length === 1 ? "the highlighted field" : "the highlighted fields"} before sending your enquiry.`;
      errorSummary.focus();
      invalidFields[0].focus();
      return;
    }
    errorSummary.classList.add("hidden");
    successMessage.textContent = "Thank you — your enquiry is ready to be reviewed by the studio.";
    successMessage.classList.remove("hidden");
    form.reset();
    fields.forEach((field) => {
      field.removeAttribute("aria-invalid");
      const error = form.querySelector(`[data-error-for="${field.name}"]`);
      error.textContent = "";
    });
  });
}
