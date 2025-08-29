
function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      is_success: false,
      message: 'Method Not Allowed. Use POST /bfhl'
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) {}
    }

    if (!body || !Array.isArray(body.data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Invalid payload. Expected JSON: {"data": ["a","1","$"]}'
      });
    }

    
    const FULL_NAME_SNAKECASE = process.env.FULL_NAME_SNAKECASE || 'john_doe'; // lowercase_underscore
    const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || '01011990'; // ddmmyyyy
    const EMAIL = process.env.EMAIL || 'john@xyz.com';
    const ROLL_NUMBER = process.env.ROLL_NUMBER || 'ABCD123';

    const user_id = `${FULL_NAME_SNAKECASE}_${DOB_DDMMYYYY}`;

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    for (const original of body.data) {
      const item = String(original);

      // Integer detection (handles optional + / -). We treating only integers as numbers.
      if (/^[+-]?\d+$/.test(item)) {
        const num = parseInt(item, 10);
        if (Math.abs(num % 2) === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      }
      // Alphabets-only
      else if (/^[A-Za-z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      }
      else {
        special_characters.push(item);
      }
    }
    
    const allLettersUpper = alphabets.join('');
    const reversedChars = allLettersUpper.split('').reverse(); //reverse
    const concat_string = reversedChars
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join(''); // alternate caps (Upper at index 0)

    return res.status(200).json({
      is_success: true,
      user_id,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum), // sum must be returned as string
      concat_string
    });
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: err.message || 'Internal Server Error'
    });
  }
}

module.exports = handler;
