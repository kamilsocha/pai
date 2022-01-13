import { PhotoUploadSection } from 'components/PhotoUploadSection/PhotoUploadSection'
import { PhotoDownloadSection } from 'components/PhotoDownloadSection/PhotoDownloadSection'

import * as Styled from './ContentLayout.styles'

const ContentLayout = ({ children }) => (
  <>
    <Styled.TopContainer>
      <PhotoUploadSection />
    </Styled.TopContainer>
    <Styled.MiddleContainer>
      {children}
    </Styled.MiddleContainer>
    <Styled.BottomContainer>
      <PhotoDownloadSection />
    </Styled.BottomContainer>
  </>
)

export { ContentLayout }
