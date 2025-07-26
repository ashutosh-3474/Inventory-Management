const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { registerUser, loginUser } = require('./controllers/authController');
const { addProduct, updateQuantity, getProducts } = require('./controllers/productController');
const { authenticateToken } = require('./middlewares/authMiddleware');
require('dotenv').config();


const app = express();
connectDB();


const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send('API is running...');
});
app.post('/register', registerUser);
app.post('/login', loginUser);

app.post('/products', authenticateToken, addProduct);
app.put('/products/:id/quantity', authenticateToken, updateQuantity);
app.get('/products', authenticateToken,  getProducts);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});