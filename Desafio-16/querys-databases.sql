use games_db;

##Creamos una tabla con un id primary key (llave primaria) con auto incremento y sus otras columnas
## not null significa que no puede ser nulo
create table games (id integer primary key auto_increment, name varchar(100) not null);


##Si queremos modificar algo de mi tabla lo hacemos con alter table
alter table games add price int;
alter table games add image varchar(200);

##Insertar datos en nuestra tabla (crear)
insert into games value (0, 'Serious Sam HD: The Second Encounter', 200, 'https://cdn.cloudflare.steamstatic.com/steam/apps/41000/header.jpg?t=1601674786');
insert into games value (0, 'Dishonored', 180, 'https://cdn.cloudflare.steamstatic.com/steam/apps/205100/header.jpg?t=1598321484');
insert into games value (0, 'God of War', 4000, 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg?t=1642526157');
insert into games value (0, 'Street figther', 2333, 'https://cdn.cloudflare.steamstatic.com/steam/bundles/18850/47n94x737tvnlp8o/header_ratio.jpg?t=1638154639');

##Hacer consulta de mi tabla donde seleccionamos las columnas que queremos ver
## Leer datos de mi tabla

select id, name, price, image from games;

##Update Cambiar o actualizar la tabla 
## Actualizamos el precio cuando la pelicula sea Dishonored
update games set price = 100 where name = 'Dishonored';

##Eliminar segun su id  poner siempre el where al borrar 
delete from games where id = 2;

CREATE TABLE `games` (
  `id` int(11) primary key auto_increment NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

select id, name, price, image from games;

CREATE TABLE `chats` (
  `id` int(11) primary key auto_increment NOT NULL,
  `email` varchar(100) NOT NULL,
  `de` varchar(200) NOT NULL,
  `mensaje` varchar(300) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

select id, email, de , mensaje  from chats;