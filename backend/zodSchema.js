const z = require('zod')

const signupBody = z.object({
    firstName : z.string().min(1, "please enter all fields"),
    lastName : z.string().min(1, "please enter all fileds"),
    username : z.string().email("pleases enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

const signinBody = z.object({
    username: z.string().email(),
	password: z.string().min(8, "Password must be at least 8 characters long")
})

const updateBody = z.object({
    firstName : z.string().min(1).optional(),
    lastName : z.string().min(1).optional(),
    password : z.string().min(8).optional()
})
module.exports = {
    signupBody,
    signinBody,
    updateBody
}