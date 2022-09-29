import React, {useEffect} from 'react'

const feed = () => {
    useEffect(() => {
        console.log(localStorage.getItem("currentCourse"))
    }, [])
  return (
    <div>feed</div>
  )
}

export default feed