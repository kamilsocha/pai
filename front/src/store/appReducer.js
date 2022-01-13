import { createSlice } from '@reduxjs/toolkit'
import { ITEM_TYPES } from 'constants/ItemTypes'
import { v4 as uuid } from 'uuid'
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

// photoItems - array of objects (generate some id)
// groupItems - name and list of photos
// updatedItems - array of groups of photos and individual photos

/*
Item {
  id
  type - group or photo
  photo (photoItem) or photoItems (groupItem)
  coordinates - null if not on map or for photo inside group
}
*/

/*
photoItem {
  ...props like name etc.
  image - image to display or to execute exif operations
}
*/

const uploadPhotoItems = (state, { payload }) => {
  if (Array.isArray(payload)) {
    const photoItems = payload.map((file) => ({
      id: uuid(),
      type: ITEM_TYPES.PHOTO,
      photo: file,
      coordinates: null,
    }))
    state.photoItems.push(...photoItems)
  } else {
    state.photoItems.push({
      id: uuid(),
      type: ITEM_TYPES.PHOTO,
      photo: payload,
      coordinates: null,
    })
  }
}

const removePhotoItem = (state, { payload }) => ({
  ...state,
  photoItems: state.photoItems.filter((i) => i.id !== payload),
})

const addGroupItem = (state, { payload }) => {
  let groupName = payload
  const isInGroups = state.groupItems.map((groupItem) => groupItem.name).includes(groupName)
  const isInModified = state.modifiedItems
    .filter((modifiedItem) => modifiedItem.type === ITEM_TYPES.GROUP)
    .map((groupItem) => groupItem.name)
    .includes(groupName)
  if (isInGroups || isInModified || groupName === '') {
    groupName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors],
      length: 2,
    })
  }
  state.groupItems.push({
    id: uuid(),
    type: ITEM_TYPES.GROUP,
    name: groupName,
    photoItems: [],
  })
}

const removeGroupItem = (state, { payload: { groupId, shouldDeletePhotos } }) => {
  const groupIndex = state.groupItems.findIndex(({ id }) => id === groupId)
  state.groupItems[groupIndex].photoItems.forEach((item) => {
    item.coordinates = null
  })
  if (!shouldDeletePhotos) {
    state.photoItems.push(...state.groupItems[groupIndex].photoItems)
  }
  state.groupItems.splice(groupIndex, 1)
}

const addPhotoItemToGroup = (state, { payload: { groupId, photoId } }) => {
  const destGroup = state.groupItems.find(({ id }) => id === groupId)
  const photoItemIndex = state.photoItems.findIndex(({ id }) => id === photoId)
  state.photoItems[photoItemIndex].coordinates = null
  destGroup.photoItems.push(state.photoItems[photoItemIndex])
  state.photoItems.splice(photoItemIndex, 1)
}

const removePhotoItemFromGroup = (state, {
  payload: { groupId, photoId },
}) => {
  const group = state.groupItems.find(({ id }) => id === groupId)
  const photoIndex = group.photoItems.findIndex(({ id }) => id === photoId)
  state.photoItems.push(group.photoItems[photoIndex])
  group.photoItems.splice(photoIndex, 1)
}

const movePhotoItemToGroup = (state, { payload: { srcGroupId, destGroupId, photoId } }) => {
  const srcGroup = state.groupItems.find(({ id }) => id === srcGroupId)
  const destGroup = state.groupItems.find(({ id }) => id === destGroupId)
  const photoIndex = srcGroup.photoItems.findIndex(({ id }) => id === photoId)
  destGroup.photoItems.push(srcGroup.photoItems[photoIndex])
  srcGroup.photoItems.splice(photoIndex, 1)
}

const updateItemCoordinates = (state, { payload: { type, id, coordinates } }) => {
  if (type === ITEM_TYPES.PHOTO) {
    const photoItem = state.photoItems.find((p) => p.id === id)
    photoItem.coordinates = coordinates
  } else if (type === ITEM_TYPES.GROUP) {
    const groupItem = state.groupItems.find((g) => g.id === id)
    groupItem.coordinates = coordinates
  }
}

const updateModifiedItems = (state, { payload }) => {
  const itemIndex = state.modifiedItems.findIndex((item) => item.id === payload.id)
  if (itemIndex === -1) {
    state.modifiedItems.push(payload)
  } else {
    state.modifiedItems[itemIndex] = payload
  }
  if (payload.type === ITEM_TYPES.PHOTO) {
    const photoItem = state.photoItems.find((item) => item.id === payload.id)
    photoItem.coordinates = payload.coordinates
  } else {
    const groupItem = state.groupItems.find((item) => item.id === payload.id)
    groupItem.coordinates = payload.coordinates
  }
}

const removeModifiedItem = (state, { payload: { id } }) => ({
  ...state,
  modifiedItems: state.modifiedItems.filter((item) => item.id !== id),
})

const removeItemCoordinates = (state, { payload: { type, id } }) => {
  if (type === ITEM_TYPES.PHOTO) {
    const photoItem = state.photoItems.find((item) => item.id === id)
    photoItem.coordinates = null
  } else {
    const groupItem = state.groupItems.find((item) => item.id === id)
    groupItem.coordinates = null
  }
}

const resetAll = () => ({
  photoItems: [],
  groupItems: [],
  modifiedItems: [],
})

const appSlice = createSlice({
  name: 'app',
  initialState: {
    // photoItems and group items are also on map if they have coordinates
    photoItems: [], // top container list of original photos
    groupItems: [], // left container list of groups of original photos
    modifiedItems: [], // items on bottom list
  },
  reducers: {
    uploadPhotoItems,
    removePhotoItem,
    addGroupItem,
    removeGroupItem,
    addPhotoItemToGroup,
    removePhotoItemFromGroup,
    movePhotoItemToGroup,
    updateItemCoordinates,
    updateModifiedItems,
    removeModifiedItem,
    removeItemCoordinates,
    resetAll,
  },
})

export const {
  uploadPhotoItems: uploadPhotoItemsAction,
  removePhotoItem: removePhotoItemAction,
  addGroupItem: addGroupItemAction,
  removeGroupItem: removeGroupItemAction,
  addPhotoItemToGroup: addPhotoItemToGroupAction,
  removePhotoItemFromGroup: removePhotoItemFromGroupAction,
  movePhotoItemToGroup: movePhotoItemToGroupAction,
  updateItemCoordinates: updateItemCoordinatesAction,
  updateModifiedItems: updateModifiedItemsAction,
  removeModifiedItem: removeModifiedItemAction,
  removeItemCoordinates: removeItemCoordinatesAction,
  resetAll: resetAllAction,
} = appSlice.actions

export default appSlice.reducer
