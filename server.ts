import app from './config/app';
import { verifyDatabaseConnection } from './config/database';

const PORT : Number = Number(process.env.PORT) || 8000;

async function startServer() : Promise<void> {
    try {
        await verifyDatabaseConnection();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error : any) {
        console.error(error.message);
        process.exit(1); 
    }
}

startServer();