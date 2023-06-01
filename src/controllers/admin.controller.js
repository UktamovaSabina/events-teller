import { read, write } from '../utils/model.js';
import jwt from '../utils/jwt.js';

const GET = (req, res) => {
  try {
    const admins = read('admins').filter(admin => delete admin.password)

    res.status(200).json({
      status: 200,
      message: 'success',
      data: admins,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
};

const LOGIN = (req, res) => {
  try {
    const admins = read('admins');
    const { username, password } = req.body;
    const admin = admins.find(
      (admin) => admin.username == username && admin.password == password,
    );

    if (!admin) {
      throw new Error("username or password is wrong...");
    }
    delete admin.password;
    res.status(200).json({
      status: 200,
      message: 'success',
      access_token: jwt.sign({ userId: admin.id }),
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
};

const REGISTER = (req, res) => {
  try {
    const admins = read('admins');
    const { username, password } = req.body;
    const admin = admins.find(admin => admin.username == username);

    if (admin) {
      throw new Error("username already exits...");
    }
    const newAdmin = {
      id: admins.at(-1)?.id + 1 || 1,
      username,
      password
    }
    admins.push(newAdmin);
    write('admins', admins);
    res.status(201).json({
      status: 201,
      message: 'success',
      access_token: jwt.sign({ userId: newAdmin.id }),
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
};

export default {
  GET,
  LOGIN,
  REGISTER
};