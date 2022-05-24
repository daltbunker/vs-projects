import React from 'react'

type Props = {
  text: string;
  inset: string;
}

export default function Note({ text, inset }: Props) {

  return (
    <div className='floating-container' style={{inset: inset}}>
      <div className='center-container note'>
        {text}
      </div>
    </div>
  )
}