import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useSnackbar } from 'notistack';

import { Layout } from '../ui';

const CryptoAddress: FunctionComponent<{
  address: string;
  network: string;
}> = ({ address, network }) => {
  const { enqueueSnackbar } = useSnackbar();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    enqueueSnackbar(`${network} address copied to clipboard.`);
  };

  return (
    <>
      <Box>
        <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 1 }}>
          {network}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography
          sx={{ overflowWrap: 'anywhere' }}
          variant="body2"
          color="GrayText"
        >
          {address}
        </Typography>

        <Tooltip title={`Copy ${network} address to clipboard.`}>
          <IconButton
            aria-label={`Copy ${network} address to clipboard.`}
            onClick={copyToClipboard}
          >
            <AssignmentIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export const DonateTab: FunctionComponent = () => {
  return (
    <Layout>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        If you have benefited from this project and would like to donate as a
        way of thanks, you can send crypto to any of the addresses below:
      </Typography>

      <CryptoAddress
        network="Etherum"
        address="0x8212A0022C7f5cC7B2f1C910367fec1F8fCae116"
      />

      <CryptoAddress
        network="Polygon"
        address="0x8212A0022C7f5cC7B2f1C910367fec1F8fCae116"
      />

      <CryptoAddress
        network="Avalanche"
        address="0x8212A0022C7f5cC7B2f1C910367fec1F8fCae116"
      />

      <CryptoAddress
        network="Binance Smart Chain"
        address="0xF1dc97aB817cf2Ed0aBdbE9C551Dc80F63BDAF9f"
      />

      <CryptoAddress
        network="Terra"
        address="terra1na3mqdyle4r5v3yl8nlvy5qklvpfrz06hn6ap5"
      />

      <CryptoAddress
        network="Permission"
        address="0x47f495fa22f91b3dca759ed680cce41cc572c6a0"
      />
    </Layout>
  );
};
