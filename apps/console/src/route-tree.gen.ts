/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './app/__root'
import { Route as RouteImport } from './app/route'
import { Route as toolsToolsRouteImport } from './app/(tools)/tools/route'
import { Route as settingsSetupRouteImport } from './app/(settings)/setup/route'
import { Route as settingsSettingsRouteImport } from './app/(settings)/settings/route'
import { Route as infrastructureInfrastructureRouteImport } from './app/(infrastructure)/infrastructure/route'
import { Route as applicationsApplicationsRouteImport } from './app/(applications)/applications/route'
import { Route as applicationsApplicationsIndexImport } from './app/(applications)/applications/index'
import { Route as linksLinksListImport } from './app/(links)/links/_list'
import { Route as configsConfigsListImport } from './app/(configs)/configs/_list'
import { Route as toolsToolsLatticeTesterRouteImport } from './app/(tools)/tools/lattice-tester/route'
import { Route as settingsSettingsLatticeRouteImport } from './app/(settings)/settings/lattice/route'
import { Route as linksLinksNewRouteImport } from './app/(links)/links/new/route'
import { Route as infrastructureInfrastructureHostsRouteImport } from './app/(infrastructure)/infrastructure/hosts/route'
import { Route as configsConfigsNewRouteImport } from './app/(configs)/configs/new/route'
import { Route as applicationsApplicationsNewRouteImport } from './app/(applications)/applications/new/route'
import { Route as applicationsApplicationsDetailRouteImport } from './app/(applications)/applications/detail/route'
import { Route as linksLinksListIndexRouteImport } from './app/(links)/links/_list.index.route'
import { Route as configsConfigsListIndexRouteImport } from './app/(configs)/configs/_list.index.route'
import { Route as settingsSettingsLatticeLatticeKeyRouteImport } from './app/(settings)/settings/lattice/$latticeKey.route'
import { Route as infrastructureInfrastructureHostsHostIdRouteImport } from './app/(infrastructure)/infrastructure/hosts/$hostId.route'
import { Route as applicationsApplicationsNewTemplateRouteImport } from './app/(applications)/applications/new_.template/route'
import { Route as applicationsApplicationsDetailAppNameRouteImport } from './app/(applications)/applications/detail/$appName.route'
import { Route as configsConfigsListDetailConfigNameRouteImport } from './app/(configs)/configs/_list.detail.$configName/route'

// Create Virtual Routes

const linksLinksImport = createFileRoute('/(links)/links')()
const configsConfigsImport = createFileRoute('/(configs)/configs')()

// Create/Update Routes

const RouteRoute = RouteImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const linksLinksRoute = linksLinksImport.update({
  path: '/links',
  getParentRoute: () => rootRoute,
} as any)

const configsConfigsRoute = configsConfigsImport.update({
  path: '/configs',
  getParentRoute: () => rootRoute,
} as any)

const toolsToolsRouteRoute = toolsToolsRouteImport.update({
  path: '/tools',
  getParentRoute: () => rootRoute,
} as any)

const settingsSetupRouteRoute = settingsSetupRouteImport.update({
  path: '/setup',
  getParentRoute: () => rootRoute,
} as any)

const settingsSettingsRouteRoute = settingsSettingsRouteImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const infrastructureInfrastructureRouteRoute =
  infrastructureInfrastructureRouteImport.update({
    path: '/infrastructure',
    getParentRoute: () => rootRoute,
  } as any)

const applicationsApplicationsRouteRoute = applicationsApplicationsRouteImport
  .update({
    path: '/applications',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() =>
    import('./app/(applications)/applications/route.lazy').then((d) => d.Route),
  )

const applicationsApplicationsIndexRoute = applicationsApplicationsIndexImport
  .update({
    path: '/',
    getParentRoute: () => applicationsApplicationsRouteRoute,
  } as any)
  .lazy(() =>
    import('./app/(applications)/applications/index.lazy').then((d) => d.Route),
  )

const linksLinksListRoute = linksLinksListImport
  .update({
    id: '/_list',
    getParentRoute: () => linksLinksRoute,
  } as any)
  .lazy(() =>
    import('./app/(links)/links/_list.route.lazy').then((d) => d.Route),
  )

const configsConfigsListRoute = configsConfigsListImport
  .update({
    id: '/_list',
    getParentRoute: () => configsConfigsRoute,
  } as any)
  .lazy(() =>
    import('./app/(configs)/configs/_list.route.lazy').then((d) => d.Route),
  )

const toolsToolsLatticeTesterRouteRoute = toolsToolsLatticeTesterRouteImport
  .update({
    path: '/lattice-tester',
    getParentRoute: () => toolsToolsRouteRoute,
  } as any)
  .lazy(() =>
    import('./app/(tools)/tools/lattice-tester/route.lazy').then(
      (d) => d.Route,
    ),
  )

const settingsSettingsLatticeRouteRoute = settingsSettingsLatticeRouteImport
  .update({
    path: '/lattice',
    getParentRoute: () => settingsSettingsRouteRoute,
  } as any)
  .lazy(() =>
    import('./app/(settings)/settings/lattice/route.lazy').then((d) => d.Route),
  )

const linksLinksNewRouteRoute = linksLinksNewRouteImport
  .update({
    path: '/links/new',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./app/(links)/links/new/route.lazy').then((d) => d.Route))

const infrastructureInfrastructureHostsRouteRoute =
  infrastructureInfrastructureHostsRouteImport
    .update({
      path: '/hosts',
      getParentRoute: () => infrastructureInfrastructureRouteRoute,
    } as any)
    .lazy(() =>
      import('./app/(infrastructure)/infrastructure/hosts/route.lazy').then(
        (d) => d.Route,
      ),
    )

const configsConfigsNewRouteRoute = configsConfigsNewRouteImport
  .update({
    path: '/configs/new',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() =>
    import('./app/(configs)/configs/new/route.lazy').then((d) => d.Route),
  )

const applicationsApplicationsNewRouteRoute =
  applicationsApplicationsNewRouteImport
    .update({
      path: '/new',
      getParentRoute: () => applicationsApplicationsRouteRoute,
    } as any)
    .lazy(() =>
      import('./app/(applications)/applications/new/route.lazy').then(
        (d) => d.Route,
      ),
    )

const applicationsApplicationsDetailRouteRoute =
  applicationsApplicationsDetailRouteImport.update({
    path: '/detail',
    getParentRoute: () => applicationsApplicationsRouteRoute,
  } as any)

const linksLinksListIndexRouteRoute = linksLinksListIndexRouteImport.update({
  path: '/',
  getParentRoute: () => linksLinksListRoute,
} as any)

const configsConfigsListIndexRouteRoute =
  configsConfigsListIndexRouteImport.update({
    path: '/',
    getParentRoute: () => configsConfigsListRoute,
  } as any)

const settingsSettingsLatticeLatticeKeyRouteRoute =
  settingsSettingsLatticeLatticeKeyRouteImport
    .update({
      path: '/$latticeKey',
      getParentRoute: () => settingsSettingsLatticeRouteRoute,
    } as any)
    .lazy(() =>
      import('./app/(settings)/settings/lattice/$latticeKey.route.lazy').then(
        (d) => d.Route,
      ),
    )

const infrastructureInfrastructureHostsHostIdRouteRoute =
  infrastructureInfrastructureHostsHostIdRouteImport
    .update({
      path: '/$hostId',
      getParentRoute: () => infrastructureInfrastructureHostsRouteRoute,
    } as any)
    .lazy(() =>
      import(
        './app/(infrastructure)/infrastructure/hosts/$hostId.route.lazy'
      ).then((d) => d.Route),
    )

const applicationsApplicationsNewTemplateRouteRoute =
  applicationsApplicationsNewTemplateRouteImport
    .update({
      path: '/new/template',
      getParentRoute: () => applicationsApplicationsRouteRoute,
    } as any)
    .lazy(() =>
      import('./app/(applications)/applications/new_.template/route.lazy').then(
        (d) => d.Route,
      ),
    )

const applicationsApplicationsDetailAppNameRouteRoute =
  applicationsApplicationsDetailAppNameRouteImport
    .update({
      path: '/$appName',
      getParentRoute: () => applicationsApplicationsDetailRouteRoute,
    } as any)
    .lazy(() =>
      import('./app/(applications)/applications/detail/$appName.lazy').then(
        (d) => d.Route,
      ),
    )

const configsConfigsListDetailConfigNameRouteRoute =
  configsConfigsListDetailConfigNameRouteImport
    .update({
      path: '/detail/$configName',
      getParentRoute: () => configsConfigsListRoute,
    } as any)
    .lazy(() =>
      import(
        './app/(configs)/configs/_list.detail.$configName/route.lazy'
      ).then((d) => d.Route),
    )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof RouteImport
      parentRoute: typeof rootRoute
    }
    '/(applications)/applications': {
      id: '/applications'
      path: '/applications'
      fullPath: '/applications'
      preLoaderRoute: typeof applicationsApplicationsRouteImport
      parentRoute: typeof rootRoute
    }
    '/(infrastructure)/infrastructure': {
      id: '/infrastructure'
      path: '/infrastructure'
      fullPath: '/infrastructure'
      preLoaderRoute: typeof infrastructureInfrastructureRouteImport
      parentRoute: typeof rootRoute
    }
    '/(settings)/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof settingsSettingsRouteImport
      parentRoute: typeof rootRoute
    }
    '/(settings)/setup': {
      id: '/setup'
      path: '/setup'
      fullPath: '/setup'
      preLoaderRoute: typeof settingsSetupRouteImport
      parentRoute: typeof rootRoute
    }
    '/(tools)/tools': {
      id: '/tools'
      path: '/tools'
      fullPath: '/tools'
      preLoaderRoute: typeof toolsToolsRouteImport
      parentRoute: typeof rootRoute
    }
    '/(applications)/applications/detail': {
      id: '/applications/detail'
      path: '/detail'
      fullPath: '/applications/detail'
      preLoaderRoute: typeof applicationsApplicationsDetailRouteImport
      parentRoute: typeof applicationsApplicationsRouteImport
    }
    '/(applications)/applications/new': {
      id: '/applications/new'
      path: '/new'
      fullPath: '/applications/new'
      preLoaderRoute: typeof applicationsApplicationsNewRouteImport
      parentRoute: typeof applicationsApplicationsRouteImport
    }
    '/(configs)/configs/new': {
      id: '/configs/new'
      path: '/configs/new'
      fullPath: '/configs/new'
      preLoaderRoute: typeof configsConfigsNewRouteImport
      parentRoute: typeof rootRoute
    }
    '/(infrastructure)/infrastructure/hosts': {
      id: '/infrastructure/hosts'
      path: '/hosts'
      fullPath: '/infrastructure/hosts'
      preLoaderRoute: typeof infrastructureInfrastructureHostsRouteImport
      parentRoute: typeof infrastructureInfrastructureRouteImport
    }
    '/(links)/links/new': {
      id: '/links/new'
      path: '/links/new'
      fullPath: '/links/new'
      preLoaderRoute: typeof linksLinksNewRouteImport
      parentRoute: typeof rootRoute
    }
    '/(settings)/settings/lattice': {
      id: '/settings/lattice'
      path: '/lattice'
      fullPath: '/settings/lattice'
      preLoaderRoute: typeof settingsSettingsLatticeRouteImport
      parentRoute: typeof settingsSettingsRouteImport
    }
    '/(tools)/tools/lattice-tester': {
      id: '/tools/lattice-tester'
      path: '/lattice-tester'
      fullPath: '/tools/lattice-tester'
      preLoaderRoute: typeof toolsToolsLatticeTesterRouteImport
      parentRoute: typeof toolsToolsRouteImport
    }
    '/(configs)/configs': {
      id: '/configs'
      path: '/configs'
      fullPath: '/configs'
      preLoaderRoute: typeof configsConfigsImport
      parentRoute: typeof rootRoute
    }
    '/(configs)/configs/_list': {
      id: '/configs/_list'
      path: '/configs'
      fullPath: '/configs'
      preLoaderRoute: typeof configsConfigsListImport
      parentRoute: typeof configsConfigsRoute
    }
    '/(links)/links': {
      id: '/links'
      path: '/links'
      fullPath: '/links'
      preLoaderRoute: typeof linksLinksImport
      parentRoute: typeof rootRoute
    }
    '/(links)/links/_list': {
      id: '/links/_list'
      path: '/links'
      fullPath: '/links'
      preLoaderRoute: typeof linksLinksListImport
      parentRoute: typeof linksLinksRoute
    }
    '/(applications)/applications/': {
      id: '/applications/'
      path: '/'
      fullPath: '/applications/'
      preLoaderRoute: typeof applicationsApplicationsIndexImport
      parentRoute: typeof applicationsApplicationsRouteImport
    }
    '/(applications)/applications/detail/$appName': {
      id: '/applications/detail/$appName'
      path: '/$appName'
      fullPath: '/applications/detail/$appName'
      preLoaderRoute: typeof applicationsApplicationsDetailAppNameRouteImport
      parentRoute: typeof applicationsApplicationsDetailRouteImport
    }
    '/(applications)/applications/new/template': {
      id: '/applications/new/template'
      path: '/new/template'
      fullPath: '/applications/new/template'
      preLoaderRoute: typeof applicationsApplicationsNewTemplateRouteImport
      parentRoute: typeof applicationsApplicationsRouteImport
    }
    '/(infrastructure)/infrastructure/hosts/$hostId': {
      id: '/infrastructure/hosts/$hostId'
      path: '/$hostId'
      fullPath: '/infrastructure/hosts/$hostId'
      preLoaderRoute: typeof infrastructureInfrastructureHostsHostIdRouteImport
      parentRoute: typeof infrastructureInfrastructureHostsRouteImport
    }
    '/(settings)/settings/lattice/$latticeKey': {
      id: '/settings/lattice/$latticeKey'
      path: '/$latticeKey'
      fullPath: '/settings/lattice/$latticeKey'
      preLoaderRoute: typeof settingsSettingsLatticeLatticeKeyRouteImport
      parentRoute: typeof settingsSettingsLatticeRouteImport
    }
    '/(configs)/configs/_list/': {
      id: '/configs/_list/'
      path: '/'
      fullPath: '/configs/'
      preLoaderRoute: typeof configsConfigsListIndexRouteImport
      parentRoute: typeof configsConfigsListImport
    }
    '/(links)/links/_list/': {
      id: '/links/_list/'
      path: '/'
      fullPath: '/links/'
      preLoaderRoute: typeof linksLinksListIndexRouteImport
      parentRoute: typeof linksLinksListImport
    }
    '/(configs)/configs/_list/detail/$configName': {
      id: '/configs/_list/detail/$configName'
      path: '/detail/$configName'
      fullPath: '/configs/detail/$configName'
      preLoaderRoute: typeof configsConfigsListDetailConfigNameRouteImport
      parentRoute: typeof configsConfigsListImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  RouteRoute,
  applicationsApplicationsRouteRoute:
    applicationsApplicationsRouteRoute.addChildren({
      applicationsApplicationsDetailRouteRoute:
        applicationsApplicationsDetailRouteRoute.addChildren({
          applicationsApplicationsDetailAppNameRouteRoute,
        }),
      applicationsApplicationsNewRouteRoute,
      applicationsApplicationsIndexRoute,
      applicationsApplicationsNewTemplateRouteRoute,
    }),
  infrastructureInfrastructureRouteRoute:
    infrastructureInfrastructureRouteRoute.addChildren({
      infrastructureInfrastructureHostsRouteRoute:
        infrastructureInfrastructureHostsRouteRoute.addChildren({
          infrastructureInfrastructureHostsHostIdRouteRoute,
        }),
    }),
  settingsSettingsRouteRoute: settingsSettingsRouteRoute.addChildren({
    settingsSettingsLatticeRouteRoute:
      settingsSettingsLatticeRouteRoute.addChildren({
        settingsSettingsLatticeLatticeKeyRouteRoute,
      }),
  }),
  settingsSetupRouteRoute,
  toolsToolsRouteRoute: toolsToolsRouteRoute.addChildren({
    toolsToolsLatticeTesterRouteRoute,
  }),
  configsConfigsNewRouteRoute,
  linksLinksNewRouteRoute,
  configsConfigsRoute: configsConfigsRoute.addChildren({
    configsConfigsListRoute: configsConfigsListRoute.addChildren({
      configsConfigsListIndexRouteRoute,
      configsConfigsListDetailConfigNameRouteRoute,
    }),
  }),
  linksLinksRoute: linksLinksRoute.addChildren({
    linksLinksListRoute: linksLinksListRoute.addChildren({
      linksLinksListIndexRouteRoute,
    }),
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/applications",
        "/infrastructure",
        "/settings",
        "/setup",
        "/tools",
        "/configs/new",
        "/links/new",
        "/configs",
        "/links"
      ]
    },
    "/": {
      "filePath": "route.tsx"
    },
    "/applications": {
      "filePath": "(applications)/applications/route.tsx",
      "children": [
        "/applications/detail",
        "/applications/new",
        "/applications/",
        "/applications/new/template"
      ]
    },
    "/infrastructure": {
      "filePath": "(infrastructure)/infrastructure/route.tsx",
      "children": [
        "/infrastructure/hosts"
      ]
    },
    "/settings": {
      "filePath": "(settings)/settings/route.tsx",
      "children": [
        "/settings/lattice"
      ]
    },
    "/setup": {
      "filePath": "(settings)/setup/route.tsx"
    },
    "/tools": {
      "filePath": "(tools)/tools/route.tsx",
      "children": [
        "/tools/lattice-tester"
      ]
    },
    "/applications/detail": {
      "filePath": "(applications)/applications/detail/route.tsx",
      "parent": "/applications",
      "children": [
        "/applications/detail/$appName"
      ]
    },
    "/applications/new": {
      "filePath": "(applications)/applications/new/route.tsx",
      "parent": "/applications"
    },
    "/configs/new": {
      "filePath": "(configs)/configs/new/route.tsx"
    },
    "/infrastructure/hosts": {
      "filePath": "(infrastructure)/infrastructure/hosts/route.tsx",
      "parent": "/infrastructure",
      "children": [
        "/infrastructure/hosts/$hostId"
      ]
    },
    "/links/new": {
      "filePath": "(links)/links/new/route.tsx"
    },
    "/settings/lattice": {
      "filePath": "(settings)/settings/lattice/route.tsx",
      "parent": "/settings",
      "children": [
        "/settings/lattice/$latticeKey"
      ]
    },
    "/tools/lattice-tester": {
      "filePath": "(tools)/tools/lattice-tester/route.tsx",
      "parent": "/tools"
    },
    "/configs": {
      "filePath": "(configs)/configs",
      "children": [
        "/configs/_list"
      ]
    },
    "/configs/_list": {
      "filePath": "(configs)/configs/_list.tsx",
      "parent": "/configs",
      "children": [
        "/configs/_list/",
        "/configs/_list/detail/$configName"
      ]
    },
    "/links": {
      "filePath": "(links)/links",
      "children": [
        "/links/_list"
      ]
    },
    "/links/_list": {
      "filePath": "(links)/links/_list.tsx",
      "parent": "/links",
      "children": [
        "/links/_list/"
      ]
    },
    "/applications/": {
      "filePath": "(applications)/applications/index.tsx",
      "parent": "/applications"
    },
    "/applications/detail/$appName": {
      "filePath": "(applications)/applications/detail/$appName.route.tsx",
      "parent": "/applications/detail"
    },
    "/applications/new/template": {
      "filePath": "(applications)/applications/new_.template/route.tsx",
      "parent": "/applications"
    },
    "/infrastructure/hosts/$hostId": {
      "filePath": "(infrastructure)/infrastructure/hosts/$hostId.route.tsx",
      "parent": "/infrastructure/hosts"
    },
    "/settings/lattice/$latticeKey": {
      "filePath": "(settings)/settings/lattice/$latticeKey.route.tsx",
      "parent": "/settings/lattice"
    },
    "/configs/_list/": {
      "filePath": "(configs)/configs/_list.index.route.tsx",
      "parent": "/configs/_list"
    },
    "/links/_list/": {
      "filePath": "(links)/links/_list.index.route.tsx",
      "parent": "/links/_list"
    },
    "/configs/_list/detail/$configName": {
      "filePath": "(configs)/configs/_list.detail.$configName/route.tsx",
      "parent": "/configs/_list"
    }
  }
}
ROUTE_MANIFEST_END */
