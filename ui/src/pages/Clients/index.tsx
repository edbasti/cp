import { memo, useContext, useCallback, useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { StateContext } from '../../store/DataProvider';
import Page from '../../components/Page';
import ClientTable from './ClientTable';
import SearchBar from '../../components/SearchBar';
import CreateClient from '../../components/Client/CreateClient';
import { getClients } from '../../services/api';

function Clients() {
	const { state, dispatch } = useContext(StateContext);
	const { clients } = state;
	const [filteredClients, setFilteredClients] = useState<IClient[]>();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		getClients().then((clients) => dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients }));
	}, [dispatch]);

	const handleChange = useCallback(
		(e: any) => {
			const query = e.target.value;
			if (query) {
				const filterClients = clients?.filter((client) => {
					return client.firstName.toLowerCase() === query.toLowerCase();
				});

				setFilteredClients(filterClients);
			} else {
				setFilteredClients(clients);
			}
		},
		[setFilteredClients, clients]
	);

	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '1px solid #808080',
		borderRadius: '5px',
		boxShadow: 24,
		p: 4,
		height: 400,
	};

	return (
		<>
			<Modal aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description' open={open}>
				<>
					<Box sx={style}>
						<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
							<Typography id='modal-modal-title' variant='h6' component='h2'>
								Create new client
							</Typography>
							<CloseIcon onClick={handleClose} />
						</Box>
						<CreateClient />
					</Box>
				</>
			</Modal>

			<Page>
				<Typography variant='h4' sx={{ textAlign: 'start', marginBottom: '30px' }}>
					Clients
				</Typography>
				<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<SearchBar onSearch={handleChange} placeholder='Search clients...' />
					<Button onClick={handleOpen} size='medium' variant='contained' color='primary'>
						Create new client
					</Button>
				</Box>

				<Paper sx={{ margin: 'auto', marginTop: 3 }}>
					<ClientTable clients={filteredClients || clients} />
				</Paper>
			</Page>
		</>
	);
}

export default memo(Clients);
