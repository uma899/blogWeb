import React from 'react'
import styles from './CA.module.css'

function CustomAlert({isOpen, setIsOpen, title, matter}) {
  return (
    <div className={styles.alert} style={{display: (isOpen) ? "block" : 'none'}}>
      <h2>{title}</h2>
      <p>{matter}</p>
      <button onClick={() => {setIsOpen(0)}} className='btn'>Close</button>
    </div>
  )
}

export default CustomAlert