'use client';

import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
	body{
		background-color: ${({ theme }) => theme.white};
		white-space: pre-wrap;
		/* color: ${({ theme }) => theme.colors.color_primary}; */
	}
	strong{
		font-weight: 700;
	}
	em{
		font-style: italic;
	}
	.tiptap{
		ul{
			list-style: circle;
		}
		ol{
			list-style: decimal;
		}
	}
	.hvr{
		:hover{
			cursor: pointer;
			color: ${({ theme }) => theme.colors.color_primary};
		}
	}
	.hvrImg{
		img:hover{
			background-color: white;
			opacity: 0.3;
			cursor:none !important;
		}
	}
	
`;
