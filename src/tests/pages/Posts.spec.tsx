import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { getPrismicClient } from '../../services/prismic';

import Posts, { getStaticProps } from '../../pages/posts';

jest.mock('../../services/stripe');
jest.mock('../../services/prismic')

const posts = [
  { slug: 'my-new-post' , title: 'my new post', excerpt: 'post excerpt', updatedAt: '10 de abril'}
];

describe('Posts page', () => {

  it('should render post correctly', () => {
    render(<Posts posts={posts}/>)

    expect(screen.getByText('my new post')).toBeInTheDocument();
  })

  it('should load initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'my new post' }],
              content: [{ type: 'paragraph', text: 'post excerpt' }]
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as any)


    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'my new post',
              excerpt: 'post excerpt',
              updatedAt: '01 de abril de 2021'
            }
          ]
        }
      })
    )
  })
})