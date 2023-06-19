-- Baza danych: game_data

-- Avatary do wybrania przy rejestracji
CREATE TABLE avatar (
  id SERIAL PRIMARY KEY,
  bitmap text UNIQUE NOT NULL
);

INSERT INTO avatar (bitmap) VALUES
('avatar_1'),
('avatar_2'),
('avatar_3'),
('avatar_4');

-- Skiny do kupienia
CREATE TABLE skin (
  id SERIAL PRIMARY KEY,
  name text UNIQUE NOT NULL,
  bitmap text UNIQUE NOT NULL,
  price int NOT NULL,
  min_exp int NOT NULL
);

INSERT INTO skin (name, bitmap, price, min_exp) VALUES
('Podstawowy skin', 'default', 0, 0);

-- Przedmioty należące do gracza
CREATE TABLE inventory_skin (
  id SERIAL PRIMARY KEY,
  owner_id int NOT NULL,
  skin_id int NOT NULL,
  CONSTRAINT fk_inventory_skin_prototype FOREIGN KEY (skin_id) REFERENCES skin (id)
--	FOREIGN KEY (player_id) REFERENCES player (id),
);

-- Gracz
CREATE TABLE player (
  id SERIAL PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  money int NOT NULL,
  exp int NOT NULL,
  credits int NOT NULL,
  avatar_id int NOT NULL,
  skin_id int,
  CONSTRAINT fk_player_avatar FOREIGN KEY (avatar_id) REFERENCES avatar (id),
  CONSTRAINT fk_player_skin FOREIGN KEY (skin_id) REFERENCES inventory_skin (id)
);

ALTER TABLE inventory_skin
  ADD CONSTRAINT fk_inventory_skin_owner FOREIGN KEY (owner_id) REFERENCES player (id);
  