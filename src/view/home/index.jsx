import React, { Fragment, useCallback, useEffect, useState } from 'react';
import renderRoutes from '../../router/routes';
import './index.less'
import { getpersonality } from '../../api/home'
import { useHistory } from 'react-router-dom';
const Home = (props) => {

  const history = useHistory()
  const [count, setCount] = useState(0)

  const ulList = [
    {
      title: '个性音乐',
      id: 1,
      path: '/home/personality',
    },
    {
      title: '歌单',
      id: 2,
      path: '/home/songsheet',
    },
    {
      title: '排行榜',
      id: 3,
      path: '/home/rankinglist',
    },
    {
      title: '最新音乐',
      id: 4,
      path: '/home/latestmusic',
    },
  ]
  // 轮播图
  const getdata = useCallback(async(params) => {
    const res = await getpersonality(params)
    if (res.code === 200) {
      console.log(res);
    }
  }, [])

  useEffect(() => {
    getdata()
  }, [])

  useEffect(() => {
    if (props.location.pathname === '/home') {
      history.push('/home/personality')
    }
  }, [])

  const handlePush = (index, item) => {
    setCount(index)
    console.log(item);
    if (item.path) {
      history.push(item.path)
    }
  }

  return (
    <Fragment>
      <div style={{ padding: 20 }}>
        <header>
          <ul className='ul_list'>
            {
              ulList.map((item, index) => (
                <li
                  key={item.id}
                  className={count === index ? 'activeed' : ' '}
                  onClick={() => handlePush(index, item)}
                >{item.title}</li>
              ))
            }
          </ul>
        </header>
        {renderRoutes(props.route.children)}
      </div>
    </Fragment>
  )
}

export default Home
