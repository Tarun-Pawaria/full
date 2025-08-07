const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const SettingModel = require("./models/setting");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(expressLayouts);
app.set("layout", "layout");












// View engine
app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'views'));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


// Set current path globally
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});





// Admin Middleware (layout + settings)
app.use("/admin", async (req, res, next) => {
  try {
    res.locals.layout = "admin/layout";
    res.locals.settings1 = await SettingModel.findOne();
    next();
  } catch (err) {
    next(err); // Pass error to Express error handler
  }
});

// Routes
app.use("/", require("./routes/frontend"));
app.use("/admin", require("./routes/admin"));




// 404 handler (after all routes)
app.use((req, res, next) => {
  // Check if request was for admin route
  if (req.path.startsWith('/admin')) {
    return res.status(404).render('admin/404', {
      message: 'Page not found',
      role: req.role || 'admin'
    });
  }
  
  // Frontend 404 page
  res.status(404).render('404', {
    title: 'Page Not Found',
    message: 'Oops! The page you are looking for does not exist.'
  });
});


// Catch-all error handler (global)
app.use((err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  let view;

  if (req.path.startsWith('/admin')) {
    switch (status) {
      case 404:
        view = 'admin/404';
        break;
      case 401:
        view = 'admin/401';
        break;
      case 500:
      default:
        view = 'admin/500';
    }

    return res.status(status).render(view, {
      message: err.message || 'Something went wrong.',
      role: req.role || 'admin' // fallback
    });
  }

  // Default error for frontend
  res.status(status).render('500', {
    message: err.message || 'Something went wrong.',
  });
});



// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
