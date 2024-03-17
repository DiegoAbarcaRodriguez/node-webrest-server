import express from 'express';
import path from 'path';

interface Options {
    port: number,
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path
    }

    async start() {


        //Midlewares (Funciones que se ejecutan al solicitar una ruta)
        // Public Folder (Renderiza los archivos html,css y js con el content type respectivos)
        this.app.use(express.static(this.publicPath));

        //!important: Recordar que opera como la carpeta de administrador de archivos, el archivo index posee la configuracion de root

        // Setea la ruta '/' al actualizar la ruta para evitar que se rompa el router establecido por react el cual nada mas opera a nivel root
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        });



        this.app.listen(this.port, () => {
            console.log('Server running on port 3000');
        });
    }
}