import MapIcon from '@material-ui/icons/Map'
import InfoIcon from '@material-ui/icons/Info'
import StorageIcon from '@material-ui/icons/Storage'

import { PATHS } from 'routes/Routes'

const NAVIGATION_TABS = [
  {
    name: 'navigation.map',
    to: PATHS.MAP,
    icon: <MapIcon />,
  },
  {
    name: 'navigation.exifInfo',
    to: PATHS.INFO,
    icon: <InfoIcon />,
  },
  {
    name: 'navigation.storage',
    to: PATHS.STORAGE,
    icon: <StorageIcon />,
  },
]

export { NAVIGATION_TABS }
