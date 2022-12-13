import { ChangeEventHandler } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export interface ISearch {
	placeholder: string;
	onSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const SearchBar = ({ placeholder, onSearch }: ISearch) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<TextField
				placeholder={placeholder}
				onChange={onSearch}
				sx={{ width: '300px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.1rem' }}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
};

export default SearchBar;
