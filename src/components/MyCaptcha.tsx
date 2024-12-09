import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

const MyCaptcha: React.FC = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const onCaptchaChange = (token: string | null) => {
    console.log("Captcha token:", token);
    setCaptchaToken(token);
  };

  const sendCaptchaToServer = async () => {
    if (!captchaToken) return;

    try {
      const response = await axios.post<{ success: boolean }>(
        'http://localhost:5000/api/validate-captcha',
        { token: captchaToken }
      );

      setIsVerified(response.data.success);
      console.log('Validation du Captcha:', response.data.success);
    } catch (error) {
      console.error('Erreur de validation Captcha:', error);
      setIsVerified(false);
    }
  };

  return (
    <div>
      <h3>Formulaire avec Captcha</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendCaptchaToServer();
        }}
      >
        <input type="text" placeholder="Votre nom" required />
        <ReCAPTCHA
          sitekey="VOTRE_SITE_KEY"
          onChange={onCaptchaChange}
        />
        <button type="submit" disabled={!captchaToken}>
          Soumettre
        </button>
      </form>
      {isVerified !== null && (
        <p>{isVerified ? "Captcha validé avec succès !" : "Captcha invalide."}</p>
      )}
    </div>
  );
};

export default MyCaptcha;
