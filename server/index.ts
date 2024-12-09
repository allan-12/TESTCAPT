import express, { Request, Response } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint pour valider le Captcha
app.post('/api/validate-captcha', async (req: Request, res: Response) => {
  const { token } = req.body;
  const secretKey = "6LdZdJYqAAAAABSEi8dD5SqN4zQZOLv2-ysszk2v"; // Clé secrète de Google reCAPTCHA

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    const { success } = response.data;
    res.json({ success });
  } catch (error) {
    console.error('Erreur de validation Captcha:', error);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
