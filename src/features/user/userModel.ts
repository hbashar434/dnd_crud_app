import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../../config/db';
import { ApiError } from '../../utils/ApiError';

// user interface
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  dateOfBirth: Date;
  phone: string;
}

// create a new user
export const createUser = async (userData: User) => {
  const { firstName, lastName, displayName, email, dateOfBirth, phone } =
    userData;
  const query =
    'INSERT INTO users (first_name, last_name, display_name, email, date_of_birth, phone) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [firstName, lastName, displayName, email, dateOfBirth, phone];

  const [result] = await pool.promise().query<ResultSetHeader>(query, values);
  return { id: result.insertId, ...userData };
};

// get all users
export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool
    .promise()
    .query<User[] & RowDataPacket[]>('SELECT * FROM users');
  return rows;
};

// get a user
export const getUserById = async (id: number): Promise<User | null> => {
  const [rows] = await pool
    .promise()
    .query<User[] & RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);

  if (rows.length === 0) {
    throw new ApiError(404, 'User not found');
  }

  return rows[0];
};

// update a user
export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<Partial<User>> => {
  const { firstName, lastName, displayName, email, dateOfBirth, phone } =
    userData;
  const query =
    'UPDATE users SET first_name = ?, last_name = ?, display_name = ?, email = ?, date_of_birth = ?, phone = ? WHERE id = ?';
  const values = [
    firstName,
    lastName,
    displayName,
    email,
    dateOfBirth,
    phone,
    id,
  ];

  const [result] = await pool.promise().query<ResultSetHeader>(query, values);

  if (result.affectedRows === 0) {
    throw new ApiError(404, 'User not found');
  }

  return { id, ...userData };
};

// delete a user
export const deleteUser = async (id: number): Promise<{ id: number }> => {
  const [result] = await pool
    .promise()
    .query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    throw new ApiError(404, 'User not found');
  }

  return { id };
};
