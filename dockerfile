# Usa un'immagine base di Node.js
FROM node:20

# Imposta la directory di lavoro nel container
WORKDIR /usr/src/app

# Copia package.json e package-lock.json per installare le dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente nel container
COPY . .

# Compila TypeScript
RUN npm run build

# Espone la porta su cui gira l'applicazione
EXPOSE 8001

# Comando per avviare l'applicazione
CMD ["node", "build/server.js"]
