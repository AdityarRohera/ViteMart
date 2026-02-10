

// find users
export const findUserByEmail = `
SELECT * FROM "users" 
WHERE email = $1;
`

// Insert new user
export const insertUser = `
INSERT INTO users(name , email , password , role , location , contact)
VALUES($1 , $2 , $3 , $4 , $5 , $6)
RETURNING name , email , role
`

export const userRole = `
SELECT role from "users" WHERE id = $1;
`