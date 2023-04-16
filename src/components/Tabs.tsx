import type { ReactNode } from 'react'
import cs from 'classnames'
import s from './Tabs.module.scss'
type Props<T> = {
  tabItems: {
    key: T
    text: string
    element?: ReactNode
  }[]
  value: T
  onChange: (key: T) => void
  className?: string
  classPrefix?: string
}
const compareKey = <T extends (string | { name: string })>(a: T, c: T) => {
  if (typeof a === 'string' && typeof c === 'string') {
    return a === c
  } else if (a instanceof Object && c instanceof Object) {
    return a.name === c.name
  } else {
    return false
  }
}
export const Tabs = <T extends string | { name: string }>(props: Props<T>) => {
  const { tabItems, value, onChange, className, classPrefix } = props
  return (
    <div className={cs(className, classPrefix)} flex flex-col>
      <ol flex grow-0 shrink-0 text-white children-px-24px children-py-12px bg="#c09ee4"
        className={classPrefix ? `${classPrefix}-menu` : ''}
      >
        {tabItems.map(item =>
          <li key={typeof item.key === 'string' ? item.key : item.key.name}
          className={
            cs(
              compareKey(item.key, value) ? s.selected : '',
              classPrefix ? `${classPrefix}-menu-item` : ''
            )
          }
          onClick={() => onChange(item.key)}>
          {item.text}
        </li>)}
      </ol>
      <div grow-1 shrink-1 overflow-auto className={classPrefix ? `${classPrefix}-pane` : ''}>
        {tabItems.filter(item => compareKey(item.key, value))[0]?.element}
      </div>
    </div>
  )
}
