import { fireEvent, render } from '@testing-library/react';
import { mocked } from 'jest-mock'
import { signIn, signOut, useSession } from 'next-auth/client';
import { SignInButton } from '.';

jest.mock('next-auth/client');

describe("SignInButton", () => {
  it('should render correctly to user that is not logged in', () => {
    
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    
    const { getByText } = render(<SignInButton />)

    expect(getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('should call signIn function when user is not logged and click', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])
    
    const signInMocked = mocked(signIn)
    signInMocked.mockResolvedValueOnce(null)

    const { getByText } = render(<SignInButton />)

    const signInButton = getByText('Sign in with Github')

    fireEvent.click(signInButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('should render correctly to user that is logged in', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'loggedUser'
        }
      }, false]
    )
    
    const { getByText, queryByText } = render(<SignInButton />)

    expect(queryByText('Sign in with Github')).not.toBeInTheDocument()
    expect(getByText('loggedUser')).toBeInTheDocument()
  })

  it('should call signOut function when user is logged in and click', () => {
    
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'loggedUser'
        }
      }, false]
    )
    
    const signOutMocked = mocked(signOut)
    signOutMocked.mockResolvedValueOnce(null)

    const { getByText } = render(<SignInButton />)

    const signInButton = getByText('loggedUser')

    fireEvent.click(signInButton)

    expect(signOutMocked).toHaveBeenCalled()
  })
})