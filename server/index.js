"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Endpoint pour valider le Captcha
app.post('/api/validate-captcha', async (req, res) => {
    const { token } = req.body;
    const secretKey = "6LdZdJYqAAAAABSEi8dD5SqN4zQZOLv2-ysszk2v"; // Clé secrète de Google reCAPTCHA
    try {
        const response = await axios_1.default.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: secretKey,
                response: token,
            },
        });
        const { success } = response.data;
        res.json({ success });
    }
    catch (error) {
        console.error('Erreur de validation Captcha:', error);
        res.status(500).json({ success: false });
    }
});
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
