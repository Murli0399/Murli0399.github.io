function send() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "murlikhaire28@gmail.com",
    // Password: "zqtlgxhorxphhtwm",
    Password: "ED4DC8B959DAFB477564CB723C9C9B63A21A",
    From: 'murlikhaire28@gmail.com',
    To: 'murlikhaire28@gmail.com',
    Subject: name,
    Body: "Name : " + name + "<br/>" +
      "Email : " + email + "<br/><br/>" +
      " " + message
  }).then(
    msg => alert("Your message send successfully")
  );
}

  // typing text animation script
  var typed = new Typed(".typing", {
    strings: ["Full Stack Developer", "Java Backend Developer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });