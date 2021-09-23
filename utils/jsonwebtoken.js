import jwt from 'jsonwebtoken';
import { envVariable } from '../configs';

const encodeToken = (data) => {
	return jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, data }, envVariable.JWT_SECRET);
};

const verify = async (token) => {
	return jwt.verify(token, envVariable.JWT_SECRET);
};

export default { encodeToken, verify };
