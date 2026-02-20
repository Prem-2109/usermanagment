// JSONBin.io configuration
// Sign up at https://jsonbin.io to get your own bins
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || '';
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || '';

const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3';

// In-memory fallback (for development without JSONBin)
let users = [
  {
    id: "admin",
    name: "Prem kumar",
    email: "pkprem21@gmail.com",
    phone: "9876543211",
    country: "india",
    address: "testing",
    gender: "male"
  }
];

// Fetch users from JSONBin or use memory
async function getUsers() {
  if (JSONBIN_BIN_ID && JSONBIN_API_KEY) {
    try {
      const response = await fetch(`${JSONBIN_BASE_URL}/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY
        }
      });
      const data = await response.json();
      return data.record?.user || [];
    } catch (error) {
      console.error('Error fetching from JSONBin:', error);
    }
  }
  return users;
}

// Save users to JSONBin or update memory
async function saveUsers(newUsers) {
  if (JSONBIN_BIN_ID && JSONBIN_API_KEY) {
    try {
      await fetch(`${JSONBIN_BASE_URL}/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'X-Master-Key': JSONBIN_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: newUsers })
      });
    } catch (error) {
      console.error('Error saving to JSONBin:', error);
    }
  }
  users = newUsers;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const allUsers = await getUsers();
    return res.status(200).json(allUsers);
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, country, address, gender, username } = req.body;

      // Validation - only email is required now
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email is required' 
        });
      }

      const allUsers = await getUsers();

      // Check if user already exists
      const existingUser = allUsers.find(u => u.email === email);
      if (existingUser) {
        return res.status(409).json({ 
          success: false, 
          message: 'User with this email already exists' 
        });
      }

      // Generate username from email if not provided
      const userId = username || email.split('@')[0];

      // Create new user (no password required)
      const newUser = {
        id: userId,
        name: name || '',
        email,
        phone: phone || '',
        country: country || '',
        address: address || '',
        gender: gender || '',
        username: userId
      };

      allUsers.push(newUser);
      await saveUsers(allUsers);

      return res.status(201).json({ 
        success: true, 
        message: 'User registered successfully',
        user: newUser
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
