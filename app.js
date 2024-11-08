if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express');
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/coba", (req, res) => {
    res.status(200).json({
        message: "berhasil coba"
    })
})

app.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, name, password },
    });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed', details: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
