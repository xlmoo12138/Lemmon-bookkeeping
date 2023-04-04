import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import styled from 'styled-components'
import { useEffect } from 'react'
import { router } from './routes/router'
import './global.scss'
import 'virtual:uno.css'
import './app.scss'
import 'virtual:svgsprites'
import { useLoadingStore } from './stores/useLoadingStore'
import { Icon } from './components/Icon'
import { usePopup } from './hooks/usePopup'
vhCheck()

export const App: React.FC = () => {
  const { visible } = useLoadingStore()
  const { popup, hide, show } = usePopup({
    initialVisible: false,
    children: <div><Spin className="w-48px h-48px" name="loading"/></div>,
    position: 'center'
  })
  useEffect(() => {
    visible ? show() : hide()
  }, [visible])
  return (
    <div>
      <RouterProvider router={router} />
      {popup}
    </div>
  )
}

const Spin = styled(Icon)`
animation: spin 1s linear infinite;
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`
