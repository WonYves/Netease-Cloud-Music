import React, { Fragment, useCallback, useEffect, useState } from 'react';
import './personality.less'
import {
  getbanner,
  personalized,
  getmvlist,
  getlastMc,
} from '../../../api/home'
import { Carousel, RadioGroup, Radio, Space, Typography } from '@douyinfe/semi-ui';

const Personality = () => {

  const [imgList, setImgList] = useState([])
  const [mcdata, setMcdata] = useState([])
  const [mvdata, setMvdata] = useState([])
  const [newMc, setNewMc] = useState([])

  const style = {
    width: '1000px',
    height: '300px',
  };

  // 轮播图
  const getNew = useCallback(async(params) => {
    const res = await getlastMc(params)
    if (res.code === 200) {
      console.log(res);
      setNewMc(res.result.slice(0, 9))
    }
  }, [])
  // 轮播图
  const getImg = useCallback(async(params) => {
    const res = await getbanner(params)
    if (res.code === 200) {
      setImgList(res.banners)
    }
  }, [])

  // 歌单
  const getMcdata = useCallback(async(params) => {
    const res = await personalized(params)
    if (res.code === 200) {
      setMcdata(res.result)
    }
  }, [])

  // 推荐mv
  const mvlist = useCallback(async(params) => {
    const res = await getmvlist(params)
    if (res.code === 200) {
      setMvdata((res.result).slice(1, 4))
    }
  }, [])

  useEffect(() => {
    getImg()
    getMcdata({limit: 10})
    mvlist()
    getNew()
  }, [])

  return (
    <Fragment>
      <div className='app_container'>
        <div className='app_main'>
          <header className='banner'>
            {
              imgList.length &&  <Carousel style={style} autoPlay={{ interval: 1500, hoverToPause: true}} theme='dark'>
                {
                  imgList.map((v, i) => <div key={i} style={{ background: `url(${v.imageUrl})`, backgroundSize: '100% 100%' }}></div>)
                }
              </Carousel>
            }

          </header>
          <div style={{marginTop: 40}}>
            <div style={{ fontSize: 25}}>推荐歌单</div>
            <ul className='Recommendedsonglist'>
              {
                mcdata.map((item, index) => (
                  <li key={item.id} >
                    <div style={{background: `url(${item.picUrl})`, backgroundSize: '100% 100%'}}></div>
                    <p>{item.name}</p>
                  </li>
                ))
              }
            </ul>
          </div>
          <div style={{marginTop: 40}}>
            <div style={{ fontSize: 25}}>最新音乐</div>
            <ul className='newMc'>
              {
                newMc.map((item, index) => (
                  <li key={index}>
                    <div style={{background: `url(${item.picUrl})`, backgroundSize: '100% 100%'}}></div>
                    <p>
                      <span>{item.name}</span>
                      <span style={{fontFamily: '-moz-initial'}}>{item.song.artists[0].name}</span>
                    </p>
                  </li>
                ))
              }
            </ul>
          </div>
          <div style={{marginTop: 40, marginBottom: 40}}>
            <div style={{ fontSize: 25}}>推荐MV</div>
            <ul className='mvlist'>
              {
                mvdata.map((item, index) => (
                  <li key={item.artistId} >
                    <div style={{background: `url(${item.picUrl})`, backgroundSize: '100% 100%'}}></div>
                    <p>{item.name}</p>
                    <p style={{fontSize: 12, marginTop: 3, fontFamily: '-moz-initial'}}>{item.artistName}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Personality
