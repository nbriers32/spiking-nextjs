import React from 'react'

import {
    ScaleIcon,
    WrenchIcon,
    PhotoIcon,
    ShieldCheckIcon,
    NoSymbolIcon
    
} from '@heroicons/react/24/outline'

const iconMapper: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
    "regulations": ScaleIcon,
    "dummy": WrenchIcon,
    "icon": PhotoIcon,
    "standards": ShieldCheckIcon,
}

const DocumentIcon = ({docType}:{docType: string}) => {
    const IconComponent = iconMapper[docType] || NoSymbolIcon
    return (
        <IconComponent className="h-15 w-15"/>
    )
}

export default DocumentIcon