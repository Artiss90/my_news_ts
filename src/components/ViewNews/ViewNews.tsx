import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addNews, News } from 'redux/news/newsSlice';
import CartNews from './CartNews/CartNews';
import Button from '@mui/material/Button';
import style from './ViewNews.module.css';

const fakeNews = [
  {
    source: {
      id: null,
      name: 'Engadget',
    },
    author: 'Mariella Moon',
    title: 'Uber puts a ride tracker on the iPhone lock screen',
    description:
      "Uber has rolled out an update for its iPhone app that gives you the capability to see at a glance whether it's time to head out the door and meet the ride you ordered. The company has launched support for Live Activities, an iOS 16 feature that puts real time…",
    url: 'https://www.engadget.com/uber-ride-tracker-iphone-lock-screen-060908235.html',
    urlToImage:
      'https://s.yimg.com/uu/api/res/1.2/J2YKCUmqOFgoB8IGORwR.Q--~B/Zmk9ZmlsbDtoPTYzMDtweW9mZj0wO3c9MTIwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2023-02/acf68150-b338-11ed-b7df-fe851f6641fa.cf.jpg',
    publishedAt: '2023-02-23T06:09:08Z',
    content:
      "Uber has rolled out an update for its iPhone app that gives you the capability to see at a glance whether it's time to head out the door and meet the ride you ordered. The company has launched suppor… [+1173 chars]",
  },
  {
    source: {
      id: 'wired',
      name: 'Wired',
    },
    author: 'Scott Gilbertson',
    title: '14 Best Deals: Apple iPads, Laptops, and Outdoor Gear',
    description:
      'Whether you’re looking for new tech to get through long cool nights, or planning a spring camping trip, there are plenty of discounts that can help.',
    url: 'https://www.wired.com/story/midweek-deals-022223/',
    urlToImage:
      'https://media.wired.com/photos/627af5ce194f8820f344ac62/191:100/w_1280,c_limit/Pixel-6a-SOURCE-Google-Gear.jpg',
    publishedAt: '2023-02-23T12:00:00Z',
    content:
      "Depending on where you live, it's either starting to look a little like spring or still totally socked in winter. Damn that groundhog. Either way, we have some deals for you. Those of you stuck in th… [+5960 chars]",
  },
  {
    source: {
      id: null,
      name: null,
    },
    author: null,
    title: 'I was an App Store games editor – that’s how I know Apple doesn’t care about games',
    description:
      'The tech giant has taken billions from game developers but failed to reinvest it, leaving the App Store a confusing mess for mobile gamersIn the 15 years since it launched the App Store, Apple has proved again and again that it cares very little about games –…',
    url: 'https://www.theguardian.com/games/2023/feb/23/i-was-an-app-store-games-editor-thats-how-i-know-apple-doesnt-care-about-games',
    urlToImage: null,
    publishedAt: '2023-02-23T09:30:49Z',
    content:
      'In the 15 years since it launched the App Store, Apple has proved again and again that it cares very little about games though it is happy to make billions from them. I should know: I was an App Stor… [+5875 chars]',
  },
];

const KEY = process.env.REACT_APP_API_NEWS;

function ViewNews() {
  // const [listArticles, setListArticles] = React.useState<[] | News[]>([]);
  const [page, setPage] = React.useState(1);
  const listNews = useAppSelector((state) => state.news.articles);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=ua&pageSize=5&page=${page}&apiKey=${KEY}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(addNews(data.articles));
      });
  }, [dispatch, page]);

  return (
    <div className={style.container}>
      <h1>News</h1>
      <ul>
        {listNews.map((article) => (
          <li key={article.url}>
            <CartNews article={article} />
          </li>
        ))}
      </ul>
      <Button variant="contained" onClick={() => setPage(page + 1)}>
        Завантажити ще
      </Button>
    </div>
  );
}

export default ViewNews;
