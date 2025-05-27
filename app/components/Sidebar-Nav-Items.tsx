'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  HomeIcon,
  UserIcon,
  DocumentDuplicateIcon,
  CogIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";


const SideBarNavItems = ({isExpanded} : {isExpanded: boolean}) => {
  const pathname = usePathname()

  const navItemsTop = [
    { href: '/', label: 'Dashboard', icon: HomeIcon },
    { href: '/users', label: 'Users', icon: UserIcon },
    { href: '/docs', label: 'Documents', icon: DocumentDuplicateIcon },
  ]

  const navItemsBottom = [
    { href: '/settings', label: 'Settings', icon: CogIcon },
    { href: '/help', label: 'Help', icon: InformationCircleIcon },
  ]

  return (
    <>
        {/* Nav Items */}
        <nav className="flex flex-col gap-4">

          {navItemsTop.map((navItemTop, i) => {
            return (
              <Link href={navItemTop.href} key={i} className={`${navItemTop.href === pathname ? 'text-blue-700 font-bold' : '' } relative transition-colors flex items-center hover:bg-gray-700 p-2 rounded gap-4`}>
                <navItemTop.icon className="w-6 h-6"/>
                {isExpanded && <p className="max-md:hidden"> {navItemTop.label}</p>}
              </Link>
            )
          })}

          <hr className="my-3 text-gray-700"></hr>

          {navItemsBottom.map((navItemBottom, i) => {
            return (
              <Link href={navItemBottom.href} key={i} className={`${navItemBottom.href === pathname ? 'text-blue-700 font-bold' : ''} transition-colors relative flex items-center hover:bg-gray-700 p-2 rounded gap-4`}>
                <navItemBottom.icon className="w-6 h-6"/>
                {isExpanded && <p className="max-md:hidden"> {navItemBottom.label}</p>}
              </Link>
            )
          })}

        </nav>
    </>
  )
}

export default SideBarNavItems