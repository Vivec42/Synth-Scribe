SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
  time_zone = "+00:00";

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

INSERT INTO
  `user` (`nickname`, `email`, `hashedPassword`, `role`)
VALUES
  (
    "Todd Howard",
    "todd.howard@bugthesda.com",
    '$argon2id$v=19$m=19456,t=2,p=1$ihqD7mmAJEkVibNZ4X+dVw$pPPjnUc6VEDfmxMLN3c9/zmjiVejrSBQiA/5LIeKsHA',
    "ADMIN"
  ),
  (
    "Synth Strider",
    "synthstrider@retromail.synth",
    '$argon2id$v=19$m=19456,t=2,p=1$NOBzHmyjpseIOs9ZLhJ+0g$8fDyiLD3S4citu62vPIel6Otl7Bkv9ibwaMFaZ0+0/0',
    "USER"
  ),
  (
    "John Luke Melanwave",
    "john.luke@retromail.synth",
    '$argon2id$v=19$m=19456,t=2,p=1$NOBzHmyjpseIOs9ZLhJ+0g$8fDyiLD3S4citu62vPIel6Otl7Bkv9ibwaMFaZ0+0/0',
    "USER"
  );

CREATE TABLE thread (
  id INT(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) UNIQUE NOT NULL,
  description TEXT(3000) NULL,
  creationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO
  `thread` (`title`, `description`, `user_id`)
VALUES
  (
    "Synthwave",
    "Welcome to the world of Synthwave, a captivating and retro-futuristic genre that takes you on a nostalgic journey back to the neon-lit streets of the 1980s. Synthwave is characterized by its pulsating electronic beats, lush synthesizer melodies, and an unmistakable blend of nostalgia and innovation. In this thread, let's dive into the mesmerizing soundscapes of Synthwave, discuss our favorite artists, albums, and tracks, and share the vibrant visuals and captivating aesthetics that define this genre. Whether you're a long-time fan or just discovering the magic of Synthwave, this thread is the perfect place to immerse yourself in its retro-futuristic world and connect with fellow enthusiasts. So grab your virtual shades, tune in to the pulsating rhythms, and let's explore the mesmerizing realm of Synthwave together!",
    "1"
  ),
  (
    "Retrowave",
    "Step into the captivating world of Retrowave, a genre that pays homage to the iconic sounds and aesthetics of the 1980s. Retrowave, also known as Outrun or Futuresynth, transports us to a time of neon-lit streets, fast cars, and futuristic nostalgia. With its pulsating synthesizers, driving basslines, and irresistibly catchy melodies, Retrowave captures the essence of the retro-futuristic era like no other. In this thread, let's delve into the captivating realm of Retrowave, discussing our favorite artists, albums, and tracks that channel the spirit of this genre. Share the vivid visuals, vibrant album artworks, and nostalgic vibes that define Retrowave. Whether you're a die-hard fan or just discovering the magic of Retrowave, this thread is the perfect place to immerse yourself in its captivating universe and connect with fellow enthusiasts. So fasten your seatbelts, turn up the volume, and join us on a thrilling journey through the mesmerizing soundscape of Retrowave!",
    "1"
  ),
  (
    "Space Synth",
    "Welcome to the captivating realm of Space Synth, a genre that propels us into the depths of outer space through mesmerizing electronic soundscapes. Space Synth is a subgenre of electronic music that embodies the spirit of cosmic exploration and futuristic imagination. With its pulsating rhythms, ethereal melodies, and intergalactic atmospheres, Space Synth takes us on a sonic journey through uncharted galaxies and distant star systems. In this thread, let's delve into the mesmerizing world of Space Synth, discuss our favorite artists, albums, and tracks that ignite our imagination and evoke the awe-inspiring vastness of the cosmos. Share the captivating visuals, otherworldly vibes, and space-inspired motifs that define this genre. Whether you're a seasoned traveler of cosmic sound or just discovering the wonders of Space Synth, this thread is the perfect place to connect with like-minded enthusiasts, exchange recommendations, and embark on a celestial adventure together. So, strap in, turn up the celestial frequencies, and let the ethereal melodies of Space Synth guide us through the limitless wonders of the universe!",
    "1"
  ),
  (
    "Vaporwave",
    "Welcome to the mesmerizing realm of Vaporwave, a genre that captures the nostalgic essence of the past while simultaneously reimagining it through a dreamy, surreal lens. Vaporwave is an electronic music and art movement that emerged in the internet age, drawing inspiration from the aesthetics of the 1980s and 1990s. With its slowed-down, warped samples, hazy atmospheres, and glitchy beats, Vaporwave creates a unique audiovisual experience that transports us to a retro-futuristic utopia. In this thread, let's delve into the fascinating world of Vaporwave, discussing our favorite artists, albums, and tracks that evoke feelings of nostalgia and introspection. Share the vibrant visuals, nostalgic imagery, and surreal aesthetics that define this genre. Whether you're a seasoned Vaporwave connoisseur or just beginning to explore its ethereal realms, this thread is the perfect place to connect with fellow enthusiasts, exchange recommendations, and immerse ourselves in the hazy, nostalgic landscapes of Vaporwave. So, put on your virtual sunglasses, tune in to the glitchy rhythms, and let's dive into the captivating universe of Vaporwave together!",
    "1"
  );

  CREATE TABLE post (
  id INT(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  post TEXT(666) NOT NULL,
  file VARCHAR(255) NULL,
  creationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thread_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;