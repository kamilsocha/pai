import React from 'react'
import { AppLayout } from 'components/layout/AppLayout'
import { Routes } from 'routes/Routes'

import { PhotoPreviewPanel } from 'components/PhotoPreviewPanel/PhotoPreviewPanel'

const Content = () => (
  <AppLayout>
    <Routes />
    <PhotoPreviewPanel />
  </AppLayout>
)

export { Content }
