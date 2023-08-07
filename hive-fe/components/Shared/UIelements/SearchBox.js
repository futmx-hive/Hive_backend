const SearchBox = ({ value, onChange, placeholder, readonly = false, full = false, classes = "" }) => {
	return (
		<div className={`search  ${full ? "full" : ""}`}>
			<div className={`search_input br-1  bg-w   bord-g-1   flexi ${classes}`} style={{ overflow: "hidden" }}>
				<input
					type='text'
					placeholder={placeholder ? placeholder : "search products..."}
					className=' form_input '
					value={value}
					onChange={(e) => onChange(e.target.value)}
					readOnly={readonly}
				/>
				<svg style={{ width: "2.5rem", height: "2.5rem", margin: "0 8px" }}>
					<use xlinkHref={`/svg/sprite/sprite.svg#search`} />
				</svg>
			</div>
		</div>
	);
};

export default SearchBox;
