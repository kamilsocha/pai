import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'

import { useQueryGetFiles } from 'api/useQueryGetFiles'
import { useSelectedFile, useSetSelectedFile } from 'providers/SelectedFileProvider'

import { FileListItem } from './FileListItem'
import { getFileName } from './utils'
import * as Styled from './FileList.styled'

const FileList = () => {
  const { t } = useTranslation()
  const { id: selectedFileId } = useSelectedFile() || {}
  const setSelectedFile = useSetSelectedFile()
  const {
    data,
    isLoading,
    error,
  } = useQueryGetFiles()

  return (
    <Styled.ListCard>
      {error && <Typography color='error'>{t('storage.fileList.error')}</Typography>}
      {isLoading ? (
        <Styled.LoadingSpinner />
      ) : (
        <Styled.List>
          {!data?.length ? (
            <Typography align='center'>{t('storage.fileList.empty')}</Typography>
          ) : (
            data?.map((fileItem) => (
              <FileListItem
                key={fileItem.id}
                isSelected={selectedFileId === fileItem.id}
                onSelect={() => setSelectedFile({
                  ...fileItem,
                  name: getFileName(fileItem.path),
                })}
                {...fileItem}
              />
            ))
          )}
        </Styled.List>
      )}
    </Styled.ListCard>
  )
}

export { FileList }
