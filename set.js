const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEl1RUd2SExYQzRBZ1lvWnU5TjRsUEdiUk52TUxkTzRIeS9ud1lkUklIYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFh4Qkc2bVcvZEJrVSswVzBER204TzQyWjdiT0YzN1BCTlRCSDVyKzhYWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQkxHY1BoVUhpTlBBbjZyWGdwQ3hBNzFRamFBcW9mQkxGTHcrV1dHQW5RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzR0lKV3NwMWJvSUlsVXI1am5EakFjaDhZc3FnRGM2aWszRmhlTzhXMUU0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNLTTdlQzJVWFJLakhicy9MMGM1cSs3WjhaY2FiOFNOSUg2R1ZPc1ZJMWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJZT3lHMk52dkVnaDU3YzZOVXA2elVobHF1aVR3VFlMNWFCWVU5WGtXeEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV055bk1ZbFh3bkhBalZDUllDelRZZDZSMmZPR3p2czZweWhZYVdsZjdIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRnNXZ1p6UzdwTlpLdThyQ1YzMmxhemRKNkt3VnZIMmJPQVpnUGlBU1pqYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJaTFE1YjBiWGlCclFTbjZsWUF5bDZXMFgwdDRRa1FLSjRyNDVacnZmUkJkeUV1UjMrZm9JY1NCSFhlODNCYXh5d2wwZXVqTnc1OWlVU1pXVzh4a2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI1LCJhZHZTZWNyZXRLZXkiOiIwclp3TFNzUm5WOHREYTkyUXdxd3IvbExURTR2dE1jNEQxNi9ySE9rZFJvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJlUXZSWlVBZlRIaWt5VHM0amZSNi13IiwicGhvbmVJZCI6IjM4OGU0YWNjLWUyYTEtNDVmOS1iYjk1LTM4YTQ1MWU3NDYxNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0eG1FanUwbDRtNjNFa3hXZGp4Y1FzdWk2SXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidHY3dkxZVjJobTc4aEhIK3V0MGFKU0VBU0NFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IldUTVZHUVY1IiwibWUiOnsiaWQiOiIyNTU2NzUyMzMyNDU6MjBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0k3ZzJKb0dFSktIaHJVR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InRVdEJ5Nk03SXZnNjExbXU2cnBDbHN0RS90UkJWUGdIN0k5ZVM2US81ejQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlhrbTM1OURrRW5ta0hsWlQyVXdJcnk0Ukpucno0Z21MWlNLTGNpUHVuckwzYytXUnNFbU9NQVlHNkptZzdySXJxOWRNVWt3RFhGdjFKc0lGTnowVkF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJqT0pabmFNTXFmWFU3Sy9qUUZ4aGs2M3NsRUhPMVc3U2c2dHJiU1RyQzlRN2J1M3R0NTl3c3N0SlFSeTd0WWt0M2tLSEI1Qk1PSFl1Z0lxdmlYUmxndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY3NTIzMzI0NToyMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiVkxRY3VqT3lMNE90ZFpydXE2UXBiTFJQN1VRVlQ0Qit5UFhrdWtQK2MrIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxODYxMDIyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJidSJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "dragon",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " dragon",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'bmw_md',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'yes',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
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
