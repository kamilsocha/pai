/* eslint-disable max-len */
export default {
  translation: {
    common: {
      name: 'Nazwa',
      items: 'Elementy',
      download: 'Pobierz',
      save: 'Zapisz',
      remove: 'Usuń',
      ok: 'Akceptuj',
      cancel: 'Anuluj',
      latitude: 'Sz.',
      longitude: 'Dł.',
      getCoordinatesError: 'Nie można odczytać współrzędnych zdjęcia',
      resetAll: 'Wyczyść dane',
      error: 'Wystąpił błąd. Proszę odświeżyć stronę.',
      reload: 'Przeładuj',
      signIn: 'Zaloguj',
      signUp: 'Zarejestruj',
      signOut: 'Wyloguj',
      dontHaveAnAccount: 'Nie masz jeszcze konta? Zarejestruj się',
      alreadyHaveAnAccount: 'Masz już konto? Zaloguj się',
      backToMainPage: 'Powrót do strony głównej',
      dismiss: 'Odrzuć',
      upload: 'Wgraj',
      uploadToRepo: 'Wgraj do repozytorium',
      preview: 'Podgląd',
    },
    form: {
      username: 'Nazwa użytkownika',
      password: 'Hasło',
      confirmPassword: 'Potwierdź hasło',
      field: {
        required: 'To pole jest wymagane.',
        confirmPasswordMatch: 'Hasła nie są identyczne',
      },
    },
    action: {
      success: {
        register: 'Pomyślnie zarejestrowano użytkownika',
        uploadFile: 'Plik został przesłany',
        uploadFiles: '{{ uploadedFiles }} pliki zostały przesłane',
        deleteFile: 'Plik został usunięty',
      },
      error: {
        register: 'Wystąpił błąd podczas rejestracji użytkownika',
        downloadFile: 'Nie udało się załadować wybranego pliku',
        getMiniature: 'Nie można załadować podglądu pliku',
        uploadFile: 'Wystąpił błąd podczas próby przesłania pliku',
        uploadFiles: 'Wystąpił błąd podczas próby przesłania {{ failedFiles }} plików',
        deleteFile: 'Wystąpił problem podczas próby usunięcia pliku',
      },
    },
    storage: {
      title: 'Dodaj pliki',
      uploadFromComputer: 'Wgraj z komputera',
      fileDetails: {
        noFileChosen: 'Nie wybrano pliku',
        name: 'Nazwa',
        uploadDate: 'Data wgrania pliku',
        latitude: 'Szerokość geograficzna',
        longitude: 'Długość geograficzna',
        notAvailable: 'Nie dostępne',
      },
      fileList: {
        empty: 'Brak wgranych plików',
        error: 'Nie można wczytać plików, spróbuj ponownie później',
      },
      action: {
        addFromComputer: 'Dodaj z komputera',
        stopUploading: 'Przerwij',
        maxFileSize: 'Maksymalny rozmiar pliku to {{ maxSize }}',
        download: 'Pobierz',
        delete: 'Usuń',
        allUploaded: 'Zakończono wgrywanie',
      },
    },
    navigation: {
      map: 'Mapa',
      exifInfo: 'Exif Info',
      storage: 'Repozytorium plików',
    },
    footer: {
      language: {
        label: 'Język',
        polish: 'Polski',
        english: 'Angielski',
      },
    },
    uploadSection: {
      uploadPhotos: 'Upuść tutaj pliki lub kliknij żeby wybrać',
      jpegOnly: 'Tylko pliki JPEG',
      noPhotos: 'Nie ma żadnych zdjęć',
    },
    exifPanel: {
      dragUploadedPhoto: 'Przeciągnij tutaj wgrane zdjęcie',
    },
    mapSection: {
      grouping: {
        title: 'Grupy zdjęć',
        instruction: 'Grupuj zdjęcia, przeciągaj i upuść na mapę',
        groupName: 'Nazwa grupy',
        addGroup: 'Dodaj grupę',
        helperText: 'Puste lub zajęte nazwy będą generowane losowo',
        noGroups: 'Nie ma żadnych grup',
        group: {
          coordinates: 'Współrzędne',
          drag: 'Przeciągnij',
          drop: 'Upuść',
          empty: 'Grupa nie posiada żadnych zdjęć',
          confirmDeleting: 'Potwierdź usunięcie grupy {{ name }}',
          shouldDeletePhotos: 'Usuń zdjecia',
        },
      },
      map: {
        item: {
          draggable: 'Przeciąganie odblokowane',
          notDraggable: 'Przeciąganie zablokowane',
        },
      },
    },
    downloadSection: {
      noPhotos: 'Brak zmodyfikowanych zdjęć',
    },
    exifData: {
      device: 'Urządzenie',
      time: 'Czas',
      altitude: 'Wysokość nad poziomem morza',
      direction: 'Kierunek',
    },
    altitude: {
      aboveSeaLevel: 'powyżej poziomu morza',
      belowSeaLevel: 'poniżej poziomu morza',
      text: '{{ meters }} metrów $t(altitude.{{ level }})',
    },
  },
}
