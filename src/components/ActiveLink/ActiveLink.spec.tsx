import { render } from '@testing-library/react';
import { ActiveLink } from '.';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';

jest.mock('next/router');

describe('ActiveLink', () => {
  it('renders correctly', () => {
    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({
      asPath: '/'   
    } as any)

    const { getByText } = render(
      <ActiveLink href='/' activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(getByText('Home')).toBeInTheDocument();
  });

  it('adds active class if the link is currently active', () => {
    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({
      asPath: '/'   
    } as any)

    const { getByText } = render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(getByText('Home')).toHaveClass('active');
  })

  it('should not add class if the link is not active', () => {
    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValueOnce({
      asPath: '/some'
    } as any)
    
    const { getByText } = render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText('Home')).not.toHaveClass('active');
  })
})

