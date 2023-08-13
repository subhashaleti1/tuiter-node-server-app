import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
    const register = async (req, res) => {
        const username = req.body.username;
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await usersDao.findUserByCredentials(username, password);
        console.log(username)
        console.log(password)
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };
    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        console.log("sdfa")
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };
    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const updateUser = async (req, res) => {

        const user1 = req.body;
        const id=user1._id;
        const status = await usersDao.updateUser(id, req.body);
        const user = await usersDao.findUserById(id);
        req.session["currentUser"] = user;
        res.json(status);

    };
    app.post("/api/users/register", register);
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users",   updateUser);
};
export default AuthController;

