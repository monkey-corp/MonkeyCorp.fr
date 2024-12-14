import React, {useState, useEffect} from 'react'
import './MonkeySprite.scss'

import SinjR1 from './../assets/sprites/sinj_right_1.png'
import SinjR2 from './../assets/sprites/sinj_right_2.png'
import SinjR3 from './../assets/sprites/sinj_right_3.png'

const MonkeySprite = (props) => {
    const [sprite, setSprite] = useState(1)
    const sprites = [SinjR1, SinjR2, SinjR1, SinjR3]

    useEffect(()=>{
        const interval = setInterval(() => {
            setSprite(prevSprites => (prevSprites < 3 ? prevSprites+1 : 0))
        }, 200)
      
        return () => {
            clearInterval(interval)
        };
    }, [])

    return (
        <div className='MonkeySprite'>
            <img src={sprites[sprite]} alt=""/>
        </div>
    )
}

export default MonkeySprite