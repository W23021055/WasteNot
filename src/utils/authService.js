import { isLocked, registerFailure, registerSuccess } from "../utils/lockout";
import { meetsPolicy } from "../utils/password";

// Sets OTP 
const CORRECT_OTP = '123456';

// Gets users from local storage
function getUsers() {
  const users = localStorage.getItem("users");
  if (!users) return [];
  return JSON.parse(users);
}

//Saves users to local storage 
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export async function registerAccount(email, username, password, role) {
  if (!meetsPolicy(password)) throw new Error('Password does not meet policy');

  const users = getUsers();
  if (users.find(u => u.username === username)) {
    throw new Error("Username already exists");
  }
  if (users.find(u => u.email === email)) {
    throw new Error("Email already exists");
  }

  const fullUser = {
    email,
    username,
    password,
    role,
    leaderboards: [],
    achievements: [],
  };

  users.push(fullUser);
  saveUsers(users);
  localStorage.setItem("currentUser", JSON.stringify(fullUser));

  // console.log('email, username and password saved');
  return { status: 'ok' };
}

// locks account
export async function login(username, password) {
  if (isLocked()) {
    const e = new Error('Account locked'); e.code = 'LOCKED'; throw e;
  }

  const users = getUsers();
  const user = users.find(u => u.username === username);

  //checks credentials
  // Username does not exist
  if (!user) {
    registerFailure();
    const e = new Error("User not found");
    e.code = "USER_NOT_FOUND";
    // console.log("user not found");
    throw e;
  }

  // Password is incorrect
  if (user.password !== password) {
    registerFailure();
    const e = new Error("Incorrect password");
    e.code = "WRONG_PASSWORD";
    // console.log("wrong password");
    throw e;
  }

  registerSuccess();
  // console.log('login success);
  return { status: 'MFA_REQUIRED' };
}

{/* Verify OTP*/}
export async function verifyOtp(otp) {
  if (otp === CORRECT_OTP) { 
    // console.log('OTP success'); 
    return { status: 'VERIFIED', token: 'demo-session' }; 
  }
  const e = new Error('Invalid OTP'); e.code = 'OTP_INVALID'; 
  // console.log('OTP failed'); 
  throw e;
}
