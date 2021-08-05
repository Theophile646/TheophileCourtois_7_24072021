-- Create table users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(80) NOT NULL,
  `admin` tinyint(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- InSertion to user Table
INSERT INTO `users` (`email`, `name`, `lastName`)

VALUES

('theophile.courtois@gmail.com', 'Theophile', 'courtois');

-- posts table creation
CREATE TABLE IF NOT EXISTS `posts` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId int(10) UNSIGNED NOT NULL,
  title varchar(255) NOT NULL,
  content varchar(400) NOT NULL,
  publicationDate DATETIME NOT NULL,
  author varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- insertion posts 
INSERT INTO `posts` (`title`, `content`, `publicationDate`, `author`)

VALUES

('Mon premier post', 'Beaucoup de texte', '20210727175200', 'Moi');


ALTER TABLE posts
DROP COLUMN title;

ALTER TABLE posts
ADD title varchar(255);

ALTER TABLE users
ADD `password` varchar(80) NOT NULL;

ALTER TABLE posts
MODIFY `title` VARCHAR(255) NOT NULL;

-- comments table creation
CREATE TABLE `comments` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userId` int(10) UNSIGNED NOT NULL,
  `postId` int(10) UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL,
  `content` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Join to get comments from post
``SELECT users.firstName, users.LastName, comments.date, comments.content
FROM comments
INNER JOIN posts ON posts.id = comments.postId
INNER JOIN users on users.id = comments.userId
WHERE comments.postId = ${postId}
ORDER BY comments.date DESC``;

SELECT users.firstName, users.LastName, comments.date, comments.content
FROM comments
INNER JOIN posts ON posts.id = comments.postId
INNER JOIN users on users.id = comments.userId
WHERE comments.postId = 4
ORDER BY comments.date DESC;

``SELECT users.id, users.firstName, users.LastName, comments.date, comments.content 
FROM comments 
INNER JOIN posts ON posts.id = comments.postId 
INNER JOIN users on users.id = comments.userId
WHERE comments.postId = ${postId}
ORDER BY comments.date DESC``;


-- Join to get posts from user
SELECT users.firstName, users.LastName, posts.publicationDate, posts.title, posts.content
FROM posts
INNER JOIN users ON users.id = posts.userId
WHERE users.id = 6;


--insert comments
INSERT INTO `comments` (`userId`, `postId`, `date`, `content`)

VALUES

('1', '1', '2020-08-21', 'blablabla'),
('1', '1', '2021-06-20', 'bliblbilbi');


-- delete post and related comments
``DELETE posts, comments
FROM `posts` 
LEFT JOIN `comments` ON posts.id = comments.postId
WHERE posts.id = ${postId};``


-- delete account and related data
``DELETE users, posts, comments
FROM `users` 
LEFT JOIN `posts` ON users.id = posts.userId
RIGHT JOIN `comments` ON users.id = comments.userId
WHERE users.id = ${postId};``

SELECT users.id AS userID, posts.id AS postId, comments.id AS commentId
FROM users
LEFT JOIN posts ON users.id = posts.userId
LEFT JOIN comments ON users.id = comments.userId
LEFT JOIN comments ON posts.id = comments.postId
WHERE users.id = 8;


SELECT users.id, posts.id, comments.id
FROM users
LEFT JOIN posts ON users.id = posts.userId
LEFT JOIN comments AS commentsUser ON users.id = commentsUser.userId
RIGHT JOIN comments ON posts.id = comments.postId
WHERE users.id = 8;