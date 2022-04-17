import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/client';

import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/client');
jest.mock('next/router');
jest.mock('../../services/prismic')

const post = { 
  slug: 'my-new-post', 
  title: 'my new post',
  content: '<p>post content</p>', 
  updatedAt: '10 de abril'
};

describe('Posts page', () => {

  it('should render post correctly', () => {

    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Post post={post}/>)

    expect(screen.getByText('my new post')).toBeInTheDocument();
    expect(screen.getByText('post content')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  })

  it('should redirect to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([{
      activeSubscription: 'fake-active-subscription'
    }, false])

    const useRouterMocked = mocked(useRouter);
    const pushMocked = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<Post post={post}/>)

    expect(pushMocked).toHaveBeenCalledWith('/posts/my-new-post')

  })

  it('should load initial data', async () => {
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


    const response = await getStaticProps({
      params: { slug: 'my-new-post' }
    })

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