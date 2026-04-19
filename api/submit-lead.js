const { google } = require('googleapis');
const serviceAccount = require('../firebase-service.json');

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, serviceNeed, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone are required.' });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1jRmLUN-kbsToxeUs3u1jLT2arYzuzElAYkG8LAbHduc';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, phone, serviceNeed || '', message || '', new Date().toISOString()]],
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in submit-lead API:', error);
    return res.status(500).json({ success: false, error: 'Failed to save data. Please try again later.' });
  }
};
