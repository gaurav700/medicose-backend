import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function Notification() {
  return (
    <div className="notification">
      <h4 >Notification</h4>
      <hr />
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="warning" onClose={() => { }}>
          This Alert displays the default close icon.
        </Alert>
        <Alert severity="warning" onClose={() => { }}>
          This Alert displays the default close icon.
        </Alert>
        <Alert severity="warning" onClose={() => { }}>
          This Alert displays the default close icon.
        </Alert>
        <Alert severity="warning" onClose={() => { }}>
          This Alert displays the default close icon.
        </Alert>
        <Alert severity="warning" onClose={() => { }}>
          This Alert displays the default close icon.
        </Alert>
        <Alert severity="warning" onClose={() => { }}>
          This Alert displays the default close icon.
        </Alert>
      </Stack>
    </div>
  );
}
