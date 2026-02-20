// Simple in-memory user store
// Note: Data will reset on server cold start in free tier
let users = [
  {
    id: "admin",
    name: "Prem kumar",
    password: "Pk@1234",
    email: "pkprem21@gmail.com",
    phone: "9876543211",
    country: "india",
    address: "testing",
    gender: "male"
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return all users (excluding passwords)
    const safeUsers = users.map(({ password, ...user }) => user);
    return res.status(200).json(safeUsers);
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, country, address, gender, username, password } = req.body;

      // Validation
      if (!username || !password || !email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Username, email and password are required' 
        });
      }

      // Check if user already exists
      const existingUser = users.find(u => u.username === username || u.email === email);
      if (existingUser) {
        return res.status(409).json({ 
          success: false, 
          message: 'User with this username or email already exists' 
        });
      }

      // Create new user
      const newUser = {
        id: username,
        name: name || '',
        email,
        phone: phone || '',
        country: country || '',
        address: address || '',
        gender: gender || '',
        username,
        password
      };

      users.push(newUser);

      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser;
      return res.status(201).json({ 
        success: true, 
        message: 'User registered successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
