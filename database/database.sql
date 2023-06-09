CREATE TABLE users (
  id CHAR(50) NOT NULL,
  username VARCHAR(255) NULL,
  email VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  quota INT NOT NULL DEFAULT 5,
  PRIMARY KEY (id)
);
CREATE TABLE exercises (
  id CHAR(50) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);
CREATE TABLE privateExercises (
  `id` int NOT NULL PRIMARY KEY,
  `Sports` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Visual` varchar(255) DEFAULT NULL,
  `Duration_Min` varchar(10) NOT NULL,
  `Location` varchar(10) NOT NULL,
  `Number_of_people` varchar(5) NOT NULL,
  `Equipment` varchar(3) NOT NULL,
  `Muscle` text NOT NULL,
  `Category` varchar(10) NOT NULL,
  uid INT NOT NULL,
  FOREIGN KEY (uid) REFERENCES users(id)
);
CREATE TABLE privateBooks (
  ISBN INT PRIMARY KEY NOT NULL,
  BookTitle VARCHAR(200) NOT NULL,
  BookAuthor VARCHAR(200) NOT NULL,
  YearOfPublication INT NOT NULL,
  Publisher VARCHAR(200) NOT NULL,
  ImageURLL VARCHAR(100) NOT NULL,
  Author VARCHAR(100) NULL,
  Summary TEXT NOT NULL,
  AvgRating FLOAT NULL,
  CountRating INT NULL,
  Genres VARCHAR(230) NOT NULL,  
  uid INT NOT NULL,
  FOREIGN KEY (uid) REFERENCES users(id) 
);


CREATE TABLE schedule (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL,
  date VARCHAR(20) NOT NULL,
  start_time VARCHAR(20) NOT NULL,
  end_time VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  uid INT NOT NULL,
  FOREIGN KEY (uid) REFERENCES users(id)
);

INSERT INTO `exercises` (`id`, `title`, `img_url`, `type`, `description`) 
VALUES (CONCAT('exercise-', UUID()), 
'Push Up'
, 'https://i.ibb.co/LSscmwk/Google-G-Logo-svg.png', 
'Hard', 
'Push Up 500 Kali, bagai Saitama');
Sports,
Description,
	Visual,
  	Duration_Min,
    Location,
    Number_of_people,
    Equipment,
    Muscle,
    Category


(
  SELECT id, Sports, Description, Visual, Duration_Min, Location, Number_of_people, Equipment, Muscle,Category FROM privateExercises WHERE uid = 1
)
UNION
(
  SELECT * FROM exercises 
)
LIMIT 0,20;
