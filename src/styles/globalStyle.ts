'use client';

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
	body{
		background-color: ${({ theme }) => theme.white};
		color: ${({ theme }) => theme.colors.color_primary};
	}
`;
