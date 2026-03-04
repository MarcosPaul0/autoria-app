import {
  Link,
  Outlet,
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'
import logo from '@autoria/assets/svgs/logo.svg'
import { APP_ROUTE } from '@autoria/constants/app-route'
import { SignOutIcon } from '@phosphor-icons/react'
import { Button } from '@autoria/components/button'
import { AuthRepository } from '@autoria/repositories/auth-repository'
import { errorHandler } from '@autoria/utils/errorHandler'
import { HTTP_STATUS } from '@autoria/constants/http-status'
import type { HttpStatus } from '@autoria/constants/http-status'

const LOGOUT_ERROR_MESSAGES = {
  [HTTP_STATUS.badRequest]: 'Erro ao sair! Tente novamente mais tarde.',
  [HTTP_STATUS.internal]: 'Erro ao sair! Tente novamente mais tarde.',
} as Record<HttpStatus, string>

export const Route = createFileRoute('/(private)')({
  component: PrivateLayout,
})

function PrivateLayout() {
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await AuthRepository.logout()

      navigate({
        to: APP_ROUTE.public.login,
      })
    } catch (error) {
      errorHandler(error, LOGOUT_ERROR_MESSAGES)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <header
        className="bg-header text-header-foreground py-4 sm:py-0 px-4 sm:px-28 w-full z-20 flex items-center justify-between"
        id="home"
      >
        <Link
          to={APP_ROUTE.public.landingPage}
          className="sm:min-h-20 flex items-center justify-between cursor-pointer"
        >
          <img src={logo} className="h-8 pointer-events-none" alt="logo" />
        </Link>

        <nav className="flex items-center gap-2 sm:gap-20">
          <Link
            className={`
              cursor-pointer relative h-8 flex items-center transition duration-300 
              after:transition-[width] after:duration-300 after:content-[''] after:absolute 
              after:bottom-0 after:left-0 after:h-px after:bg-primary-foreground after:w-0 
              hover:after:w-full text-primary-foreground pr-2
            `}
            to={APP_ROUTE.private.products}
          >
            Produtos
          </Link>

          <Link
            className={`
              cursor-pointer relative h-8 flex items-center transition duration-300 
              after:transition-[width] after:duration-300 after:content-[''] after:absolute 
              after:bottom-0 after:left-0 after:h-px after:bg-primary-foreground after:w-0 
              hover:after:w-full text-primary-foreground pr-2
            `}
            to={APP_ROUTE.private.categories}
          >
            Categorias
          </Link>

          <Button variant="ghost" onClick={handleLogout}>
            <SignOutIcon />
            Sair
          </Button>
        </nav>
      </header>

      <div className="max-w-[1920px] px-4 sm:px-16 py-4 sm:py-8 flex flex-col gap-4 sm:gap-8">
        <Outlet />
      </div>
    </main>
  )
}
