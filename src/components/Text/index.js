import * as React from 'react'
import { HTMLContent } from '../HTMLContent/HTMLContent'

const Text = ({ className, backgroundColor, color, text }) => (
  <div
    className={className}
    style={{
      display: 'flex',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor,
    }}
  >
    <div className="centered">
      <HTMLContent style={{ color }} content={text} render={true} />
    </div>
  </div>
)

export default Text
