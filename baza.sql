-- Baza danych: game_data
ALTER TABLE inventory_item
  DROP CONSTRAINT fk_inventory_item_owner;
DROP TABLE player;
DROP TABLE avatar;
DROP TABLE inventory_item;
DROP TABLE shop_item;
DROP TABLE item_type;
DROP TABLE face;

-- Twarze - darmowe, wybierane przy rejestracji
CREATE TABLE face (
  id SERIAL PRIMARY KEY,
  bitmap text NOT NULL
);

INSERT INTO face (bitmap) VALUES
('face1.png'),
('face2.png'),
('face3.png'),
('face4.png');

-- Typy przedmiotów w sklepie - spodnie/koszulki/style nicku
CREATE TABLE item_type (
  id SERIAL PRIMARY KEY,
  type text NOT NULL
);

INSERT INTO item_type (type) VALUES
('Spodnie'),
('Koszulka'),
('Styl nicku');

-- Przedmiot w sklepie - item_type_id określa typ: spodnie/koszulka [bitmap] | styl [style]
CREATE TABLE shop_item (
  id SERIAL PRIMARY KEY,
  bitmap text,
  style int,
  item_type_id int NOT NULL,
  item_name text,
  item_cost int,
  min_exp int,
  CONSTRAINT fk_shop_item_type FOREIGN KEY (item_type_id) REFERENCES item_type (id)
);

INSERT INTO shop_item (bitmap, style, item_type_id, item_name, item_cost, min_exp) VALUES
('trousers1.png', null, 1, 'Spodnie 1', 100, 100),
('trousers2.png', null, 1, 'Spodnie 2', 300, 300),
('trousers3.png', null, 1, 'Spodnie 3', 500, 1000),
('tshirt1.png', null, 2, 'T-shirt 1', 100, 100),
('tshirt2.png', null, 2, 'T-shirt 2', 300, 700),
('tshirt3.png', null, 2, 'T-shirt 3', 1000, 1000),
(null, 1, 3, 'Styl pogrubiony', 100, 100),
(null, 2, 3, 'Styl podkreślony', 100, 100),
(null, 3, 3, 'Styl inny', 100, 100);

-- Przedmioty należące do gracza
CREATE TABLE inventory_item (
  id SERIAL PRIMARY KEY,
  shop_item_id int NOT NULL,
  player_id int NOT NULL,
  CONSTRAINT fk_inventory_item_prototype FOREIGN KEY (shop_item_id) REFERENCES shop_item (id)
--	FOREIGN KEY (player_id) REFERENCES player (id),
);

-- Avatar gracza, czyli twarz, ubranko i styl
CREATE TABLE avatar (
  id SERIAL PRIMARY KEY,
  face_id int NOT NULL,
  shirt_id int NOT NULL,
  trousers_id int NOT NULL,
  style_id int NOT NULL,
  CONSTRAINT fk_avatar_face FOREIGN KEY (face_id) REFERENCES face (id),
  CONSTRAINT fk_avatar_shirt FOREIGN KEY (shirt_id) REFERENCES inventory_item (id),
  CONSTRAINT fk_avatar_trousers FOREIGN KEY (trousers_id) REFERENCES inventory_item (id),
  CONSTRAINT fk_avatar_style FOREIGN KEY (style_id) REFERENCES inventory_item (id)
);

-- Gracz
CREATE TABLE player (
  id SERIAL PRIMARY KEY,
  username text NOT NULL,
  password text NOT NULL,
  money int NOT NULL,
  exp int NOT NULL,
  avatar_id int,
  CONSTRAINT fk_player_avatar FOREIGN KEY (avatar_id) REFERENCES avatar (id)
);

ALTER TABLE inventory_item
  ADD CONSTRAINT fk_inventory_item_owner FOREIGN KEY (player_id) REFERENCES player (id);
  