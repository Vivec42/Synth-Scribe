CREATE TABLE user (
  id INT(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  profilePicture VARCHAR(255) NOT NULL DEFAULT "Wave_Picture.png",
  profileBanner VARCHAR(255) NOT NULL DEFAULT "Wave_Banner.png",
  description TEXT NULL,
  language VARCHAR(150) NULL,
  country VARCHAR(150) NULL,
  city VARCHAR(150) NULL,
  role ENUM("ADMIN","MODO","USER") DEFAULT "USER" NOT NULL,
  banned BOOLEAN NOT NULL DEFAULT 0,
  registeredDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;