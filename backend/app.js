const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

require('dotenv').config();
