const express = require('express');
const connectToMongoDB = require('./utils/config.js');
const userRouter = require('./routes/userRoutes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');

const app = express();
require('dotenv').config();

connectToMongoDB(process.env.MONGODB_URL);

app.get('/', (req, res) => {
    res.send('Hello to Express js practice');
});

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(bodyParser.json())
// app.use(middleware.requestLogger);

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter)

// Connect to MongoDB
app.listen(process.env.PORT || 5000, (error) => {
    if (error) {
        res.send(error.message);
    } else {
        console.log(`Server is running on port: http://localhost:${process.env.PORT || 5000}`);
    }
});
