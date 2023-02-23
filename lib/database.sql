--
-- Base de datos: db_club
--  

DROP DATABASE IF EXISTS db_club;
CREATE DATABASE IF NOT EXISTS db_club DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci;
USE db_club;

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(150) NOT NULL,
  email varchar(250) NOT NULL,
  password varchar(250) NOT NULL,
  name varchar(370) NOT NULL,
  phone_number int(11) NOT NULL,
  id_role int(11) NOT NULL,
  FOREIGN KEY (id_role) REFERENCES roles(id) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Insercion de roles
--
INSERT INTO roles (id, role) VALUES (NULL, 'Cliente'),(NULL, 'Coordinador'),(NULL, 'Administrador');