// This file is used to generate a login token for testing purposes

import { signToken } from "./utils/jwt.util";

const token = signToken({ userId: "abc123", role: "admin" });
console.log(token);
