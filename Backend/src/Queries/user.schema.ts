

// find users
export const findUserByEmail = `
SELECT * FROM "users"
WHERE email = $1;
`

// Insert new user
export const insertUser = `
INSERT INTO users(name , email , password , role)
VALUES($1 , $2 , $3 , $4)
RETURNING name , email , role
`

export const getUserQuery = `
SELECT id , name , email , role from "users" WHERE id = $1;
`