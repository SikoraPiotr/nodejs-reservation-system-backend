NestJS Task Processing API

Opis

Aplikacja backendowa w NestJS do obsługi rezerwacji. Pozwala na przesyłanie plików XLSX, przetwarzanie ich w kolejce asynchronicznej i zarządzanie statusem zadań.

Technologie

NestJS - Framework backendowy

MongoDB + Mongoose - Baza danych

BullMQ - Kolejka zadań

xlsx - Odczyt plików XLSX

class-validator - Walidacja danych

Instalacja

Wymagania:

Node.js >= 16

Docker & Docker Compose (opcjonalnie)

MongoDB

Sklonuj repozytorium:

git clone https://github.com/twoje-repo.git
cd twoje-repo

Zainstaluj zależności:

npm install

Skonfiguruj środowisko:
Stwórz plik .env na podstawie .env.example i ustaw zmienne:

MONGO_URI=mongodb://localhost:27017/nestjs-tasks
REDIS_HOST=localhost
REDIS_PORT=6379

Uruchom aplikację:

npm run start:dev

Uruchomienie z Dockerem

docker-compose up --build

API

1. Przesyłanie pliku

POST /tasks/upload

Przesyła plik XLSX z rezerwacjami.

Zwraca taskId.

2. Sprawdzanie statusu

GET /tasks/status/:taskId

Sprawdza status zadania.

3. Pobieranie raportu błędów

GET /tasks/report/:taskId

Pobiera raport błędów dla zadania.

Testy

Aby uruchomić testy, użyj:

npm run test

Autor

Twoje Imię

