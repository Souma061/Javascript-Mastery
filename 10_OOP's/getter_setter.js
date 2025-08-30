class user {
  constructor(name,email) {
    this.name = name;
    this.email = email;
  }

  get name() {
    return this._name ;
  }

  set name(newName){
    this._namename = newName;

  }
}

const users = new user("souma","hello@gmai.com")
console.log(users.name);

