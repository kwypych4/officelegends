### Ogarnianie bazy danych
1. Zainstaluj sobie postgresa
2. Odpal w nim skrypt ```../baza.sql``` przy pomocy pgAdmin
3. Teraz trzeba ogarnąć prismę, czyli naszego ORMa
   1. Stwórz plik .env
   2. Umieść w nim linijkę ```DATABASE_URL="postgresql://<user>:<password>@localhost:5432/postgres?schema=public"``` podmieniejąć dane swoimi danymi
   3. W terminalu przejdź do folderu ```backend```
   4. Wywołaj ```npx prisma db pull```
   5. Wywołaj ```npx prisma generate```
4. Chyba gotowe

PS. Sorry za burdel w kodzie :)