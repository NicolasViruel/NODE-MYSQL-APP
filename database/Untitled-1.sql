SELECT * FROM users

USE database_links;

-- creamos la tablas de usuarios
CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

INSERT INTO users (username, password, fullname)
VALUES ('nicolas', '123456', 'Nicolas Viruel');

DESCRIBE users;

-- creamos la tablas de usuarios
CREATE TABLE links(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(200) NOT NULL,
    descripcion TEXT,
    #este campo es el que relaciona la tabla users con el link
    user_id INT(11),
    #Campo para saber cuando se crea
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    #llave foranea relacion entre tablas
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

DESCRIBE links;