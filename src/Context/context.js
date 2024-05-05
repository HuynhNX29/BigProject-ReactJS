/** @format */

import { createContext } from 'react';

const defaultValues = {
	cart: [],
};

const StoreContext = createContext(defaultValues);

export default StoreContext;
