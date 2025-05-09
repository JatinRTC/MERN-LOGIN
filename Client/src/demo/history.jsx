import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Chip,
  Divider,
  Box,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import Img from '../leverageX.png'; // Replace with your logo/image

const WithdrawalHistory = () => {
  const email = localStorage.getItem('userEmail');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!email) return;

    axios
      .get(`http://localhost:5000/putBalance?email=${email}`)
      .then((res) => setHistory(res.data))
      .catch((err) => {
        console.error(err);
        setHistory([]);
      });
  }, [email]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" align="center" color="green" gutterBottom>
        Withdrawal History
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        {history.length === 0 ? (
          <Typography variant="body1" align="center" color="text.secondary">
            No withdrawal history found 
          </Typography>
        ) : (
          <List>
            {history.map(({ _id, name, amount, method, date, status }) => (
              <React.Fragment key={_id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={Img} sx={{ width: 40, height: 40, border: 1 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${name} • ₹${Number(amount).toLocaleString()} • ${method}`}
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          Received on {new Date(date).toLocaleString()}
                        </Typography>
                        <Chip
                          label={status}
                          icon={<CheckCircleIcon />}
                          size="small"
                          color={status === 'Completed' ? 'success' : 'warning'}
                          sx={{ mt: 1 }}
                        />
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default WithdrawalHistory;
