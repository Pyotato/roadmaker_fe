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
	sub, sup {
		font-size: 75%;
		line-height: 0;
		position: relative;
		vertical-align: baseline;
	}
 
	sup {
	top: -0.5em;
	}
 
	sub {
	bottom: -0.25em;
	}

	.txt-height{
		line-height: normal !important;
	}

	iframe{
		/* width: initial !important; */

	}

	.footer {
  margin-top: rem(120px);
  padding-top: calc(var(--mantine-spacing-xl) * 2);
  background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
  border-top: rem(1px) solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5));
}

.logo {
  max-width: rem(200px);

  @media (max-width: $mantine-breakpoint-sm) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.description {
  margin-top: rem(5px);

  @media (max-width: $mantine-breakpoint-sm) {
    margin-top: var(--mantine-spacing-xs);
    text-align: center;
  }
}

.inner {
  display: flex;
  justify-content: space-between;

  @media (max-width: $mantine-breakpoint-sm) {
    flex-direction: column;
    align-items: center;
  }
}

.wrapper {
  width: rem(160px);
}

.link {
  display: block;
  color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-1));
  font-size: var(--mantine-font-size-sm);
  padding-top: rem(3px);
  padding-bottom: rem(3px);

  &:hover {
    text-decoration: underline;
  }
}

.title {
  font-size: var(--mantine-font-size-lg);
  font-weight: 700;
  font-family:
    Greycliff CF,
    var(--mantine-font-family);
  margin-bottom: calc(var(--mantine-spacing-xs) / 2);
  color: light-dark(var(--mantine-color-black), var(--mantine-color-white));
}

.afterFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--mantine-spacing-lg);
  padding-bottom: var(--mantine-spacing-xl);
  border-top: rem(1px) solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4));

  @media (max-width: $mantine-breakpoint-sm) {
    flex-direction: column;
  }
}	

.root {
  background-color: var(--notification-color, var(--mantine-primary-color-filled));

  &::before {
    background-color: var(--mantine-color-white);
  }
}

.description,
.title {
  color: var(--mantine-color-white);
}

.closeButton {
  color: var(--mantine-color-white);

  @mixin hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.notification{
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  min-width: 18rem;
}

`;
