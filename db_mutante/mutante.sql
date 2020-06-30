CREATE DATABASE IF NOT EXISTS mutante;

USE mutante;

CREATE TABLE mutante (
  id INT(11) NOT NULL AUTO_INCREMENT,
  dna VARCHAR(45) DEFAULT NULL,
  condicion VARCHAR(10) DEFAULT NULL,
    PRIMARY KEY(id)
);

DESCRIBE mutante;

INSERT INTO mutante values 
  (1, "ATGCGACAGTGCTTATGTAGAAGGCCCCTATCACTG","mutante"),
  (2, "ATGCGACAGTGCTTATTTAGACGGGCGTCATCACTG","no mutante");
 

SELECT * FROM mutante;
