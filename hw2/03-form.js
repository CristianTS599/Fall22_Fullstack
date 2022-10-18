/** Exercise 03 - Form **/

// Add your code here

const SubmitForm = () => {
  console.log("Submit Hit");
  let name = document.getElementById("Name").value;
  let email = document.getElementById("Email").value;
  let message = document.getElementById("Message").value;
  let checked = document.getElementById("Checkbox").checked;

  if (name === "") {
    document.getElementById("NameRequired").hidden = false;
  }
  if (email === "") {
    document.getElementById("EmailRequired").hidden = false;
  } else {
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Feedback: ${message}`);
    if (checked) {
      console.log(`Newsletter: Yes, I would like to join the newsletter.`);
    } else {
      console.log(`Newsletter: No Thanks.`);
    }
  }
};

const ResetForm = () => {
  let name = (document.getElementById("Name").value = "");
  let email = (document.getElementById("Email").value = "");
  let message = (document.getElementById("Message").value = "");
  let checked = (document.getElementById("Checkbox").checked = false);
};
