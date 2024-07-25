const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUhTVFNobk1VYlhRVGlFVUlIS21Ia0hydXRuemRvR2twMTJFd1l4aUFsTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWFRKcFBRNURzTmI2eUQ2SUMxd3ZETENJbFhUdDJSWkpOMHlJaGtqcnNrUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSTFDOWEzL3NFMTQ5YzREU2RvUFU2VGxkeW5sdHNnZVFCbE0vSmpJdEhjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGVEVxY2hjcW1pUXVuYWxFdURtdGVPdiswb1hnYUh5QkRtM3kyZTR1cnlVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFBWHlPZ2xUeWRGU3dXQUtjZzdhdlpyd3JRS2hhS0xuRHk0RXRUQXlxbGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBpZDc1OCtHQ3JOZ2h1MXlZUU9majFVL0lTNWZ2dEI2QWpGT0tqSENPQXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVBiUnlsYzFDbmw5Q1BRM1JJRmt1MjFKOThvelArSkRmT0F6R2Z4SkdGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUx6VHBFMSsxVE5vNTNNM21Rb2xyMWtUeDdQaFh2ZGkvZDFwKzUvbzB4az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNhZ3BqVW5TSFkwVGFQc01RUjFGU2l1bmNZOTRFU1NvaVJmaVF1Z3NjNE5ZR1VsRkQwclNMeDlsNzlsTXZ5RmsySC96aWdJNUxpZ0YzUkdGaCs0b0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6Ii9XUkZSWE9MSlR1VDE2a0I5WWZZRVg2TVY3TC9qUGtBT2MydlVOaEJXdk09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImlBbmhUcDJSVEx5Wk5yQ01uSElEdWciLCJwaG9uZUlkIjoiMGVlMTUxYWUtNGE1My00YzIyLTkxYzgtODRkNDAzZDAzODhjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdidHVzaU9oNHNIY0lCZStSTUdhdS9YYkZabz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJckljZVBmK2RZV2xVVVAwM2RXM3lURWlDSDg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMzJYTEdEN1IiLCJtZSI6eyJpZCI6IjI1NTY3NTIzMzI0NToyMUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSTdnMkpvR0VMeTNpTFVHR0FnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidFV0Qnk2TTdJdmc2MTFtdTZycENsc3RFL3RSQlZQZ0g3STllUzZRLzV6ND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY25GdHluQ0VpOGc0ZWtZL0Z0eFRyVVBOUzg5UUh2c0tJd2hqb2Y1WDNMU2pwMjh5WlYyaFBObklpQXpnck1Td0J1c0dPNUNoL3RqdEhsUTloTmQ1Q2c9PSIsImRldmljZVNpZ25hdHVyZSI6Imhsd242WnZJS1V4Tys5cnZoQS8zMjFlbWdaZVhJOFhmeE9qcllXSlBud1NQVnZOakQ1VzUzQVpVSkFzb04vMmhKTzR1N0p5SFhibFhNM2ZzTC9sNEFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1Njc1MjMzMjQ1OjIxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJWTFFjdWpPeUw0T3RkWnJ1cTZRcGJMUlA3VVFWVDRCK3lQWGt1a1ArYysifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE4OTk5NzYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQmJ1In0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
