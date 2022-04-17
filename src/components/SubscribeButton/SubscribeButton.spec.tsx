import { fireEvent, render, screen } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/client';
import { SubscribeButton } from '.';
import { mocked } from 'jest-mock';
import { useRouter } from 'next/router';

jest.mock('next-auth/client')
jest.mock('next/router')

describe('SubscribeButton', () => {
  it('should render correclty', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    
    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('should redirect user to sign in when not authenticated', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    
    const signInMocked = mocked(signIn);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled();
  })

  it('should redirect to /posts when user has an active subscription', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      {
        activeSubscription: "active-subscription-id"
      },
      false
    ])

    const mockedPush = jest.fn()
    const useRouterMocked = mocked(useRouter)
    useRouterMocked.mockReturnValue({
      push: mockedPush
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(mockedPush).toHaveBeenCalledWith('/posts')
  })
})