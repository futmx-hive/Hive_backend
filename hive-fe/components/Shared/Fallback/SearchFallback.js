import Card from '../Shared/SmallComponents/Card';

const SearchFallback = ({ children, length, text, searchKey }) => {
	return length > 0 ? (
		children
	) : (
		<Card classes='container-c752 p-5 u-center'>
			<p className='heading_med_lag col-bl cap  weit-2'>
				hmm... nothing seems to match
				<span className='col-b'>{`"${searchKey}"`}</span>
			</p>
		</Card>
	);
};

export default SearchFallback;
