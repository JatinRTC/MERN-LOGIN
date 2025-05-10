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
import Img from '../leverageX.png';

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
      <Typography variant="h5" align="center" color="green" fontWeight="bold" gutterBottom>
        Withdrawal History
      </Typography>

      <Paper elevation={3} sx={{ p: 2, backgroundColor: 'black' }}>
        {history.length === 0 ? (
          <Typography variant="body1" align="center" color="grey.500">
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
                    primary={
                      <Typography variant="subtitle1"  color="white">
                        <Box component="span" color="green">
                          {name}
                        </Box>{' '}
                        • ₹{Number(amount).toLocaleString()} • {method}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="grey.400">
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
                <Divider
                  component="li"
                  sx={{
                    borderColor: 'white',
                    borderBottomWidth: 2,
                    my: 1,
                  }}
                />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default WithdrawalHistory;
