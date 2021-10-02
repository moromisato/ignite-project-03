import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Titulo do POST</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices enim ut dolor commodo posuere. Sed maximus vehicula vestibulum. Curabitur id fermentum ipsum, pretium sollicitudin leo. Donec ac metus sodales, mollis metus eu, sagittis arcu. Aenean tempor vehicula posuere. Integer mattis, elit et maximus elementum, sapien purus mattis magna, ut placerat dolor nulla sit amet leo. Pellentesque venenatis nunc eget nibh faucibus auctor. Nam aliquet porta leo quis elementum. Ut ornare quam felis, in pharetra est laoreet id. Vestibulum congue, dolor id sodales sollicitudin, orci nunc pretium nunc, quis gravida neque elit ut ligula.</p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Titulo do POST</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices enim ut dolor commodo posuere. Sed maximus vehicula vestibulum. Curabitur id fermentum ipsum, pretium sollicitudin leo. Donec ac metus sodales, mollis metus eu, sagittis arcu. Aenean tempor vehicula posuere. Integer mattis, elit et maximus elementum, sapien purus mattis magna, ut placerat dolor nulla sit amet leo. Pellentesque venenatis nunc eget nibh faucibus auctor. Nam aliquet porta leo quis elementum. Ut ornare quam felis, in pharetra est laoreet id. Vestibulum congue, dolor id sodales sollicitudin, orci nunc pretium nunc, quis gravida neque elit ut ligula.</p>
          </a>
          <a>
            <time>12 de março de 2021</time>
            <strong>Titulo do POST</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices enim ut dolor commodo posuere. Sed maximus vehicula vestibulum. Curabitur id fermentum ipsum, pretium sollicitudin leo. Donec ac metus sodales, mollis metus eu, sagittis arcu. Aenean tempor vehicula posuere. Integer mattis, elit et maximus elementum, sapien purus mattis magna, ut placerat dolor nulla sit amet leo. Pellentesque venenatis nunc eget nibh faucibus auctor. Nam aliquet porta leo quis elementum. Ut ornare quam felis, in pharetra est laoreet id. Vestibulum congue, dolor id sodales sollicitudin, orci nunc pretium nunc, quis gravida neque elit ut ligula.</p>
          </a>
        </div>
      </main>
    </>
  )
}