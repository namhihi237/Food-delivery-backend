import { hash, compare } from 'bcrypt';

const hashPassword = async (password) => {
	return hash(password, 12);
};

const comparePassword = async (password, hashPassword) => {
	const match = await compare(password, hashPassword);
	if (!match) return false;
	else return true;
};

export { hashPassword, comparePassword };
