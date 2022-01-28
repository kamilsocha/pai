# Projekt PPP, PAI, OiRPOS

## Opis
Nie wszystkie aparaty fotograficzne (w tym te zawarte w telefonach komórkowych) umożliwiają obsługę formatu EXIF pozwalającego na zapisywanie informacji o lokalizacji wykonania danego zdjęcia. Dlatego też istnieje potrzeba dodawania lub modyfikacji danych w formacie EXIF, w tym współrzędnych geograficznych.
  
Celem projektu było stworzenie aplikacji internetowej, pozwalającej na przesyłanie zdjęć przez użytkownika, ich grupowanie oraz opisywanie współrzędnych geograficznych grup lub pojedynczych zdjęć. Użytkownicy posiadający konto w aplikacji mogą przechować zmodyfikowane zdjęcia na serwerze.
 
## Wykorzystane narzędzia i biblioteki

### Narzędzia

#### Python + MySQL
Projekt zawiera przykład implementacji prostego API pozwalającego na rejestrację i uwierzytelnianie użytkowników, a także przechowywanie na serwerze plików powiązanych z danym użytkownikiem.

Cel ten został osiągnięty z wykorzystaniem MySQL[^1], czyli najbardziej popularnego otwartego oprogramowania będącego systemem zarządzania relacyjną bazą danych, oraz języka programowania wysokiego poziomu Python[^2], który cechuje się przejrzystością i zwięzłością.

#### React.js
Główny element projektu, czyli strona internetowa pozwalająca na działania na plikach oraz logikę związaną z atrybutami EXIF została zrealizowana za pomocą React.js[^3].

React jest jednym z trzech obecnie najczęściej wykorzystywanych frameworków frontendowych. Wybór tej technologii jest uzasadniony niższym progiem wejścia niż w przypadku konkurencyjnych frameworków Vue.js czy Angular, a także posiadaniem bardzo dużej społeczności oraz wielu dodatkowych komponentów, bibliotek rozszerzających i ułatwiających pracę nad projektowaną aplikacją.

#### Docker
Platform otwartego oprogramowania służąca do tworzenia i wdrażania aplikacji kontenerowych oraaz zarządzania nimi Docker[^4], to jeden z najpopularniejszych tematów ostatnich lat.

Projekt prezentuje jak w prosty sposób można dostarczyć aplikację korzystającą przykładowo z MySQL oraz Pythona bez instalowania tych narzędzi w odpowiednich wersjach na swojej maszynie.

### Biblioteki

#### Backend
Najważniejszym składnikiem pozwalającym na stworzenie wymaganego backendu był micro-framework Flask[^5].

#### Frontend
Praca z React JS wiąże się z możliwością korzystania z dużej ilości spośród dostępnych bibliotek.
Rozpoczęcie pracy nad projektem objęło poszukiwanie odpowiednich bibliotek. Ostatecznie
wymagania stawiane w projekcie zostały spełnione dzięki wykorzystaniu kilku interesujących
bibliotek:
- redux-toolkit[^6] – zarządzanie stanem aplikacji, przechowywaniem obiektów w jej pamięci;
- constate[^7] – biblioteka wspomagająca zarządzanie kontekstem React;
- leaflet, react-leaflet[^8] – biblioteki pozwalające na pracę z podkładem mapy OpenStreetMap;
- piexifjs[^9] – biblioteka pozwalająca na odczyt i zapis atrybutów formatu exif zdjęć całkowicie po stronie aplikacji klienckiej;
- react-query[^10] - biblioteka ułatwiająca tworzenie zapytań do API.

## Sposób uruchomienia

### Localhost
Wymagania:
- instalacja systemu zarządzania relacyjnymi bazami danych MySQL;
- instalacja dystrybucji Pythona, sugerowana wersja, wykorzystywana podczas pracy nad aplikacją, to 3.8, oraz zależności projektu określonych w pliku requirements.txt;
- instalacja środowiska uruchomieniowego Node.js, sugerowana wersja, wykorzystywana podczas pracy nad aplikacją, to 14.15.4.

#### Backend
Uruchomienie App.py

#### Frontend
Aplikacja może być uruchomiona na wybranym porcie (domyślnie 3000) przez polecenie npm start lub może być serwowana jako statyczny kontent z Backendu na porcie 5000 po wcześniejszym zbudowaniu projektu w folderze front poleceniem 'npm run build'.

### Docker
Należy zbudować aplikację Frontend poleceniem 'npm run build' w folderze front, a następnie z głównego folderu za pomocą narzędzia docker-compose i polecenia docker-compose up uruchomić potrzebny zestaw kontenerów.

## Bibliografia
[^1]: https://www.mysql.com/
[^2]: https://docs.python.org/3/
[^3]: https://pl.reactjs.org/
[^4]: https://www.docker.com/
[^5]: https://flask.palletsprojects.com/en/2.0.x/
[^6]: https://react-redux.js.org/
[^7]: https://github.com/diegohaz/constate
[^8]: https://react-leaflet.js.org/
[^9]: https://github.com/hMatoba/piexifjs
[^10]: https://react-query.tanstack.com/
