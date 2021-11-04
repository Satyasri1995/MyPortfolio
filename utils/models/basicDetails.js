class BasicDetails {
  constructor(name, stack, email, phone, phone_alt, location,resume_link) {
    this.name = name;
    this.stack = stack;
    this.email = email;
    this.phone = phone;
    this.phone_alt = phone_alt;
    this.location = location;
    this.resume_link=resume_link;
  }
}

module.exports = BasicDetails;
