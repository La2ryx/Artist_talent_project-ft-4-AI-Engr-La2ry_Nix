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
    if (field.validity.valueMissing || (field.name === "full_name" && !field.value.trim())) {
      message = field.type === "checkbox" ? "Please give consent before sending your enquiry." : "This field is required.";
    }
    else if (field.validity.typeMismatch) message = "Enter a valid email address.";
    else if (field.name === "project_details" && field.value.trim().length < 20) message = "Please enter at least 20 characters about your project.";
    else if (field.name === "phone" && field.value && (!/^[+()\d\s-]+$/.test(field.value) || (field.value.match(/\d/g) || []).length < 7 || (field.value.match(/\d/g) || []).length > 20)) message = "Enter a phone number using 7–20 digits; spaces, parentheses, +, and hyphens are allowed.";
    else if (allowedValues[field.name] && !allowedValues[field.name].includes(field.value)) message = "Choose one of the available options.";
    else if (field.id === "completion_date" && field.value) {
      const today = new Date();
      const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      if (field.value < localToday) message = "Choose today or a future date.";
    }
    error.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
    return message;
  }

  fields.forEach((field) => field.addEventListener("blur", () => validateField(field)));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalidFields = fields.filter((field) => validateField(field));
    errorSummary.hidden = invalidFields.length === 0;
    successMessage.hidden = true;
    if (invalidFields.length) {
      const fieldNames = invalidFields.map((field) => {
        const label = form.querySelector(`label[for="${field.id}"]`);
        return label?.querySelector("span")?.textContent.replace("*", "").trim() || field.name;
      });
      errorSummary.textContent = `Please correct ${fieldNames.join(", ")} before sending your enquiry.`;
      errorSummary.focus();
      return;
    }
    successMessage.textContent = "Thank you — your enquiry is ready to be reviewed by the studio.";
    successMessage.hidden = false;
    form.reset();
    fields.forEach((field) => {
      field.removeAttribute("aria-invalid");
      const error = form.querySelector(`[data-error-for="${field.name}"]`);
      error.textContent = "";
    });
    successMessage.focus();
  });
}
