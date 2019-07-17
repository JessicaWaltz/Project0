import Role from "./Role";
export default class User{
  userId: number; // primary key
  username: string; // not null, unique
  password: string; // not null
  firstName: string; // not null
  lastName: string; // not null
  email: string; // not null
  role: Number; // not null
  constructor(obj){
    if(!obj){
      return;
    }
    this.userId = obj.id;
    this.username = obj.username;
    this.password = obj.password;
    this.firstName = obj.first_name;
    this.lastName = obj.last_name;
    this.email = obj.email;
    this.role = obj.role_id;
  }
}