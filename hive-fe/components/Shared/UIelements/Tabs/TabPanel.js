import React from 'react';
import RenderIfTrue from '@shared/SmallComponents/RenderIfTrue';
import Loader from '@shared/Fallback/Loader';
const TabPanel = ({ children, index, value, loading = false, isError, ...rest }) => {
	// console.log ({loading, isError});
	// console.log ({x: rest.error});
	if (loading || isError) return <Loader {...rest} isError={isError} retry={rest.refetch} loading={loading} />;
	return <RenderIfTrue condition={index === value}>{children}</RenderIfTrue>;
};

export default TabPanel;
