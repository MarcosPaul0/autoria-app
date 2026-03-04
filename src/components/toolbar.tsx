import { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb'
import { Separator } from './separator'
import type { ReactNode } from 'react'
import type { AppRoutes } from '@autoria/constants/app-route'

interface BreadcrumbLinkProps {
  link: AppRoutes
  label: string
}

interface ToolbarProps {
  children?: ReactNode
  links?: Array<BreadcrumbLinkProps>
  page: string
}

export function Toolbar({ children, links, page }: ToolbarProps) {
  return (
    <div className="w-full">
      <div className="flex items-end justify-between pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            {links &&
              links.map((breadcrumbLink) => (
                <Fragment key={breadcrumbLink.link}>
                  <BreadcrumbItem>
                    <BreadcrumbLink to={breadcrumbLink.link}>
                      {breadcrumbLink.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator />
                </Fragment>
              ))}

            <BreadcrumbItem key={page}>
              <BreadcrumbPage>{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {children}
      </div>

      <Separator />
    </div>
  )
}
