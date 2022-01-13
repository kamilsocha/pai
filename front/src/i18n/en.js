/* eslint-disable max-len */
export default {
  translation: {
    common: {
      name: 'Name',
      items: 'Items',
      download: 'Download',
      save: 'Save',
      remove: 'Remove',
      ok: 'Ok',
      cancel: 'Cancel',
      latitude: 'Lat',
      longitude: 'Lng',
      getCoordinatesError: 'Could not retrieve geolocation information of the photo',
      resetAll: 'Erase all data',
      error: 'Error occurred. Please reload the application state.',
      reload: 'Reload',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      dontHaveAnAccount: 'Don\'t have an account yet? Sign up',
      alreadyHaveAnAccount: 'Already have an account? Sign in',
      backToMainPage: 'Back to main page',
      dismiss: 'Dismiss',
      upload: 'Upload',
      uploadToRepo: 'Upload to repository',
      preview: 'Preview',
    },
    title: 'GEOTAG',
    form: {
      username: 'Username',
      password: 'Password',
      field: {
        required: 'This field is required.',
      },
    },
    action: {
      success: {
        uploadFile: 'File has been uploaded',
        uploadFiles: '{{ uploadedFiles }} files have been uploaded',
        deleteFile: 'The file has been deleted',
        download: 'Download',
        delete: 'Delete',
      },
      error: {
        downloadFile: 'Could not load chosen file',
        getMiniature: 'Could not load file preview',
        uploadFile: 'An error occurred while uploading the file',
        uploadFiles: 'An error occurred while uploading {{ failedFiles }} files',
        deleteFile: 'An error occurred while deleteing the file',
      },
    },
    storage: {
      title: 'Add files',
      uploadFromComputer: 'Upload from computer',
      fileDetails: {
        noFileChosen: 'No file chosen',
        name: 'File name',
        uploadDate: 'Upload date',
        latitude: 'Latitude',
        longitude: 'Longitude',
        notAvailable: 'Not available',
      },
      fileList: {
        empty: 'No files uploaded',
        error: 'Could not load files, please try again later',
      },
      action: {
        addFromComputer: 'Add from computer',
        stopUploading: 'Stop uploading',
        maxFileSize: 'Max file size is {{ maxSize }}',
        download: 'Download',
        delete: 'Delete',
        allUploaded: 'Uploading finished',
      },
    },
    navigation: {
      map: 'Map',
      exifInfo: 'Exif Info',
      storage: 'Files storage',
    },
    footer: {
      language: {
        label: 'Language',
        polish: 'Polish',
        english: 'English',
      },
    },
    uploadSection: {
      uploadPhotos: 'Drop files here or click to choose',
      jpegOnly: 'JPEG files only',
      noPhotos: 'There are no uploaded photos',
    },
    exifPanel: {
      dragUploadedPhoto: 'Drag and drop here an uploaded photo',
    },
    mapSection: {
      grouping: {
        title: 'Groups of photos',
        instruction: 'Group photos, drag group items and drop them on map',
        groupName: 'Name of the group',
        addGroup: 'Add group',
        helperText: 'Empty or already existing names will be generated randomly',
        noGroups: 'There are no groups',
        group: {
          coordinates: 'Coordinates',
          drag: 'Drag',
          drop: 'Drop',
          empty: 'There are no photos in the group',
          confirmDeleting: 'Confirm deleting of group {{ name }}',
          shouldDeletePhotos: 'Delete the photos',
        },
      },
      map: {
        item: {
          draggable: 'Draggable',
          notDraggable: 'Not draggable',
        },
      },
    },
    downloadSection: {
      noPhotos: 'There are no photos modifed',
    },
    exifData: {
      device: 'Device',
      time: 'Time',
      altitude: 'Altitude',
      direction: 'Direction',
    },
    altitude: {
      aboveSeaLevel: 'above sea level',
      belowSeaLevel: 'below sea level',
      text: '{{ meters }} meters $t(altitude.{{ level }})',
    },
  },
}
