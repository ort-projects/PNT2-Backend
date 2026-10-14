const usuarios = [
    {username: "gonzalo@cabo.com", name: "Gonzalo", surname: "Cabo", password:"12345678", role: "admin"},
    {username: "dana@mehle.com", name: "Dana", surname: "Mehle", password:"12345678", role: "admin"},
    {username: "gabriel@teruel.com", name: "Gabriel", surname: "Teruel", password:"12345678", role: "user"}
];

class UsuariosDao {
    async getUser(username) {
        return usuarios.find(user => user.username === username);
    }
}

export const usuariosDao = new UsuariosDao();
