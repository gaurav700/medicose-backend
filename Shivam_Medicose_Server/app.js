const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connectDB = require('./config');
const Purchase = require('./Models/Purchase_History');
const Sale_History = require('./Models/Sale_History');
const Request_Schema = require('./Models/Request');
const User = require('./Models/login');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { storage, cloudinary } = require("./cloudconfig.js");
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Middleware for CORS
app.use(cors());

// Session configuration
app.use(session({
  secret: 'shivammedicose', // Replace with your actual secret key
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Session cookie lifespan in milliseconds (e.g., 1 day)
    secure: false, // Set to true if using HTTPS
    httpOnly: true // Helps protect against XSS attacks
  }
}));

// Multer instance
const upload = multer({ storage });

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  // If user is not authenticated, redirect or send an error response
  return res.status(401).json({ message: 'Unauthorized access' });
}

// Protected route example
app.get('/protected', ensureAuthenticated, (req, res) => {
  res.send('This is a protected route');
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Shivam Medicose API');
});

// Register route
app.post('/register', upload.single('profileImage'), async (req, res) => {
  const { username, email, password } = req.body;
  const emailnew = email.toLowerCase();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImage = result.secure_url;
    }
    const newUser = new User({ username, email:emailnew, password: hashedPassword, profileImage });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Incorrect email.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }
    // Set session variables
    req.session.userId = user._id;
    res.status(200).json(req.session.userId);
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});
// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});





// API endpoints: Purchase
app.get('/api/purchases', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/purchases',   async (req, res) => {
  const purchaseData = req.body;
  const purchase = new Purchase(purchaseData);
  try {
    const newPurchase = await purchase.save();
    res.status(201).json({ message: 'Data Inserted Successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/purchases/:purchaseId',  async (req, res) => {
  const { purchaseId } = req.params;
  const { vendorName, purchaseDate, medicine } = req.body;
  try {
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    purchase.vendorName = vendorName;
    purchase.purchaseDate = purchaseDate;
    purchase.medicine = medicine.map(med => ({
      ...med,
      expiry: new Date(med.expiry)
    }));
    const updatedPurchase = await purchase.save();
    res.status(200).json({ message: 'Data Updated Successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/purchases/:purchaseId/medicines/:medicineId', async (req, res) => {
  const { purchaseId, medicineId } = req.params;
  try {
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      purchaseId,
      { $pull: { medicine: { _id: medicineId } } },
      { new: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: 'Purchase or medicine not found' });
    }

    if (updatedPurchase.medicine.length === 0) {
      await Purchase.findByIdAndDelete(purchaseId);
      return res.status(200).json({ message: 'Purchase deleted as it had no more medicines' });
    }

    res.status(200).json({ message: 'Medicine deleted successfully', updatedPurchase });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// API endpoints: Sale

app.post('/api/sales',  async (req, res) => {
  try {
    const { todayDate, customers } = req.body;
    if (!todayDate || !customers || !Array.isArray(customers)) {
      throw new Error('Invalid request body');
    }
    const existingSale = await Sale_History.findOne({ todayDate: new Date(todayDate) });

    if (existingSale) {
      customers.forEach(customer => {
        const existingCustomerIndex = existingSale.customers.findIndex(c =>
          c.customerName === customer.customerName && c.doctorName === customer.doctorName
        );
        if (existingCustomerIndex !== -1) {
          existingSale.customers[existingCustomerIndex].medicine.push(...customer.medicine);
        } else {
          existingSale.customers.push(customer);
        }
      });
      const updatedSale = await existingSale.save();
      res.json(updatedSale);
    } else {
      const newSale = new Sale_History({
        todayDate: new Date(todayDate),
        customers,
      });
      const savedSale = await newSale.save();
      res.json(savedSale);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/sales/:saleId', async (req, res) => {
  const { saleId } = req.params;
  const { todayDate, customerId, billNo, customerName, doctorName, medicine } = req.body;
  const customers = [{
    _id: customerId,
    billNo,
    customerName,
    doctorName,
    medicine
  }];
  try {
    const sale = await Sale_History.findById(saleId);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    sale.todayDate = new Date(todayDate);
    sale.customers = customers.map(customer => ({
      ...customer,
      medicine: customer.medicine.map(med => ({
        ...med,
        expiry: new Date(med.expiry)
      }))
    }));
    const updatedSale = await sale.save();
    res.status(200).json({ message: 'Sale Updated Successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/sales/bills', async (req, res) => {
  try {
    const sales = await Sale_History.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/sale/:saleId/:customerId/:medicineId', async (req, res) => {
  const { saleId, customerId, medicineId } = req.params;

  try {
    // Find the sale by ID
    const sale = await Sale_History.findById(saleId);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    // Find the customer in the sale's customers array
    const customer = sale.customers.find(c => c._id == customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found in this sale' });
    }

    // Filter out the medicine to be deleted
    customer.medicine = customer.medicine.filter(m => m._id != medicineId);

    // If no more medicines left for this customer, delete the customer
    if (customer.medicine.length === 0) {
      sale.customers = sale.customers.filter(c => c._id != customerId);

      // If no more customers left in the sale, delete the sale
      if (sale.customers.length === 0) {
        await Sale_History.findByIdAndDelete(saleId);
        return res.status(200).json({ message: 'Sale and customer deleted successfully' });
      }
    }

    // Save the updated sale
    await sale.save();

    res.status(200).json({ message: 'Medicine deleted successfully'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// API endpoints: Medicine
app.delete('/api/medicine/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the purchase containing the medicine
    const purchase = await Purchase.findOne({ "medicine._id": id });

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    // Filter out the medicine to be deleted
    purchase.medicine = purchase.medicine.filter(medicine => medicine._id != id);

    // If no medicines are left, delete the entire purchase
    if (purchase.medicine.length === 0) {
      await Purchase.findByIdAndDelete(purchase._id);
      return res.status(200).json({ message: 'Purchase deleted as it had no more medicines' });
    }

    // Save the updated purchase
    await purchase.save();

    res.status(200).json({ message: 'Medicine deleted successfully', updatedPurchase: purchase });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// API endpoints: Request
app.get('/api/request', async (req, res) => {
  try {
    const requests = await Request_Schema.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/api/requestMed', upload.single('prepImage'), async(req,res)=>{
  const { name, address, phoneNo } = req.body;
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      medFile = result.secure_url;
    }
    const request = new Request_Schema({name,address, phoneNo, medFile});
    console.log(request);
    const newRequest = await request.save();
    res.status(201).json({message : 'Request sent successfully'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})
app.post('/api/request', async (req, res) => {
  const requestData = req.body;
  const request = new Request_Schema(requestData);
  try {
    const newRequest = await request.save();
    res.status(201).json({message : 'Request sent successfully'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.delete('/api/request/:requestId',async (req, res) => {
  const { requestId } = req.params;
  try {
    await Request_Schema.findByIdAndDelete(requestId);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
