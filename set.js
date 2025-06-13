




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ05jTlFHck5xM01zQzZWUnZMTG1rT2VPNzZtc0p0SDR3Z2tqK0hQMzhsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1k1VHo4cks3bkxkMWVWY2dZVjNXWjFZNW1HTlVkd0RVL3dQQ252cW5IST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHSmUyUGMvQXZmWUFqS3NZRTgvMm50eE1ibU8vRUMyWnNOME0zYW9pcWtBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxWTB0bTRwTXV5bVNPZ1FxV2xWL0MyblF5WWpENzBFV240VTJRN0ltYzJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhCWDYydDhPSUtkTWt0UDRhdFBLQUtYcU1NaUdyVFRibjNGUDRySWFsWFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhLSTR4S1FIdnQ0WVdyOUdSeDNqTk9DYTVmaWpQVndQL0NtZGFaamZzM2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU9YQlBabGtMUVRrNmc4SzN4QWk1aDFrZVFWS3AzMTVuRzd6bXArYkhVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUXozZ0h2bmdnYjlQOEp3eUVqbzQvdzJNRTJ6aUVCK2wwVm9USEdsQm5BYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJXY1NzV2hMWStyeVBOalJtajdxM0hOQzViOU5kMC9vdkNSUE1zb2dZZXhFTWhxUGxWNzJpUkRtYWV1SFgyRmIrT1FuZWFUMUJVU1doZm5ESFh0T2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODUsImFkdlNlY3JldEtleSI6InFjNHBRWVY1QTdSNzFGTmh6VEY1TXhSUGlsKzRta1phd1EyaXJqM0MxM009IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzE5OTIxNzEzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZBNDRGRjY4MzZGQTQ3ODk4N0Y0QzJFQjE1QjlFNTgwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk4NDY1NTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTcxOTkyMTcxM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0NjJGNEU3NDg1MjcwQzFDNzQzOTEwQjI0RDY5QkE5NCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5ODQ2NTU4fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJGR1ZZNlFUUiIsIm1lIjp7ImlkIjoiMjU1NzE5OTIxNzEzOjY4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTEwMTgzNTk0MzUyNzcxOjY4QGxpZCIsIm5hbWUiOiJtYW5kaW5nb3Bvbmpvcm8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lQSzByb0NFSXFVc3NJR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ims0bTlkeFg5VlI2RDFhQ3djbDZuM3NXNlZJZnAySm5VYkgrbFJaYnBKVjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im1rT1EvRVZLR2pVMWZtNm90dmtCcFl5d29UTTVVNmg0UlovdDQzUXFKOFNtcUVJSXMyWC9oNXFVN0wxSHhPK05HbHJnYWdCUC9HcG1MU3VlaXdDOUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtQldneDc2aDcxeVdyY1hWQmduWEVqbFlJd0c3c2hmMmtqYW1sMVkvcXNyaGZ6ZVF0M3RTaGRWNWVKRGVjQWY4V3BqVEFJTWpta2dLSFVQQitQd1ZoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTcxOTkyMTcxMzo2OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaT0p2WGNWL1ZVZWc5V2dzSEplcDk3RnVsU0g2ZGlaMUd4L3BVV1c2U1ZlIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDk4NDY1NTEsImxhc3RQcm9wSGFzaCI6IjNnUFVKayIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRnFLIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " ",              
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
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "",
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
