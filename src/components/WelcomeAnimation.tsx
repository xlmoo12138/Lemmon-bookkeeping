import React from 'react'
import c from 'classnames'
import Lottie from 'lottie-react'
type Props = {
  animationData: object
  className?: string
}
export const WelcomeAnimation: React.FC<Props> = (props) => {
  const { animationData, className } = props
  return (
    <Lottie className={c('w-300px h-300px mt--50px', className)} animationData={animationData} loop={true} />
  )
}
