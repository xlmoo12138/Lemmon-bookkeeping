import { useRouteError } from 'react-router-dom'

export const ErrorPage: React.FC = () => {
  const error: any = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>oh, my god!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
