import express from 'express';

const router = express.Router();

const HYDERABAD_HUBS = {
  '500032': 'Gachibowli',
  '500081': 'Hitec City / Madhapur',
  '500033': 'Jubilee Hills',
  '500034': 'Banjara Hills',
  '500084': 'Kondapur',
  '500072': 'Kukatpally',
  '500003': 'Secunderabad',
};

router.get('/check-pincode/:pincode', (req, res) => {
  const { pincode } = req.params;
  const hub = HYDERABAD_HUBS[pincode];

  if (hub) {
    return res.json({
      serviceable: true,
      hub,
      slot: 'Morning 6:30 AM – 9:00 AM Daily',
      express: 'Direct cold-chain dispatch from Financial District Hub',
    });
  }

  return res.json({
    serviceable: false,
    message: 'Currently delivering within Hyderabad core zones (Gachibowli, Hitec City, Jubilee Hills, etc.).',
  });
});

export default router;
