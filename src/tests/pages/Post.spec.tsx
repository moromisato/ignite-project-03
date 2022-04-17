import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { getPrismicClient } from '../../services/prismic';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getSession } from 'next-auth/client';

jest.mock('next-auth/client');
jest.mock('../../services/stripe');
jest.mock('../../services/prismic');

const post = { 
  slug: 'my-new-post', 
  title: 'my new post',
  content: '<p>post content</p>', 
  updatedAt: '10 de abril'
};
describe('Posts page', () => {

  it('should render post correctly', () => {
    render(<Post post={post}/>)

    expect(screen.getByText('my new post')).toBeInTheDocument();
    expect(screen.getByText('post excerpt')).toBeInTheDocument();
  })

  it('should redirect user when no subscription is found', () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null
    })
    
    const response = getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    )
  })

  it('should load initial data', async () => {

    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    })

    const getPrismicClientMocked = mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
     getByUID: jest.fn().mockResolvedValueOnce({
      data: {
        title: [{ type: 'heading', text: 'my new post' }],
        content: [{ type: 'paragraph', text: 'post content' }]
      },
      last_publication_date: '04-01-2021'
     })
    } as any)


    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'my new post',
            content: '<p>post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )
  })
})